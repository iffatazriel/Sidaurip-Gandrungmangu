import React from 'react'

export default function CallToAction() {
  return (
    <div>
      <section className="bg-surface-container-low py-20 px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-headline font-extrabold text-primary mb-6">Pertanyaan Umum?</h2>
                <p className="text-on-surface-variant mb-10 leading-relaxed">
                    Mungkin jawaban yang Anda cari sudah ada di halaman FAQ kami. Kami telah merangkum
                    pertanyaan-pertanyaan yang paling sering ditanyakan oleh warga mengenai perizinan, bansos, dan
                    lainnya.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <a className="px-8 py-3 bg-secondary text-on-secondary rounded-md font-bold transition-all hover:brightness-110"
                        href="#">Lihat FAQ</a>
                    <a className="px-8 py-3 bg-surface-container-lowest text-primary border border-outline-variant/30 rounded-md font-bold transition-all hover:bg-white"
                        href="#">Panduan Layanan</a>
                </div>
            </div>
        </section>
    </div>
  )
}
