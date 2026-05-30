import {
  calculateTransparencySummary,
  getPublishedTransparencyRecords,
} from "@/lib/transparency";

function formatRupiah(value: number) {
  return value.toLocaleString("id-ID");
}

export default async function TransparencyTable() {
  const records = await getPublishedTransparencyRecords();
  const summary = calculateTransparencySummary(records);

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
                            {records.map((record, index) => {
                                const rate = record.budget === 0 ? 0 : Math.round((record.realized / record.budget) * 1000) / 10;

                                return (
                                    <tr className="transparency-data-row hover:bg-surface-container transition-colors" key={record.id} style={{ animationDelay: `${index * 70}ms` }}>
                                        <td className="px-8 py-6 text-sm font-bold text-primary">{record.activity}</td>
                                        <td className="px-8 py-6 text-sm font-medium">{formatRupiah(record.budget)}</td>
                                        <td className="px-8 py-6 text-sm font-medium">
                                            <div className="space-y-2">
                                                <span>{formatRupiah(record.realized)}</span>
                                                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-surface-container-high">
                                                    <div className="transparency-data-bar h-full bg-secondary" style={{ width: `${Math.min(rate, 100)}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm">
                                            <span className={rate >= 50 ? "text-secondary font-bold" : "text-tertiary font-bold"}>{rate}%</span>
                                        </td>
                                        <td className="px-8 py-6 text-xs text-on-surface-variant italic">{record.note}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr className="bg-surface-container-highest">
                                <td className="px-8 py-6 text-sm font-extrabold text-primary">TOTAL</td>
                                <td className="px-8 py-6 text-sm font-extrabold text-primary">{formatRupiah(summary.totalBudget)}</td>
                                <td className="px-8 py-6 text-sm font-extrabold text-primary">{formatRupiah(summary.totalRealized)}</td>
                                <td className="px-8 py-6 text-sm font-extrabold text-secondary">{summary.realizationRate}%</td>
                                <td className="px-8 py-6 text-xs font-bold text-primary uppercase">Murni</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </section>
  )
}
