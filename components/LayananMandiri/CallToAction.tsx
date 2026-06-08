'use client';

import AnimateOnScroll from '../ui/AnimateOnScroll';

export default function CallToAction() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mb-24">
        <AnimateOnScroll animation="scale" delay={0}>
          <div className="bg-primary p-8 sm:p-12 lg:p-20 rounded-[2rem] relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Masih Memiliki Pertanyaan?
            </h2>
            <p className="text-on-primary-container max-w-2xl text-base sm:text-lg mb-8 sm:mb-10 px-4">
              Tim pendukung kami siap membantu Anda dari pukul 08:00 hingga 16:00 melalui WhatsApp resmi atau Live Chat.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 w-full sm:w-auto">
              <a
                className="bg-secondary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-secondary/20"
                href={process.env.NEXT_PUBLIC_WA_URL || "https://wa.me/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Hubungi WhatsApp
              </a>
              <a
                className="bg-white/10 text-white backdrop-blur-md px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
                href="/faq"
              >
                Pusat Bantuan (FAQ)
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </div>
  );
}
