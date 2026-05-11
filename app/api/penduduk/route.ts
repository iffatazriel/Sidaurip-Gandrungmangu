import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";

type ResidentImportInput = {
  nama?: string;
  nik?: string;
  jenisKelamin?: string;
  alamat?: string;
  tempatLahir?: string | null;
  tanggalLahir?: string | null;
  agama?: string | null;
  rt?: string | null;
  rw?: string | null;
  dusun?: string | null;
  pekerjaan?: string | null;
  pendidikan?: string | null;
  statusKawin?: string | null;
  noKK?: string | null;
  status?: string | null;
};

function normalizeOptional(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function normalizeRequired(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeStatus(value: unknown) {
  const normalized = normalizeRequired(value).toUpperCase();

  if (["PINDAH", "MENINGGAL", "AKTIF"].includes(normalized)) {
    return normalized;
  }

  return "AKTIF";
}

function parseDate(value: unknown) {
  const normalized = normalizeOptional(value);

  if (!normalized) {
    return null;
  }

  const dateParts = normalized.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);

  if (dateParts) {
    const [, day, month, year] = dateParts;
    return new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
  }

  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function serializeResident(resident: {
  tanggalLahir: Date | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    ...resident,
    tanggalLahir: resident.tanggalLahir?.toISOString() ?? null,
    createdAt: resident.createdAt.toISOString(),
    updatedAt: resident.updatedAt.toISOString(),
  };
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
    const unauthorized = await requireAdminRequest();
    if (unauthorized) return unauthorized;

    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(Number(searchParams.get("page") ?? 1), 1);
    const perPage = Math.min(
      Math.max(Number(searchParams.get("perPage") ?? 10), 1),
      50
    );
    const search = searchParams.get("search")?.trim();
    const dusun = searchParams.get("dusun")?.trim();
    const status = searchParams.get("status")?.trim();

    const where = {
      ...(search
        ? {
            OR: [
              { nama: { contains: search } },
              { nik: { contains: search } },
              { noKK: { contains: search } },
            ],
          }
        : {}),
      ...(dusun && dusun !== "ALL" ? { dusun } : {}),
      ...(status && status !== "ALL" ? { status } : {}),
    };

    const [residents, total, totalResidents, active, moved, deceased, dusunRows] =
      await prisma.$transaction([
        prisma.resident.findMany({
          where,
          orderBy: {
            createdAt: "desc",
          },
          skip: (page - 1) * perPage,
          take: perPage,
        }),
        prisma.resident.count({ where }),
        prisma.resident.count(),
        prisma.resident.count({ where: { status: "AKTIF" } }),
        prisma.resident.count({ where: { status: "PINDAH" } }),
        prisma.resident.count({ where: { status: "MENINGGAL" } }),
        prisma.resident.findMany({
          distinct: ["dusun"],
          where: {
            NOT: {
              dusun: null,
            },
          },
          select: {
            dusun: true,
          },
          orderBy: {
            dusun: "asc",
          },
        }),
      ]);

    return NextResponse.json({
      data: residents.map(serializeResident),
      meta: {
        page,
        perPage,
        total,
        totalPages: Math.max(Math.ceil(total / perPage), 1),
        dusunOptions: dusunRows
          .map((row) => row.dusun)
          .filter((value): value is string => Boolean(value)),
      },
      stats: {
        total: totalResidents,
        active,
        moved,
        deceased,
      },
    });
  } catch (error) {
    console.error("GET_RESIDENTS_ERROR", error);

    return NextResponse.json(
      { message: "Gagal mengambil data penduduk" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const unauthorized = await requireAdminRequest();
    if (unauthorized) return unauthorized;

    const body = (await request.json()) as { residents?: ResidentImportInput[] };
    const residents = Array.isArray(body.residents) ? body.residents : [];

    const validResidents = residents
      .map((resident) => ({
        nama: normalizeRequired(resident.nama),
        nik: normalizeRequired(resident.nik),
        jenisKelamin: normalizeRequired(resident.jenisKelamin) || "-",
        alamat: normalizeRequired(resident.alamat) || "-",
        tempatLahir: normalizeOptional(resident.tempatLahir),
        tanggalLahir: parseDate(resident.tanggalLahir),
        agama: normalizeOptional(resident.agama),
        rt: normalizeOptional(resident.rt),
        rw: normalizeOptional(resident.rw),
        dusun: normalizeOptional(resident.dusun),
        pekerjaan: normalizeOptional(resident.pekerjaan),
        pendidikan: normalizeOptional(resident.pendidikan),
        statusKawin: normalizeOptional(resident.statusKawin),
        noKK: normalizeOptional(resident.noKK),
        status: normalizeStatus(resident.status),
      }))
      .filter((resident) => resident.nama && resident.nik);

    if (validResidents.length === 0) {
      return NextResponse.json(
        { message: "Tidak ada data penduduk valid untuk diimport" },
        { status: 400 }
      );
    }

    await prisma.$transaction(
      validResidents.map((resident) =>
        prisma.resident.upsert({
          where: {
            nik: resident.nik,
          },
          update: resident,
          create: resident,
        })
      )
    );

    return NextResponse.json({
      imported: validResidents.length,
      skipped: residents.length - validResidents.length,
    });
  } catch (error) {
    console.error("IMPORT_RESIDENTS_ERROR", error);

    return NextResponse.json(
      { message: "Gagal import data penduduk" },
      { status: 500 }
    );
  }
}
