import type { ResidentStats } from "./types";

type StatisticsHeaderProps = {
  stats: ResidentStats;
};

const statCards = [
  {
    label: "Total Penduduk",
    icon: "group",
    detailIcon: "database",
    detail: "Tersimpan di database",
    detailClass: "text-secondary",
    hoverClass: "group-hover:text-blue-50",
    getValue: (stats: ResidentStats) => stats.total,
  },
  {
    label: "Status Aktif",
    icon: "verified_user",
    detailIcon: "check_circle",
    detail: "Warga aktif",
    detailClass: "text-secondary",
    hoverClass: "group-hover:text-emerald-50",
    getValue: (stats: ResidentStats) => stats.active,
  },
  {
    label: "Pindah / Meninggal",
    icon: "analytics",
    detailIcon: "info",
    detail: "Status nonaktif",
    detailClass: "text-error",
    hoverClass: "group-hover:text-red-50",
    getValue: (stats: ResidentStats) => stats.moved + stats.deceased,
  },
];

export default function StatisticsHeader({ stats }: StatisticsHeaderProps) {
  return (
    <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-xl border-none bg-surface-container-lowest p-8 shadow-sm"
        >
          <div className="relative z-10">
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-on-surface-variant">
              {stat.label}
            </p>
            <h3 className="font-headline text-4xl font-extrabold text-primary">
              {stat.getValue(stats).toLocaleString("id-ID")}
            </h3>
            <div
              className={`mt-4 flex items-center gap-2 text-sm font-semibold ${stat.detailClass}`}
            >
              <span className="material-symbols-outlined text-sm">
                {stat.detailIcon}
              </span>
              <span>{stat.detail}</span>
            </div>
          </div>
          <span
            className={`material-symbols-outlined absolute -right-4 -bottom-4 text-8xl text-slate-100 transition-colors ${stat.hoverClass}`}
          >
            {stat.icon}
          </span>
        </div>
      ))}
    </div>
  );
}
