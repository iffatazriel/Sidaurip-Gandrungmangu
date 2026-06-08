import crypto from "crypto";
import { rm } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { ensureNotificationsTable } from "@/lib/notifications";
import { logAudit } from "@/lib/audit";
import { serviceRequestSchema } from "@/lib/validations";
import { text, optional, serviceStatus as status } from "@/lib/utils";
import { apiSuccess, apiError, apiPaginated } from "@/lib/api-response";
import { ZodError } from "zod";

type ServiceRequestRow = {
  id: number;
  tracking_number: string;
  service_type: string;
  applicant_name: string;
  nik: string;
  phone: string | null;
  address: string | null;
  notes: string | null;
  status: string;
  admin_note: string | null;
  document_note: string | null;
  rejection_reason: string | null;
  completed_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

type DocumentRow = {
  id: number;
  service_request_id: number;
  name: string;
  file_url: string;
  file_name: string;
  mime_type: string | null;
  size: number | null;
  status: string;
  note: string | null;
  uploaded_at: Date;
  updated_at: Date;
};

type RequestInput = {
  serviceType?: string;
  applicantName?: string;
  nik?: string;
  phone?: string;
  address?: string;
  notes?: string;
  status?: string;
  adminNote?: string;
  documentNote?: string;
  rejectionReason?: string;
};

let ensureServiceTablePromise: Promise<void> | null = null;

function trackingNumber() {
  const date = new Date();
  const ymd = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");
  return `LYN-${ymd}-${crypto.randomUUID().split("-")[0].toUpperCase()}`;
}

function serializeDocument(row: DocumentRow) {
  return {
    id: row.id,
    serviceRequestId: row.service_request_id,
    name: row.name,
    fileUrl: row.file_url,
    fileName: row.file_name,
    mimeType: row.mime_type,
    size: row.size,
    status: row.status,
    note: row.note,
    uploadedAt: row.uploaded_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

function serialize(row: ServiceRequestRow, documents: DocumentRow[] = []) {
  return {
    id: row.id,
    trackingNumber: row.tracking_number,
    serviceType: row.service_type,
    applicantName: row.applicant_name,
    nik: row.nik,
    phone: row.phone,
    address: row.address,
    notes: row.notes,
    status: row.status,
    adminNote: row.admin_note,
    documentNote: row.document_note,
    rejectionReason: row.rejection_reason,
    completedAt: row.completed_at?.toISOString() ?? null,
    documents: documents.map(serializeDocument),
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

async function ensureServiceTable() {
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS service_requests (
      id SERIAL PRIMARY KEY,
      tracking_number TEXT NOT NULL UNIQUE,
      service_type TEXT NOT NULL,
      applicant_name TEXT NOT NULL,
      nik TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      notes TEXT,
      status TEXT NOT NULL DEFAULT 'PENDING',
      admin_note TEXT,
      document_note TEXT,
      rejection_reason TEXT,
      completed_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await prisma.$executeRaw`ALTER TABLE service_requests ADD COLUMN IF NOT EXISTS document_note TEXT`;
  await prisma.$executeRaw`ALTER TABLE service_requests ADD COLUMN IF NOT EXISTS rejection_reason TEXT`;
  await prisma.$executeRaw`ALTER TABLE service_requests ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ`;
  await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS service_requests_nik_idx ON service_requests (nik)`;
  await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS service_requests_status_idx ON service_requests (status)`;
  await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS service_requests_type_idx ON service_requests (service_type)`;
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS service_request_documents (
      id SERIAL PRIMARY KEY,
      service_request_id INTEGER NOT NULL REFERENCES service_requests(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      file_url TEXT NOT NULL,
      file_name TEXT NOT NULL,
      mime_type TEXT,
      size INTEGER,
      status TEXT NOT NULL DEFAULT 'PENDING',
      note TEXT,
      uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS service_request_documents_request_idx ON service_request_documents (service_request_id)`;
  await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS service_request_documents_status_idx ON service_request_documents (status)`;
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS service_types (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      description TEXT DEFAULT '',
      is_active BOOLEAN NOT NULL DEFAULT true,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  const existingCount = await prisma.$queryRaw<{ count: bigint }[]>`SELECT COUNT(*)::bigint AS count FROM service_types`;
  if (Number(existingCount[0]?.count ?? 0) === 0) {
    const defaults = ["Surat Domisili", "Surat Pengantar KTP", "Surat Keterangan Usaha", "SKTM", "Kartu Keluarga", "Aspirasi & Pengaduan"];
    for (let i = 0; i < defaults.length; i++) {
      await prisma.$executeRaw`INSERT INTO service_types (name, sort_order) VALUES (${defaults[i]}, ${i}) ON CONFLICT (name) DO NOTHING`;
    }
  }
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS knowledge_base (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL DEFAULT '',
      category TEXT DEFAULT 'umum',
      tags TEXT DEFAULT '',
      is_published BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS knowledge_base_category_idx ON knowledge_base (category)`;
  await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS knowledge_base_published_idx ON knowledge_base (is_published)`;
}

export function ensureServiceRequestsReady() {
  ensureServiceTablePromise ??= ensureServiceTable();
  return ensureServiceTablePromise;
}

export async function GET(request: NextRequest) {
  try {
    await ensureServiceRequestsReady();
    const user = await getCurrentUser();

    const params = request.nextUrl.searchParams;
    const tracking = text(params.get("tracking"));
    const page = Math.max(Number(params.get("page") ?? 1), 1);
    const perPage = Math.min(Math.max(Number(params.get("perPage") ?? 10), 1), 50);
    const filterStatus = text(params.get("status"));
    const search = text(params.get("search"));
    const mine = params.get("mine") === "1";

    if (tracking) {
      const rows = await prisma.$queryRaw<ServiceRequestRow[]>`
        SELECT id, tracking_number, service_type, applicant_name, nik, phone, address, notes, status, admin_note, document_note, rejection_reason, completed_at, created_at, updated_at
        FROM service_requests
        WHERE tracking_number = ${tracking}
        LIMIT 1
      `;

      if (rows.length === 0) {
        return apiError("Nomor resi tidak ditemukan", 404);
      }

      if (!user || (user.role !== "ADMIN" && rows[0].nik !== user.nik)) {
        return apiError("Anda tidak memiliki akses ke pengajuan ini", 403);
      }

      const documents = await prisma.$queryRaw<DocumentRow[]>`
        SELECT id, service_request_id, name, file_url, file_name, mime_type, size, status, note, uploaded_at, updated_at
        FROM service_request_documents
        WHERE service_request_id = ${rows[0].id}
        ORDER BY uploaded_at DESC
      `;

      return apiSuccess(serialize(rows[0], documents));
    }

    if (mine) {
      if (!user) {
        return apiError("Silakan login terlebih dahulu", 401);
      }

      const minePerPage = Math.min(Math.max(Number(params.get("perPage") ?? 10), 1), 50);
      const minePage = Math.max(Number(params.get("page") ?? 1), 1);

      const totalRows = await prisma.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(*)::bigint AS count FROM service_requests WHERE nik = ${user.nik}
      `;
      const total = Number(totalRows[0]?.count ?? 0);
      const totalPages = Math.max(Math.ceil(total / minePerPage), 1);

      const rows = await prisma.$queryRaw<ServiceRequestRow[]>`
        SELECT id, tracking_number, service_type, applicant_name, nik, phone, address, notes, status, admin_note, document_note, rejection_reason, completed_at, created_at, updated_at
        FROM service_requests
        WHERE nik = ${user.nik}
        ORDER BY created_at DESC
        LIMIT ${minePerPage} OFFSET ${(minePage - 1) * minePerPage}
      `;
      const requestIds = rows.map((row) => row.id);
      const documents = requestIds.length
        ? await prisma.$queryRawUnsafe<DocumentRow[]>(
            `SELECT id, service_request_id, name, file_url, file_name, mime_type, size, status, note, uploaded_at, updated_at
             FROM service_request_documents
             WHERE service_request_id IN (${requestIds.map((_, index) => `$${index + 1}`).join(", ")})
             ORDER BY uploaded_at DESC`,
            ...requestIds
          )
        : [];

      return apiPaginated(
        rows.map((row) => serialize(row, documents.filter((document) => document.service_request_id === row.id))),
        { page: minePage, perPage: minePerPage, total, totalPages },
      );
    }

    if (!user || user.role !== "ADMIN") {
      return apiError("Akses dashboard membutuhkan akun admin", 403);
    }

    const clauses: string[] = [];
    const values: unknown[] = [];

    if (filterStatus && filterStatus !== "ALL") {
      values.push(filterStatus.toUpperCase());
      clauses.push(`status = $${values.length}`);
    }
    if (search) {
      values.push(`%${search}%`);
      clauses.push(`(tracking_number ILIKE $${values.length} OR applicant_name ILIKE $${values.length} OR nik ILIKE $${values.length})`);
    }

    const whereSql = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
    const totalRows = await prisma.$queryRawUnsafe<{ count: bigint }[]>(
      `SELECT COUNT(*)::bigint AS count FROM service_requests ${whereSql}`,
      ...values
    );
    values.push(perPage, (page - 1) * perPage);
    const rows = await prisma.$queryRawUnsafe<ServiceRequestRow[]>(
      `SELECT id, tracking_number, service_type, applicant_name, nik, phone, address, notes, status, admin_note, document_note, rejection_reason, completed_at, created_at, updated_at
       FROM service_requests ${whereSql}
       ORDER BY created_at DESC
       LIMIT $${values.length - 1} OFFSET $${values.length}`,
      ...values
    );

    const statsRows = await prisma.$queryRaw<{ status: string; count: bigint }[]>`
      SELECT status, COUNT(*)::bigint AS count FROM service_requests GROUP BY status
    `;
    const statsMap: Record<string, number> = {};
    for (const row of statsRows) {
      statsMap[row.status] = Number(row.count);
    }

    const total = Number(totalRows[0]?.count ?? 0);
    return apiPaginated(
      rows.map((row) => serialize(row)),
      { page, perPage, total, totalPages: Math.max(Math.ceil(total / perPage), 1) },
      { stats: {
        pending: statsMap["PENDING"] ?? 0,
        needDocuments: statsMap["NEED_DOCUMENTS"] ?? 0,
        documentReview: statsMap["DOCUMENT_REVIEW"] ?? 0,
        processing: statsMap["PROCESSING"] ?? 0,
        approved: statsMap["APPROVED"] ?? 0,
        done: statsMap["DONE"] ?? 0,
      } },
    );
  } catch (error) {
    console.error("GET_SERVICE_REQUESTS_ERROR", error);
    return apiError("Gagal mengambil data layanan", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureServiceRequestsReady();
    const user = await getCurrentUser();

    if (!user) {
      return apiError("Silakan login terlebih dahulu", 401);
    }

    if (user.status !== "VERIFIED") {
      return apiError("Akun Anda masih menunggu verifikasi admin", 403);
    }

    const body = serviceRequestSchema.parse(await request.json());
    const serviceType = body.serviceType;
    const applicantName = user.name;
    const nik = user.nik;

    const rows = await prisma.$queryRaw<ServiceRequestRow[]>`
      INSERT INTO service_requests (tracking_number, service_type, applicant_name, nik, phone, address, notes)
      VALUES (${trackingNumber()}, ${serviceType}, ${applicantName}, ${nik}, ${optional(body.phone)}, ${optional(body.address)}, ${optional(body.notes)})
      RETURNING id, tracking_number, service_type, applicant_name, nik, phone, address, notes, status, admin_note, document_note, rejection_reason, completed_at, created_at, updated_at
    `;

    await ensureNotificationsTable();
    await prisma.$executeRaw`
      INSERT INTO notifications (user_id, title, message, type, link)
      SELECT id, ${`Pengajuan baru: ${serviceType}`}, ${`${applicantName} mengajukan ${serviceType}`}, 'INFO', ${`/dashboard/layananpublic`}
      FROM users WHERE role = 'ADMIN'
    `;

    const created = serialize(rows[0]);
    await logAudit(
      user.id, user.name, "CREATE", "service_request", created.id,
      created.trackingNumber, null, { serviceType, notes: body.notes },
    );

    return apiSuccess(created, 201);
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.issues.map((e) => e.message);
      return apiError(messages.join(", "), 400);
    }
    console.error("CREATE_SERVICE_REQUEST_ERROR", error);
    return apiError("Gagal membuat pengajuan layanan", 500);
  }
}

const allowedTransitions: Record<string, string[]> = {
  PENDING: ["NEED_DOCUMENTS", "DOCUMENT_REVIEW", "REJECTED"],
  NEED_DOCUMENTS: ["DOCUMENT_REVIEW", "REJECTED"],
  DOCUMENT_REVIEW: ["PROCESSING", "REJECTED"],
  PROCESSING: ["APPROVED", "REJECTED"],
  APPROVED: ["DONE"],
  DONE: [],
  REJECTED: [],
};

export async function PATCH(request: NextRequest) {
  try {
    await ensureServiceRequestsReady();
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return apiError("Akses dashboard membutuhkan akun admin", 403);
    }

    const body = (await request.json()) as RequestInput & { id?: number };
    const id = Number(body.id);

    if (!id) {
      return apiError("ID pengajuan wajib diisi", 400);
    }

    const current = await prisma.$queryRaw<ServiceRequestRow[]>`
      SELECT id, tracking_number, service_type, applicant_name, nik, phone, address, notes, status, admin_note, document_note, rejection_reason, completed_at, created_at, updated_at
      FROM service_requests WHERE id = ${id}
    `;

    if (current.length === 0) {
      return apiError("Pengajuan tidak ditemukan", 404);
    }

    const newStatus = status(body.status);
    const currentStatus = current[0].status;
    const allowed = allowedTransitions[currentStatus];

    if (!allowed || !allowed.includes(newStatus)) {
      return apiError(`Transisi status tidak valid dari ${currentStatus} ke ${newStatus}`, 400);
    }

    const rows = await prisma.$queryRaw<ServiceRequestRow[]>`
      UPDATE service_requests
      SET
        status = ${newStatus},
        admin_note = ${optional(body.adminNote)},
        document_note = ${optional(body.documentNote)},
        rejection_reason = ${optional(body.rejectionReason)},
        completed_at = CASE WHEN ${newStatus} = 'DONE' THEN COALESCE(completed_at, NOW()) ELSE completed_at END,
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, tracking_number, service_type, applicant_name, nik, phone, address, notes, status, admin_note, document_note, rejection_reason, completed_at, created_at, updated_at
    `;

    if (rows.length === 0) {
      return apiError("Pengajuan tidak ditemukan", 404);
    }

    await ensureNotificationsTable();
    const updated = serialize(rows[0]);
    const statusLabel = updated.status.replace(/_/g, " ").toLowerCase();

    await prisma.$executeRaw`
      INSERT INTO notifications (user_id, title, message, type, link)
      SELECT id, ${`Status pengajuan diperbarui`}, ${`Pengajuan ${updated.serviceType} atas nama ${updated.applicantName} berubah menjadi ${statusLabel}`}, 'INFO', ${`/dashboard/layananpublic`}
      FROM users WHERE role = 'ADMIN'
    `;

    await prisma.$executeRaw`
      INSERT INTO notifications (user_id, title, message, type, link)
      SELECT id, ${`Status pengajuan diperbarui`}, ${`Pengajuan ${updated.serviceType} Anda berubah menjadi ${statusLabel}`}, 'INFO', ${`/layanan-mandiri`}
      FROM users WHERE nik = ${updated.nik}
    `;

    await logAudit(
      user.id, user.name, "UPDATE", "service_request", updated.id,
      updated.trackingNumber, { status: currentStatus }, { status: newStatus, adminNote: body.adminNote },
    );

    return apiSuccess(updated);
  } catch (error) {
    console.error("UPDATE_SERVICE_REQUEST_ERROR", error);
    return apiError("Gagal memperbarui pengajuan", 500);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await ensureServiceRequestsReady();
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return apiError("Akses dashboard membutuhkan akun admin", 403);
    }

    const id = Number(request.nextUrl.searchParams.get("id"));

    if (!id) {
      return apiError("ID pengajuan wajib diisi", 400);
    }

    const requestInfo = await prisma.$queryRaw<{ tracking_number: string; service_type: string }[]>`
      SELECT tracking_number, service_type FROM service_requests WHERE id = ${id} LIMIT 1
    `;

    const docRows = await prisma.$queryRaw<{ file_url: string }[]>`
      SELECT file_url FROM service_request_documents WHERE service_request_id = ${id}
    `;
    const uploadDir = path.join(process.cwd(), "public");

    await prisma.$executeRaw`DELETE FROM service_requests WHERE id = ${id}`;

    if (requestInfo.length) {
      await logAudit(
        user.id, user.name, "DELETE", "service_request", id,
        requestInfo[0].tracking_number, { serviceType: requestInfo[0].service_type }, null,
      );
    }

    for (const row of docRows) {
      const filePath = path.join(uploadDir, row.file_url.replace(/^\//, ""));
      await rm(filePath, { force: true });
    }

    return apiSuccess({ deleted: true });
  } catch (error) {
    console.error("DELETE_SERVICE_REQUEST_ERROR", error);
    return apiError("Gagal menghapus pengajuan", 500);
  }
}
