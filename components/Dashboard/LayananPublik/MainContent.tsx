import React from "react";

export default function MainContent() {
  return (
    <section className="p-8 flex flex-col gap-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-tertiary font-bold text-xs uppercase tracking-widest mb-2 block">
            Management Hub
          </span>
          <h1 className="text-4xl font-headline font-extrabold text-primary tracking-tight">
            Public Services (Layanan Publik)
          </h1>
          <p className="text-on-surface-variant mt-2 max-w-2xl">
            Manage administrative procedures, requirements, and monitor citizen
            document submissions in real-time.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-secondary text-white rounded-lg font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all">
            <span className="material-symbols-outlined" data-icon="download">
              download
            </span>
            <span>Reports</span>
          </button>
          <button className="px-6 py-2.5 bg-primary-container text-on-primary rounded-lg font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all">
            <span className="material-symbols-outlined" data-icon="add_circle">
              add_circle
            </span>
            <span>Add Service</span>
          </button>
        </div>
      </div>
      {/* <!-- Bento Grid Stats & Queue --> */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* <!-- Incoming Requests Card --> */}
        <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8 flex flex-col gap-6 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-headline font-bold text-primary">
                Incoming Requests
              </h3>
              <p className="text-sm text-on-surface-variant">
                Active document submissions requiring review
              </p>
            </div>
            <span className="bg-error-container text-on-error-container text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              12 Urgent
            </span>
          </div>
          <div className="space-y-4">
            {/* <!-- Request Item --> */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low hover:bg-surface-bright transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center text-primary-container">
                  <span
                    className="material-symbols-outlined"
                    data-icon="id_card"
                  >
                    id_card
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">
                    KTP Baru (Adult)
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Ahmad Subarjo • 12 mins ago
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="block text-xs font-bold text-secondary">
                    Verification
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    Step 2 of 4
                  </span>
                </div>
                <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                  <span
                    className="material-symbols-outlined"
                    data-icon="chevron_right"
                  >
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
            {/* <!-- Request Item --> */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low hover:bg-surface-bright transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center text-primary-container">
                  <span
                    className="material-symbols-outlined"
                    data-icon="family_history"
                  >
                    family_history
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Pembaruan KK</h4>
                  <p className="text-xs text-on-surface-variant">
                    Siti Aminah • 45 mins ago
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="block text-xs font-bold text-tertiary">
                    Awaiting Docs
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    Step 1 of 3
                  </span>
                </div>
                <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                  <span
                    className="material-symbols-outlined"
                    data-icon="chevron_right"
                  >
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
            {/* <!-- Request Item --> */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low hover:bg-surface-bright transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center text-primary-container">
                  <span
                    className="material-symbols-outlined"
                    data-icon="description"
                  >
                    description
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Surat Domisili</h4>
                  <p className="text-xs text-on-surface-variant">
                    Budi Santoso • 2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="block text-xs font-bold text-blue-600">
                    Printing
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    Step 3 of 3
                  </span>
                </div>
                <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                  <span
                    className="material-symbols-outlined"
                    data-icon="chevron_right"
                  >
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Status Sidebar --> */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-primary-container rounded-xl p-6 text-on-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <h3 className="text-lg font-headline font-bold opacity-80 uppercase tracking-widest text-xs mb-4">
              Daily Performance
            </h3>
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-extrabold">94%</span>
              <span className="text-xs opacity-70">
                Efficiency Rate (Target: 90%)
              </span>
            </div>
            <div className="mt-6 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-secondary-fixed h-full w-[94%]"></div>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col gap-4">
            <h3 className="font-headline font-bold text-primary">
              Service Health
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant">Active Services</span>
                <span className="font-bold">24</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant">System Latency</span>
                <span className="text-secondary font-bold">120ms</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant">
                  Avg Process Time
                </span>
                <span className="font-bold">1.2 Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
