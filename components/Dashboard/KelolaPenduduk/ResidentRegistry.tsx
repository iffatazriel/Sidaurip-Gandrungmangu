'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import ContextualInfo from './ContextualInfo';
import FiltersArea from './FiltersArea';
import ManagementTools from './ManagementTools';
import ResidentFormModal, { type ResidentForm } from './ResidentFormModal';
import ResidentTable from './ResidentTable';
import ResidentViewModal from './ResidentViewModal';
import StatisticsHeader from './StatisticsHeader';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import type { ResidentImportInput, ResidentsResponse, ResidentStats } from './types';

const emptyStats: ResidentStats = {
  total: 0,
  active: 0,
  moved: 0,
  deceased: 0,
};

const initialResponse: ResidentsResponse = {
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

type ResidentsApiResponse = Partial<ResidentsResponse> & {
  page?: number;
  size?: number;
  total?: number;
  totalPages?: number;
};

function normalizeResidentsResponse(data: ResidentsApiResponse): ResidentsResponse {
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

const headerAliases: Record<keyof ResidentImportInput, string[]> = {
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

function parseCsvLine(line: string) {
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

function parseResidentCsv(csvText: string): ResidentImportInput[] {
  const lines = csvText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .filter((line) => line.trim().length > 0);

  if (lines.length < 2) {
    return [];
  }

  const headers = parseCsvLine(lines[0]).map((header) => header.toLowerCase().trim());

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row: Partial<ResidentImportInput> = {};

    Object.entries(headerAliases).forEach(([field, aliases]) => {
      const index = headers.findIndex((header) => aliases.includes(header));
      if (index >= 0) {
        const value = values[index]?.trim();
        if (value) {
          row[field as keyof ResidentImportInput] = value;
        }
      }
    });

    return row as ResidentImportInput;
  });
}

export default function ResidentRegistry() {
  const [response, setResponse] = useState<ResidentsResponse>(initialResponse);
  const [search, setSearch] = useState('');
  const [dusun, setDusun] = useState('ALL');
  const [status, setStatus] = useState('ALL');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedResident, setSelectedResident] = useState<typeof response.data[0] | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<typeof response.data[0] | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [form, setForm] = useState<ResidentForm>({
    nama: '',
    nik: '',
    jenisKelamin: '',
    tempatLahir: '',
    tanggalLahir: '',
    agama: '',
    alamat: '',
    rt: '',
    rw: '',
    dusun: '',
    pekerjaan: '',
    pendidikan: '',
    statusKawin: '',
    noKK: '',
    status: 'AKTIF',
  });

  const queryString = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      perPage: '10',
    });

    if (search.trim()) {
      params.set('search', search.trim());
    }
    if (dusun !== 'ALL') {
      params.set('dusun', dusun);
    }
    if (status !== 'ALL') {
      params.set('status', status);
    }

    return params.toString();
  }, [dusun, page, search, status]);

  const loadResidents = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetch(`/api/penduduk?${queryString}`, {
        cache: 'no-store',
      });

      if (!result.ok) {
        throw new Error('Gagal mengambil data penduduk');
      }

      const data = (await result.json()) as ResidentsApiResponse;
      setResponse(normalizeResidentsResponse(data));
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Gagal mengambil data penduduk');
    } finally {
      setIsLoading(false);
    }
  }, [queryString]);

  useEffect(() => {
    // Data is loaded from the API whenever query parameters change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadResidents();
  }, [loadResidents]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleDusunChange = (value: string) => {
    setDusun(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const handleCsvImport = async (file: File) => {
    setIsImporting(true);
    setError(null);

    try {
      const csvText = await file.text();
      const residents = parseResidentCsv(csvText);

      if (residents.length === 0) {
        throw new Error('CSV kosong atau format header tidak terbaca');
      }

      const result = await fetch('/api/penduduk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ residents }),
      });

      if (!result.ok) {
        const body = (await result.json()) as { message?: string };
        throw new Error(body.message ?? 'Gagal import CSV penduduk');
      }

      setPage(1);
      await loadResidents();
    } catch (importError) {
      setError(importError instanceof Error ? importError.message : 'Gagal import CSV penduduk');
    } finally {
      setIsImporting(false);
    }
  };

  const handleAddResident = () => {
    setForm({
      nama: '',
      nik: '',
      jenisKelamin: '',
      tempatLahir: '',
      tanggalLahir: '',
      agama: '',
      alamat: '',
      rt: '',
      rw: '',
      dusun: '',
      pekerjaan: '',
      pendidikan: '',
      statusKawin: '',
      noKK: '',
      status: 'AKTIF',
    });
    setIsFormModalOpen(true);
  };

  const handleEditResident = (resident: typeof response.data[0]) => {
    setForm({
      id: resident.id,
      nama: resident.nama,
      nik: resident.nik,
      jenisKelamin: resident.jenisKelamin,
      tempatLahir: resident.tempatLahir || '',
      tanggalLahir: resident.tanggalLahir || '',
      agama: resident.agama || '',
      alamat: resident.alamat,
      rt: resident.rt || '',
      rw: resident.rw || '',
      dusun: resident.dusun || '',
      pekerjaan: resident.pekerjaan || '',
      pendidikan: resident.pendidikan || '',
      statusKawin: resident.statusKawin || '',
      noKK: resident.noKK || '',
      status: resident.status,
    });
    setIsFormModalOpen(true);
  };

  const handleViewResident = (resident: typeof response.data[0]) => {
    setSelectedResident(resident);
    setIsViewModalOpen(true);
  };

  const handleDeleteResident = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/penduduk?id=${deleteTarget.id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? 'Gagal menghapus penduduk');
      }
      setDeleteTarget(null);
      await loadResidents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menghapus penduduk');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFormChange = (field: keyof ResidentForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const method = form.id ? 'PUT' : 'POST';
      const url = form.id ? `/api/penduduk/${form.id}` : '/api/penduduk/single';

      const result = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!result.ok) {
        const body = (await result.json()) as { message?: string };
        throw new Error(body.message ?? 'Gagal menyimpan data penduduk');
      }

      setIsFormModalOpen(false);
      setPage(1);
      await loadResidents();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Gagal menyimpan data penduduk');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-8">
      <StatisticsHeader stats={response.stats} />
      <ManagementTools onImportCsv={handleCsvImport} isImporting={isImporting} onAddResident={handleAddResident} />
      <FiltersArea
        search={search}
        dusun={dusun}
        status={status}
        dusunOptions={response.meta.dusunOptions}
        onSearchChange={handleSearchChange}
        onDusunChange={handleDusunChange}
        onStatusChange={handleStatusChange}
      />
      {error ? (
        <div className="mb-6 rounded-xl bg-error-container px-5 py-4 text-sm font-semibold text-on-error-container">
          {error}
        </div>
      ) : null}
      <ResidentTable
        residents={response.data}
        meta={response.meta}
        isLoading={isLoading}
        onPageChange={setPage}
        onView={handleViewResident}
        onEdit={handleEditResident}
        onDelete={setDeleteTarget}
      />
      <ResidentFormModal
        form={form}
        isOpen={isFormModalOpen}
        isSaving={isSaving}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        onChange={handleFormChange}
      />
      <ResidentViewModal
        resident={selectedResident}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        onEdit={(resident) => {
          handleEditResident(resident);
          setIsViewModalOpen(false);
        }}
      />
      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title="Hapus Penduduk"
        message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.nama}"? Data yang dihapus tidak dapat dikembalikan.`}
        confirmLabel="Ya, Hapus"
        cancelLabel="Batal"
        variant="danger"
        onConfirm={handleDeleteResident}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
      <ContextualInfo />
    </div>
  );
}
