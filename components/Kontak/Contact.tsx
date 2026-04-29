import React from 'react'

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
                                        <p className="text-sm text-on-primary-container leading-relaxed">Jl. Kenanga No. 12,
                                            Desa Mandiri Utama, <br />Kecamatan Sejahtera, Kabupaten Nusantara 40123</p>
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
                <div className="lg:col-span-12 relative h-[450px] rounded-2xl overflow-hidden editorial-shadow group">
                    <img alt="Peta Lokasi Kantor Desa"
                        className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 transition-all duration-700"
                        data-alt="stylized birds eye map view of a clean organized suburban village layout with green trees and professional administrative buildings"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO0_aMT90tuPxSlP-3oAoadtt0wVC3CZ2U1B-zZaUrcCuWFRPAWJfSthVTavpGddp5zi2pl2YhwWrWbjsauhVjuWyALZ5is0zlMA9qOSvCSNVhIuJO-4Jr32RQcprg04j3wnTQGh4DStWuwt77hoPs08U3KtEWfzVaWWJmYrZ6aWM3jgW3NoKMagUlqv49MudXinnI8CHXu7DA7R0VyOiFI7kzPBcuOTORW5wR87GfcR03Ep4s-2ppETyYIHMCKe1OCqvHdEMdLg" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-12">
                        <div className="bg-white/95 backdrop-blur-md p-6 rounded-lg max-w-sm editorial-shadow">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="material-symbols-outlined text-primary"
                                    data-weight="fill">location_on</span>
                                <h4 className="font-headline font-bold text-primary">Balaidesa Utama</h4>
                            </div>
                            <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                                Temukan kami dengan mudah melalui navigasi langsung. Parkir tersedia luas di area depan
                                kantor untuk warga.
                            </p>
                            <a className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline"
                                href="#">
                                Buka di Google Maps
                                <span className="material-symbols-outlined text-xs">open_in_new</span>
                            </a>
                        </div>
                    </div>
                    {/* Simulated Map Pins  */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-20 h-20 bg-primary/20 rounded-full animate-pulse"></div>
                            <span className="material-symbols-outlined text-primary text-5xl relative z-10"
                                style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
