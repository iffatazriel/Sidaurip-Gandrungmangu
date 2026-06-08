'use client';

import Image from "next/image";
import AnimateOnScroll from "../ui/AnimateOnScroll";

export default function Stats() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <AnimateOnScroll animation="fade-up" delay={0} className="relative">
          <div className="aspect-square bg-slate-200 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              className="w-full h-full object-cover"
              alt="high-quality interior of a modern government office with clean architecture, warm wooden accents, and soft natural lighting through large windows"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDraZJgY1m-vJFt-SZu7_-kejCwQ5uvtk55me9WAA3jozW3c-luc_3_eylhxQMLnI7S_ht2d9oT6Xk-qr7RP3_NfpQvwNBEvWGJ7Xe6D3H8eQOgz7SNa_9KBHOCuh0RXm_17t337snE9O1ygk-_UrfoaRW6cifBpwpLwJdd5zNezruJYwl9QonKwSClPqfmMEkFrHJkfW0qn4haNXMPy8FNRBMS918zyZkcKw28APa3z0C4cP1fQg_ZWiGYq9PIB0mRVEWjMqQDYg"
              width={500}
              height={500}
            />
          </div>
          {/* Floating Detail */}
          <div className="absolute -bottom-8 -right-8 bg-primary-container text-on-primary p-8 rounded-xl shadow-2xl transition-transform duration-500 hover:scale-105">
            <div className="text-4xl font-bold mb-1">98%</div>
            <div className="text-xs uppercase tracking-widest opacity-80">Indeks Kepuasan Warga</div>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-up" delay={200} className="space-y-10">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-6 leading-tight">
              Transparansi yang <br />
              Dapat Anda Percaya
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Kami berkomitmen untuk mendemokrasikan layanan publik. Setiap
              langkah proses administrasi terekam secara digital, memastikan
              tidak ada ruang untuk pungli atau penundaan yang tidak perlu.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-secondary">24/7</div>
              <div className="text-sm text-outline font-medium">Akses Layanan Digital</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-secondary">15 Menit</div>
              <div className="text-sm text-outline font-medium">Rata-rata Respon Awal</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-secondary">Bebas Biaya</div>
              <div className="text-sm text-outline font-medium">Untuk Layanan Dasar</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-secondary">Enkripsi</div>
              <div className="text-sm text-outline font-medium">Data Keamanan NIK</div>
            </div>
          </div>
          <button className="flex items-center gap-4 group transition-transform hover:scale-105">
            <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container transition-transform group-hover:rotate-12">
              <span className="material-symbols-outlined" data-icon="policy">policy</span>
            </div>
            <span className="font-bold text-primary border-b border-primary/20 pb-1">
              Pelajari Kebijakan Privasi Kami
            </span>
          </button>
        </AnimateOnScroll>
      </section>
    </div>
  );
}
