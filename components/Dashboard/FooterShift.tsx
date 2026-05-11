import Link from "next/link";

export default function FooterShift() {
  return (
    <div>
      <footer className="mt-auto border-t border-slate-200/50 bg-surface-container-low p-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm font-medium text-slate-400">
            © 2026 Balaidesa Digital. Part of the Civic Sanctuary Initiative.
          </p>
          <div className="flex items-center gap-6">
            <Link
              className="text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-primary"
              href="/dashboard"
            >
              Overview
            </Link>
            <Link
              className="text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-primary"
              href="/dashboard/kelolapenduduk"
            >
              Residents
            </Link>
            <Link
              className="text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-primary"
              href="/dashboard/kelolaberita"
            >
              News
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
