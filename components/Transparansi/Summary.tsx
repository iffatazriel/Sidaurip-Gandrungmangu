import {
  calculateTransparencySummary,
  getPublishedTransparencyRecords,
} from "@/lib/transparency";

function formatCompactRupiah(value: number) {
  if (value >= 1_000_000_000) {
    return `Rp ${(value / 1_000_000_000).toLocaleString("id-ID", {
      maximumFractionDigits: 2,
    })} Miliar`;
  }

  return `Rp ${(value / 1_000_000).toLocaleString("id-ID", {
    maximumFractionDigits: 0,
  })} Juta`;
}

export default async function Summary() {
  const records = await getPublishedTransparencyRecords();
  const summary = calculateTransparencySummary(records);

  return (
    <section className="px-8 -mt-16 relative z-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Budget Realization  */}
                <div
                    className="bg-surface-container-lowest p-8 rounded-xl shadow-sm group hover:bg-surface-bright transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                        <span className="material-symbols-outlined text-primary-container text-3xl"
                            data-icon="payments">payments</span>
                        <div className="h-1 w-12 bg-tertiary-container"></div>
                    </div>
                    <p className="text-sm font-label text-on-surface-variant font-medium tracking-wide uppercase">Total
                        Anggaran (APBDes)</p>
                    <h3 className="text-3xl font-headline font-extrabold text-primary-container mt-2">{formatCompactRupiah(summary.totalBudget)}</h3>
                    <div className="mt-4 flex items-center gap-2 text-secondary font-semibold text-sm">
                        <span className="material-symbols-outlined text-sm" data-icon="trending_up">trending_up</span>
                        <span>+12% dari 2023</span>
                    </div>
                </div>
                {/* Realized Budget */}
                <div
                    className="bg-surface-container-lowest p-8 rounded-xl shadow-sm group hover:bg-surface-bright transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                        <span className="material-symbols-outlined text-secondary text-3xl"
                            data-icon="check_circle">check_circle</span>
                        <div className="h-1 w-12 bg-secondary"></div>
                    </div>
                    <p className="text-sm font-label text-on-surface-variant font-medium tracking-wide uppercase">Realisasi
                        Saat Ini</p>
                    <h3 className="text-3xl font-headline font-extrabold text-primary mt-2">{formatCompactRupiah(summary.totalRealized)}</h3>
                    <div className="mt-4 h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <div className="transparency-data-bar h-full bg-secondary" style={{ width: `${summary.realizationRate}%` }}></div>
                    </div>
                    <p className="mt-2 text-xs text-on-surface-variant font-medium text-right">{summary.realizationRate}% Tercapai</p>
                </div>
                {/* Active Projects */}
                <div
                    className="bg-surface-container-lowest p-8 rounded-xl shadow-sm group hover:bg-surface-bright transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                        <span className="material-symbols-outlined text-tertiary text-3xl"
                            data-icon="foundation">foundation</span>
                        <div className="h-1 w-12 bg-tertiary-fixed-dim"></div>
                    </div>
                    <p className="text-sm font-label text-on-surface-variant font-medium tracking-wide uppercase">Proyek
                        Pembangunan</p>
                    <h3 className="text-3xl font-headline font-extrabold text-primary mt-2">{summary.publishedRecords} Data Aktif</h3>
                    <div className="mt-4 flex gap-2">
                        <div
                            className="px-2 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded uppercase">
                            8 Selesai</div>
                        <div
                            className="px-2 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold rounded uppercase">
                            4 Tahap Awal</div>
                    </div>
                </div>
            </div>
        </section>
  )
}
