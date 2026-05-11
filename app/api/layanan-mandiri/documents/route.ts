import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { ensureServiceRequestsReady } from "../route";

const uploadDir = path.join(process.cwd(), "public", "uploads", "service-documents");
const maxFileSize = 5 * 1024 * 1024;

type RequestRow = {
  id: number;
  nik: string;
  status: string;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

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

function documentStatus(value: unknown) {
  const normalized = text(value).toUpperCase();
  return ["PENDING", "APPROVED", "REJECTED"].includes(normalized) ? normalized : "PENDING";
}

export async function POST(request: NextRequest) {
  try {
    await ensureServiceRequestsReady();
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: "Silakan login terlebih dahulu" }, { status: 401 });
    }

    const formData = await request.formData();
    const serviceRequestId = Number(formData.get("serviceRequestId"));
    const name = text(formData.get("name")) || "Dokumen pendukung";
    const file = formData.get("file");

    if (!serviceRequestId || !(file instanceof File)) {
      return NextResponse.json({ message: "Dokumen dan ID pengajuan wajib diisi" }, { status: 400 });
    }

    if (file.size > maxFileSize) {
      return NextResponse.json({ message: "Ukuran dokumen maksimal 5MB" }, { status: 400 });
    }

    const requests = await prisma.$queryRaw<RequestRow[]>`
      SELECT id, nik, status
      FROM service_requests
      WHERE id = ${serviceRequestId}
      LIMIT 1
    `;
    const serviceRequest = requests[0];

    if (!serviceRequest) {
      return NextResponse.json({ message: "Pengajuan tidak ditemukan" }, { status: 404 });
    }

    if (serviceRequest.nik !== user.nik && user.role !== "ADMIN") {
      return NextResponse.json({ message: "Anda tidak memiliki akses ke pengajuan ini" }, { status: 403 });
    }

    if (user.role !== "ADMIN" && serviceRequest.status !== "NEED_DOCUMENTS") {
      return NextResponse.json(
        { message: "Dokumen hanya bisa diupload setelah admin meminta dokumen" },
        { status: 400 }
      );
    }

    await mkdir(uploadDir, { recursive: true });

    const bytes = Buffer.from(await file.arrayBuffer());
    const storedFileName = `${Date.now()}-${serviceRequestId}-${safeFileName(file.name)}`;
    const diskPath = path.join(uploadDir, storedFileName);
    const fileUrl = `/uploads/service-documents/${storedFileName}`;

    await writeFile(diskPath, bytes);

    const rows = await prisma.$queryRaw<
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

    await prisma.$executeRaw`
      UPDATE service_requests
      SET status = 'DOCUMENT_REVIEW', updated_at = NOW()
      WHERE id = ${serviceRequestId}
    `;

    const document = rows[0];
    return NextResponse.json(
      {
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
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("UPLOAD_SERVICE_DOCUMENT_ERROR", error);
    return NextResponse.json({ message: "Gagal mengupload dokumen" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await ensureServiceRequestsReady();
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Akses dashboard membutuhkan akun admin" }, { status: 403 });
    }

    const body = (await request.json()) as { id?: number; status?: string; note?: string };
    const id = Number(body.id);

    if (!id) {
      return NextResponse.json({ message: "ID dokumen wajib diisi" }, { status: 400 });
    }

    await prisma.$executeRaw`
      UPDATE service_request_documents
      SET status = ${documentStatus(body.status)}, note = ${text(body.note) || null}, updated_at = NOW()
      WHERE id = ${id}
    `;

    return NextResponse.json({ updated: true });
  } catch (error) {
    console.error("UPDATE_SERVICE_DOCUMENT_ERROR", error);
    return NextResponse.json({ message: "Gagal memperbarui dokumen" }, { status: 500 });
  }
}
