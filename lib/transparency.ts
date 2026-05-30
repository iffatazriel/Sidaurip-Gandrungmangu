import { prisma } from "@/lib/prisma";

export type TransparencyStatus = "DRAFT" | "PUBLISHED";

export type TransparencyRow = {
  id: number;
  activity: string;
  category: string;
  budget: number;
  realized: number;
  note: string | null;
  status: TransparencyStatus;
  created_at: Date;
  updated_at: Date;
};

export type TransparencyRecord = {
  id: number;
  activity: string;
  category: string;
  budget: number;
  realized: number;
  note: string | null;
  status: TransparencyStatus;
  createdAt: string;
  updatedAt: string;
};

export type TransparencySummary = {
  totalBudget: number;
  totalRealized: number;
  realizationRate: number;
  totalRecords: number;
  publishedRecords: number;
};

export const defaultTransparencyRecords = [
  {
    activity: "Penyelenggaraan Pemerintahan",
    category: "Pemerintahan",
    budget: 1250000000,
    realized: 920000000,
    note: "Gaji & Ops Kantor",
    status: "PUBLISHED" as const,
  },
  {
    activity: "Pembangunan Desa",
    category: "Infrastruktur",
    budget: 2100000000,
    realized: 1450000000,
    note: "Fisik & Infrastruktur",
    status: "PUBLISHED" as const,
  },
  {
    activity: "Pembinaan Kemasyarakatan",
    category: "Pembinaan",
    budget: 680000000,
    realized: 410000000,
    note: "Pelatihan UMKM",
    status: "PUBLISHED" as const,
  },
  {
    activity: "Pemberdayaan Masyarakat",
    category: "Pemberdayaan",
    budget: 450000000,
    realized: 280000000,
    note: "Ketahanan Pangan",
    status: "PUBLISHED" as const,
  },
  {
    activity: "Penanggulangan Bencana",
    category: "Bencana",
    budget: 340000000,
    realized: 90000000,
    note: "Dana Darurat",
    status: "PUBLISHED" as const,
  },
];

let ensureTransparencyTablePromise: Promise<void> | null = null;

export async function ensureTransparencyTable() {
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS transparency_records (
      id SERIAL PRIMARY KEY,
      activity TEXT NOT NULL,
      category TEXT NOT NULL,
      budget BIGINT NOT NULL DEFAULT 0,
      realized BIGINT NOT NULL DEFAULT 0,
      note TEXT,
      status TEXT NOT NULL DEFAULT 'DRAFT',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS transparency_records_activity_idx ON transparency_records (activity)
  `;
  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS transparency_records_category_idx ON transparency_records (category)
  `;
  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS transparency_records_status_idx ON transparency_records (status)
  `;

  const countRows = await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*)::bigint AS count FROM transparency_records
  `;

  if (Number(countRows[0]?.count ?? 0) === 0) {
    for (const record of defaultTransparencyRecords) {
      await prisma.$executeRaw`
        INSERT INTO transparency_records (activity, category, budget, realized, note, status)
        VALUES (
          ${record.activity},
          ${record.category},
          ${record.budget},
          ${record.realized},
          ${record.note},
          ${record.status}
        )
      `;
    }
  }
}

export function ensureTransparencyTableReady() {
  ensureTransparencyTablePromise ??= ensureTransparencyTable();
  return ensureTransparencyTablePromise;
}

export function serializeTransparencyRecord(
  row: TransparencyRow
): TransparencyRecord {
  return {
    id: row.id,
    activity: row.activity,
    category: row.category,
    budget: Number(row.budget),
    realized: Number(row.realized),
    note: row.note,
    status: row.status,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export function calculateTransparencySummary(
  records: Pick<TransparencyRecord, "budget" | "realized" | "status">[]
): TransparencySummary {
  const totalBudget = records.reduce((sum, record) => sum + record.budget, 0);
  const totalRealized = records.reduce((sum, record) => sum + record.realized, 0);

  return {
    totalBudget,
    totalRealized,
    realizationRate:
      totalBudget === 0 ? 0 : Math.round((totalRealized / totalBudget) * 1000) / 10,
    totalRecords: records.length,
    publishedRecords: records.filter((record) => record.status === "PUBLISHED")
      .length,
  };
}

export async function getPublishedTransparencyRecords() {
  await ensureTransparencyTableReady();

  const rows = await prisma.$queryRaw<TransparencyRow[]>`
    SELECT id, activity, category, budget, realized, note, status, created_at, updated_at
    FROM transparency_records
    WHERE status = 'PUBLISHED'
    ORDER BY id ASC
  `;

  return rows.map(serializeTransparencyRecord);
}
