"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Profil Desa", href: "/profil" },
  { label: "Layanan Publik", href: "/layanan" },
  { label: "Transparansi", href: "/transparansi" },
  { label: "Berita Desa", href: "/berita" },
  { label: "Kontak", href: "/kontak" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/85 shadow-sm backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="material-symbols-outlined text-3xl text-primary-container">
            account_balance
          </span>
          <span className="truncate font-headline text-lg font-extrabold tracking-tight text-blue-900 sm:text-xl">
            Sidaurip
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "border-b-2 border-blue-900 pb-1 font-headline font-bold tracking-tight text-blue-900"
                    : "font-headline tracking-tight text-slate-600 transition-colors duration-200 hover:text-blue-800"
                }
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <Link
          className="rounded-lg bg-primary-container px-4 py-2.5 text-sm font-semibold text-on-primary transition-all hover:opacity-90 sm:px-6 sm:text-base"
          href="/LayananMandiri"
        >
          Layanan Mandiri
        </Link>
      </div>
    </nav>
  );
}
