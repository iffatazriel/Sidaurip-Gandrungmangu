import React from "react";

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-30 ">
      <header className="mb-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold tracking-widest uppercase rounded-full mb-4">
              Warta Desa
            </span>
            <h1 className="text-5xl md:text-6xl font-headline font-extrabold text-primary tracking-tight leading-tight">
              Kabar Terkini <br />
              <span className="text-surface-tint">Civic Sanctuary</span>
            </h1>
            <p className="mt-6 text-on-surface-variant text-lg leading-relaxed">
              Pusat informasi resmi, transparansi kegiatan, dan pengumuman
              penting bagi seluruh warga desa.
            </p>
          </div>
          {/* Filter Section */}
          <div className="flex flex-wrap gap-2">
            <button className="px-5 py-2 bg-primary-container text-white rounded-full text-sm font-semibold">
              Semua
            </button>
            <button className="px-5 py-2 bg-surface-container-highest text-on-surface-variant rounded-full text-sm font-medium hover:bg-surface-container-high transition-colors">
              Pembangunan
            </button>
            <button className="px-5 py-2 bg-surface-container-highest text-on-surface-variant rounded-full text-sm font-medium hover:bg-surface-container-high transition-colors">
              Ekonomi
            </button>
            <button className="px-5 py-2 bg-surface-container-highest text-on-surface-variant rounded-full text-sm font-medium hover:bg-surface-container-high transition-colors">
              Kesehatan
            </button>
            <button className="px-5 py-2 bg-surface-container-highest text-on-surface-variant rounded-full text-sm font-medium hover:bg-surface-container-high transition-colors">
              Budaya
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
