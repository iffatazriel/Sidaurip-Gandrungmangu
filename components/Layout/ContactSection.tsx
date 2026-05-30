import SidauripMap from "@/components/Kontak/SidauripMap";

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

          <SidauripMap className="h-[450px] rounded-3xl shadow-2xl" />
        </div>
      </div>
    </section>
  );
}
