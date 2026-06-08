import { mkdir, rm, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { ensureServiceRequestsReady } from "../route";
import { ensureNotificationsTable } from "@/lib/notifications";
import { text, documentStatus } from "@/lib/utils";
import { apiSuccess, apiError } from "@/lib/api-response";

const uploadDir = path.join(process.cwd(), "public", "uploads", "service-documents");
const maxFileSize = 5 * 1024 * 1024;

type RequestRow = {
  id: number;
  nik: string;
  status: string;
};

function safeFileName(value: string) {
  const parsed = path.parse(value);
  const baseName = parsed.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  const ext = parsed.ext.toLowerCase().replace(/[^a-z0-9.]/g, "");

  return `${baseName || "dokumen"}${ext || ".bin"}`;
}

export async function POST(request: NextRequest) {
  try {
    await ensureServiceRequestsReady();
    const user = await getCurrentUser();

    if (!user) {
      return apiError("Silakan login terlebih dahulu", 401);
    }

    const formData = await request.formData();
    const serviceRequestId = Number(formData.get("serviceRequestId"));
    const name = text(formData.get("name")) || "Dokumen pendukung";
    const file = formData.get("file");

    if (!serviceRequestId || !(file instanceof File)) {
      return apiError("Dokumen dan ID pengajuan wajib diisi", 400);
    }

    if (file.size > maxFileSize) {
      return apiError("Ukuran dokumen maksimal 5MB", 400);
    }

    const requests = await prisma.$queryRaw<RequestRow[]>`
      SELECT id, nik, status
      FROM service_requests
      WHERE id = ${serviceRequestId}
      LIMIT 1
    `;
    const serviceRequest = requests[0];

    if (!serviceRequest) {
      return apiError("Pengajuan tidak ditemukan", 404);
    }

    if (serviceRequest.nik !== user.nik && user.role !== "ADMIN") {
      return apiError("Anda tidak memiliki akses ke pengajuan ini", 403);
    }

    if (user.role !== "ADMIN" && serviceRequest.status !== "NEED_DOCUMENTS") {
      return apiError("Dokumen hanya bisa diupload setelah admin meminta dokumen", 400);
    }

    await mkdir(uploadDir, { recursive: true });

    const bytes = Buffer.from(await file.arrayBuffer());

    const magic: Record<string, Uint8Array> = {
      "PDF": new Uint8Array([0x25, 0x50, 0x44, 0x46]),
      "PNG": new Uint8Array([0x89, 0x50, 0x4E, 0x47]),
      "JPEG": new Uint8Array([0xFF, 0xD8, 0xFF]),
    };
    const fileSignature = bytes.subarray(0, 4);
    const isValid = Object.values(magic).some((sig) => {
      for (let i = 0; i < sig.length; i++) {
        if (fileSignature[i] !== sig[i]) return false;
      }
      return true;
    });
    if (!isValid) {
      return apiError("File harus berupa PDF, PNG, atau JPEG", 400);
    }

    const storedFileName = `${Date.now()}-${serviceRequestId}-${safeFileName(file.name)}`;
    const diskPath = path.join(uploadDir, storedFileName);
    const fileUrl = `/uploads/service-documents/${storedFileName}`;

    await writeFile(diskPath, bytes);

    let rows;
    try {
      rows = await prisma.$queryRaw<
      {
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
      }[]
    >`
      INSERT INTO service_request_documents (service_request_id, name, file_url, file_name, mime_type, size)
      VALUES (${serviceRequestId}, ${name}, ${fileUrl}, ${file.name}, ${file.type || null}, ${file.size})
      RETURNING id, service_request_id, name, file_url, file_name, mime_type, size, status, note, uploaded_at, updated_at
    `;
    } catch (dbError) {
      await rm(diskPath, { force: true });
      throw dbError;
    }

    await prisma.$executeRaw`
      UPDATE service_requests
      SET status = 'DOCUMENT_REVIEW', updated_at = NOW()
      WHERE id = ${serviceRequestId}
    `;

    const document = rows[0];
    return apiSuccess({
      id: document.id,
      serviceRequestId: document.service_request_id,
      name: document.name,
      fileUrl: document.file_url,
      fileName: document.file_name,
      mimeType: document.mime_type,
      size: document.size,
      status: document.status,
      note: document.note,
      uploadedAt: document.uploaded_at.toISOString(),
      updatedAt: document.updated_at.toISOString(),
    }, 201);
  } catch (error) {
    console.error("UPLOAD_SERVICE_DOCUMENT_ERROR", error);
    return apiError("Gagal mengupload dokumen", 500);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await ensureServiceRequestsReady();
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return apiError("Akses dashboard membutuhkan akun admin", 403);
    }

    const body = (await request.json()) as { id?: number; status?: string; note?: string };
    const id = Number(body.id);

    if (!id) {
      return apiError("ID dokumen wajib diisi", 400);
    }

    const doc = await prisma.$queryRaw<{ service_request_id: number }[]>`
      UPDATE service_request_documents
      SET status = ${documentStatus(body.status)}, note = ${text(body.note) || null}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING service_request_id
    `;

    if (doc.length && documentStatus(body.status) === "REJECTED") {
      await prisma.$executeRaw`
        UPDATE service_requests
        SET status = 'NEED_DOCUMENTS', updated_at = NOW()
        WHERE id = ${doc[0].service_request_id} AND status = 'DOCUMENT_REVIEW'
      `;
    }

    if (doc.length && documentStatus(body.status) === "APPROVED") {
      const remaining = await prisma.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(*)::bigint AS count
        FROM service_request_documents
        WHERE service_request_id = ${doc[0].service_request_id} AND status != 'APPROVED'
      `;
      if (Number(remaining[0]?.count ?? 0) === 0) {
        await prisma.$executeRaw`
          UPDATE service_requests
          SET status = 'PROCESSING', updated_at = NOW()
          WHERE id = ${doc[0].service_request_id} AND status = 'DOCUMENT_REVIEW'
        `;
      }
    }

    if (doc.length) {
      const reqInfo = await prisma.$queryRaw<{ nik: string; service_type: string }[]>`
        SELECT nik, service_type FROM service_requests WHERE id = ${doc[0].service_request_id} LIMIT 1
      `;

      if (reqInfo.length) {
        await ensureNotificationsTable();
        const docStatus = documentStatus(body.status);
        const label = docStatus === "APPROVED" ? "diterima" : "ditolak";

        await prisma.$executeRaw`
          INSERT INTO notifications (user_id, title, message, type, link)
          SELECT id, ${`Dokumen ${label}`}, ${`Dokumen pengajuan ${reqInfo[0].service_type} Anda ${label}`}, 'INFO', ${`/layanan-mandiri`}
          FROM users WHERE nik = ${reqInfo[0].nik}
        `;
      }
    }

    return apiSuccess({ updated: true });
  } catch (error) {
    console.error("UPDATE_SERVICE_DOCUMENT_ERROR", error);
    return apiError("Gagal memperbarui dokumen", 500);
  }
}
