import React from 'react'

export default function VIsiMisi() {
  return (
    <section className="py-24 bg-surface-container-low">
            <div className="max-w-7xl mx-auto px-8">
                <div className="mb-16 text-center">
                    <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Arah &amp; Tujuan</h2>
                    <p className="text-on-surface-variant max-w-2xl mx-auto">Komitmen kami dalam membangun pelayanan publik
                        yang transparan dan berorientasi pada kesejahteraan warga.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Visi Card */}
                    <div
                        className="md:col-span-1 bg-primary-container p-10 rounded-xl flex flex-col justify-between editorial-shadow">
                        <div>
                            <span className="material-symbols-outlined text-secondary-fixed text-5xl mb-6">visibility</span>
                            <h3 className="font-headline text-3xl font-bold text-white mb-6 tracking-tight">Visi Kami</h3>
                        </div>
                        <p className="text-white/90 text-lg leading-relaxed italic font-light">
                            "Menjadi desa mandiri yang unggul dalam pelayanan publik berbasis digital dengan tetap
                            mempertahankan nilai-nilai kearifan lokal."
                        </p>
                    </div>
                    {/* Misi Bento */}
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div
                            className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow relative overflow-hidden group">
                            <div className="absolute top-4 right-4 text-primary/10">
                                <span className="material-symbols-outlined text-6xl">account_balance</span>
                            </div>
                            <h4 className="font-headline font-bold text-primary text-xl mb-4">Tata Kelola</h4>
                            <p className="text-on-surface-variant leading-relaxed">Mewujudkan tata kelola pemerintahan desa
                                yang transparan, akuntabel, dan bebas dari korupsi melalui sistem digitalisasi.</p>
                        </div>
                        <div
                            className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow relative overflow-hidden group">
                            <div className="absolute top-4 right-4 text-primary/10">
                                <span className="material-symbols-outlined text-6xl">groups</span>
                            </div>
                            <h4 className="font-headline font-bold text-primary text-xl mb-4">Pemberdayaan</h4>
                            <p className="text-on-surface-variant leading-relaxed">Meningkatkan kapasitas sumber daya
                                manusia melalui pelatihan keterampilan dan pendampingan ekonomi kreatif.</p>
                        </div>
                        <div
                            className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow relative overflow-hidden group">
                            <div className="absolute top-4 right-4 text-primary/10">
                                <span className="material-symbols-outlined text-6xl">eco</span>
                            </div>
                            <h4 className="font-headline font-bold text-primary text-xl mb-4">Lingkungan</h4>
                            <p className="text-on-surface-variant leading-relaxed">Menjaga kelestarian lingkungan hidup dan
                                mengembangkan potensi agrowisata berbasis masyarakat.</p>
                        </div>
                        <div
                            className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow relative overflow-hidden group">
                            <div className="absolute top-4 right-4 text-primary/10">
                                <span className="material-symbols-outlined text-6xl">volunteer_activism</span>
                            </div>
                            <h4 className="font-headline font-bold text-primary text-xl mb-4">Kesejahteraan</h4>
                            <p className="text-on-surface-variant leading-relaxed">Menjamin akses kesehatan dan pendidikan
                                yang merata bagi seluruh lapisan warga tanpa terkecuali.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}
