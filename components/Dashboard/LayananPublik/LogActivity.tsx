import React from "react";

export default function LogActivity() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-surface-container-lowest rounded-2xl p-8">
        <h3 className="text-xl font-headline font-bold text-primary mb-6">
          Audit Trail
        </h3>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="update"
              >
                update
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">
                <span className="font-bold">Admin Utama</span> updated KTP
                requirements.
              </p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">
                Today at 09:45 AM
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="verified_user"
              >
                verified_user
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">
                Bulk approval for 12{" "}
                <span className="font-bold">Surat Domisili</span> requests.
              </p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">
                Yesterday at 16:20 PM
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-8 border border-outline-variant/10 relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="text-xl font-headline font-bold text-primary mb-4">
            Quick Insights
          </h3>
          <p className="text-sm text-on-surface-variant mb-6">
            Service demand has increased by{" "}
            <span className="text-secondary font-bold">12.5%</span> this month
            compared to last.
          </p>
          <div className="flex items-end gap-2 h-24">
            <div className="bg-primary-container w-full h-[40%] rounded-t-sm"></div>
            <div className="bg-primary-container w-full h-[65%] rounded-t-sm opacity-80"></div>
            <div className="bg-primary-container w-full h-[50%] rounded-t-sm"></div>
            <div className="bg-primary-container w-full h-[85%] rounded-t-sm opacity-90"></div>
            <div className="bg-secondary w-full h-[100%] rounded-t-sm"></div>
          </div>
          <div className="flex justify-between text-[10px] text-on-surface-variant mt-3 uppercase font-bold tracking-tighter">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
          </div>
        </div>
        {/* Decorative background element  */}
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-tertiary-fixed-dim/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>
      </div>
    </div>
  );
}
