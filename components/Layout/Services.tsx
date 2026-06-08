'use client';

import Link from "next/link";
import AnimateOnScroll from "../ui/AnimateOnScroll";

const services = [
  {
    title: "Permohonan Surat Pengantar",
    description:
      "Ajukan surat pengantar RT/RW secara online untuk berbagai keperluan administrasi.",
    icon: "description",
    color: "text-primary",
    accent: "bg-primary/5",
    action: "Ajukan Sekarang",
  },
  {
    title: "Aktivasi NIK",
    description:
      "Sinkronisasi data kependudukan untuk BPJS, Perbankan, dan bantuan sosial pemerintah.",
    icon: "fingerprint",
    color: "text-secondary",
    accent: "bg-secondary/5",
    action: "Verifikasi",
  },
  {
    title: "Layanan Kependudukan",
    description:
      "Pengurusan Kartu Keluarga baru, perubahan data, dan akta kelahiran/kematian.",
    icon: "group",
    color: "text-tertiary",
    accent: "bg-tertiary-container/5",
    action: "Kelola Data",
  },
  {
    title: "Pengaduan Warga",
    description:
      "Laporkan keluhan fasilitas umum, keamanan, atau saran untuk pembangunan desa.",
    icon: "campaign",
    color: "text-error",
    accent: "bg-error/5",
    action: "Lapor",
  },
];

export default function Services() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="mb-4 font-headline text-4xl font-extrabold tracking-tight text-primary">
              Layanan Mandiri
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-on-surface-variant">
              Akses layanan kependudukan dan administrasi desa secara cepat
              tanpa harus mengantre di kantor desa.
            </p>
          </div>
          <Link
            className="flex items-center gap-2 font-bold text-primary hover:underline"
            href="/layanan"
          >
            Lihat Semua Layanan
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <AnimateOnScroll
              key={service.title}
              animation="fade-up"
              delay={index * 100}
            >
              <article className="group relative h-full overflow-hidden rounded-2xl bg-surface-container-lowest p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div
                  className={`absolute -right-4 -top-4 h-24 w-24 rounded-full ${service.accent} transition-transform duration-500 group-hover:scale-150`}
                />
                <span
                  className={`material-symbols-outlined mb-8 text-4xl ${service.color}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {service.icon}
                </span>
                <h3 className="mb-3 font-headline text-xl font-bold text-primary">
                  {service.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
                  {service.description}
                </p>
                <Link
                  className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${service.color} transition-gap hover:gap-3`}
                  href="/layanan"
                >
                  {service.action}
                  <span className="material-symbols-outlined text-sm">east</span>
                </Link>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
