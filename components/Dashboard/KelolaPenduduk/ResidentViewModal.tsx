'use client';

import type { Resident } from './types';

type ResidentViewModalProps = {
  resident: Resident | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (resident: Resident) => void;
};

export default function ResidentViewModal({
  resident,
  isOpen,
  onClose,
  onEdit,
}: ResidentViewModalProps) {
  if (!isOpen || !resident) {
    return null;
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getStatusClass = (status: string) => {
    if (status === 'AKTIF') {
      return 'bg-secondary-fixed text-on-secondary-fixed-variant';
    }
    if (status === 'MENINGGAL') {
      return 'bg-error-container text-on-error-container';
    }
    return 'bg-surface-container-high text-on-surface-variant';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/50 px-4 py-8 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-surface-container-lowest shadow-2xl shadow-blue-950/30">
        <div className="flex items-center justify-between border-b border-surface-container bg-primary-container px-6 py-5 text-on-primary">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">
              Resident Details
            </p>
            <h3 className="font-headline text-2xl font-extrabold">
              {resident.nama}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 transition-colors hover:bg-white/10"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="max-h-[calc(90vh-88px)] overflow-y-auto p-6">
          <div className="mb-6 flex items-center justify-between rounded-xl bg-surface-container p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-900">
                {resident.nama
                  .split(' ')
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join('')
                  .toUpperCase()}
              </div>
              <div>
                <h4 className="text-lg font-bold text-primary">{resident.nama}</h4>
                <p className="font-mono text-xs text-on-surface-variant">
                  NIK: {resident.nik}
                </p>
              </div>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider ${getStatusClass(resident.status)}`}
            >
              {resident.status}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-surface-container p-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-outline">
                Jenis Kelamin
              </p>
              <p className="text-sm font-semibold text-primary">
                {resident.jenisKelamin || '-'}
              </p>
            </div>

            <div className="rounded-xl bg-surface-container p-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-outline">
                Tempat, Tanggal Lahir
              </p>
              <p className="text-sm font-semibold text-primary">
                {resident.tempatLahir || '-'}, {formatDate(resident.tanggalLahir)}
              </p>
            </div>

            <div className="rounded-xl bg-surface-container p-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-outline">
                Agama
              </p>
              <p className="text-sm font-semibold text-primary">
                {resident.agama || '-'}
              </p>
            </div>

            <div className="rounded-xl bg-surface-container p-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-outline">
                Status Kawin
              </p>
              <p className="text-sm font-semibold text-primary">
                {resident.statusKawin || '-'}
              </p>
            </div>

            <div className="rounded-xl bg-surface-container p-4 md:col-span-2">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-outline">
                Alamat
              </p>
              <p className="text-sm font-semibold text-primary">
                {resident.alamat}
              </p>
            </div>

            <div className="rounded-xl bg-surface-container p-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-outline">
                Dusun
              </p>
              <p className="text-sm font-semibold text-primary">
                {resident.dusun || '-'}
              </p>
            </div>

            <div className="rounded-xl bg-surface-container p-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-outline">
                RT / RW
              </p>
              <p className="text-sm font-semibold text-primary">
                RT {resident.rt || '-'} / RW {resident.rw || '-'}
              </p>
            </div>

            <div className="rounded-xl bg-surface-container p-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-outline">
                Pekerjaan
              </p>
              <p className="text-sm font-semibold text-primary">
                {resident.pekerjaan || '-'}
              </p>
            </div>

            <div className="rounded-xl bg-surface-container p-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-outline">
                Pendidikan
              </p>
              <p className="text-sm font-semibold text-primary">
                {resident.pendidikan || '-'}
              </p>
            </div>

            <div className="rounded-xl bg-surface-container p-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-outline">
                No. KK
              </p>
              <p className="font-mono text-sm font-semibold text-primary">
                {resident.noKK || '-'}
              </p>
            </div>

            <div className="rounded-xl bg-surface-container p-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-outline">
                Terdaftar Sejak
              </p>
              <p className="text-sm font-semibold text-primary">
                {formatDate(resident.createdAt)}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-surface-container pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-outline-variant/40 px-5 py-2.5 text-sm font-bold text-on-surface-variant transition-colors hover:bg-surface-container-low"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onEdit(resident);
                onClose();
              }}
              className="flex items-center gap-2 rounded-xl bg-primary-container px-5 py-2.5 text-sm font-bold text-on-primary shadow-lg shadow-primary-container/20 transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined text-lg">edit</span>
              Edit Resident
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
