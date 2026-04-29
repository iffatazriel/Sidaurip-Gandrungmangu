import Link from "next/link";

const footerGroups = [
  {
    title: "Kontak & Alamat",
    links: ["Jl. Perintis No. 144 Desa Sidaurip, Kecamatan Gandrungmangu, Kabupaten Cilacap 53254", "WA Center: +62 812-3456-7890", "Email: pemdes.sidaurip@desa.go.id"],
  },
  {
    title: "Tautan Penting",
    links: ["Facebook Desa", "Instagram Desa", "Peta Lokasi"],
  },
];

export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 text-sm">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div className="space-y-6">
          <Link className="flex items-center gap-2" href="/">
            <span className="material-symbols-outlined text-2xl text-primary-container">
              account_balance
            </span>
            <span className="font-headline text-lg font-black tracking-tight text-blue-900">
              Sidaurip
            </span>
          </Link>
          <p className="leading-relaxed text-slate-500">
            Pusat informasi digital dan layanan terpadu satu pintu untuk seluruh
            warga Desa Sidaurip. Mandiri, Transparan, Profesional.
          </p>
        </div>

        {footerGroups.map((group) => (
          <div className="space-y-6" key={group.title}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-900">
              {group.title}
            </h4>
            <ul className="space-y-4">
              {group.links.map((link) => (
                <li
                  className="cursor-pointer text-slate-500 opacity-80 transition-all hover:text-blue-700 hover:opacity-100"
                  key={link}
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-blue-900">
            Jam Layanan
          </h4>
          <div className="space-y-2 text-slate-500">
            <p>Senin - Kamis: 08:00 - 15:00</p>
            <p>Jumat: 08:00 - 11:30</p>
            <p>Sabtu - Minggu: Tutup</p>
          </div>
          <div className="flex gap-4">
            {["public", "alternate_email"].map((icon) => (
              <Link
                aria-label={icon === "public" ? "Website desa" : "Email desa"}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900/10 text-blue-900 transition-all hover:bg-blue-900 hover:text-white"
                href={icon === "public" ? "/" : "mailto:pemdes.sidaurip@desa.go.id"}
                key={icon}
              >
                <span className="material-symbols-outlined text-sm">
                  {icon}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-200 px-4 py-8 text-xs text-slate-500 sm:px-6 md:flex-row">
        <p>© 2026 Pemerintah Desa Sidaurip. Seluruh Hak Cipta Dilindungi.</p>
        <div className="flex gap-6">
          <Link className="transition-colors hover:text-blue-900" href="/">
            Kebijakan Privasi
          </Link>
          <Link className="transition-colors hover:text-blue-900" href="/">
            Syarat &amp; Ketentuan
          </Link>
        </div>
      </div>
    </footer>
  );
}
