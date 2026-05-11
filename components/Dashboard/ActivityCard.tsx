import Link from "next/link";
import type { DashboardTrend } from "./types";

type ActivityCardProps = {
  trends: DashboardTrend[];
};

const quickActions = [
  {
    title: "Post News",
    description: "Broadcast to all residents",
    href: "/dashboard/kelolaberita",
    icon: "post_add",
    iconClass: "bg-primary-container text-on-primary",
  },
  {
    title: "Update Budget",
    description: "Quarterly financial report",
    href: "/dashboard/transparansi",
    icon: "account_balance_wallet",
    iconClass: "bg-tertiary-container text-on-tertiary",
  },
  {
    title: "Manage Residents",
    description: "Registry data and CSV import",
    href: "/dashboard/kelolapenduduk",
    icon: "manage_accounts",
    iconClass: "bg-secondary-container text-on-secondary-container",
  },
];

export default function ActivityCard({ trends }: ActivityCardProps) {
  const maxValue = Math.max(...trends.map((trend) => trend.value), 1);

  return (
    <div>
      <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="flex min-h-[400px] flex-col rounded-3xl bg-surface-container-low p-8 lg:col-span-8">
          <div className="mb-12 flex items-start justify-between">
            <div>
              <h4 className="mb-1 text-2xl font-bold text-primary">
                Database Activity Trends
              </h4>
              <p className="text-sm text-slate-500">
                Resident and news records over the last 6 months
              </p>
            </div>
            <span className="material-symbols-outlined text-slate-400">
              more_vert
            </span>
          </div>
          <div className="flex min-h-[200px] flex-1 items-end gap-3">
            {trends.map((trend, index) => (
              <div
                key={trend.label}
                className={
                  index === trends.length - 1
                    ? "group relative flex-1 rounded-t-lg bg-primary-container transition-all"
                    : "group relative flex-1 rounded-t-lg bg-primary/20 transition-all hover:bg-primary-container"
                }
                style={{
                  height: `${Math.max((trend.value / maxValue) * 100, 8)}%`,
                }}
              >
                <div
                  className={
                    index === trends.length - 1
                      ? "absolute -top-10 left-1/2 -translate-x-1/2 rounded bg-primary px-2 py-1 text-[10px] text-white opacity-100"
                      : "absolute -top-10 left-1/2 -translate-x-1/2 rounded bg-primary px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100"
                  }
                >
                  {trend.value}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between px-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {trends.map((trend) => (
              <span key={trend.label}>{trend.label}</span>
            ))}
          </div>
        </div>

        <div className="space-y-6 lg:col-span-4">
          <h4 className="px-2 text-xl font-bold text-primary">
            Quick Command Center
          </h4>
          <div className="grid grid-cols-1 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="group flex items-center justify-between rounded-2xl bg-surface-container-lowest p-6 text-left transition-all hover:shadow-xl hover:shadow-blue-900/5 active:scale-95"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.iconClass}`}
                  >
                    <span className="material-symbols-outlined">
                      {action.icon}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-primary">{action.title}</p>
                    <p className="text-xs text-slate-500">
                      {action.description}
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300 transition-transform group-hover:translate-x-1">
                  chevron_right
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
