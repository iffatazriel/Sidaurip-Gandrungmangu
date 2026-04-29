import React from 'react'

export default function Services() {
  return (
    <div>
      <section className="bg-surface-container-low py-24">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-bold text-primary mb-4">Efisiensi Birokrasi</h2>
                        <p className="text-on-surface-variant">Pilih jenis layanan yang Anda butuhkan. Kami memprosesnya
                            dengan transparansi penuh dan kecepatan maksimal.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="h-1 w-24 bg-tertiary-container"></div>
                        <div className="h-1 w-12 bg-primary"></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Service Card 1 */}
                    <div
                        className="group bg-surface-container-lowest p-8 rounded-xl transition-all duration-300 hover:bg-surface-bright hover:shadow-xl relative overflow-hidden">
                        <span
                            className="material-symbols-outlined text-4xl text-primary absolute top-8 right-8 transition-transform group-hover:scale-110"
                            data-icon="description">description</span>
                        <div className="mt-12">
                            <h3 className="text-xl font-bold text-primary mb-3">Persuratan Online</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Urus Surat Pengantar,
                                Domisili, hingga Akta Kelahiran tanpa perlu antre di kantor desa.</p>
                            <span
                                className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
                                Ajukan Sekarang <span className="material-symbols-outlined text-sm"
                                    data-icon="arrow_forward">arrow_forward</span>
                            </span>
                        </div>
                    </div>
                    {/* Service Card 2 */}
                    <div
                        className="group bg-surface-container-lowest p-8 rounded-xl transition-all duration-300 hover:bg-surface-bright hover:shadow-xl relative overflow-hidden">
                        <span
                            className="material-symbols-outlined text-4xl text-secondary absolute top-8 right-8 transition-transform group-hover:scale-110"
                            data-icon="assignment_turned_in">assignment_turned_in</span>
                        <div className="mt-12">
                            <h3 className="text-xl font-bold text-primary mb-3">Cek Status Dokumen</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Pantau real-time sejauh mana
                                permohonan Anda diproses oleh tim administrasi kami.</p>
                            <span
                                className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
                                Lacak Berkas <span className="material-symbols-outlined text-sm"
                                    data-icon="arrow_forward">arrow_forward</span>
                            </span>
                        </div>
                    </div>
                    {/* Service Card 3 */}
                    <div
                        className="group bg-surface-container-lowest p-8 rounded-xl transition-all duration-300 hover:bg-surface-bright hover:shadow-xl relative overflow-hidden">
                        <span
                            className="material-symbols-outlined text-4xl text-error absolute top-8 right-8 transition-transform group-hover:scale-110"
                            data-icon="campaign">campaign</span>
                        <div className="mt-12">
                            <h3 className="text-xl font-bold text-primary mb-3">Aspirasi &amp; Pengaduan</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Sampaikan keluhan, saran,
                                atau laporan terkait lingkungan desa secara anonim dan aman.</p>
                            <span
                                className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
                                Tulis Laporan <span className="material-symbols-outlined text-sm"
                                    data-icon="arrow_forward">arrow_forward</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
