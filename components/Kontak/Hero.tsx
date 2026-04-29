import React from 'react'

export default function Hero() {
  return (
    <div>
      <section className="relative py-40 px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <span
                    className="inline-block bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-6">Hubungi
                    Kami</span>
                <h1
                    className="text-6xl md:text-7xl font-headline font-extrabold text-primary leading-tight -tracking-[0.02em] mb-8">
                    Akses Langsung ke <br />Pelayanan Publik.
                </h1>
                <p className="max-w-2xl text-lg text-on-surface-variant font-light leading-relaxed">
                    Kami berkomitmen untuk memberikan transparansi dan kemudahan komunikasi bagi seluruh warga. Silakan
                    hubungi kami melalui kanal di bawah ini untuk bantuan administratif atau aspirasi desa.
                </p>
            </div>
             {/* Background Texture  */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                <div
                    className="w-full h-full bg-gradient-to-br from-primary to-transparent transform rotate-12 translate-x-1/3">
                </div>
            </div>
        </section>
    </div>
  )
}
