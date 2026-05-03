export default function FiltersArea() {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl bg-surface-container-low p-2">
      <div className="flex flex-grow items-center gap-4 pl-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
          <span className="material-symbols-outlined text-base">
            filter_list
          </span>
          <span>Filter by:</span>
        </div>
        <select className="cursor-pointer border-none bg-transparent text-sm font-medium text-primary focus:ring-0">
          <option>All Dusun (Neighborhoods)</option>
          <option>Dusun Krajan</option>
          <option>Dusun Mulyo</option>
          <option>Dusun Rejo</option>
        </select>
        <select className="cursor-pointer border-none bg-transparent text-sm font-medium text-primary focus:ring-0">
          <option>All Status</option>
          <option>Active</option>
          <option>Moved</option>
          <option>Deceased</option>
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
        />
      </div>
    </div>
  );
}
