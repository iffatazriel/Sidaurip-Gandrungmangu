import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@/lib/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';

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

function parsePageParam(value: string | null, fallback: number) {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function cleanOptional(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function parseOptionalDate(value: string | null | undefined) {
  const cleaned = cleanOptional(value);
  if (!cleaned) return null;

  const parsed = new Date(cleaned);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function toResidentCreateInput(
  resident: ResidentImportInput
): Prisma.ResidentCreateManyInput | null {
  const nama = resident.nama?.trim();
  const nik = resident.nik?.trim();
  const jenisKelamin = resident.jenisKelamin?.trim();
  const alamat = resident.alamat?.trim();

  if (!nama || !nik || !jenisKelamin || !alamat) {
    return null;
  }

  return {
    nama,
    nik,
    jenisKelamin,
    alamat,
    tempatLahir: cleanOptional(resident.tempatLahir),
    tanggalLahir: parseOptionalDate(resident.tanggalLahir),
    agama: cleanOptional(resident.agama),
    rt: cleanOptional(resident.rt),
    rw: cleanOptional(resident.rw),
    dusun: cleanOptional(resident.dusun),
    pekerjaan: cleanOptional(resident.pekerjaan),
    pendidikan: cleanOptional(resident.pendidikan),
    statusKawin: cleanOptional(resident.statusKawin),
    noKK: cleanOptional(resident.noKK),
    status: cleanOptional(resident.status) ?? 'AKTIF',
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parsePageParam(searchParams.get('page'), 1));
    const perPage = Math.min(
      100,
      Math.max(1, parsePageParam(searchParams.get('perPage') ?? searchParams.get('size'), 10))
    );
    const search = searchParams.get('search')?.trim() ?? '';
    const dusun = searchParams.get('dusun')?.trim();
    const status = searchParams.get('status')?.trim();

    const where: Prisma.ResidentWhereInput = {
      ...(search
        ? {
            OR: [
              { nama: { contains: search, mode: 'insensitive' } },
              { nik: { contains: search } },
            ],
          }
        : {}),
      ...(dusun && dusun !== 'ALL' ? { dusun } : {}),
      ...(status && status !== 'ALL' ? { status } : {}),
    };

    const [data, total, active, moved, deceased, totalResidents, dusunRows] = await Promise.all([
      prisma.resident.findMany({
        where,
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: { id: 'asc' },
      }),
      prisma.resident.count({ where }),
      prisma.resident.count({ where: { status: 'AKTIF' } }),
      prisma.resident.count({ where: { status: 'PINDAH' } }),
      prisma.resident.count({ where: { status: 'MENINGGAL' } }),
      prisma.resident.count(),
      prisma.resident.findMany({
        distinct: ['dusun'],
        orderBy: { dusun: 'asc' },
        select: { dusun: true },
        where: { dusun: { not: null } },
      }),
    ]);

    return NextResponse.json({
      data,
      meta: {
        page,
        perPage,
        total,
        totalPages: Math.max(1, Math.ceil(total / perPage)),
        dusunOptions: dusunRows
          .map((row) => row.dusun)
          .filter((option): option is string => Boolean(option)),
      },
      stats: {
        total: totalResidents,
        active,
        moved,
        deceased,
      },
    });
  } catch (error) {
    console.error('Failed to fetch residents:', error);
    return NextResponse.json({ message: 'Gagal mengambil data penduduk' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { residents?: ResidentImportInput[] };
    const residents = Array.isArray(body.residents) ? body.residents : [];
    const data = residents
      .map((resident) => toResidentCreateInput(resident))
      .filter((resident): resident is Prisma.ResidentCreateManyInput => Boolean(resident));

    if (data.length === 0) {
      return NextResponse.json(
        { message: 'Tidak ada data penduduk valid untuk diimport' },
        { status: 400 }
      );
    }

    const result = await prisma.resident.createMany({
      data,
      skipDuplicates: true,
    });

    return NextResponse.json({
      inserted: result.count,
      skipped: residents.length - result.count,
    });
  } catch (error) {
    console.error('Failed to import residents:', error);
    return NextResponse.json({ message: 'Gagal import CSV penduduk' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const id = Number(request.nextUrl.searchParams.get('id'));
    if (!id) {
      return NextResponse.json({ message: 'ID penduduk wajib diisi' }, { status: 400 });
    }

    const existing = await prisma.resident.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ message: 'Penduduk tidak ditemukan' }, { status: 404 });
    }

    await prisma.resident.delete({ where: { id } });

    await logAudit(
      user.id,
      user.name,
      'DELETE',
      'RESIDENT',
      id,
      existing.nama,
      { nama: existing.nama, nik: existing.nik, status: existing.status },
      null,
      request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip')
    );

    return NextResponse.json({ deleted: true, nama: existing.nama });
  } catch (error) {
    console.error('Failed to delete resident:', error);
    return NextResponse.json({ message: 'Gagal menghapus penduduk' }, { status: 500 });
  }
}
