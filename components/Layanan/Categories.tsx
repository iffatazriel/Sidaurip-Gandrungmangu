import React from "react";

export default function Categories() {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Service List */}
        <div className="lg:col-span-8 space-y-12">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-headline font-bold text-primary">
                Layanan Administrasi
              </h2>
              <p className="text-outline">
                Pilih kategori layanan yang Anda butuhkan saat ini.
              </p>
            </div>
          </div>
          {/* Bento Grid for Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: KTP */}
            <div className="group bg-surface-container-lowest p-8 rounded-2xl transition-all duration-300 hover:bg-surface-bright relative overflow-hidden">
              <span className="material-symbols-outlined absolute top-8 right-8 text-primary/10 text-6xl transform group-hover:scale-110 transition-transform">
                fingerprint
              </span>
              <div className="relative z-10">
                <div className="bg-primary-fixed w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary">
                    badge
                  </span>
                </div>
                <h3 className="text-xl font-headline font-bold text-primary mb-3">
                  Pembuatan KTP
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                  Layanan perekaman dan pencetakan KTP Elektronik untuk warga
                  baru maupun penggantian kartu rusak.
                </p>
                <div className="space-y-3 border-t border-surface-variant/30 pt-6">
                  <div className="flex items-center text-xs font-semibold text-secondary">
                    <span
                      className="material-symbols-outlined text-sm mr-2"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    PROSES 3 HARI KERJA
                  </div>
                  <a
                    className="inline-flex items-center text-sm font-bold text-primary hover:gap-3 transition-all"
                    href="#"
                  >
                    Lihat Syarat &amp; Prosedur{" "}
                    <span className="material-symbols-outlined text-base ml-2">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
            </div>
            {/* Card 2: Kartu Keluarga */}
            <div className="group bg-surface-container-lowest p-8 rounded-2xl transition-all duration-300 hover:bg-surface-bright relative overflow-hidden">
              <span className="material-symbols-outlined absolute top-8 right-8 text-secondary/10 text-6xl transform group-hover:scale-110 transition-transform">
                family_restroom
              </span>
              <div className="relative z-10">
                <div className="bg-secondary-fixed w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-secondary">
                    groups
                  </span>
                </div>
                <h3 className="text-xl font-headline font-bold text-primary mb-3">
                  Kartu Keluarga
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                  Pembaruan data keluarga, penambahan anggota, atau pembuatan KK
                  baru bagi pasangan menikah.
                </p>
                <div className="space-y-3 border-t border-surface-variant/30 pt-6">
                  <div className="flex items-center text-xs font-semibold text-secondary">
                    <span
                      className="material-symbols-outlined text-sm mr-2"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    TERSEDIA FORMAT DIGITAL
                  </div>
                  <a
                    className="inline-flex items-center text-sm font-bold text-primary hover:gap-3 transition-all"
                    href="#"
                  >
                    Lihat Syarat &amp; Prosedur{" "}
                    <span className="material-symbols-outlined text-base ml-2">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
            </div>
            {/* Card 3: Akta Kelahiran */}
            <div className="group bg-surface-container-lowest p-8 rounded-2xl transition-all duration-300 hover:bg-surface-bright relative overflow-hidden md:col-span-2">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="md:w-1/2 relative z-10">
                  <div className="bg-tertiary-fixed w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-tertiary">
                      child_care
                    </span>
                  </div>
                  <h3 className="text-xl font-headline font-bold text-primary mb-3">
                    Akta Kelahiran
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                    Pencatatan kelahiran anak untuk mendapatkan identitas hukum
                    dan hak sipil dasar sejak dini.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-xs font-bold bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full">
                      GRATIS
                    </div>
                    <a
                      className="inline-flex items-center text-sm font-bold text-primary hover:gap-3 transition-all"
                      href="#"
                    >
                      Selengkapnya{" "}
                      <span className="material-symbols-outlined text-base ml-2">
                        arrow_forward
                      </span>
                    </a>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2">
                  <img
                    className="rounded-xl h-48 w-full object-cover shadow-lg"
                    data-alt="Minimalist top view of baby accessories on clean white background with elegant soft lighting"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKM_HkwunfHM0lSO4ksgqo-kqjBJI7mDLDcyUsUThgvjDAZ262N44mRlnoQSzTWZCbxRFGs09JYgEo7yjiK83RvVvHFPbyCWc4oLc6MvugqsY02hZ2sEmGJaYcNYCI371PAimKTNEnlThSqUGfsNxxcI7Hx0r8Ai8FPcvHDFIuP6SdN_EPoD0FVi0FlialV5IiTV5QdGbFKVEppLu4s0q58HP_VLAWv46MCEboyf6hJPtQWKG6AtUH_O4WfUd-SYCmSJtJ67KivQ"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar Info / Requirements */}
        <div className="lg:col-span-4 mt-12 lg:mt-0">
          <div className="bg-surface-container-low p-8 rounded-3xl sticky top-28">
            <h3 className="text-xl font-headline font-extrabold text-primary mb-8 tracking-tight">
              Persyaratan Umum
            </h3>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary font-bold text-xs shadow-sm">
                  01
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm mb-1">
                    Identitas Pendukung
                  </h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Siapkan fotokopi KTP, KK lama, atau surat pengantar RT/RW
                    setempat.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary font-bold text-xs shadow-sm">
                  02
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm mb-1">
                    Dokumen Pendukung
                  </h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Surat nikah, ijazah terakhir, atau akta lahir orang tua jika
                    diperlukan.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary font-bold text-xs shadow-sm">
                  03
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm mb-1">
                    Pas Foto Terbaru
                  </h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Latar belakang merah untuk tahun kelahiran ganjil, biru
                    untuk tahun genap.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 bg-primary-container p-6 rounded-2xl text-white">
              <h4 className="text-sm font-bold mb-2">Butuh Bantuan Cepat?</h4>
              <p className="text-xs text-white/70 mb-6">
                Tim admin kami siap membantu Anda melalui WhatsApp atau telepon.
              </p>
              <button className="w-full bg-secondary text-white py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">
                  support_agent
                </span>
                HUBUNGI KAMI
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
