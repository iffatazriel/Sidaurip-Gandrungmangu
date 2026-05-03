import { residents } from "./data";

export default function ResidentTable() {
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
            {residents.map((resident) => (
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
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${resident.avatarClass}`}
                    >
                      {resident.initials}
                    </div>
                    <span className="text-sm font-bold text-primary">
                      {resident.name}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-on-surface">
                      {resident.dusun}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-on-surface-variant">
                      {resident.rtRw}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${resident.statusClass}`}
                  >
                    {resident.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      className="rounded-lg p-2 text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-600"
                      title="View Details"
                    >
                      <span className="material-symbols-outlined text-xl">
                        visibility
                      </span>
                    </button>
                    <button
                      type="button"
                      className="rounded-lg p-2 text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-600"
                      title="Edit Data"
                    >
                      <span className="material-symbols-outlined text-xl">
                        edit
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
          Showing <span className="text-primary">1-10</span> of 4,829 residents
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded-md p-1 text-slate-400 transition-all hover:bg-white hover:text-primary"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            type="button"
            className="h-8 w-8 rounded-md bg-primary text-xs font-bold text-white shadow-sm"
          >
            1
          </button>
          {[2, 3].map((page) => (
            <button
              key={page}
              type="button"
              className="h-8 w-8 rounded-md text-xs font-bold text-on-surface-variant transition-all hover:bg-white"
            >
              {page}
            </button>
          ))}
          <span className="px-2 text-xs text-slate-400">...</span>
          <button
            type="button"
            className="h-8 w-8 rounded-md text-xs font-bold text-on-surface-variant transition-all hover:bg-white"
          >
            483
          </button>
          <button
            type="button"
            className="rounded-md p-1 text-slate-400 transition-all hover:bg-white hover:text-primary"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
