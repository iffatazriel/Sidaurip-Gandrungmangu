import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { ensureServiceRequestsReady } from "@/app/api/layanan-mandiri/route";
import { apiSuccess, apiError } from "@/lib/api-response";

type KbRow = {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
};

export async function GET(request: NextRequest) {
  try {
    await ensureServiceRequestsReady();
    const params = request.nextUrl.searchParams;
    const category = params.get("category");
    const search = params.get("q");
    const publishedOnly = params.get("published") !== "false";

    let sql = `SELECT id, title, content, category, tags, is_published, created_at, updated_at FROM knowledge_base WHERE 1=1`;
    const values: unknown[] = [];
    let idx = 0;

    if (publishedOnly) {
      idx++; sql += ` AND is_published = $${idx}`; values.push(true);
    }
    if (category) {
      idx++; sql += ` AND category = $${idx}`; values.push(category);
    }
    if (search) {
      idx++; sql += ` AND (title ILIKE $${idx} OR content ILIKE $${idx} OR tags ILIKE $${idx})`; values.push(`%${search}%`);
    }
    sql += ` ORDER BY updated_at DESC`;

    const rows = await prisma.$queryRawUnsafe<KbRow[]>(sql, ...values);
    return apiSuccess(rows);
  } catch (error) {
    console.error("GET_KB_ERROR", error);
    return apiError("Gagal mengambil knowledge base", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureServiceRequestsReady();
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") return apiError("Akses ditolak", 403);

    const body = (await request.json()) as { title?: string; content?: string; category?: string; tags?: string };
    const title = (body.title ?? "").trim();
    if (!title) return apiError("Judul wajib diisi", 400);

    await prisma.$executeRaw`
      INSERT INTO knowledge_base (title, content, category, tags)
      VALUES (${title}, ${body.content ?? ""}, ${body.category ?? "umum"}, ${body.tags ?? ""})
    `;

    return apiSuccess({ title }, 201);
  } catch (error) {
    console.error("CREATE_KB_ERROR", error);
    return apiError("Gagal menambah knowledge base", 500);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await ensureServiceRequestsReady();
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") return apiError("Akses ditolak", 403);

    const body = (await request.json()) as {
      id?: number; title?: string; content?: string; category?: string; tags?: string; is_published?: boolean;
    };
    const id = Number(body.id);
    if (!id) return apiError("ID wajib diisi", 400);

    const sets: string[] = [];
    const values: unknown[] = [];
    if (body.title !== undefined) { values.push(body.title); sets.push(`title = $${values.length}`); }
    if (body.content !== undefined) { values.push(body.content); sets.push(`content = $${values.length}`); }
    if (body.category !== undefined) { values.push(body.category); sets.push(`category = $${values.length}`); }
    if (body.tags !== undefined) { values.push(body.tags); sets.push(`tags = $${values.length}`); }
    if (body.is_published !== undefined) { values.push(body.is_published); sets.push(`is_published = $${values.length}`); }
    if (sets.length === 0) return apiError("Tidak ada data yang diubah", 400);

    values.push(id);
    await prisma.$executeRawUnsafe(
      `UPDATE knowledge_base SET ${sets.join(", ")}, updated_at = NOW() WHERE id = $${values.length}`,
      ...values,
    );

    return apiSuccess({ updated: true });
  } catch (error) {
    console.error("UPDATE_KB_ERROR", error);
    return apiError("Gagal memperbarui knowledge base", 500);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await ensureServiceRequestsReady();
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") return apiError("Akses ditolak", 403);

    const id = Number(request.nextUrl.searchParams.get("id"));
    if (!id) return apiError("ID wajib diisi", 400);

    await prisma.$executeRaw`DELETE FROM knowledge_base WHERE id = ${id}`;
    return apiSuccess({ deleted: true });
  } catch (error) {
    console.error("DELETE_KB_ERROR", error);
    return apiError("Gagal menghapus knowledge base", 500);
  }
}
