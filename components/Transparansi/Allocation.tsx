import React from 'react'

export default function Allocation() {
  return (
    <section className="py-24 px-8 bg-surface-container-low mt-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <div className="lg:w-1/3">
                        <h2 className="text-4xl font-headline font-extrabold text-primary leading-tight">Alokasi Dana
                            <br />Strategis 2024</h2>
                        <p className="mt-6 text-on-surface-variant leading-relaxed">
                            Setiap rupiah yang dialokasikan direncanakan untuk memberikan dampak maksimal bagi
                            kesejahteraan warga desa melalui lima pilar pembangunan utama.
                        </p>
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-4 h-4 rounded-sm bg-primary-container"></div>
                                <span className="text-sm font-medium">Infrastruktur &amp; Jalan (40%)</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-4 h-4 rounded-sm bg-secondary"></div>
                                <span className="text-sm font-medium">Kesehatan &amp; Sanitasi (25%)</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-4 h-4 rounded-sm bg-tertiary"></div>
                                <span className="text-sm font-medium">Pendidikan &amp; Pelatihan (15%)</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-4 h-4 rounded-sm bg-primary-fixed-dim"></div>
                                <span className="text-sm font-medium">Ketahanan Pangan (12%)</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-4 h-4 rounded-sm bg-outline-variant"></div>
                                <span className="text-sm font-medium">Lain-lain (8%)</span>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-2/3 w-full bg-surface-container-lowest p-10 rounded-2xl shadow-sm relative">
                        <div className="flex items-end gap-6 h-80 w-full pt-10">
                            <div className="flex-1 bg-primary-container rounded-t-lg transition-all duration-500 hover:brightness-125 relative group"
                                style={{ height: '100%' }}>
                                <div
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold bg-primary text-white p-1 rounded">
                                    40%</div>
                            </div>
                            <div className="flex-1 bg-secondary rounded-t-lg transition-all duration-500 hover:brightness-125 relative group"
                                style={{ height: '62.5%' }}>
                                <div
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold bg-secondary text-white p-1 rounded">
                                    25%</div>
                            </div>
                            <div className="flex-1 bg-tertiary rounded-t-lg transition-all duration-500 hover:brightness-125 relative group"
                                style={{ height: '37.5%' }}>
                                <div
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold bg-tertiary text-white p-1 rounded">
                                    15%</div>
                            </div>
                            <div className="flex-1 bg-primary-fixed-dim rounded-t-lg transition-all duration-500 hover:brightness-125 relative group"
                                style={{ height: '30%' }}>
                                <div
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold bg-primary-container text-white p-1 rounded">
                                    12%</div>
                            </div>
                            <div className="flex-1 bg-outline-variant rounded-t-lg transition-all duration-500 hover:brightness-125 relative group"
                                style={{ height: '20%' }}>
                                <div
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold bg-outline text-white p-1 rounded">
                                    8%</div>
                            </div>
                        </div>
                        <div className="h-[1px] w-full bg-outline-variant/30 mt-0"></div>
                        <div
                            className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                            <span>Infrastruktur</span>
                            <span>Kesehatan</span>
                            <span>Pendidikan</span>
                            <span>Pangan</span>
                            <span>Lainnya</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}
