import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";

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

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function optional(value: unknown) {
  const normalized = text(value);
  return normalized.length ? normalized : null;
}

function status(value: unknown) {
  const normalized = text(value).toUpperCase();
  const allowed = ["PENDING", "NEED_DOCUMENTS", "DOCUMENT_REVIEW", "PROCESSING", "APPROVED", "DONE", "REJECTED"];
  return allowed.includes(normalized) ? normalized : "PENDING";
}

function trackingNumber() {
  const date = new Date();
  const ymd = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");
  return `LYN-${ymd}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
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
        return NextResponse.json({ message: "Nomor resi tidak ditemukan" }, { status: 404 });
      }

      if (!user || (user.role !== "ADMIN" && rows[0].nik !== user.nik)) {
        return NextResponse.json({ message: "Anda tidak memiliki akses ke pengajuan ini" }, { status: 403 });
      }

      const documents = await prisma.$queryRaw<DocumentRow[]>`
        SELECT id, service_request_id, name, file_url, file_name, mime_type, size, status, note, uploaded_at, updated_at
        FROM service_request_documents
        WHERE service_request_id = ${rows[0].id}
        ORDER BY uploaded_at DESC
      `;

      return NextResponse.json(serialize(rows[0], documents));
    }

    if (mine) {
      if (!user) {
        return NextResponse.json({ message: "Silakan login terlebih dahulu" }, { status: 401 });
      }

      const rows = await prisma.$queryRaw<ServiceRequestRow[]>`
        SELECT id, tracking_number, service_type, applicant_name, nik, phone, address, notes, status, admin_note, document_note, rejection_reason, completed_at, created_at, updated_at
        FROM service_requests
        WHERE nik = ${user.nik}
        ORDER BY created_at DESC
        LIMIT 20
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

      return NextResponse.json({
        data: rows.map((row) => serialize(row, documents.filter((document) => document.service_request_id === row.id))),
      });
    }

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Akses dashboard membutuhkan akun admin" }, { status: 403 });
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

    const [pending, needDocuments, documentReview, processing, approved, done] = await prisma.$transaction([
      prisma.$queryRaw<{ count: bigint }[]>`SELECT COUNT(*)::bigint AS count FROM service_requests WHERE status = 'PENDING'`,
      prisma.$queryRaw<{ count: bigint }[]>`SELECT COUNT(*)::bigint AS count FROM service_requests WHERE status = 'NEED_DOCUMENTS'`,
      prisma.$queryRaw<{ count: bigint }[]>`SELECT COUNT(*)::bigint AS count FROM service_requests WHERE status = 'DOCUMENT_REVIEW'`,
      prisma.$queryRaw<{ count: bigint }[]>`SELECT COUNT(*)::bigint AS count FROM service_requests WHERE status = 'PROCESSING'`,
      prisma.$queryRaw<{ count: bigint }[]>`SELECT COUNT(*)::bigint AS count FROM service_requests WHERE status = 'APPROVED'`,
      prisma.$queryRaw<{ count: bigint }[]>`SELECT COUNT(*)::bigint AS count FROM service_requests WHERE status = 'DONE'`,
    ]);

    const total = Number(totalRows[0]?.count ?? 0);
    return NextResponse.json({
      data: rows.map((row) => serialize(row)),
      meta: { page, perPage, total, totalPages: Math.max(Math.ceil(total / perPage), 1) },
      stats: {
        pending: Number(pending[0]?.count ?? 0),
        needDocuments: Number(needDocuments[0]?.count ?? 0),
        documentReview: Number(documentReview[0]?.count ?? 0),
        processing: Number(processing[0]?.count ?? 0),
        approved: Number(approved[0]?.count ?? 0),
        done: Number(done[0]?.count ?? 0),
      },
    });
  } catch (error) {
    console.error("GET_SERVICE_REQUESTS_ERROR", error);
    return NextResponse.json({ message: "Gagal mengambil data layanan" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureServiceRequestsReady();
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: "Silakan login terlebih dahulu" }, { status: 401 });
    }

    if (user.status !== "VERIFIED") {
      return NextResponse.json(
        { message: "Akun Anda masih menunggu verifikasi admin" },
        { status: 403 }
      );
    }

    const body = (await request.json()) as RequestInput;
    const serviceType = text(body.serviceType);
    const applicantName = user.name;
    const nik = user.nik;

    if (!serviceType || !applicantName || !nik) {
      return NextResponse.json({ message: "Jenis layanan, nama, dan NIK wajib diisi" }, { status: 400 });
    }

    const rows = await prisma.$queryRaw<ServiceRequestRow[]>`
      INSERT INTO service_requests (tracking_number, service_type, applicant_name, nik, phone, address, notes)
      VALUES (${trackingNumber()}, ${serviceType}, ${applicantName}, ${nik}, ${optional(body.phone)}, ${optional(body.address)}, ${optional(body.notes)})
      RETURNING id, tracking_number, service_type, applicant_name, nik, phone, address, notes, status, admin_note, document_note, rejection_reason, completed_at, created_at, updated_at
    `;

    return NextResponse.json(serialize(rows[0]), { status: 201 });
  } catch (error) {
    console.error("CREATE_SERVICE_REQUEST_ERROR", error);
    return NextResponse.json({ message: "Gagal membuat pengajuan layanan" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await ensureServiceRequestsReady();
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Akses dashboard membutuhkan akun admin" }, { status: 403 });
    }

    const body = (await request.json()) as RequestInput & { id?: number };
    const id = Number(body.id);

    if (!id) {
      return NextResponse.json({ message: "ID pengajuan wajib diisi" }, { status: 400 });
    }

    const rows = await prisma.$queryRaw<ServiceRequestRow[]>`
      UPDATE service_requests
      SET
        status = ${status(body.status)},
        admin_note = ${optional(body.adminNote)},
        document_note = ${optional(body.documentNote)},
        rejection_reason = ${optional(body.rejectionReason)},
        completed_at = CASE WHEN ${status(body.status)} = 'DONE' THEN COALESCE(completed_at, NOW()) ELSE completed_at END,
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, tracking_number, service_type, applicant_name, nik, phone, address, notes, status, admin_note, document_note, rejection_reason, completed_at, created_at, updated_at
    `;

    if (rows.length === 0) {
      return NextResponse.json({ message: "Pengajuan tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(serialize(rows[0]));
  } catch (error) {
    console.error("UPDATE_SERVICE_REQUEST_ERROR", error);
    return NextResponse.json({ message: "Gagal memperbarui pengajuan" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await ensureServiceRequestsReady();
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Akses dashboard membutuhkan akun admin" }, { status: 403 });
    }

    const id = Number(request.nextUrl.searchParams.get("id"));

    if (!id) {
      return NextResponse.json({ message: "ID pengajuan wajib diisi" }, { status: 400 });
    }

    await prisma.$executeRaw`DELETE FROM service_requests WHERE id = ${id}`;
    return NextResponse.json({ deleted: true });
  } catch (error) {
    console.error("DELETE_SERVICE_REQUEST_ERROR", error);
    return NextResponse.json({ message: "Gagal menghapus pengajuan" }, { status: 500 });
  }
}
