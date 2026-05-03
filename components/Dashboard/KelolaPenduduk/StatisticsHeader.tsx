import { stats } from "./data";

export default function StatisticsHeader() {
  return (
    <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-xl border-none bg-surface-container-lowest p-8 shadow-sm"
        >
          <div className="relative z-10">
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-on-surface-variant">
              {stat.label}
            </p>
            <h3 className="font-headline text-4xl font-extrabold text-primary">
              {stat.value}
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
