import React from 'react'

export default function MainContent() {
  return (
    <div className='p-8 space-y-8 max-w-7xl mx-auto w-full'>
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h2 className="text-3xl font-extrabold text-primary-container tracking-tight">Financial Transparency
                    </h2>
                    <p className="text-on-surface-variant font-medium">Manage and monitor village budget allocation and
                        realization for FY 2024.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        className="px-5 py-2.5 bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-semibold rounded-xl text-sm flex items-center gap-2 hover:bg-surface-bright transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-lg">file_download</span>
                        Export Report
                    </button>
                    <button
                        className="px-5 py-2.5 bg-secondary text-white font-bold rounded-xl text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md shadow-secondary/20">
                        <span className="material-symbols-outlined text-lg">upload_file</span>
                        Upload APBD
                    </button>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div
                    className="md:col-span-1 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-6xl text-primary" data-weight="fill">payments</span>
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Total Budget (APBD)
                        </p>
                        <h3 className="text-2xl font-extrabold text-blue-900">Rp 4.28B</h3>
                        <div className="mt-4 flex items-center gap-2">
                            <span
                                className="text-secondary font-bold text-xs flex items-center bg-secondary/10 px-2 py-0.5 rounded-full">
                                <span className="material-symbols-outlined text-sm">trending_up</span> 12%
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">vs Last Period</span>
                        </div>
                    </div>
                </div>

                <div
                    className="md:col-span-1 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-6xl text-secondary"
                            data-weight="fill">account_balance_wallet</span>
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Total Realization</p>
                        <h3 className="text-2xl font-extrabold text-blue-900">Rp 2.15B</h3>
                        <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-secondary h-full rounded-full" style={{ width: '50.2%' }}></div>
                        </div>
                        <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase">50.2% Absorbed</p>
                    </div>
                </div>

                <div
                    className="md:col-span-2 bg-primary-container p-6 rounded-2xl shadow-xl shadow-blue-900/20 flex flex-col justify-between text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-transparent opacity-50"></div>
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">Budget
                                Distribution</p>
                            <h3 className="text-xl font-bold">Priority Sectors</h3>
                        </div>
                        <span className="material-symbols-outlined text-blue-200">pie_chart</span>
                    </div>
                    <div className="relative z-10 grid grid-cols-3 gap-4 mt-6">
                        <div className="space-y-2">
                            <div className="h-16 flex items-end gap-1">
                                <div className="bg-secondary w-full h-[80%] rounded-t-sm"></div>
                            </div>
                            <p className="text-[10px] font-bold text-blue-100 text-center uppercase tracking-tighter">
                                Infrastructure</p>
                        </div>
                        <div className="space-y-2">
                            <div className="h-16 flex items-end gap-1">
                                <div className="bg-tertiary-fixed w-full h-[60%] rounded-t-sm"></div>
                            </div>
                            <p className="text-[10px] font-bold text-blue-100 text-center uppercase tracking-tighter">
                                Education</p>
                        </div>
                        <div className="space-y-2">
                            <div className="h-16 flex items-end gap-1">
                                <div className="bg-white/40 w-full h-[40%] rounded-t-sm"></div>
                            </div>
                            <p className="text-[10px] font-bold text-blue-100 text-center uppercase tracking-tighter">Social
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}
