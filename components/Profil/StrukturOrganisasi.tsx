import React from 'react'

export default function StrukturOrganisasi() {
  return (
<section className="py-24 bg-surface">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-xl">
                        <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Perangkat Desa</h2>
                        <p className="text-on-surface-variant">Para putra-putri terbaik daerah yang berdedikasi tinggi dalam
                            melayani setiap kebutuhan administrasi dan pembangunan desa.</p>
                    </div>
                    <button
                        className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90">
                        <span className="material-symbols-outlined">download</span>
                        Struktur Organisasi (PDF)
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Leader Card: Prominent  */}
                    <div
                        className="lg:col-span-1 bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow transition-transform hover:-translate-y-2 duration-300">
                        <div className="aspect-[3/4] bg-slate-200">
                            <img className="w-full h-full object-cover"
                                data-alt="Professional portrait of a mature Indonesian village head in official uniform, neutral studio background with soft warm lighting"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQm3t9xhdwAyY80evH5CgLZYc0ok7-4bY5a9h5H2VsL3pRHS5QAQBgQ42c6oOgwvy6SyuRPd4-9HH_j4NEhGkHtgfVilKY1fNIly3CSWlFYRQENBcQ_DTm1ZXtctwf5N60-kIkte4illqm-yfEWB4qQG0J1iuzbckQVob0y8LndJGaZ0BJf1EbCL7cI94gkhCEPGj8H1awY0uSA3hTHWVeXZWfN5IOB6kots5_mGpusJMhY3jPMdsM5sE9UAPQwvDPzpzGSE0KJg" />
                        </div>
                        <div className="p-6">
                            <span className="text-xs font-bold text-secondary tracking-widest uppercase mb-1 block">KEPALA
                                DESA</span>
                            <h4 className="font-headline font-bold text-primary text-xl">Drs. H. Mulyadi</h4>
                            <p className="text-on-surface-variant text-sm">Masa Jabatan: 2021 - 2027</p>
                        </div>
                    </div>
                    {/* Staff Cards */}
                    <div
                        className="bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow transition-transform hover:-translate-y-2 duration-300">
                        <div className="aspect-[3/4] bg-slate-200">
                            <img className="w-full h-full object-cover"
                                data-alt="Professional portrait of a friendly woman in government attire, secretary of the village, soft bright lighting"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXh-vhs2VGSl2PGIVtbLbMljswI3AMl4oaz0lEsxl5yv5LnAWBoGbeUNRAaBqJWiy4WLNfHIKVuFAuoLta-f2XDK3E31Ran1jAFCgis7KpscALkBayIE5l3XE1hF50v0mGrbYXHAV_1vhAg_XjrLWZ6-yNvKrrbyqmJ8-rnGPttcwE6bT4JkpGg62kU9btUC2pPg7-JJEGHNJI8eTu6IZhAfFiOxLRRk0a9RggPYlEJ8N0r-aqG1EnkmvRgzhZQ6hZtOH2hZBuhg" />
                        </div>
                        <div className="p-6">
                            <span
                                className="text-xs font-bold text-secondary tracking-widest uppercase mb-1 block">SEKRETARIS
                                DESA</span>
                            <h4 className="font-headline font-bold text-primary text-xl">Siti Aminah, S.E.</h4>
                            <p className="text-on-surface-variant text-sm">Urusan Administrasi</p>
                        </div>
                    </div>
                    <div
                        className="bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow transition-transform hover:-translate-y-2 duration-300">
                        <div className="aspect-[3/4] bg-slate-200">
                            <img className="w-full h-full object-cover"
                                data-alt="Professional portrait of an Indonesian male official, treasurer, clean composition, business attire"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1y8Zqp3fAjj7tokLt8If4Jtlgtr1HQ9ZGzR1BMywO6P0YeN21kZ6bUBI23bjJF2FMeAiF70f3n-HQ0Q42hQyppdxZE2XIOW07-KNybUSK_UYz2XC669vYa8RRn1wZsoUg2SrIz6oJZZvffHLFnrueYQO99WJpo5VY7rq-a94aik78phvNXECi5fAcKHJG76wcHscIQ40zfaJyPM5tNZWMVbxdDhZAPag4OocMr9Tpnp0Ex_ZmGv1yLSGvu4VOGUnb5duYXaVB_Q" />
                        </div>
                        <div className="p-6">
                            <span className="text-xs font-bold text-secondary tracking-widest uppercase mb-1 block">KAUR
                                KEUANGAN</span>
                            <h4 className="font-headline font-bold text-primary text-xl">Budi Santoso</h4>
                            <p className="text-on-surface-variant text-sm">Pengelolaan Anggaran</p>
                        </div>
                    </div>
                    <div
                        className="bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow transition-transform hover:-translate-y-2 duration-300">
                        <div className="aspect-[3/4] bg-slate-200">
                            <img className="w-full h-full object-cover"
                                data-alt="Professional portrait of a young Indonesian male official, planning officer, modern and bright office background"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIBQhKyB_IjtRbSRoBNKNE5ETuoG_k5PG4GeB-JF45zhJM1rmSu4lJ1CV0oGb7ByXBEYbFObMg4U_vscuwGKYFZjDn9CEBfbV7s5M5xdzfrzhGVQg8bsUOBJ8Qy0L4YdXYpWuGRELmKqh8Y07PkGd_1hvUwEZxAvfxZIZbb82d69TopgWXneSzSC1yDbyBpesS6BrJ6EeuGUKx5jcN5shV83war3y3ndvbRIAZtkXXS6hB3c4nhS1Osa0qc5BZLVjhuKw2IV3PBg" />
                        </div>
                        <div className="p-6">
                            <span className="text-xs font-bold text-secondary tracking-widest uppercase mb-1 block">KAUR
                                PERENCANAAN</span>
                            <h4 className="font-headline font-bold text-primary text-xl">Eko Prasetyo</h4>
                            <p className="text-on-surface-variant text-sm">Pengembangan Wilayah</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}
