import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  calculateTransparencySummary,
  ensureTransparencyTableReady,
  serializeTransparencyRecord,
  type TransparencyRow,
  type TransparencyStatus,
} from "@/lib/transparency";

type TransparencyInput = {
  id?: number;
  activity?: string;
  category?: string;
  budget?: number | string;
  realized?: number | string;
  note?: string | null;
  status?: string;
};

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeOptional(value: unknown) {
  const text = normalizeText(value);
  return text.length > 0 ? text : null;
}

function normalizeMoney(value: unknown) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? Math.max(Math.round(value), 0) : 0;
  }

  const text = normalizeText(value).replace(/[^\d]/g, "");
  return text ? Number(text) : 0;
}

function normalizeStatus(value: unknown): TransparencyStatus {
  return normalizeText(value).toUpperCase() === "PUBLISHED"
    ? "PUBLISHED"
    : "DRAFT";
}

async function requireAdminRequest() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Akses dashboard membutuhkan akun admin" },
      { status: 403 }
    );
  }

  return null;
}

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';
    const rateCheck = checkRateLimit(`api:transparansi:${ip}`);

    if (!rateCheck.allowed) {
      const waitMinutes = Math.ceil((rateCheck.resetAt - Date.now()) / 60000);
      return NextResponse.json(
        { message: `Terlalu banyak permintaan. Coba lagi dalam ${waitMinutes} menit` },
        { status: 429 }
      );
    }

    await ensureTransparencyTableReady();

    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(Number(searchParams.get("page") ?? 1), 1);
    const perPage = Math.min(
      Math.max(Number(searchParams.get("perPage") ?? 10), 1),
      50
    );
    const search = normalizeText(searchParams.get("search"));
    const category = normalizeText(searchParams.get("category"));
    const status = normalizeText(searchParams.get("status"));

    const clauses: string[] = [];
    const values: unknown[] = [];

    if (search) {
      values.push(`%${search}%`);
      clauses.push(
        `(activity ILIKE $${values.length} OR note ILIKE $${values.length})`
      );
    }

    if (category && category !== "ALL") {
      values.push(category);
      clauses.push(`category = $${values.length}`);
    }

    if (status && status !== "ALL") {
      values.push(status.toUpperCase());
      clauses.push(`status = $${values.length}`);
    }

    const whereSql = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
    const totalRows = await prisma.$queryRawUnsafe<{ count: bigint }[]>(
      `SELECT COUNT(*)::bigint AS count FROM transparency_records ${whereSql}`,
      ...values
    );

    values.push(perPage, (page - 1) * perPage);
    const rows = await prisma.$queryRawUnsafe<TransparencyRow[]>(
      `SELECT id, activity, category, budget, realized, note, status, created_at, updated_at
       FROM transparency_records
       ${whereSql}
       ORDER BY id ASC
       LIMIT $${values.length - 1} OFFSET $${values.length}`,
      ...values
    );

    const [allRows, categoryRows] = await prisma.$transaction([
      prisma.$queryRaw<TransparencyRow[]>`
        SELECT id, activity, category, budget, realized, note, status, created_at, updated_at
        FROM transparency_records
      `,
      prisma.$queryRaw<{ category: string }[]>`
        SELECT DISTINCT category FROM transparency_records ORDER BY category ASC
      `,
    ]);

    const data = rows.map(serializeTransparencyRecord);
    const allData = allRows.map(serializeTransparencyRecord);
    const total = Number(totalRows[0]?.count ?? 0);

    return NextResponse.json({
      data,
      meta: {
        page,
        perPage,
        total,
        totalPages: Math.max(Math.ceil(total / perPage), 1),
        categories: categoryRows.map((row) => row.category),
      },
      stats: calculateTransparencySummary(allData),
    });
  } catch (error) {
    console.error("GET_TRANSPARENCY_ERROR", error);

    return NextResponse.json(
      { message: "Gagal mengambil data transparansi" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureTransparencyTableReady();
    const unauthorized = await requireAdminRequest();
    if (unauthorized) return unauthorized;

    const body = (await request.json()) as TransparencyInput;
    const activity = normalizeText(body.activity);
    const category = normalizeText(body.category) || "Umum";
    const budget = normalizeMoney(body.budget);
    const realized = normalizeMoney(body.realized);
    const status = normalizeStatus(body.status);

    if (!activity || budget <= 0) {
      return NextResponse.json(
        { message: "Uraian kegiatan dan anggaran wajib diisi" },
        { status: 400 }
      );
    }

    const rows = await prisma.$queryRaw<TransparencyRow[]>`
      INSERT INTO transparency_records (activity, category, budget, realized, note, status)
      VALUES (
        ${activity},
        ${category},
        ${budget},
        ${realized},
        ${normalizeOptional(body.note)},
        ${status}
      )
      RETURNING id, activity, category, budget, realized, note, status, created_at, updated_at
    `;

    return NextResponse.json(serializeTransparencyRecord(rows[0]), {
      status: 201,
    });
  } catch (error) {
    console.error("CREATE_TRANSPARENCY_ERROR", error);

    return NextResponse.json(
      { message: "Gagal membuat data transparansi" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await ensureTransparencyTableReady();
    const unauthorized = await requireAdminRequest();
    if (unauthorized) return unauthorized;

    const body = (await request.json()) as TransparencyInput;
    const id = Number(body.id);
    const activity = normalizeText(body.activity);
    const category = normalizeText(body.category) || "Umum";
    const budget = normalizeMoney(body.budget);
    const realized = normalizeMoney(body.realized);
    const status = normalizeStatus(body.status);

    if (!id || !activity || budget <= 0) {
      return NextResponse.json(
        { message: "ID, uraian kegiatan, dan anggaran wajib diisi" },
        { status: 400 }
      );
    }

    const rows = await prisma.$queryRaw<TransparencyRow[]>`
      UPDATE transparency_records
      SET
        activity = ${activity},
        category = ${category},
        budget = ${budget},
        realized = ${realized},
        note = ${normalizeOptional(body.note)},
        status = ${status},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, activity, category, budget, realized, note, status, created_at, updated_at
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Data transparansi tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(serializeTransparencyRecord(rows[0]));
  } catch (error) {
    console.error("UPDATE_TRANSPARENCY_ERROR", error);

    return NextResponse.json(
      { message: "Gagal memperbarui data transparansi" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await ensureTransparencyTableReady();
    const unauthorized = await requireAdminRequest();
    if (unauthorized) return unauthorized;

    const body = (await request.json()) as { id?: number; status?: string };
    const id = Number(body.id);

    if (!id) {
      return NextResponse.json(
        { message: "ID data transparansi wajib diisi" },
        { status: 400 }
      );
    }

    const rows = await prisma.$queryRaw<TransparencyRow[]>`
      UPDATE transparency_records
      SET status = ${normalizeStatus(body.status)}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, activity, category, budget, realized, note, status, created_at, updated_at
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Data transparansi tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(serializeTransparencyRecord(rows[0]));
  } catch (error) {
    console.error("PATCH_TRANSPARENCY_ERROR", error);

    return NextResponse.json(
      { message: "Gagal mengubah status data transparansi" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await ensureTransparencyTableReady();
    const unauthorized = await requireAdminRequest();
    if (unauthorized) return unauthorized;

    const id = Number(request.nextUrl.searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        { message: "ID data transparansi wajib diisi" },
        { status: 400 }
      );
    }

    await prisma.$executeRaw`DELETE FROM transparency_records WHERE id = ${id}`;

    return NextResponse.json({ deleted: true });
  } catch (error) {
    console.error("DELETE_TRANSPARENCY_ERROR", error);

    return NextResponse.json(
      { message: "Gagal menghapus data transparansi" },
      { status: 500 }
    );
  }
}
