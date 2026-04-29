import Image from "next/image";
import React from "react";

export default function Article() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-1">
             {/* Featured Article  */}
            <article className="md:col-span-8 group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest h-full flex flex-col">
                    <div className="aspect-video w-full overflow-hidden">
                        <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            data-alt="vibrant photo of a new modern village bridge construction at sunset with workers and heavy machinery in the background"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxyQQ1t1U7pCyJslwyLcUfZ8sPkbqr4Q-15g11v8VVZdaHjm10LFmGDVcDjlNUi-RSGAiH4gfZZGPx6a21ISzl2xLh2O7bTY5fk4OsflbHo_UrczIc2NqPs9yQ31UM2r4lEE0Lp3akYHWaqKQGO29Q959c025y7UNTi2E_lvyM0pMSqL1w_QUyHRYEpqONf3H3xAWAm3zdhUBrhnfyt1t9UcjCDP2lnnowtfH6zlZRmGEQwcVmwJsw0wi5HB2zV5qYAVvfOdAfRg" />
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-secondary">Pembangunan</span>
                            <span className="text-outline text-xs">24 Oktober 2024</span>
                        </div>
                        <h2
                            className="text-3xl font-headline font-bold text-primary mb-4 group-hover:text-surface-tint transition-colors">
                            Transformasi Infrastruktur: Peresmian Jembatan Utama Desa dan Jalur Irigasi Baru
                        </h2>
                        <p className="text-on-surface-variant leading-relaxed mb-6">
                            Pemerintah desa secara resmi membuka akses jembatan baru yang menghubungkan dusun utara dan
                            selatan, mempercepat mobilitas ekonomi warga dan distribusi hasil tani yang selama ini
                            terkendala jarak tempuh.
                        </p>
                        <div className="mt-auto flex items-center text-primary font-bold text-sm gap-2">
                            Baca Selengkapnya
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </div>
                    </div>
                </div>
            </article>
            {/* Side Bento Items */}
            <div className="md:col-span-4 flex flex-col gap-8 order-first md:order-none">
                <article
                    className="group cursor-pointer bg-surface-container-lowest rounded-xl p-6 transition-all hover:bg-surface-bright">
                    <div className="flex items-center gap-2 mb-3">
                        <span
                            className="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold rounded">EKONOMI</span>
                        <span className="text-outline text-[10px]">22 Okt</span>
                    </div>
                    <h3 className="text-lg font-headline font-bold text-primary mb-2 group-hover:text-surface-tint">
                        Peluncuran Digital Marketplace untuk UMKM Desa</h3>
                    <p className="text-on-surface-variant text-sm line-clamp-2">Program digitalisasi untuk membantu
                        pemasaran produk kerajinan tangan warga ke pasar nasional.</p>
                </article>
                <article
                    className="group cursor-pointer bg-surface-container-lowest rounded-xl p-6 transition-all hover:bg-surface-bright border-l-4 border-tertiary-container">
                    <div className="flex items-center gap-2 mb-3">
                        <span
                            className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold rounded">PENGUMUMAN</span>
                        <span className="text-outline text-[10px]">21 Okt</span>
                    </div>
                    <h3 className="text-lg font-headline font-bold text-primary mb-2 group-hover:text-surface-tint">Jadwal
                        Musyawarah Perencanaan Pembangunan Semester II</h3>
                    <p className="text-on-surface-variant text-sm line-clamp-2">Diharapkan seluruh ketua RT/RW hadir dalam
                        rapat koordinasi anggaran desa tahun mendatang.</p>
                </article>
                <div className="bg-primary-container rounded-xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="material-symbols-outlined text-tertiary-fixed mb-4">mail</span>
                        <h3 className="text-xl font-headline font-bold mb-2">Langganan Buletin</h3>
                        <p className="text-blue-200 text-sm mb-6">Dapatkan ringkasan berita mingguan langsung di email Anda.
                        </p>
                        <div className="space-y-3">
                            <input
                                className="w-full bg-white/10 border-white/20 rounded-lg px-4 py-2 text-sm focus:ring-white/40 placeholder:text-blue-300"
                                placeholder="Alamat Email" type="email" />
                            <button
                                className="w-full bg-white text-primary-container font-bold py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">Daftar
                                Sekarang</button>
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                </div>
            </div>
            {/* Standard Grid Cards */}
            <article className="md:col-span-4 group cursor-pointer bg-surface-container-lowest rounded-xl overflow-hidden">
                <div className="h-48 overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        data-alt="group of smiling elderly citizens participating in a gentle outdoor exercise session in a lush green village park with soft daylight"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy0l4k2ThwtnkBHFxo7fCArcLBrEhKHjH8bA9LZu8yQ6Q9pLL0Kx3qV5d9JumGaId8McUCIYVVLLoE6PAPLb9NYvIuvSYD7Marn-_ybwEALOCezY9apjfMegrACcls9no0B3eGCyCpNwEvEcjCVn_UAP-1-pDEqpEVJu5L9JutV5V7c9RYLx_fTwpn8Mo_Xhzm9SSAwdfjgSE5dgmdpZ-jXZ-kp09HnyTTNJXsZd2InhnK4mkEqXmyPJNGV-QXc5SjaWTnqY_HKQ" />
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Kesehatan</span>
                        <span className="text-outline text-[10px]">19 Okt 2024</span>
                    </div>
                    <h3
                        className="text-xl font-headline font-bold text-primary mb-3 leading-snug group-hover:text-surface-tint">
                        Pekan Imunisasi &amp; Cek Kesehatan Gratis Lansia</h3>
                    <p className="text-on-surface-variant text-sm line-clamp-3 mb-4">Kegiatan rutin bulanan Puskesmas Desa
                        kini ditambah dengan layanan konsultasi gizi bagi anak-anak untuk pencegahan stunting.</p>
                    <div className="flex items-center text-primary font-bold text-xs gap-1">
                        Baca Selengkapnya
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                    </div>
                </div>
            </article>
            <article className="md:col-span-4 group cursor-pointer bg-surface-container-lowest rounded-xl overflow-hidden">
                <div className="h-48 overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        data-alt="close-up of vibrant traditional Indonesian batik fabric being hand-painted by an artisan with warm lighting focused on the intricate patterns"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzZZvUnM5XlPWYswoZSrWpJTzaAfBd-HTbYZKBXxDm4tC4ZRWzX8DAsuTqsJjXM42oY0l40ei9byWxglvX1LB2cxiErQm0MJtPZniqdJKTO-wmelC9Yz0T1JW_spDJ3MMaxQRMvH2mEoq3vvWkLdvK9fBN_2nS-W-T0OK9YlqV7sKC-QCroTk-tRUEiUv9lkbza7gApB8gOyvIw3KIeURW6yxU-x7vOoR6e5kRmGsees51kA59Y561Todc3Vq1DmRy6VbLwITz_w" />
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Budaya</span>
                        <span className="text-outline text-[10px]">17 Okt 2024</span>
                    </div>
                    <h3
                        className="text-xl font-headline font-bold text-primary mb-3 leading-snug group-hover:text-surface-tint">
                        Festival Budaya Tahunan: Melestarikan Warisan Leluhur</h3>
                    <p className="text-on-surface-variant text-sm line-clamp-3 mb-4">Persiapan panggung seni dan pameran
                        kerajinan tradisional telah dimulai untuk menyambut festival kebudayaan bulan depan.</p>
                    <div className="flex items-center text-primary font-bold text-xs gap-1">
                        Baca Selengkapnya
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                    </div>
                </div>
            </article>
            <article className="md:col-span-4 group cursor-pointer bg-surface-container-lowest rounded-xl overflow-hidden">
                <div className="h-48 overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        data-alt="modern computer lab in a clean bright room with local village youth learning programming on laptops with digital icons overlay"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuComp51RCxjls7vkhQkSljFT2UNJFfAC1xjRHqqoKuaq_8KAEj1tyjrC4NEeIPFOiSPalnMJc-qJ9eWw6CMJsIQpCRWaXe-XxCxESPp41eSmSj0VN_2UVQR3jaq86qdEa77Yt3puKqDsngYIaY6uYrXtDIDjh0wSjKhC-nVv1CeGIFRxcWEoeGVIV7oNiXuewjhe6y_PDY7fNOvKy1IG77eb8eqsMdL_5uJ71QXX8UOaEtwVvqbgScKVW5ipub0PE2WT-xqmhqfEQ" />
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Pendidikan</span>
                        <span className="text-outline text-[10px]">15 Okt 2024</span>
                    </div>
                    <h3
                        className="text-xl font-headline font-bold text-primary mb-3 leading-snug group-hover:text-surface-tint">
                        Workshop Literasi Digital bagi Karang Taruna</h3>
                    <p className="text-on-surface-variant text-sm line-clamp-3 mb-4">Membekali generasi muda desa dengan
                        kemampuan mengelola konten positif dan bijak menggunakan media sosial.</p>
                    <div className="flex items-center text-primary font-bold text-xs gap-1">
                        Baca Selengkapnya
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                    </div>
                </div>
            </article>
        </div>
  );
}
