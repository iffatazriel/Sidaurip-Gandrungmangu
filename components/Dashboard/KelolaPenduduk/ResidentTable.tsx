import type { Resident, ResidentsResponse } from "./types";
import { Skeleton } from "@/components/ui/Skeleton";

type ResidentTableProps = {
  residents: Resident[];
  meta: ResidentsResponse["meta"];
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onView: (resident: Resident) => void;
  onEdit: (resident: Resident) => void;
  onDelete: (resident: Resident) => void;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getStatusClass(status: string) {
  if (status === "AKTIF") {
    return "bg-secondary-fixed text-on-secondary-fixed-variant";
  }
  if (status === "MENINGGAL") {
    return "bg-error-container text-on-error-container";
  }

  return "bg-surface-container-high text-on-surface-variant";
}

export default function ResidentTable({
  residents,
  meta,
  isLoading,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}: ResidentTableProps) {
  const firstShown = meta.total === 0 ? 0 : (meta.page - 1) * meta.perPage + 1;
  const lastShown = Math.min(meta.page * meta.perPage, meta.total);

  return (
    <div className="overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="border-none px-8 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant/70">
                NIK
              </th>
              <th className="border-none px-8 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant/70">
                Full Name
              </th>
              <th className="border-none px-8 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant/70">
                Address (Dusun/RT/RW)
              </th>
              <th className="border-none px-8 py-5 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant/70">
                Status
              </th>
              <th className="border-none px-8 py-5 text-right text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant/70">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <>
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-8 py-6">
                      <Skeleton className="h-4 w-32" />
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Skeleton className="mb-2 h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </td>
                    <td className="px-8 py-6 text-center">
                      <Skeleton className="mx-auto h-6 w-20 rounded-full" />
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Skeleton className="h-8 w-8 rounded-lg" />
                        <Skeleton className="h-8 w-8 rounded-lg" />
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ) : null}
            {!isLoading && residents.length === 0 ? (
              <tr>
                <td
                  className="px-8 py-10 text-center text-sm font-semibold text-on-surface-variant"
                  colSpan={5}
                >
                  Belum ada data penduduk yang cocok.
                </td>
              </tr>
            ) : null}
            {!isLoading && residents.map((resident) => (
              <tr
                key={resident.nik}
                className="group transition-colors hover:bg-slate-50/50"
              >
                <td className="px-8 py-6">
                  <span className="font-mono text-xs text-on-surface-variant">
                    {resident.nik}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-900">
                      {getInitials(resident.nama)}
                    </div>
                    <span className="text-sm font-bold text-primary">
                      {resident.nama}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-on-surface">
                      {resident.dusun ?? resident.alamat}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-on-surface-variant">
                      RT {resident.rt ?? "-"} / RW {resident.rw ?? "-"}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${getStatusClass(resident.status)}`}
                  >
                    {resident.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onView(resident)}
                      className="rounded-lg p-2 text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-600"
                      title="View Details"
                    >
                      <span className="material-symbols-outlined text-xl">
                        visibility
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(resident)}
                      className="rounded-lg p-2 text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-600"
                      title="Edit Data"
                    >
                      <span className="material-symbols-outlined text-xl">
                        edit
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(resident)}
                      className="rounded-lg p-2 text-slate-400 transition-all hover:bg-red-50 hover:text-error"
                      title="Hapus Data"
                    >
                      <span className="material-symbols-outlined text-xl">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/30 px-8 py-6 md:flex-row md:items-center md:justify-between">
        <span className="text-xs font-semibold text-on-surface-variant">
          Showing{" "}
          <span className="text-primary">
            {firstShown}-{lastShown}
          </span>{" "}
          of {meta.total.toLocaleString("id-ID")} residents
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded-md p-1 text-slate-400 transition-all hover:bg-white hover:text-primary"
            disabled={meta.page <= 1}
            onClick={() => onPageChange(Math.max(1, meta.page - 1))}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            type="button"
            className="h-8 w-8 rounded-md bg-primary text-xs font-bold text-white shadow-sm"
          >
            {meta.page}
          </button>
          {meta.page + 1 <= meta.totalPages ? (
            <button
              type="button"
              className="h-8 w-8 rounded-md text-xs font-bold text-on-surface-variant transition-all hover:bg-white"
              onClick={() => onPageChange(meta.page + 1)}
            >
              {meta.page + 1}
            </button>
          ) : null}
          {meta.page + 2 <= meta.totalPages ? (
            <button
              type="button"
              className="h-8 w-8 rounded-md text-xs font-bold text-on-surface-variant transition-all hover:bg-white"
              onClick={() => onPageChange(meta.page + 2)}
            >
              {meta.page + 2}
            </button>
          ) : null}
          {meta.page + 2 < meta.totalPages ? (
            <span className="px-2 text-xs text-slate-400">...</span>
          ) : null}
          <button
            type="button"
            className="h-8 w-8 rounded-md text-xs font-bold text-on-surface-variant transition-all hover:bg-white"
            onClick={() => onPageChange(meta.totalPages)}
          >
            {meta.totalPages}
          </button>
          <button
            type="button"
            className="rounded-md p-1 text-slate-400 transition-all hover:bg-white hover:text-primary"
            disabled={meta.page >= meta.totalPages}
            onClick={() => onPageChange(Math.min(meta.totalPages, meta.page + 1))}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
