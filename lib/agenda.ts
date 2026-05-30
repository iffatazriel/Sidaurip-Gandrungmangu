import { prisma } from "@/lib/prisma";

export type AgendaStatus = "DRAFT" | "PUBLISHED" | "CANCELLED";

export type AgendaRow = {
  id: number;
  title: string;
  category: string;
  description: string | null;
  location: string;
  start_at: Date;
  end_at: Date | null;
  status: AgendaStatus;
  featured: boolean;
  created_at: Date;
  updated_at: Date;
};

export type PublicAgenda = {
  id: number;
  title: string;
  category: string;
  description: string | null;
  location: string;
  startAt: string;
  endAt: string | null;
  status: AgendaStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

let ensureAgendaTablePromise: Promise<void> | null = null;

export async function ensureAgendaTable() {
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS village_agendas (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      location TEXT NOT NULL,
      start_at TIMESTAMPTZ NOT NULL,
      end_at TIMESTAMPTZ,
      status TEXT NOT NULL DEFAULT 'DRAFT',
      featured BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS village_agendas_title_idx ON village_agendas (title)
  `;
  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS village_agendas_category_idx ON village_agendas (category)
  `;
  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS village_agendas_status_idx ON village_agendas (status)
  `;
  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS village_agendas_start_at_idx ON village_agendas (start_at)
  `;
}

export function ensureAgendaTableReady() {
  ensureAgendaTablePromise ??= ensureAgendaTable();
  return ensureAgendaTablePromise;
}

export function serializeAgenda(row: AgendaRow): PublicAgenda {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description,
    location: row.location,
    startAt: row.start_at.toISOString(),
    endAt: row.end_at?.toISOString() ?? null,
    status: row.status,
    featured: row.featured,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export async function getHomepageAgendas(limit = 3) {
  await ensureAgendaTableReady();

  const rows = await prisma.$queryRaw<AgendaRow[]>`
    SELECT id, title, category, description, location, start_at, end_at, status, featured, created_at, updated_at
    FROM village_agendas
    WHERE status = 'PUBLISHED' AND featured = TRUE AND start_at >= NOW()
    ORDER BY start_at ASC
    LIMIT ${limit}
  `;

  return rows.map(serializeAgenda);
}
