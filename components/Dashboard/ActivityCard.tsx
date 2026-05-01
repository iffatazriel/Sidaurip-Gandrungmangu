import React from 'react'

export default function ActivityCard() {
  return (
    <div>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Chart Section  */}
                    <div className="lg:col-span-8 bg-surface-container-low p-8 rounded-3xl min-h-[400px] flex flex-col">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h4 className="text-2xl font-bold text-primary mb-1">Citizen Interaction Trends</h4>
                                <p className="text-slate-500 text-sm">Digital service adoption over the last 6 months</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400">more_vert</span>
                        </div>
                        <div className="flex-1 flex items-end gap-3 min-h-[200px]">
                            <div
                                className="flex-1 bg-primary/20 rounded-t-lg relative group h-[40%] transition-all hover:bg-primary-container">
                                <div
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[10px] px-2 py-1 rounded">
                                    2.4k</div>
                            </div>
                            <div
                                className="flex-1 bg-primary/20 rounded-t-lg relative group h-[65%] transition-all hover:bg-primary-container">
                                <div
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[10px] px-2 py-1 rounded">
                                    3.1k</div>
                            </div>
                            <div
                                className="flex-1 bg-primary/20 rounded-t-lg relative group h-[55%] transition-all hover:bg-primary-container">
                                <div
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[10px] px-2 py-1 rounded">
                                    2.9k</div>
                            </div>
                            <div
                                className="flex-1 bg-primary/20 rounded-t-lg relative group h-[85%] transition-all hover:bg-primary-container">
                                <div
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[10px] px-2 py-1 rounded">
                                    4.2k</div>
                            </div>
                            <div className="flex-1 bg-primary-container rounded-t-lg relative group h-[95%] transition-all">
                                <div
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-100 bg-primary text-white text-[10px] px-2 py-1 rounded">
                                    4.8k</div>
                            </div>
                            <div
                                className="flex-1 bg-primary/20 rounded-t-lg relative group h-[75%] transition-all hover:bg-primary-container">
                                <div
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[10px] px-2 py-1 rounded">
                                    3.6k</div>
                            </div>
                        </div>
                        <div
                            className="flex justify-between mt-4 px-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                        </div>
                    </div>
                    {/* Quick Actions  */}
                    <div className="lg:col-span-4 space-y-6">
                        <h4 className="text-xl font-bold text-primary px-2">Quick Command Center</h4>
                        <div className="grid grid-cols-1 gap-4">
                            <button
                                className="bg-surface-container-lowest p-6 rounded-2xl flex items-center justify-between group hover:shadow-xl hover:shadow-blue-900/5 transition-all active:scale-95 text-left">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined" data-icon="post_add">post_add</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-primary">Post News</p>
                                        <p className="text-xs text-slate-500">Broadcast to all residents</p>
                                    </div>
                                </div>
                                <span
                                    className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
                            </button>
                            <button
                                className="bg-surface-container-lowest p-6 rounded-2xl flex items-center justify-between group hover:shadow-xl hover:shadow-blue-900/5 transition-all active:scale-95 text-left">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-xl bg-tertiary-container text-on-tertiary flex items-center justify-center">
                                        <span className="material-symbols-outlined"
                                            data-icon="account_balance_wallet">account_balance_wallet</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-primary">Update Budget</p>
                                        <p className="text-xs text-slate-500">Quarterly financial report</p>
                                    </div>
                                </div>
                                <span
                                    className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
                            </button>
                            <button
                                className="bg-surface-container-lowest p-6 rounded-2xl flex items-center justify-between group hover:shadow-xl hover:shadow-blue-900/5 transition-all active:scale-95 text-left">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
                                        <span className="material-symbols-outlined"
                                            data-icon="manage_accounts">manage_accounts</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-primary">Manage Staff</p>
                                        <p className="text-xs text-slate-500">Access control &amp; schedules</p>
                                    </div>
                                </div>
                                <span
                                    className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </section>
    </div>
  )
}
