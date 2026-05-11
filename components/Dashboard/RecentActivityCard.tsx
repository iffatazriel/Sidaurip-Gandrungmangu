import Link from "next/link";
import type { DashboardActivity } from "./types";

type RecentActivityCardProps = {
  activities: DashboardActivity[];
};

function getToneClass(tone: DashboardActivity["tone"]) {
  if (tone === "success") {
    return "bg-secondary-fixed text-on-secondary-fixed";
  }
  if (tone === "warning") {
    return "bg-error-container text-on-error-container";
  }
  if (tone === "info") {
    return "bg-secondary-container text-on-secondary-container";
  }

  return "bg-surface-container-highest text-on-surface-variant";
}

function getIconClass(tone: DashboardActivity["tone"]) {
  if (tone === "success") {
    return "text-primary-container";
  }
  if (tone === "warning") {
    return "text-tertiary-container";
  }
  if (tone === "info") {
    return "text-blue-500";
  }

  return "text-on-surface-variant";
}

export default function RecentActivityCard({
  activities,
}: RecentActivityCardProps) {
  return (
    <div>
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h4 className="font-headline text-2xl font-extrabold tracking-tight text-primary">
            Recent Activity Feed
          </h4>
          <Link
            href="/dashboard/kelolaberita"
            className="text-sm font-bold text-blue-900 hover:underline"
          >
            View All Records
          </Link>
        </div>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="rounded-2xl bg-surface-container-lowest p-6 text-center text-sm font-semibold text-on-surface-variant">
              Belum ada aktivitas database.
            </div>
          ) : null}
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="group flex flex-col gap-4 rounded-2xl bg-surface-container-lowest p-5 transition-colors hover:bg-surface-bright md:flex-row md:items-center md:gap-6"
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-surface-container-low ${getIconClass(activity.tone)}`}
              >
                <span className="material-symbols-outlined">
                  {activity.icon}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex flex-col justify-between gap-1 md:flex-row md:items-start">
                  <h5 className="font-bold text-primary">{activity.title}</h5>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {activity.time}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {activity.description}
                </p>
              </div>
              <div
                className={`self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-tighter md:self-auto ${getToneClass(activity.tone)}`}
              >
                {activity.status}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
