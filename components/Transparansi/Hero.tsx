import React from "react";

export default function Hero() {
  return (
    <section className="relative pt-60 pb-32 px-8 overflow-hidden bg-gradient-to-br from-primary-container to-primary">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="inline-block bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-sm text-xs font-bold tracking-widest mb-6">
              LAPORAN AKUNTABILITAS
            </span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-white leading-tight -tracking-[0.02em]">
              Nadi Transparansi <br />
              Pembangunan.
            </h1>
            <p className="mt-6 text-on-primary-container text-lg leading-relaxed max-w-xl">
              Kami percaya bahwa kepercayaan adalah fondasi dari kemajuan.
              Temukan data real-time mengenai penggunaan anggaran dan
              perkembangan proyek desa kami.
            </p>
          </div>
          <div className="hidden lg:block text-right">
            <div className="text-white opacity-20 text-9xl font-black font-headline select-none">
              2026
            </div>
          </div>
        </div>
      </div>
      {/* Decorative Texture  */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full bg-no-repeat bg-right-top opacity-10 pointer-events-none"
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBaTeoCpXrQ2YElb5ZwLoxFRpjpEMyPtzXbAMOxlVvZAOXakPd45fm-RMzzr0RbOkGdI_kgadqGoAhCsAZbpT1hpaxULbOSCp6NX0oMzQjn4pzlvKRw7aYxv6_YaN9gzOHls_9ZSefiY2ESp4HWMyjuJG-bt1HWQUbnu_gcIg0ondu5eWHDy9KdEmPF6Owmr7Dmhfja8HsyfRbUqSkebda4Geoer0Uk-E1-XZeRgGCyi7bNb7RptQsE-wmSJn2fZGv5dDh07fSXLA')", filter: "invert(1)", backgroundSize: "400px" }}
      ></div>
    </section>
  );
}
