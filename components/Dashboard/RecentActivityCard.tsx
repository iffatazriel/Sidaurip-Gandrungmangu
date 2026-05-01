import React from "react";

export default function RecentActivityCard() {
  return (
    <div>
      <section>
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-2xl font-headline font-extrabold text-primary tracking-tight">
            Recent Activity Feed
          </h4>
          <button className="text-blue-900 font-bold text-sm hover:underline">
            View All Records
          </button>
        </div>
        <div className="space-y-4">
          <div className="bg-surface-container-lowest p-5 rounded-2xl flex items-center gap-6 group hover:bg-surface-bright transition-colors">
            <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-primary-container shrink-0">
              <span className="material-symbols-outlined">description</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h5 className="font-bold text-primary">
                  Building Permit Approved: WP-0932
                </h5>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  12 mins ago
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Requested by{" "}
                <span className="text-primary font-medium">Budi Santoso</span>{" "}
                for residential extension in Sector 4.
              </p>
            </div>
            <div className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold rounded-full uppercase tracking-tighter">
              Approved
            </div>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-2xl flex items-center gap-6 group hover:bg-surface-bright transition-colors">
            <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-tertiary-container shrink-0">
              <span className="material-symbols-outlined">report_problem</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h5 className="font-bold text-primary">
                  New Infrastructure Report: Water Main Leak
                </h5>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  45 mins ago
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                High-priority alert near the Village Central Market. Field team
                dispatched.
              </p>
            </div>
            <div className="px-3 py-1 bg-error-container text-on-error-container text-[10px] font-bold rounded-full uppercase tracking-tighter">
              Urgent
            </div>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-2xl flex items-center gap-6 group hover:bg-surface-bright transition-colors">
            <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-blue-500 shrink-0">
              <span className="material-symbols-outlined">campaign</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h5 className="font-bold text-primary">
                  Public Announcement Drafted
                </h5>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  2 hours ago
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                "Village Cultural Festival 2024" scheduled for next month.
                Pending mayor signature.
              </p>
            </div>
            <div className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded-full uppercase tracking-tighter">
              Draft
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
