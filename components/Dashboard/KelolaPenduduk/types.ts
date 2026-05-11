export type Resident = {
  id: number;
  nama: string;
  nik: string;
  jenisKelamin: string;
  tempatLahir: string | null;
  tanggalLahir: string | null;
  agama: string | null;
  alamat: string;
  rt: string | null;
  rw: string | null;
  dusun: string | null;
  pekerjaan: string | null;
  pendidikan: string | null;
  statusKawin: string | null;
  noKK: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type ResidentStats = {
  total: number;
  active: number;
  moved: number;
  deceased: number;
};

export type ResidentsResponse = {
  data: Resident[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    dusunOptions: string[];
  };
  stats: ResidentStats;
};

export type ResidentImportInput = {
  nama: string;
  nik: string;
  jenisKelamin: string;
  alamat: string;
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
