import React from "react";

export default function Tracking() {
  return (
    <section className="bg-surface-container-low py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-surface-container-lowest p-10 md:p-16 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>
          <div className="md:w-1/2 space-y-6 relative z-10">
            <h2 className="text-4xl font-headline font-extrabold text-primary leading-tight">
              Pantau Status
              <br />
              Permohonan Anda
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Gunakan nomor resi atau ID pelayanan untuk melihat sejauh mana
              proses administrasi Anda berjalan secara real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                className="flex-1 px-6 py-4 rounded-xl border-none bg-surface-container-low focus:ring-2 focus:ring-primary/20 text-sm"
                placeholder="Masukkan Nomor Resi..."
                type="text"
              />
              <button className="bg-primary px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:bg-primary-container">
                Lacak Sekarang
              </button>
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4 relative z-10">
            <div className="bg-surface-container-low p-6 rounded-2xl">
              <div className="text-3xl font-headline font-black text-primary mb-1">
                12k+
              </div>
              <div className="text-[10px] font-bold text-outline uppercase tracking-wider">
                Berkas Selesai
              </div>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl">
              <div className="text-3xl font-headline font-black text-secondary mb-1">
                98%
              </div>
              <div className="text-[10px] font-bold text-outline uppercase tracking-wider">
                Kepuasan Warga
              </div>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl">
              <div className="text-3xl font-headline font-black text-tertiary mb-1">
                24jt
              </div>
              <div className="text-[10px] font-bold text-outline uppercase tracking-wider">
                Data Terlindungi
              </div>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl">
              <div className="text-3xl font-headline font-black text-primary mb-1">
                3hr
              </div>
              <div className="text-[10px] font-bold text-outline uppercase tracking-wider">
                Rata-rata Proses
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
