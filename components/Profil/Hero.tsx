import Image from "next/image";

export default function ProfilHero() {
  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden pt-20 sm:min-h-[640px] lg:min-h-[700px]">
      <div className="absolute inset-0 z-0">
        <Image
          alt="Kantor desa modern Indonesia yang bersih dikelilingi pepohonan hijau pada pagi hari"
          className="h-full w-full object-cover"
          fill
          priority
          sizes="100vw"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhI0Ov6fRqlVBtMtxP_xbFNEvphXR7vD-2QLHPytgGwuEq2cIoyomg6Q9huNvuKkQib4_g_TzhACsE6TXgkQD9Njs5yELPFSo8vlipXwu21S7hFfKxCZDb5BfK7S9m_tVxQDvppiybb1TjC3EA5pYvB6w62ybLhmWVRPGZQIgzbX8WJIGZnEhYtqkeKSF92ut_5aJAdjTHDbmyCTqwPfQEAmeNrJ--F0ngxfXuyhS3PWJS_7ZMFzHe0Xcn9DlT-DeIfQ259fa3cg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary-container/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="max-w-3xl">
          <span className="mb-5 inline-flex rounded-full bg-tertiary-container/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-tertiary-fixed ring-1 ring-white/15">
            Profil Desa
          </span>

          <h1 className="mb-6 max-w-4xl font-headline text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
            Warisan Luhur,{" "}
            <span className="block text-secondary-fixed">
              Masa Depan Unggul.
            </span>
          </h1>

          <p className="max-w-2xl text-base font-light leading-8 text-white/85 sm:text-lg lg:text-xl">
            Mengenal lebih dekat sejarah, visi, dan pengabdian kami untuk
            mewujudkan masyarakat yang mandiri dan berintegritas.
          </p>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              ["Sejarah", "Akar perjalanan desa"],
              ["Visi", "Arah pembangunan"],
              ["Pengabdian", "Layanan untuk warga"],
            ].map(([title, description]) => (
              <div
                className="rounded-lg border border-white/10 bg-white/10 p-4 text-white backdrop-blur-md"
                key={title}
              >
                <p className="font-headline text-lg font-bold">{title}</p>
                <p className="mt-1 text-sm leading-6 text-white/70">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


