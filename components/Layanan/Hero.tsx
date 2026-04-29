import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    // Hero Section
    <section className="bg-primary hero-gradient py-40 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-3/5 space-y-6">
          <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            <span className="text-tertiary-fixed text-[10px] font-bold tracking-widest uppercase mr-2">
              Official Portal
            </span>
            <div className="w-1 h-1 bg-tertiary-fixed rounded-full"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-headline font-extrabold text-white leading-tight -tracking-[0.02em]">
            Layanan Publik <br />
            <span className="text-on-primary-container">Tanpa Hambatan.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-xl font-light leading-relaxed">
            Akses kemudahan administrasi kependudukan dan layanan desa dalam
            satu pintu. Transparan, cepat, dan sepenuhnya untuk kenyamanan
            warga.
          </p>
        </div>
        <div className="md:w-2/5 relative">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>
          <Image
            className="rounded-2xl shadow-2xl relative z-10 w-full h-[400px] object-cover border border-white/10"
            alt="Modern minimalist office space with warm wooden accents and soft natural light reflecting high-end civic architecture"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtqx0NWB4NJ8aC0msrY4Luusto6ImZ5wkaWdJxrD6xP3Uf1Nf3mnL64vBOT5cmkFe_RSYphgoHLjtVDPKDQmB2gmJHykkucGtUU9cPafF_ALlgivqmLeXtzLTC16wK8uNjW-iaYHj9fNGPIE6iWToiv7GMeiv1BTbyd5_M5VG-GPtPHIWV48ioP1kSOSi5rywIJ3NcODyRhcxkBlNLUjGnXyrLmI1qUF-GdldGa1n-eau4tUmW_VvoRJyE8Cb95f_C1pEHfudiQA"
            width={500}
            height={400}
          />
        </div>
      </div>
    </section>
  );
}
