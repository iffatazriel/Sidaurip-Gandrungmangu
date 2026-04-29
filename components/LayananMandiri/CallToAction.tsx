import React from 'react'

export default function CallToAction() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-8 mb-24">
            <div
                className="bg-primary p-12 lg:p-20 rounded-[2rem] relative overflow-hidden flex flex-col items-center text-center">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div
                        className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2">
                    </div>
                </div>
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Masih Memiliki Pertanyaan?</h2>
                <p className="text-on-primary-container max-w-2xl text-lg mb-10">Tim pendukung kami siap membantu Anda dari
                    pukul 08:00 hingga 16:00 melalui WhatsApp resmi atau Live Chat.</p>
                <div className="flex flex-wrap justify-center gap-6">
                    <a className="bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl shadow-secondary/20"
                        href="#">Hubungi WhatsApp</a>
                    <a className="bg-white/10 text-white backdrop-blur-md px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
                        href="#">Pusat Bantuan (FAQ)</a>
                </div>
            </div>
        </section>
    </div>
  )
}
