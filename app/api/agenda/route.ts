import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import {
  ensureAgendaTableReady,
  serializeAgenda,
  type AgendaRow,
  type AgendaStatus,
} from "@/lib/agenda";
import { prisma } from "@/lib/prisma";

type AgendaInput = {
  title?: string;
  category?: string;
  description?: string | null;
  location?: string;
  startAt?: string;
  endAt?: string | null;
  status?: string;
  featured?: boolean;
};

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeOptional(value: unknown) {
  const text = normalizeText(value);
  return text.length > 0 ? text : null;
}

function normalizeStatus(value: unknown): AgendaStatus {
  const status = normalizeText(value).toUpperCase();
  if (status === "PUBLISHED" || status === "CANCELLED") {
    return status;
  }
  return "DRAFT";
}

function parseDate(value: unknown) {
  const text = normalizeText(value);
  if (!text) return null;

  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? null : date;
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
    await ensureAgendaTableReady();

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
        `(title ILIKE $${values.length} OR location ILIKE $${values.length})`
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
      `SELECT COUNT(*)::bigint AS count FROM village_agendas ${whereSql}`,
      ...values
    );

    values.push(perPage, (page - 1) * perPage);
    const agendas = await prisma.$queryRawUnsafe<AgendaRow[]>(
      `SELECT id, title, category, description, location, start_at, end_at, status, featured, created_at, updated_at
       FROM village_agendas
       ${whereSql}
       ORDER BY start_at ASC
       LIMIT $${values.length - 1} OFFSET $${values.length}`,
      ...values
    );

    const [allCount, publishedCount, draftCount, upcomingCount, categoryRows] =
      await prisma.$transaction([
        prisma.$queryRaw<{ count: bigint }[]>`
          SELECT COUNT(*)::bigint AS count FROM village_agendas
        `,
        prisma.$queryRaw<{ count: bigint }[]>`
          SELECT COUNT(*)::bigint AS count FROM village_agendas WHERE status = 'PUBLISHED'
        `,
        prisma.$queryRaw<{ count: bigint }[]>`
          SELECT COUNT(*)::bigint AS count FROM village_agendas WHERE status = 'DRAFT'
        `,
        prisma.$queryRaw<{ count: bigint }[]>`
          SELECT COUNT(*)::bigint AS count FROM village_agendas
          WHERE status = 'PUBLISHED' AND start_at >= NOW()
        `,
        prisma.$queryRaw<{ category: string }[]>`
          SELECT DISTINCT category FROM village_agendas ORDER BY category ASC
        `,
      ]);

    const total = Number(totalRows[0]?.count ?? 0);

    return NextResponse.json({
      data: agendas.map(serializeAgenda),
      meta: {
        page,
        perPage,
        total,
        totalPages: Math.max(Math.ceil(total / perPage), 1),
        categories: categoryRows.map((row) => row.category),
      },
      stats: {
        total: Number(allCount[0]?.count ?? 0),
        published: Number(publishedCount[0]?.count ?? 0),
        drafts: Number(draftCount[0]?.count ?? 0),
        upcoming: Number(upcomingCount[0]?.count ?? 0),
      },
    });
  } catch (error) {
    console.error("GET_AGENDAS_ERROR", error);

    return NextResponse.json(
      { message: "Gagal mengambil data agenda" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureAgendaTableReady();
    const unauthorized = await requireAdminRequest();
    if (unauthorized) return unauthorized;

    const body = (await request.json()) as AgendaInput;
    const title = normalizeText(body.title);
    const category = normalizeText(body.category) || "Umum";
    const location = normalizeText(body.location);
    const startAt = parseDate(body.startAt);
    const endAt = parseDate(body.endAt);
    const status = normalizeStatus(body.status);

    if (!title || !location || !startAt) {
      return NextResponse.json(
        { message: "Judul, lokasi, dan waktu mulai agenda wajib diisi" },
        { status: 400 }
      );
    }

    const rows = await prisma.$queryRaw<AgendaRow[]>`
      INSERT INTO village_agendas (
        title, category, description, location, start_at, end_at, status, featured
      )
      VALUES (
        ${title},
        ${category},
        ${normalizeOptional(body.description)},
        ${location},
        ${startAt},
        ${endAt},
        ${status},
        ${body.featured ?? true}
      )
      RETURNING id, title, category, description, location, start_at, end_at, status, featured, created_at, updated_at
    `;

    return NextResponse.json(serializeAgenda(rows[0]), { status: 201 });
  } catch (error) {
    console.error("CREATE_AGENDA_ERROR", error);

    return NextResponse.json(
      { message: "Gagal membuat agenda" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await ensureAgendaTableReady();
    const unauthorized = await requireAdminRequest();
    if (unauthorized) return unauthorized;

    const body = (await request.json()) as AgendaInput & { id?: number };
    const id = Number(body.id);
    const title = normalizeText(body.title);
    const category = normalizeText(body.category) || "Umum";
    const location = normalizeText(body.location);
    const startAt = parseDate(body.startAt);
    const endAt = parseDate(body.endAt);
    const status = normalizeStatus(body.status);

    if (!id || !title || !location || !startAt) {
      return NextResponse.json(
        { message: "ID, judul, lokasi, dan waktu mulai agenda wajib diisi" },
        { status: 400 }
      );
    }

    const rows = await prisma.$queryRaw<AgendaRow[]>`
      UPDATE village_agendas
      SET
        title = ${title},
        category = ${category},
        description = ${normalizeOptional(body.description)},
        location = ${location},
        start_at = ${startAt},
        end_at = ${endAt},
        status = ${status},
        featured = ${body.featured ?? true},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, title, category, description, location, start_at, end_at, status, featured, created_at, updated_at
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Agenda tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(serializeAgenda(rows[0]));
  } catch (error) {
    console.error("UPDATE_AGENDA_ERROR", error);

    return NextResponse.json(
      { message: "Gagal memperbarui agenda" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await ensureAgendaTableReady();
    const unauthorized = await requireAdminRequest();
    if (unauthorized) return unauthorized;

    const body = (await request.json()) as {
      id?: number;
      status?: string;
      featured?: boolean;
    };
    const id = Number(body.id);

    if (!id) {
      return NextResponse.json(
        { message: "ID agenda wajib diisi" },
        { status: 400 }
      );
    }

    const rows = await prisma.$queryRaw<AgendaRow[]>`
      UPDATE village_agendas
      SET
        status = ${normalizeStatus(body.status)},
        featured = COALESCE(${body.featured ?? null}, featured),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, title, category, description, location, start_at, end_at, status, featured, created_at, updated_at
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Agenda tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(serializeAgenda(rows[0]));
  } catch (error) {
    console.error("PATCH_AGENDA_ERROR", error);

    return NextResponse.json(
      { message: "Gagal mengubah status agenda" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await ensureAgendaTableReady();
    const unauthorized = await requireAdminRequest();
    if (unauthorized) return unauthorized;

    const id = Number(request.nextUrl.searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        { message: "ID agenda wajib diisi" },
        { status: 400 }
      );
    }

    await prisma.$executeRaw`DELETE FROM village_agendas WHERE id = ${id}`;

    return NextResponse.json({ deleted: true });
  } catch (error) {
    console.error("DELETE_AGENDA_ERROR", error);

    return NextResponse.json(
      { message: "Gagal menghapus agenda" },
      { status: 500 }
    );
  }
}
