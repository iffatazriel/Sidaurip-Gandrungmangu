import React from 'react'

export default function ProjectList() {
  return (
    <section className="py-24 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-headline font-extrabold text-primary">Daftar Proyek Berjalan</h2>
                        <p className="mt-4 text-on-surface-variant">Pantau detail perkembangan pembangunan fisik dan
                            non-fisik di seluruh wilayah desa.</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            className="bg-surface-container-high px-5 py-2 text-sm font-semibold rounded hover:bg-surface-container-highest transition-colors">Unduh
                            PDF</button>
                        <button
                            className="bg-primary text-white px-5 py-2 text-sm font-semibold rounded hover:brightness-125 transition-all">Lihat
                            Arsip</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Project Card 1 */}
                    <div
                        className="bg-surface-container-lowest rounded-2xl overflow-hidden flex flex-col md:flex-row group transition-all duration-300">
                        <div className="md:w-1/3 relative h-48 md:h-auto">
                            <img alt="Proyek Jalan"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                data-alt="construction of a smooth asphalt road in a rural village setting with workers and machinery under bright daylight"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD55X2G7fYgvfEDD-VvpJVivOB-XCUchaAl32ao4ynjKOo3lBowx94KRlKWtPSMJN9Oi3EV5kHG__LuKyoGs8BaeSIZFxeAg_JuRwDX0N1Y3HlEO_7oKHGMuL5sv7veDm6XzbagN2ciZrby7i60W_V7CJJZ8DpTrEmJESaFrw1XuH8G5jUF8UviOvcWmfar-rxYjzIjU78m38YIhRlvnEtrWWUPiIIlU6ahKXb3YLGsixLxrL1O7Vd2UA3WMF8cgom2-10PkoR3ig" />
                            <div className="absolute top-4 left-4">
                                <span
                                    className="bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Berjalan</span>
                            </div>
                        </div>
                        <div className="md:w-2/3 p-8">
                            <h4 className="text-xl font-headline font-bold text-primary">Pengaspalan Jalan Lingkar Barat
                            </h4>
                            <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">Pengerjaan jalan sepanjang
                                1.2 KM untuk memudahkan akses petani ke pasar desa.</p>
                            <div className="mt-6 flex justify-between items-center text-xs font-semibold">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-tertiary" data-icon="event">event</span>
                                    <span>Mei - Sept 2024</span>
                                </div>
                                <div className="text-primary-container">Rp 840.000.000</div>
                            </div>
                        </div>
                    </div>
                    {/* Project Card 2  */}
                    <div
                        className="bg-surface-container-lowest rounded-2xl overflow-hidden flex flex-col md:flex-row group transition-all duration-300">
                        <div className="md:w-1/3 relative h-48 md:h-auto">
                            <img alt="Puskesdes"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                data-alt="modern small health clinic building in a tropical environment with clean architecture and green trees surrounding it"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8wmrJhbJOqoIrl6s4B72F0x4S98KfA0OYnWk2eeDPnkXKGD-cF7jO4l_b3lsO_gTlNxMgMWwD1PFBREPDyF6un47gtdWeJbFl7mt_ORR_Zpf_NhHGo-ZLNOS6LtKasQbSo6LEbr12ELpuzrpRklPCnQ2zngJyEpQAfU7qs0nvcjh-IP72QDDn0tEbPoseg9Wf5ynp8KzYFI2ZxQ2fgzOqSbkJzRPbFWi-X6mN2g1_UbgRNyKOGmryfRo5YYLZsDPA73CwJjCDJA" />
                            <div className="absolute top-4 left-4">
                                <span
                                    className="bg-tertiary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Tahap
                                    Akhir</span>
                            </div>
                        </div>
                        <div className="md:w-2/3 p-8">
                            <h4 className="text-xl font-headline font-bold text-primary">Rehabilitasi Puskesdes</h4>
                            <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">Pembaruan ruang rawat inap
                                dan penambahan alat kesehatan untuk pelayanan warga.</p>
                            <div className="mt-6 flex justify-between items-center text-xs font-semibold">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-tertiary" data-icon="event">event</span>
                                    <span>Feb - Juli 2024</span>
                                </div>
                                <div className="text-primary-container">Rp 215.000.000</div>
                            </div>
                        </div>
                    </div>
                    {/* Project Card 3 */}
                    <div
                        className="bg-surface-container-lowest rounded-2xl overflow-hidden flex flex-col md:flex-row group transition-all duration-300">
                        <div className="md:w-1/3 relative h-48 md:h-auto">
                            <img alt="Irigasi"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                data-alt="clean concrete irrigation canal flowing through vibrant green rice fields in an indonesian landscape at sunrise"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSEQYOzhiuALosHOX4FuFQNwQS-4UeNpqYNiMfrIzb6dp6ayrviXho646IW2cGqY25DthXtkP_x6bvKQ4poqO6c_Jzx7G9Sr0_5DTsJWTa9kzlCHhzsVsd3LimeWdJoA5fLCySRtdfGlwRju7GCoGyu-x8GUdgYoTirQ1TxH4tEP0X1jigAYnwH3QpF9JmmNmT0B7QqddiHKxUVdsJ8xpbuVV0JYvbI0Kaqv4YGyL6X63fBzyRqYr-NPyGWe6zA_h4W1O4emCAIA" />
                            <div className="absolute top-4 left-4">
                                <span
                                    className="bg-primary-container text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Perencanaan</span>
                            </div>
                        </div>
                        <div className="md:w-2/3 p-8">
                            <h4 className="text-xl font-headline font-bold text-primary">Normalisasi Saluran Irigasi</h4>
                            <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">Perbaikan saluran air
                                sepanjang 2 KM untuk mencegah banjir di musim penghujan.</p>
                            <div className="mt-6 flex justify-between items-center text-xs font-semibold">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-tertiary" data-icon="event">event</span>
                                    <span>Okt - Des 2024</span>
                                </div>
                                <div className="text-primary-container">Rp 120.000.000</div>
                            </div>
                        </div>
                    </div>
                    {/* Project Card 4 */}
                    <div
                        className="bg-surface-container-lowest rounded-2xl overflow-hidden flex flex-col md:flex-row group transition-all duration-300">
                        <div className="md:w-1/3 relative h-48 md:h-auto">
                            <img alt="Lamp"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                data-alt="solar powered street lights standing tall along a quiet village road during a golden sunset"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ7H3sb7Bv8WeV0Q8LVkYXuWdleDJPH08svFPaNeGDIDLpqzcgsx5IPwlX0wyob0lNxuO1o0fqXOuWo0t_893IKDXmLgdn2Wi93iOG_vS6HUWQcon0iR5Gu3U6rVbuaescBj69GwGC53Pxk46D7d37vNpbBSHjnGv3T3mGhh8A2krejBHxQL1NN10JBOJrc_T2SCybxmGrz2V685T1oJpQmZxpnPOU7Zgp0R9krQLC4y7kvErV-04b-vMG4eETMp9VQJPlKGFEmQ" />
                            <div className="absolute top-4 left-4">
                                <span
                                    className="bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Berjalan</span>
                            </div>
                        </div>
                        <div className="md:w-2/3 p-8">
                            <h4 className="text-xl font-headline font-bold text-primary">Penerangan Jalan Solar Cell</h4>
                            <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">Pemasangan 50 titik lampu
                                jalan bertenaga surya untuk keamanan lingkungan malam hari.</p>
                            <div className="mt-6 flex justify-between items-center text-xs font-semibold">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-tertiary" data-icon="event">event</span>
                                    <span>Juni - Agst 2024</span>
                                </div>
                                <div className="text-primary-container">Rp 350.000.000</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}
