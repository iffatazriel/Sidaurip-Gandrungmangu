import Link from "next/link";
import Image from "next/image";
import { getHomepageAgendas, type PublicAgenda } from "@/lib/agenda";

const newsItems = [
  {
    title: "Vaksinasi Booster Kedua di Balai Desa Minggu Ini",
    date: "12 Maret 2026",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDq5iKSFpmOhRHZLj2Ew1_-NZFcDAH2sDQPV9zcmW5tXYVsqIeuZTfeQ2Lz6_YFVixskaSVYGS5-wTakwjIp2eslxtLmU4B2kGjfEFo2Pt_oMHTeJ6qCNyuef8an9QBN7L-ABLt6iuteVkp_qCwq1XwNpgQjdSrA-6kCa-j4uMz1m6qH3-kXXjtFI9zAk0aabg_uYQsMfRkdSdGUMJbXfLF0DXvKs8ryAODP0lwxTW4epDmiM-mZ1gy6mBYxXe4b3yjFXimxwOHjQ",
    alt: "Perangkat kesehatan digital",
  },
  {
    title: "Laporan Realisasi Dana Desa Semester I - 2026 Terbit",
    date: "10 Maret 2026",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDldlGFD3TKb4R6EFxSu_7NyvZjgrfOlzz6FZx0weroj-4FmozDzvIzN-ElYm4k9OfBLC-TMM2hgsvfWfle4XEFGbNNPCm8vfx2FR3QV8MUJYEkNk3OLuNQY-tS46KFyYT2kku-6HaM0P-mBRcEBJmF2LOeCW2DL9UYvTo4_FRamgR4QRidWEDwdYlTJ-zQNEgjFPUNd3YUbLkWLQS0KZ4YaUVH-swVfZts5p9cUKo1pOPxcMb_vZvU7-8iYdN00IJ_lcgf5Tbjag",
    alt: "Ilustrasi anggaran desa",
  },
];

const fallbackEvents = [
  {
    month: "Mei",
    day: "14",
    title: "Musyawarah Perencanaan Desa (Musrenbangdes)",
    time: "09:00 - Selesai",
    place: "Balai Desa Utama",
    tone: "text-secondary bg-secondary-container",
  },
  {
    month: "Mei",
    day: "20",
    title: "Pesta Rakyat & Bazar UMKM Lokal",
    time: "15:30 - 21:00",
    place: "Lapangan Olahraga",
    tone: "text-tertiary bg-tertiary-fixed-dim/20",
  },
  {
    month: "Jun",
    day: "02",
    title: "Penyuluhan Kesehatan Lansia",
    time: "08:00 - 12:00",
    place: "Posyandu Melati",
    tone: "text-secondary bg-secondary-container",
  },
];

function formatAgendaDate(value: string) {
  const date = new Date(value);

  return {
    month: new Intl.DateTimeFormat("id-ID", { month: "short" }).format(date),
    day: new Intl.DateTimeFormat("id-ID", { day: "2-digit" }).format(date),
  };
}

function formatAgendaTime(agenda: PublicAgenda) {
  const start = new Date(agenda.startAt);
  const timeFormatter = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (!agenda.endAt) {
    return `${timeFormatter.format(start)} - Selesai`;
  }

  return `${timeFormatter.format(start)} - ${timeFormatter.format(
    new Date(agenda.endAt)
  )}`;
}

async function getEvents() {
  try {
    const agendas = await getHomepageAgendas(3);

    if (agendas.length === 0) {
      return fallbackEvents;
    }

    return agendas.map((agenda, index) => {
      const date = formatAgendaDate(agenda.startAt);

      return {
        month: date.month,
        day: date.day,
        title: agenda.title,
        time: formatAgendaTime(agenda),
        place: agenda.location,
        tone:
          index % 2 === 0
            ? "text-secondary bg-secondary-container"
            : "text-tertiary bg-tertiary-fixed-dim/20",
      };
    });
  } catch (error) {
    console.error("HOMEPAGE_AGENDA_ERROR", error);
    return fallbackEvents;
  }
}

export default async function NewsEvents() {
  const events = await getEvents();

  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-16 flex items-center gap-4">
          <div className="h-px flex-1 bg-outline-variant" />
          <h2 className="whitespace-nowrap font-headline text-2xl font-extrabold text-primary sm:text-3xl">
            Kabar &amp; Agenda Desa
          </h2>
          <div className="h-px flex-1 bg-outline-variant" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <article className="group relative aspect-[16/10] overflow-hidden rounded-3xl sm:aspect-[16/9]">
              <Image
                alt="Warga desa bergotong royong di area persawahan"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYK3LQa2WgdtCDaMs2SddHGeS1T4v6agYaWQ2kWl41jzCBVEMjndgMXnff5_3X6SCjtqYkKd2F9RgKJ1CXUzEFYBUdaLZL8Sdpxxb9cTkaLe5KHli-NMn6PguM0CjrajuSC9EjnxOiM1haiEw0vMPea0EBq9w_wpOV5JEpiPBON1fOQI0xezCrqJgeWPc5MAr2FAGNpimtCkqOwt5j_CsGD4FHha46a9RI-NaZAqkLxh7yKv87URTP68lWlZujZ4zA8w7trc8z-g"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-5 sm:p-10">
                <div className="mb-4 flex flex-wrap gap-3">
                  <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    Pembangunan
                  </span>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
                    5 Menit Lalu
                  </span>
                </div>
                <h3 className="mb-4 font-headline text-2xl font-bold leading-tight text-white sm:text-3xl">
                  Revitalisasi Irigasi Dusun Sukamaju Resmi Dimulai: Target
                  Selesai Sebelum Musim Tanam
                </h3>
                <p className="mb-6 max-w-2xl text-sm text-white/70 sm:text-base">
                  Program kerja bakti serentak ini melibatkan 200 warga guna
                  memastikan aliran air ke sawah seluas 40 hektar tetap lancar
                  selama musim kemarau mendatang.
                </p>
                <Link
                  className="inline-flex items-center gap-2 font-bold text-white transition-all hover:gap-4"
                  href="/berita"
                >
                  Baca Selengkapnya
                  <span className="material-symbols-outlined">
                    arrow_right_alt
                  </span>
                </Link>
              </div>
            </article>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {newsItems.map((item) => (
                <Link
                  className="flex items-start gap-6"
                  href="/berita"
                  key={item.title}
                >
                  <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-200">
                    <Image
                      alt={item.alt}
                      className="h-full w-full object-cover"
                      fill
                      sizes="128px"
                      src={item.image}
                    />
                  </div>
                  <div>
                    <h4 className="mb-2 font-bold text-primary hover:text-secondary">
                      {item.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant">
                      {item.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <h3 className="flex items-center gap-3 font-headline text-xl font-bold text-primary">
              <span className="material-symbols-outlined text-secondary">
                event
              </span>
              Agenda Mendatang
            </h3>
            <div className="space-y-4">
              {events.map((event) => (
                <article
                  className="flex gap-5 rounded-2xl border border-transparent bg-surface-container-low p-4 transition-all hover:border-secondary-container"
                  key={`${event.month}-${event.day}-${event.title}`}
                >
                  <div className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-white shadow-sm">
                    <span className="text-xs font-bold uppercase text-secondary">
                      {event.month}
                    </span>
                    <span className="font-headline text-2xl font-black text-primary">
                      {event.day}
                    </span>
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-bold text-primary">
                      {event.title}
                    </h4>
                    <p className="mb-2 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined align-middle text-xs">
                        schedule
                      </span>{" "}
                      {event.time}
                    </p>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${event.tone}`}
                    >
                      {event.place}
                    </span>
                  </div>
                </article>
              ))}
            </div>
            <button className="w-full rounded-2xl border-2 border-dashed border-outline-variant py-4 text-sm font-bold text-on-surface-variant transition-all hover:bg-surface-container-high">
              Unduh Kalender Desa (PDF)
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
