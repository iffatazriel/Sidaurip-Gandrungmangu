export default function FloatingWhatsApp() {
  return (
    <a
      aria-label="Hubungi WA Center"
      className="group fixed bottom-6 right-6 z-[60] flex items-center sm:bottom-8 sm:right-8"
      href="https://wa.me/6281234567890"
      rel="noreferrer"
      target="_blank"
    >
      <div className="pointer-events-none mr-3 hidden translate-x-4 rounded-xl bg-white px-4 py-2 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        <p className="text-xs font-bold text-primary">Butuh Bantuan?</p>
        <p className="text-[10px] text-on-surface-variant">Hubungi WA Center</p>
      </div>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-2xl ring-4 ring-secondary/20 transition-transform hover:scale-110 active:scale-95 sm:h-16 sm:w-16">
        <span
          className="material-symbols-outlined text-3xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          chat
        </span>
      </div>
    </a>
  );
}
