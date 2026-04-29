import React from 'react'

export default function CallToAction() {
  return (
    <section className="py-24 px-8 bg-white overflow-hidden relative">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-container mb-8">
                    <span className="material-symbols-outlined text-secondary text-3xl"
                        data-icon="verified_user">verified_user</span>
                </div>
                <h2 className="text-4xl font-headline font-extrabold text-primary tracking-tight">Kritik &amp; Saran
                    Membangun</h2>
                <p className="mt-6 text-on-surface-variant text-lg leading-relaxed">
                    Menemukan ketidaksesuaian atau ingin memberikan masukan mengenai pembangunan desa? Suara Anda adalah
                    aset terbesar bagi integritas administrasi desa kami.
                </p>
                <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                    <a className="px-10 py-4 bg-primary-container text-white font-bold rounded-md hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                        href="#">Kirim Masukan Online</a>
                    <a className="px-10 py-4 border-2 border-primary-container text-primary-container font-bold rounded-md hover:bg-primary-container hover:text-white transition-all"
                        href="#">Hubungi Ombudsman Desa</a>
                </div>
            </div>
            {/* Background Decoration  */}
            <div
                className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary-container/30 rounded-full blur-3xl opacity-50">
            </div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-tertiary-container/20 rounded-full blur-3xl opacity-50">
            </div>
        </section>
  )
}
