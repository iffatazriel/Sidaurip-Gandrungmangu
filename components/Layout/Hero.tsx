import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-[760px] items-center overflow-hidden pt-20 md:min-h-[870px]">
      <div className="absolute inset-0 z-0">
        <Image
          alt="Kantor desa modern Indonesia yang bersih dikelilingi pepohonan hijau pada pagi hari"
          className="h-full w-full object-cover"
          // fill
          priority
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXDZ8gCyD64adfCHlA7aTyTAdajX8lVt3bJton8omnfOYhzKh4Zax2Fj_0tHtl-Wk06JbGvNwB-HNx87Mbya4N7T3mm79XjrTnzot64Vh1hwBzotrnLm0gVe3g6RvGdqy7Z8VH_YIFqdxiBMR4dKkxgGiV8ISU2yXmCdA0141qDI82pyEdXLCtdox9hhfa1Fd7cRalzw2zWuQr_oRncfqD520w2rSQhW_0kHZsN8KeXSRNDUid2QjBCRJnq1V_TkmHhJ-hwtjKqA"
          width={500}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-container/40" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="mb-6 inline-block rounded-full bg-tertiary-container/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-tertiary-fixed">
            Pemerintah Kabupaten Digital
          </span>
          <h1 className="mb-8 font-headline text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-7xl">
            Selamat Datang di Portal Resmi{" "}
            <span className="text-secondary-fixed">Desa Sidaurip</span>
          </h1>

          <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-surface-container-lowest/10 p-2 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center">
            <label className="flex flex-1 items-center gap-3 px-4">
              <span className="material-symbols-outlined text-white/70">
                search
              </span>
              <input
                className="w-full border-none bg-transparent py-3 text-white placeholder:text-white/55 focus:outline-none"
                placeholder="Cek Status Surat (Contoh: REG-2026-001)"
                type="text"
              />
            </label>
            <button className="rounded-lg bg-secondary px-8 py-3 font-bold text-white transition-all hover:bg-on-secondary-container">
              Cari Status
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="flex -space-x-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary bg-slate-200">
                <Image
                  alt="Aparatur desa profesional"
                  className="h-full w-full object-cover"
                  fill
                  sizes="40px"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQOkY7eXOKNK8nf4-1PaJOdnQhlASrXavf5tUOor-OAsnBBZDmv_WO1kZVXOt_5gjRD-y1FI7wLuRx3UPlyPEdKAo-FZqJ-RwtJN7T3o6rtCUcx4xQts38x5jH7Sn4nWQezPU1VbS9Wi-iPOeBD1Zs1iGeBKVgsv8nfURWvnDsNmoewIGr_6Ei_HwAzvkl66qhSov0hETGwfk_2eixMJpfVRNmIi1rp-B-I66OCe6XWr-rCKERh0dBLWcvrsSgmqS8cyMLKjG06g"
                />
              </div>
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-primary bg-slate-200 text-xs font-bold text-primary">
                +40
              </div>
            </div>
            <p className="text-sm font-light italic text-white/80">
              &quot;Melayani dengan Integritas dan Transparansi Digital&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
