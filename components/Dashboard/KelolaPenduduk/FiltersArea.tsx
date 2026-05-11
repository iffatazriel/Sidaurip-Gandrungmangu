type FiltersAreaProps = {
  search: string;
  dusun: string;
  status: string;
  dusunOptions: string[];
  onSearchChange: (value: string) => void;
  onDusunChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

const statuses = ["AKTIF", "PINDAH", "MENINGGAL"];

export default function FiltersArea({
  search,
  dusun,
  status,
  dusunOptions,
  onSearchChange,
  onDusunChange,
  onStatusChange,
}: FiltersAreaProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl bg-surface-container-low p-2">
      <div className="flex flex-grow items-center gap-4 pl-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
          <span className="material-symbols-outlined text-base">
            filter_list
          </span>
          <span>Filter by:</span>
        </div>
        <select
          className="cursor-pointer border-none bg-transparent text-sm font-medium text-primary focus:ring-0"
          value={dusun}
          onChange={(event) => onDusunChange(event.target.value)}
        >
          <option value="ALL">Semua Dusun</option>
          {dusunOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          className="cursor-pointer border-none bg-transparent text-sm font-medium text-primary focus:ring-0"
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="ALL">Semua Status</option>
          {statuses.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="relative w-full md:w-80">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          search
        </span>
        <input
          className="w-full rounded-xl border-none bg-white py-3 pl-12 pr-4 text-sm shadow-sm placeholder:text-slate-400"
          placeholder="Search by NIK or Name..."
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
    </div>
  );
}
