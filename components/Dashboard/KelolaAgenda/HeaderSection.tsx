import type { AgendaStats } from "./types";

type HeaderSectionProps = {
  stats: AgendaStats;
  onNewEntry: () => void;
};

export default function HeaderSection({ stats, onNewEntry }: HeaderSectionProps) {
  return (
    <div className="p-8">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="headline-font mb-2 text-4xl font-extrabold tracking-tight text-primary">
            Agenda Desa
          </h2>
          <p className="font-medium text-on-surface-variant">
            Manage village events, public schedules, and homepage agenda cards.
          </p>
        </div>
        <button
          type="button"
          onClick={onNewEntry}
          className="flex items-center gap-2 rounded-xl bg-primary-container px-6 py-3 font-bold text-on-primary shadow-lg shadow-primary-container/20 transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined">add</span>
          New Agenda
        </button>
      </div>

      <div className="mb-10 grid grid-cols-12 gap-6">
        <div className="col-span-12 grid grid-cols-1 gap-6 md:col-span-8 md:grid-cols-3">
          <div className="rounded-2xl border-l-4 border-primary bg-surface-container-lowest p-6 shadow-sm">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-outline">
              Total Agenda
            </p>
            <h3 className="headline-font text-3xl font-bold text-primary">
              {stats.total.toLocaleString("id-ID")}
            </h3>
          </div>
          <div className="rounded-2xl border-l-4 border-secondary bg-surface-container-lowest p-6 shadow-sm">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-outline">
              Published
            </p>
            <h3 className="headline-font text-3xl font-bold text-secondary">
              {stats.published.toLocaleString("id-ID")}
            </h3>
          </div>
          <div className="rounded-2xl border-l-4 border-tertiary-container bg-surface-container-lowest p-6 shadow-sm">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-outline">
              Drafts
            </p>
            <h3 className="headline-font text-3xl font-bold text-tertiary-container">
              {stats.drafts.toLocaleString("id-ID")}
            </h3>
          </div>
        </div>
        <div className="relative col-span-12 flex items-center justify-between overflow-hidden rounded-2xl bg-primary-container p-6 text-on-primary shadow-xl shadow-blue-900/10 md:col-span-4">
          <div className="z-10">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest opacity-80">
              Upcoming
            </p>
            <h3 className="headline-font text-3xl font-bold">
              {stats.upcoming.toLocaleString("id-ID")}
            </h3>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl opacity-10">
            event_available
          </span>
        </div>
      </div>
    </div>
  );
}
