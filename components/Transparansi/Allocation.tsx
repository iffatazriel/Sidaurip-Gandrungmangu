import { getPublishedTransparencyRecords } from "@/lib/transparency";

const colorClasses = [
  "bg-primary-container",
  "bg-secondary",
  "bg-tertiary",
  "bg-primary-fixed-dim",
  "bg-outline-variant",
];

export default async function Allocation() {
  const records = await getPublishedTransparencyRecords();
  const totalBudget = records.reduce((sum, record) => sum + record.budget, 0);
  const allocations = records.slice(0, 5).map((record, index) => ({
    label: record.category,
    percent:
      totalBudget === 0 ? 0 : Math.round((record.budget / totalBudget) * 1000) / 10,
    color: colorClasses[index] ?? "bg-outline-variant",
  }));

  return (
    <section className="py-24 px-8 bg-surface-container-low mt-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <div className="lg:w-1/3">
                        <h2 className="text-4xl font-headline font-extrabold text-primary leading-tight">Alokasi Dana
                            <br />Strategis 2024</h2>
                        <p className="mt-6 text-on-surface-variant leading-relaxed">
                            Setiap rupiah yang dialokasikan direncanakan untuk memberikan dampak maksimal bagi
                            kesejahteraan warga desa melalui lima pilar pembangunan utama.
                        </p>
                        <div className="mt-8 space-y-4">
                            {allocations.map((allocation) => (
                                <div className="flex items-center gap-4" key={allocation.label}>
                                    <div className={`w-4 h-4 rounded-sm ${allocation.color}`}></div>
                                    <span className="text-sm font-medium">{allocation.label} ({allocation.percent}%)</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:w-2/3 w-full bg-surface-container-lowest p-10 rounded-2xl shadow-sm relative">
                        <div className="flex items-end gap-6 h-80 w-full pt-10">
                            {allocations.map((allocation, index) => (
                                <div
                                    className={`transparency-data-column flex-1 ${allocation.color} rounded-t-lg transition-all duration-500 hover:brightness-125 relative group`}
                                    key={allocation.label}
                                    style={{ height: `${Math.max(allocation.percent * 2.5, 14)}%`, animationDelay: `${index * 100}ms` }}>
                                    <div
                                        className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold bg-primary text-white p-1 rounded">
                                        {allocation.percent}%</div>
                                </div>
                            ))}
                        </div>
                        <div className="h-[1px] w-full bg-outline-variant/30 mt-0"></div>
                        <div
                            className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                            {allocations.map((allocation) => (
                                <span key={allocation.label}>{allocation.label}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}
