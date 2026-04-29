import React from "react";

export default function SummaryCards() {
  return (
    <div className="p-8 space-y-12">
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-tertiary font-bold tracking-widest text-xs uppercase mb-2">
              Morning, Administrator
            </p>
            <h3 className="text-4xl font-headline font-extrabold text-primary tracking-tight">
              Executive Summary
            </h3>
          </div>
          <div className="bg-surface-container-lowest p-1 rounded-lg shadow-sm hidden md:flex items-center">
            <button className="px-4 py-2 bg-primary-container text-on-primary rounded-md text-xs font-bold uppercase tracking-wider">
              Today
            </button>
            <button className="px-4 py-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
              Weekly
            </button>
            <button className="px-4 py-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
              Monthly
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface-container-lowest p-8 rounded-2xl relative overflow-hidden group hover:bg-surface-bright transition-all duration-300">
            <div className="absolute top-0 right-0 p-6 text-primary/10">
              <span
                className="material-symbols-outlined scale-[4]"
                data-icon="newspaper"
              >
                newspaper
              </span>
            </div>
            <div className="relative z-10">
              <p className="text-slate-500 font-medium mb-1">
                Total News Published
              </p>
              <h4 className="text-5xl font-extrabold text-primary mb-4 tracking-tighter">
                1,284
              </h4>
              <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                <span className="material-symbols-outlined text-sm">
                  trending_up
                </span>
                <span>+12.5% vs last month</span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-2xl relative overflow-hidden group hover:bg-surface-bright transition-all duration-300">
            <div className="absolute top-0 right-0 p-6 text-tertiary-container/10">
              <span
                className="material-symbols-outlined scale-[4]"
                data-icon="pending_actions"
              >
                pending_actions
              </span>
            </div>
            <div className="relative z-10">
              <p className="text-slate-500 font-medium mb-1">
                Pending Requests
              </p>
              <h4 className="text-5xl font-extrabold text-primary mb-4 tracking-tighter">
                42
              </h4>
              <div className="flex items-center gap-2 text-error font-bold text-sm">
                <span className="material-symbols-outlined text-sm">timer</span>
                <span>8 require urgent review</span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-2xl relative overflow-hidden group hover:bg-surface-bright transition-all duration-300">
            <div className="absolute top-0 right-0 p-6 text-secondary/10">
              <span
                className="material-symbols-outlined scale-[4]"
                data-icon="assignment_ind"
              >
                assignment_ind
              </span>
            </div>
            <div className="relative z-10">
              <p className="text-slate-500 font-medium mb-1">
                New Citizen Reports
              </p>
              <h4 className="text-5xl font-extrabold text-primary mb-4 tracking-tighter">
                156
              </h4>
              <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                <span className="material-symbols-outlined text-sm">
                  check_circle
                </span>
                <span>92% resolution rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
