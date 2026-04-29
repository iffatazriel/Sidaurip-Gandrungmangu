import React from 'react'

export default function TransparencyTable() {
  return (
    <section className="py-24 px-8 bg-surface-container-low">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl font-headline font-extrabold text-primary">Rincian Realisasi APBD Desa</h2>
                    <p className="mt-2 text-on-surface-variant font-medium">Laporan terperinci arus kas dan pengeluaran per
                        kategori.</p>
                </div>
                <div className="overflow-x-auto bg-surface-container-lowest rounded-2xl shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-primary text-white uppercase text-[11px] font-bold tracking-widest">
                                <th className="px-8 py-5">Uraian Kegiatan</th>
                                <th className="px-8 py-5">Anggaran (Rp)</th>
                                <th className="px-8 py-5">Realisasi (Rp)</th>
                                <th className="px-8 py-5">Selisih (%)</th>
                                <th className="px-8 py-5">Keterangan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-container-high">
                            <tr className="hover:bg-surface-container transition-colors">
                                <td className="px-8 py-6 text-sm font-bold text-primary">Penyelenggaraan Pemerintahan</td>
                                <td className="px-8 py-6 text-sm font-medium">1.250.000.000</td>
                                <td className="px-8 py-6 text-sm font-medium">920.000.000</td>
                                <td className="px-8 py-6 text-sm">
                                    <span className="text-secondary font-bold">73.6%</span>
                                </td>
                                <td className="px-8 py-6 text-xs text-on-surface-variant italic">Gaji &amp; Ops Kantor</td>
                            </tr>
                            <tr className="hover:bg-surface-container transition-colors">
                                <td className="px-8 py-6 text-sm font-bold text-primary">Pembangunan Desa</td>
                                <td className="px-8 py-6 text-sm font-medium">2.100.000.000</td>
                                <td className="px-8 py-6 text-sm font-medium">1.450.000.000</td>
                                <td className="px-8 py-6 text-sm">
                                    <span className="text-secondary font-bold">69.0%</span>
                                </td>
                                <td className="px-8 py-6 text-xs text-on-surface-variant italic">Fisik &amp; Infrastruktur
                                </td>
                            </tr>
                            <tr className="hover:bg-surface-container transition-colors">
                                <td className="px-8 py-6 text-sm font-bold text-primary">Pembinaan Kemasyarakatan</td>
                                <td className="px-8 py-6 text-sm font-medium">680.000.000</td>
                                <td className="px-8 py-6 text-sm font-medium">410.000.000</td>
                                <td className="px-8 py-6 text-sm">
                                    <span className="text-secondary font-bold">60.3%</span>
                                </td>
                                <td className="px-8 py-6 text-xs text-on-surface-variant italic">Pelatihan UMKM</td>
                            </tr>
                            <tr className="hover:bg-surface-container transition-colors">
                                <td className="px-8 py-6 text-sm font-bold text-primary">Pemberdayaan Masyarakat</td>
                                <td className="px-8 py-6 text-sm font-medium">450.000.000</td>
                                <td className="px-8 py-6 text-sm font-medium">280.000.000</td>
                                <td className="px-8 py-6 text-sm">
                                    <span className="text-secondary font-bold">62.2%</span>
                                </td>
                                <td className="px-8 py-6 text-xs text-on-surface-variant italic">Ketahanan Pangan</td>
                            </tr>
                            <tr className="hover:bg-surface-container transition-colors">
                                <td className="px-8 py-6 text-sm font-bold text-primary">Penanggulangan Bencana</td>
                                <td className="px-8 py-6 text-sm font-medium">340.000.000</td>
                                <td className="px-8 py-6 text-sm font-medium">90.000.000</td>
                                <td className="px-8 py-6 text-sm">
                                    <span className="text-tertiary font-bold">26.5%</span>
                                </td>
                                <td className="px-8 py-6 text-xs text-on-surface-variant italic">Dana Darurat</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className="bg-surface-container-highest">
                                <td className="px-8 py-6 text-sm font-extrabold text-primary">TOTAL</td>
                                <td className="px-8 py-6 text-sm font-extrabold text-primary">4.820.000.000</td>
                                <td className="px-8 py-6 text-sm font-extrabold text-primary">3.150.000.000</td>
                                <td className="px-8 py-6 text-sm font-extrabold text-secondary">65.3%</td>
                                <td className="px-8 py-6 text-xs font-bold text-primary uppercase">Murni</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </section>
  )
}
