import Image from "next/image";

const contacts = [
  {
    icon: "location_on",
    label: "Alamat Kantor",
    value: "Jl. Perintis No. 144 Desa Sidaurip, Kecamatan Gandrungmangu, Kabupaten Cilacap 53254",
  },
  {
    icon: "phone_in_talk",
    label: "Telepon / WhatsApp",
    value: "+62 812-3456-7890",
  },
  {
    icon: "mail",
    label: "Email Resmi",
    value: "pemdes.sidaurip@desa.go.id",
  },
];

export default function ContactSection() {
  return (
    <section className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 font-headline text-4xl font-extrabold text-primary">
              Hubungi Kami
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-on-surface-variant">
              Butuh bantuan lebih lanjut atau ingin berkunjung? Tim administrasi
              kami siap melayani Anda setiap hari kerja.
            </p>
            <ul className="space-y-6">
              {contacts.map((contact) => (
                <li className="flex gap-4" key={contact.label}>
                  <span className="material-symbols-outlined text-primary">
                    {contact.icon}
                  </span>
                  <div>
                    <p className="font-bold text-primary">{contact.label}</p>
                    <p className="text-on-surface-variant">{contact.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-[450px] overflow-hidden rounded-3xl bg-slate-300 shadow-2xl">
            <Image
              alt="Peta minimalis wilayah desa dengan penanda lokasi"
              className="h-full w-full object-cover opacity-60 grayscale"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbtpbTqpuSw1Vvve5VxSVOjImDIeBCApfLuHOWXkoDwIyT1ISqfzTQxElEQWLHvguSsKOUTmd1q46mI5RGLylVLkdULZzp7J_ZgnrQMkCdeLRaTPq4lVMCJJNbV9sdHTL4fYFmgWcuprzNhDEDjcIferW6jvf3JjlTcceIzfo1VK-w4MVg6cXptrqu1tofrwXcxQYfZOA1oor_QNaY7hCHG92Kuax0tCZIeEsYzGV5xWelLW02Fo3gphVT-YYr7pK9SAKsWHMqJg"
            />
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <a
                className="flex items-center gap-3 rounded-2xl bg-primary-container px-6 py-4 text-white shadow-xl transition-transform hover:scale-[1.02]"
                href="https://maps.google.com"
                rel="noreferrer"
                target="_blank"
              >
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  pin_drop
                </span>
                <span>
                  <span className="block text-sm font-bold">
                    Balaidesa Sidaurip
                  </span>
                  <span className="block text-[10px] opacity-70">
                    Klik untuk navigasi GPS
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
