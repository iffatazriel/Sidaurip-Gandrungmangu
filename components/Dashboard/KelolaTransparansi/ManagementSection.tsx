'use client';

export default function ManagementSection() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input and Update Section  */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface-container-low p-6 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold text-primary-container flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">
                edit_document
              </span>
              Update Allocation
            </h3>
            <form className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Sector / Program
                </label>
                <select className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-container/20">
                  <option>Infrastructure Development</option>
                  <option>Education &amp; Literacy</option>
                  <option>Health &amp; Sanitation</option>
                  <option>Economic Recovery</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Budgeted (Rp)
                  </label>
                  <input 
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-container/20 font-bold text-blue-900"
                    type="text"
                    defaultValue="1.200.000.000"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Realized (Rp)
                  </label>
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-container/20"
                    placeholder="0"
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Project Notes
                </label>
                <textarea
                  className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-container/20"
                  placeholder="Enter progress updates or notes..."
                  rows={3}
                ></textarea>
              </div>
              <button
                className="w-full py-3 bg-primary-container text-white font-bold rounded-xl active:scale-95 transition-all shadow-lg shadow-blue-900/30"
                type="submit"
              >
                Update Financial Data
              </button>
            </form>
          </div>
          <div className="bg-tertiary-container/10 border border-tertiary-container/20 p-6 rounded-2xl">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-tertiary-container text-3xl">
                lightbulb
              </span>
              <div>
                <h4 className="font-bold text-on-tertiary-container mb-1">
                  Absorption Alert
                </h4>
                <p className="text-sm text-on-tertiary-container/80 leading-relaxed">
                  Infrastructure sector is at{" "}
                  <span className="font-bold">85% realization</span> for Q2.
                  Consider re-evaluating the budget for emergency maintenance.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Project Table Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-primary-container">
                Active Projects &amp; Funding
              </h3>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Project Name
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Category
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Funding Status
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Completion
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-blue-900 text-sm">
                          Paving Jalan Mawar
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium italic">
                          Doc ID: INF-2024-001
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
                        Infrastructure
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                        <span className="text-xs font-bold text-on-surface">
                          Rp 450M / 600M
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-slate-500">
                          75%
                        </span>
                        <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="bg-secondary h-full"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:text-blue-600 font-bold text-xs">
                        Edit
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-blue-900 text-sm">
                          Renovasi PAUD Melati
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium italic">
                          Doc ID: EDU-2024-004
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold px-2 py-1 bg-tertiary-fixed/30 text-tertiary-container rounded-md">
                        Education
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
                        <span className="text-xs font-bold text-on-surface">
                          Rp 120M / 200M
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-slate-500">
                          40%
                        </span>
                        <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="bg-tertiary-container h-full"
                            style={{ width: "40%" }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:text-blue-600 font-bold text-xs">
                        Edit
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-blue-900 text-sm">
                          BLT Kemiskinan Ekstrim
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium italic">
                          Doc ID: SOC-2024-012
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                        Social Support
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-error"></span>
                        <span className="text-xs font-bold text-on-surface">
                          Rp 800M / 1.2B
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-slate-500">
                          100%
                        </span>
                        <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="bg-secondary h-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:text-blue-600 font-bold text-xs">
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-center">
              <button className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-primary transition-colors">
                View All Projects
              </button>
            </div>
          </div>
          {/* Upload Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col items-center justify-center text-center space-y-4 border-dashed border-2 hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-primary-container/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary-container text-2xl">
                  picture_as_pdf
                </span>
              </div>
              <div>
                <h4 className="font-bold text-on-surface text-sm">
                  Official APBD Document
                </h4>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                  PDF, XLS (Max 10MB)
                </p>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col items-center justify-center text-center space-y-4 border-dashed border-2 hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-secondary text-2xl">
                  photo_library
                </span>
              </div>
              <div>
                <h4 className="font-bold text-on-surface text-sm">
                  Realization Photos
                </h4>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                  JPG, PNG (Max 5MB)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
