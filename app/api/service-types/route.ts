import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { ensureServiceRequestsReady } from "@/app/api/layanan-mandiri/route";
import { apiSuccess, apiError } from "@/lib/api-response";

type ServiceTypeRow = {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  sort_order: number;
};

export async function GET() {
  try {
    await ensureServiceRequestsReady();
    const rows = await prisma.$queryRaw<ServiceTypeRow[]>`
      SELECT id, name, description, is_active, sort_order FROM service_types ORDER BY sort_order ASC, name ASC
    `;
    return apiSuccess(rows);
  } catch (error) {
    console.error("GET_SERVICE_TYPES_ERROR", error);
    return apiError("Gagal mengambil jenis layanan", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureServiceRequestsReady();
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") return apiError("Akses ditolak", 403);

    const body = (await request.json()) as { name?: string; description?: string; sort_order?: number };
    const name = (body.name ?? "").trim();
    if (!name) return apiError("Nama layanan wajib diisi", 400);

    const maxOrder = await prisma.$queryRaw<{ max: number | null }[]>`SELECT MAX(sort_order) AS max FROM service_types`;
    const sortOrder = body.sort_order ?? (maxOrder[0]?.max ?? -1) + 1;

    await prisma.$executeRaw`
      INSERT INTO service_types (name, description, sort_order)
      VALUES (${name}, ${body.description ?? ""}, ${sortOrder})
    `;

    return apiSuccess({ name, description: body.description ?? "", sortOrder }, 201);
  } catch (error) {
    console.error("CREATE_SERVICE_TYPE_ERROR", error);
    return apiError("Gagal menambah jenis layanan", 500);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await ensureServiceRequestsReady();
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") return apiError("Akses ditolak", 403);

    const body = (await request.json()) as { id?: number; name?: string; description?: string; is_active?: boolean; sort_order?: number };
    const id = Number(body.id);
    if (!id) return apiError("ID wajib diisi", 400);

    const sets: string[] = [];
    const values: unknown[] = [];

    if (body.name !== undefined) { values.push(body.name); sets.push(`name = $${values.length}`); }
    if (body.description !== undefined) { values.push(body.description); sets.push(`description = $${values.length}`); }
    if (body.is_active !== undefined) { values.push(body.is_active); sets.push(`is_active = $${values.length}`); }
    if (body.sort_order !== undefined) { values.push(body.sort_order); sets.push(`sort_order = $${values.length}`); }

    if (sets.length === 0) return apiError("Tidak ada data yang diubah", 400);

    values.push(id);
    await prisma.$executeRawUnsafe(
      `UPDATE service_types SET ${sets.join(", ")}, updated_at = NOW() WHERE id = $${values.length}`,
      ...values,
    );

    return apiSuccess({ updated: true });
  } catch (error) {
    console.error("UPDATE_SERVICE_TYPE_ERROR", error);
    return apiError("Gagal memperbarui jenis layanan", 500);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await ensureServiceRequestsReady();
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") return apiError("Akses ditolak", 403);

    const id = Number(request.nextUrl.searchParams.get("id"));
    if (!id) return apiError("ID wajib diisi", 400);

    await prisma.$executeRaw`DELETE FROM service_types WHERE id = ${id}`;
    return apiSuccess({ deleted: true });
  } catch (error) {
    console.error("DELETE_SERVICE_TYPE_ERROR", error);
    return apiError("Gagal menghapus jenis layanan", 500);
  }
}
