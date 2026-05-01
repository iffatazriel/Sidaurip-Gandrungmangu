import React from 'react'
import SidauripMap from './SidauripMap'

export default function Contact() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-8 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Contact Form Card */}
                <div className="lg:col-span-7 bg-surface-container-lowest p-10 rounded-xl editorial-shadow">
                    <h2 className="text-2xl font-headline font-bold text-primary mb-8">Kirim Pesan Langsung</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-on-surface-variant">Nama Lengkap</label>
                                <input
                                    className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 placeholder:text-outline/50"
                                    placeholder="Masukkan nama Anda" type="text" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-on-surface-variant">Email</label>
                                <input
                                    className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 placeholder:text-outline/50"
                                    placeholder="email@contoh.com" type="email" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-on-surface-variant">Subjek</label>
                            <input
                                className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 placeholder:text-outline/50"
                                placeholder="Perihal pesan" type="text" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-on-surface-variant">Pesan</label>
                            <textarea
                                className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 placeholder:text-outline/50"
                                placeholder="Tuliskan pesan atau aspirasi Anda di sini..." rows={5}></textarea>
                        </div>
                        <button
                            className="w-full bg-primary-container text-on-primary py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                            type="submit">
                            <span>Kirim Pesan Sekarang</span>
                            <span className="material-symbols-outlined text-sm">send</span>
                        </button>
                    </form>
                </div>
                {/* Info & Operating Hours  */}
                <div className="lg:col-span-5 space-y-8">
                    {/* Information Card */}
                    <div className="bg-primary-container text-on-primary p-8 rounded-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-headline font-bold mb-6">Informasi Kontak</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-on-primary-container">location_on</span>
                                    <div>
                                        <p className="font-semibold">Alamat Kantor</p>
                                        <p className="text-sm text-on-primary-container leading-relaxed">
                                            Balai Desa Sidaurip, <br />
                                            Kecamatan Gandrungmangu, Kabupaten Cilacap, Jawa Tengah 53254
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-on-primary-container">call</span>
                                    <div>
                                        <p className="font-semibold">Telepon / WhatsApp</p>
                                        <p className="text-sm text-on-primary-container">(021) 555-0192 / +62 812-3456-7890
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-on-primary-container">mail</span>
                                    <div>
                                        <p className="font-semibold">Surel Resmi</p>
                                        <p className="text-sm text-on-primary-container">pelayanan@civicsanctuary.desa.id
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* Abstract decoration */}
                        <div
                            className="absolute -bottom-10 -right-10 w-40 h-40 bg-on-primary-container/10 rounded-full blur-3xl">
                        </div>
                    </div>
                    {/* Operating Hours */}
                    <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-secondary">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-secondary">schedule</span>
                            <h3 className="text-xl font-headline font-bold text-primary">Jam Operasional</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                                <span className="text-on-surface-variant">Senin - Kamis</span>
                                <span className="font-bold text-primary">08:00 - 16:00</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                                <span className="text-on-surface-variant">Jumat</span>
                                <span className="font-bold text-primary">08:00 - 11:30</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                                <span className="text-on-surface-variant">Sabtu</span>
                                <span
                                    className="font-bold text-secondary text-sm px-2 py-0.5 bg-secondary-fixed rounded">Layanan
                                    Terbatas</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-on-surface-variant">Minggu / Libur</span>
                                <span className="font-bold text-error">Tutup</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Map Integration (Full Width)  */}
                <div className="lg:col-span-12">
                    <SidauripMap />
                </div>
            </div>
        </section>
    </div>
  )
}
