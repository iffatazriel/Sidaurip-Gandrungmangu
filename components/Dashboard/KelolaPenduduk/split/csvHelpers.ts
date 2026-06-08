import type { ResidentImportInput } from '../types';

export const headerAliases: Record<keyof ResidentImportInput, string[]> = {
  nama: ['nama', 'name', 'nama lengkap', 'full name'],
  nik: ['nik', 'no nik', 'nomor nik'],
  jenisKelamin: ['jenis kelamin', 'jk', 'gender', 'kelamin'],
  alamat: ['alamat', 'address'],
  tempatLahir: ['tempat lahir', 'tempat_lahir', 'birth place'],
  tanggalLahir: ['tanggal lahir', 'tgl lahir', 'tanggal_lahir', 'dob'],
  agama: ['agama', 'religion'],
  rt: ['rt'],
  rw: ['rw'],
  dusun: ['dusun', 'neighborhood'],
  pekerjaan: ['pekerjaan', 'job'],
  pendidikan: ['pendidikan', 'education'],
  statusKawin: ['status kawin', 'status perkawinan', 'status_kawin'],
  noKK: ['no kk', 'nokk', 'nomor kk', 'no_kk'],
  status: ['status'],
};

export function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

export function normalizeResidentsResponse(data: any) {
  const emptyStats = { total: 0, active: 0, moved: 0, deceased: 0 };
  const initialResponse = {
    data: [],
    meta: {
      page: 1,
      perPage: 10,
      total: 0,
      totalPages: 1,
      dusunOptions: [],
    },
    stats: emptyStats,
  };

  return {
    data: Array.isArray(data.data) ? data.data : [],
    meta: {
      page: data.meta?.page ?? data.page ?? initialResponse.meta.page,
      perPage: data.meta?.perPage ?? data.size ?? initialResponse.meta.perPage,
      total: data.meta?.total ?? data.total ?? initialResponse.meta.total,
      totalPages: data.meta?.totalPages ?? data.totalPages ?? initialResponse.meta.totalPages,
      dusunOptions: Array.isArray(data.meta?.dusunOptions) ? data.meta.dusunOptions : [],
    },
    stats: {
      total: data.stats?.total ?? emptyStats.total,
      active: data.stats?.active ?? emptyStats.active,
      moved: data.stats?.moved ?? emptyStats.moved,
      deceased: data.stats?.deceased ?? emptyStats.deceased,
    },
  };
}