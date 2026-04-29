export default function StatsDashboard() {
  return (
    <section className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-headline text-4xl font-extrabold text-primary">
            Transparansi Data Desa
          </h2>
          <p className="text-on-surface-variant">
            Update data kependudukan per kuartal tahun 2026
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <article className="flex flex-col items-center justify-center rounded-2xl bg-surface-container-lowest p-10 text-center">
            <div className="relative mb-6 flex h-32 w-32 items-center justify-center">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 128 128">
                <circle
                  className="text-surface-container-high"
                  cx="64"
                  cy="64"
                  fill="transparent"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <circle
                  className="text-primary"
                  cx="64"
                  cy="64"
                  fill="transparent"
                  r="58"
                  stroke="currentColor"
                  strokeDasharray="364.4"
                  strokeDashoffset="100"
                  strokeWidth="8"
                />
              </svg>
              <span className="absolute text-2xl font-black text-primary">
                72%
              </span>
            </div>
            <p className="mb-1 text-sm font-bold uppercase tracking-widest text-on-surface-variant">
              Total Populasi
            </p>
            <p className="font-headline text-4xl font-black text-primary">
              12.450
            </p>
            <p className="mt-2 text-xs font-bold text-secondary">
              +2.4% vs tahun lalu
            </p>
          </article>

          <article className="relative overflow-hidden rounded-2xl bg-primary-container p-10 text-on-primary">
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl text-white/10">
              family_history
            </span>
            <p className="mb-6 text-sm font-bold uppercase tracking-widest opacity-70">
              Jumlah Kepala Keluarga
            </p>
            <p className="mb-4 font-headline text-6xl font-black">3.120</p>
            <div className="mb-8 flex gap-2">
              <div className="h-1 w-12 rounded-full bg-white" />
              <div className="h-1 w-8 rounded-full bg-white/30" />
              <div className="h-1 w-4 rounded-full bg-white/10" />
            </div>
            <p className="text-sm leading-relaxed">
              Mencakup 12 Dusun dan 45 Rukun Tetangga (RT).
            </p>
          </article>

          <article className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-10">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                Luas Wilayah
              </p>
              <div className="mb-6 flex items-baseline gap-2">
                <p className="font-headline text-5xl font-black text-primary">
                  45.2
                </p>
                <p className="text-xl font-bold text-on-surface-variant">
                  km2
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface-variant">
                  Lahan Pertanian
                </span>
                <span className="text-sm font-bold text-primary">65%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                <div className="h-full w-[65%] bg-secondary" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface-variant">
                  Pemukiman
                </span>
                <span className="text-sm font-bold text-primary">35%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                <div className="h-full w-[35%] bg-tertiary-container" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
