import type { DashboardSummary } from "./types";

type SummaryCardsProps = {
  summary: DashboardSummary;
};

export default function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <div className="space-y-12 p-8">
      <section>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-tertiary">
              Morning, Administrator
            </p>
            <h3 className="font-headline text-4xl font-extrabold tracking-tight text-primary">
              Executive Summary
            </h3>
          </div>
          <div className="hidden items-center rounded-lg bg-surface-container-lowest p-1 shadow-sm md:flex">
            <span className="rounded-md bg-primary-container px-4 py-2 text-xs font-bold uppercase tracking-wider text-on-primary">
              Live
            </span>
            <span className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              Database
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl bg-surface-container-lowest p-8 transition-all duration-300 hover:bg-surface-bright">
            <div className="absolute top-0 right-0 p-6 text-primary/10">
              <span className="material-symbols-outlined scale-[4]">
                newspaper
              </span>
            </div>
            <div className="relative z-10">
              <p className="mb-1 font-medium text-slate-500">Published News</p>
              <h4 className="mb-4 text-5xl font-extrabold tracking-tighter text-primary">
                {summary.publishedNews.toLocaleString("id-ID")}
              </h4>
              <div className="flex items-center gap-2 text-sm font-bold text-secondary">
                <span className="material-symbols-outlined text-sm">
                  trending_up
                </span>
                <span>{summary.draftNews} draft waiting</span>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl bg-surface-container-lowest p-8 transition-all duration-300 hover:bg-surface-bright">
            <div className="absolute top-0 right-0 p-6 text-tertiary-container/10">
              <span className="material-symbols-outlined scale-[4]">
                pending_actions
              </span>
            </div>
            <div className="relative z-10">
              <p className="mb-1 font-medium text-slate-500">Draft News</p>
              <h4 className="mb-4 text-5xl font-extrabold tracking-tighter text-primary">
                {summary.draftNews.toLocaleString("id-ID")}
              </h4>
              <div className="flex items-center gap-2 text-sm font-bold text-error">
                <span className="material-symbols-outlined text-sm">timer</span>
                <span>Need review before publishing</span>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl bg-surface-container-lowest p-8 transition-all duration-300 hover:bg-surface-bright">
            <div className="absolute top-0 right-0 p-6 text-secondary/10">
              <span className="material-symbols-outlined scale-[4]">
                assignment_ind
              </span>
            </div>
            <div className="relative z-10">
              <p className="mb-1 font-medium text-slate-500">
                Citizen Registry
              </p>
              <h4 className="mb-4 text-5xl font-extrabold tracking-tighter text-primary">
                {summary.totalResidents.toLocaleString("id-ID")}
              </h4>
              <div className="flex items-center gap-2 text-sm font-bold text-secondary">
                <span className="material-symbols-outlined text-sm">
                  check_circle
                </span>
                <span>
                  {summary.activeResidents.toLocaleString("id-ID")} active
                  residents
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
