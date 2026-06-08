'use client';

import type { FormEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { residentFormSchema } from '@/lib/validations';
import { z } from 'zod';

type ResidentForm = {
  id?: number;
  nama: string;
  nik: string;
  jenisKelamin: string;
  tempatLahir: string;
  tanggalLahir: string;
  agama: string;
  alamat: string;
  rt: string;
  rw: string;
  dusun: string;
  pekerjaan: string;
  pendidikan: string;
  statusKawin: string;
  noKK: string;
  status: string;
};

type ResidentFormModalProps = {
  form: ResidentForm;
  isOpen: boolean;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (field: keyof ResidentForm, value: string) => void;
};

export default function ResidentFormModal({
  form,
  isOpen,
  isSaving,
  onClose,
  onSubmit,
  onChange,
}: ResidentFormModalProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      nameInputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
      return;
    }

    if (event.key === 'Tab') {
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
  }, [onClose]);

  const validateField = (field: keyof ResidentForm, value: string) => {
    try {
      const fieldSchema = residentFormSchema.shape[field as keyof typeof residentFormSchema.shape];
      if (fieldSchema) {
        fieldSchema.parse(value);
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [field]: error.issues[0]?.message ?? 'Data tidak valid',
        }));
      }
    }
  };

  const handleChange = (field: keyof ResidentForm, value: string) => {
    onChange(field, value);
    validateField(field, value);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resident-modal-title"
      aria-describedby="resident-modal-description"
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/50 px-4 py-8 backdrop-blur-sm"
    >
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-surface-container-lowest shadow-2xl shadow-blue-950/30">
        <div className="flex items-center justify-between border-b border-surface-container bg-primary-container px-6 py-5 text-on-primary">
          <div>
            <p
              id="resident-modal-description"
              className="text-xs font-bold uppercase tracking-[0.2em] opacity-70"
            >
              Resident Console
            </p>
            <h3 id="resident-modal-title" className="font-headline text-2xl font-extrabold">
              {form.id ? 'Edit Resident' : 'New Resident Entry'}
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

        <form onSubmit={onSubmit} className="max-h-[calc(90vh-88px)] overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="md:col-span-2">
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                Nama Lengkap <span className="text-error">*</span>
              </span>
              <input
                ref={nameInputRef}
                value={form.nama}
                onChange={(event) => handleChange('nama', event.target.value)}
                className={`w-full rounded-xl border ${errors.nama ? 'border-error' : 'border-outline-variant/40'} bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm`}
                placeholder="Nama lengkap penduduk"
                required
              />
              {errors.nama && (
                <p className="mt-1 text-xs font-semibold text-error">{errors.nama}</p>
              )}
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                NIK <span className="text-error">*</span>
              </span>
              <input
                value={form.nik}
                onChange={(event) => handleChange('nik', event.target.value)}
                className={`w-full rounded-xl border ${errors.nik ? 'border-error' : 'border-outline-variant/40'} bg-white px-4 py-3 text-sm font-mono text-primary shadow-sm`}
                placeholder="3201234567890123"
                maxLength={16}
                required
              />
              {errors.nik && <p className="mt-1 text-xs font-semibold text-error">{errors.nik}</p>}
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                Jenis Kelamin <span className="text-error">*</span>
              </span>
              <select
                value={form.jenisKelamin}
                onChange={(event) => onChange('jenisKelamin', event.target.value)}
                className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm"
                required
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="LAKI-LAKI">Laki-laki</option>
                <option value="PEREMPUAN">Perempuan</option>
              </select>
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                Tempat Lahir
              </span>
              <input
                value={form.tempatLahir}
                onChange={(event) => onChange('tempatLahir', event.target.value)}
                className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm"
                placeholder="Kota/Kabupaten"
              />
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                Tanggal Lahir
              </span>
              <input
                type="date"
                value={form.tanggalLahir}
                onChange={(event) => onChange('tanggalLahir', event.target.value)}
                className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm"
              />
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                Agama
              </span>
              <select
                value={form.agama}
                onChange={(event) => onChange('agama', event.target.value)}
                className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm"
              >
                <option value="">Pilih agama</option>
                <option value="ISLAM">Islam</option>
                <option value="KRISTEN">Kristen</option>
                <option value="KATOLIK">Katolik</option>
                <option value="HINDU">Hindu</option>
                <option value="BUDDHA">Buddha</option>
                <option value="KONGHUCU">Konghucu</option>
              </select>
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                Status Kawin
              </span>
              <select
                value={form.statusKawin}
                onChange={(event) => onChange('statusKawin', event.target.value)}
                className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm"
              >
                <option value="">Pilih status</option>
                <option value="BELUM KAWIN">Belum Kawin</option>
                <option value="KAWIN">Kawin</option>
                <option value="CERAI HIDUP">Cerai Hidup</option>
                <option value="CERAI MATI">Cerai Mati</option>
              </select>
            </label>

            <label className="md:col-span-2">
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                Alamat <span className="text-error">*</span>
              </span>
              <input
                value={form.alamat}
                onChange={(event) => handleChange('alamat', event.target.value)}
                className={`w-full rounded-xl border ${errors.alamat ? 'border-error' : 'border-outline-variant/40'} bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm`}
                placeholder="Alamat lengkap"
                required
              />
              {errors.alamat && (
                <p className="mt-1 text-xs font-semibold text-error">{errors.alamat}</p>
              )}
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                Dusun
              </span>
              <input
                value={form.dusun}
                onChange={(event) => onChange('dusun', event.target.value)}
                className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm"
                placeholder="Nama dusun"
              />
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                RT
              </span>
              <input
                value={form.rt}
                onChange={(event) => onChange('rt', event.target.value)}
                className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm"
                placeholder="001"
                maxLength={3}
              />
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                RW
              </span>
              <input
                value={form.rw}
                onChange={(event) => onChange('rw', event.target.value)}
                className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm"
                placeholder="001"
                maxLength={3}
              />
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                Pekerjaan
              </span>
              <input
                value={form.pekerjaan}
                onChange={(event) => onChange('pekerjaan', event.target.value)}
                className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm"
                placeholder="Petani, Wiraswasta, dll"
              />
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                Pendidikan
              </span>
              <select
                value={form.pendidikan}
                onChange={(event) => onChange('pendidikan', event.target.value)}
                className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm"
              >
                <option value="">Pilih pendidikan</option>
                <option value="TIDAK/BELUM SEKOLAH">Tidak/Belum Sekolah</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
                <option value="DIPLOMA">Diploma</option>
                <option value="SARJANA">Sarjana</option>
                <option value="MAGISTER">Magister</option>
                <option value="DOKTOR">Doktor</option>
              </select>
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                No. KK
              </span>
              <input
                value={form.noKK}
                onChange={(event) => onChange('noKK', event.target.value)}
                className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-mono text-primary shadow-sm"
                placeholder="3201234567890123"
                pattern="[0-9]{16}"
                maxLength={16}
              />
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                Status <span className="text-error">*</span>
              </span>
              <select
                value={form.status}
                onChange={(event) => onChange('status', event.target.value)}
                className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm"
                required
              >
                <option value="AKTIF">Aktif</option>
                <option value="PINDAH">Pindah</option>
                <option value="MENINGGAL">Meninggal</option>
              </select>
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-surface-container pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-outline-variant/40 px-5 py-2.5 text-sm font-bold text-on-surface-variant transition-colors hover:bg-surface-container-low"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 rounded-xl bg-primary-container px-5 py-2.5 text-sm font-bold text-on-primary shadow-lg shadow-primary-container/20 transition-transform active:scale-95 disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-lg">save</span>
              {isSaving ? 'Saving...' : 'Save Resident'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export type { ResidentForm };
