import React from 'react'

export default function Hero() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
                <div
                    className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full text-[10px] font-bold tracking-widest uppercase">
                    <span className="material-symbols-outlined text-sm" data-icon="verified_user">verified_user</span>
                    Gerbang Digital Warga
                </div>
                <h1 className="text-6xl lg:text-7xl font-extrabold text-primary leading-[1.1] -tracking-[0.03em]">
                    Kesejahteraan <br /><span className="text-secondary italic font-light">dalam satu ketukan.</span>
                </h1>
                <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">
                    Sistem Administrasi Mandiri dirancang untuk memberikan kemudahan akses permohonan dokumen dan
                    pengaduan langsung dari kenyamanan rumah Anda.
                </p>
                {/* Quick Search Document  */}
                <div className="relative max-w-md group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                        <span className="material-symbols-outlined" data-icon="search">search</span>
                    </div>
                    <input
                        className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest rounded-xl border-none shadow-sm focus:ring-2 focus:ring-primary-container/40 transition-all text-on-surface"
                        placeholder="Cek nomor resi permohonan..." type="text" />
                </div>
            </div>
            {/* Login Card (Interaction Layer) */}
            <div className="lg:col-span-5 relative">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-tertiary-container/10 rounded-full blur-3xl -z-10">
                </div>
                <div
                    className="bg-surface-container-lowest p-10 rounded-xl shadow-[0_24px_48px_-12px_rgba(0,30,64,0.08)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <span className="material-symbols-outlined text-7xl"
                            data-icon="account_balance">account_balance</span>
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-2">Masuk ke Panel</h2>
                    <p className="text-on-surface-variant text-sm mb-8">Gunakan NIK dan PIN Rahasia Anda</p>
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-outline">Nomor Induk
                                Kependudukan</label>
                            <input
                                className="w-full p-4 bg-surface-container-low rounded-lg border-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                                type="text" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-outline">Kata Sandi /
                                PIN</label>
                            <input
                                className="w-full p-4 bg-surface-container-low rounded-lg border-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                                type="password" />
                        </div>
                        <button
                            className="w-full bg-primary-container text-on-primary py-4 rounded-lg font-bold shadow-lg shadow-primary-container/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            type="button">
                            Masuk Layanan Mandiri
                        </button>
                    </form>
                    <div className="mt-8 pt-8 border-t border-outline-variant/15 flex justify-between items-center">
                        <a className="text-xs font-bold text-secondary hover:underline" href="#">Butuh Bantuan?</a>
                        <a className="text-xs font-bold text-primary hover:underline" href="#">Daftar Akun Baru</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
