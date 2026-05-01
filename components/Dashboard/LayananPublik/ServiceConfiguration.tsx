import React from "react";

export default function ServiceConfiguration() {
  return (
    <div className="bg-surface-container-low rounded-2xl p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h3 className="text-2xl font-headline font-bold text-primary">
            Service Catalog Management
          </h3>
          <p className="text-on-surface-variant">
            Edit requirements, processing times, and procedures.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg shadow-sm">
          <button className="px-4 py-2 bg-primary-container text-white rounded-md text-sm font-bold">
            Administrative
          </button>
          <button className="px-4 py-2 text-on-surface-variant hover:bg-slate-50 rounded-md text-sm font-medium">
            Business
          </button>
          <button className="px-4 py-2 text-on-surface-variant hover:bg-slate-50 rounded-md text-sm font-medium">
            Social
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Card 1  */}
        <div className="bg-surface-container-lowest p-6 rounded-xl group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative">
          <div className="absolute top-6 right-6 flex items-center justify-center w-8 h-8 bg-surface-container-high rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <span
              className="material-symbols-outlined text-sm"
              data-icon="edit"
            >
              edit
            </span>
          </div>
          <span
            className="material-symbols-outlined text-4xl text-primary mb-4"
            data-icon="badge"
          >
            badge
          </span>
          <h4 className="text-lg font-bold text-primary mb-1">
            E-KTP (Baru/Ganti)
          </h4>
          <p className="text-xs text-on-surface-variant mb-6">
            Electronic Identity Card for citizens aged 17+ or married.
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-xs">
              <span
                className="material-symbols-outlined text-secondary text-sm"
                data-icon="check_circle"
              >
                check_circle
              </span>
              <span className="text-on-surface">3 Requirements set</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span
                className="material-symbols-outlined text-secondary text-sm"
                data-icon="schedule"
              >
                schedule
              </span>
              <span className="text-on-surface">3-5 Working Days</span>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-secondary tracking-widest">
              Active
            </span>
            <button className="text-xs font-bold text-primary-container flex items-center gap-1">
              View Procedure
              <span
                className="material-symbols-outlined text-xs"
                data-icon="open_in_new"
              >
                open_in_new
              </span>
            </button>
          </div>
        </div>
        {/* Service Card 2 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative border-l-4 border-tertiary">
          <div className="absolute top-6 right-6 flex items-center justify-center w-8 h-8 bg-surface-container-high rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <span
              className="material-symbols-outlined text-sm"
              data-icon="edit"
            >
              edit
            </span>
          </div>
          <span
            className="material-symbols-outlined text-4xl text-primary mb-4"
            data-icon="family_restroom"
          >
            family_restroom
          </span>
          <h4 className="text-lg font-bold text-primary mb-1">
            Kartu Keluarga (KK)
          </h4>
          <p className="text-xs text-on-surface-variant mb-6">
            Family Registry update for births, deaths, or address change.
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-xs">
              <span
                className="material-symbols-outlined text-secondary text-sm"
                data-icon="check_circle"
              >
                check_circle
              </span>
              <span className="text-on-surface">5 Requirements set</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span
                className="material-symbols-outlined text-secondary text-sm"
                data-icon="schedule"
              >
                schedule
              </span>
              <span className="text-on-surface">2-3 Working Days</span>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-secondary tracking-widest">
              Active
            </span>
            <button className="text-xs font-bold text-primary-container flex items-center gap-1">
              View Procedure
              <span
                className="material-symbols-outlined text-xs"
                data-icon="open_in_new"
              >
                open_in_new
              </span>
            </button>
          </div>
        </div>
        {/* Service Card 3  */}
        <div className="bg-surface-container-lowest p-6 rounded-xl group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative">
          <div className="absolute top-6 right-6 flex items-center justify-center w-8 h-8 bg-surface-container-high rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <span
              className="material-symbols-outlined text-sm"
              data-icon="edit"
            >
              edit
            </span>
          </div>
          <span
            className="material-symbols-outlined text-4xl text-primary mb-4"
            data-icon="real_estate_agent"
          >
            real_estate_agent
          </span>
          <h4 className="text-lg font-bold text-primary mb-1">
            Surat Keterangan Usaha
          </h4>
          <p className="text-xs text-on-surface-variant mb-6">
            Local business license for micro and small enterprises.
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-xs">
              <span
                className="material-symbols-outlined text-error text-sm"
                data-icon="error_outline"
              >
                error_outline
              </span>
              <span className="text-on-surface">Missing Procedures</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span
                className="material-symbols-outlined text-secondary text-sm"
                data-icon="schedule"
              >
                schedule
              </span>
              <span className="text-on-surface">1 Working Day</span>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">
              Draft
            </span>
            <button className="text-xs font-bold text-tertiary flex items-center gap-1">
              Complete Setup
              <span
                className="material-symbols-outlined text-xs"
                data-icon="arrow_forward"
              >
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
