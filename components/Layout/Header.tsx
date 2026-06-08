"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/85 shadow-sm backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/Logo-Cilacap.png"
            alt="Logo Sidaurip"
            width={40}
            height={40}
            className="h-11 w-11 object-contain sm:h-12 sm:w-12"
            priority
            quality={100}
          />
          <span className="truncate font-headline text-lg font-extrabold tracking-tight text-blue-900 sm:text-xl">
            SIDAURIP
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "border-b-2 border-blue-900 pb-1 font-headline font-bold tracking-tight text-blue-900"
                    : "font-headline tracking-tight text-slate-600 transition-colors duration-200 hover:text-blue-800"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            className="rounded-lg bg-primary-container px-4 py-2.5 text-sm font-semibold text-on-primary transition-all hover:opacity-90 sm:px-6 sm:text-base"
            href="/layanan-mandiri"
          >
            Layanan Mandiri
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-blue-900 shadow-sm transition hover:bg-slate-50 lg:hidden"
        >
          <span className="material-symbols-outlined">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-4 shadow-md backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => {
              const isActive = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "rounded-lg bg-blue-900 px-4 py-3 font-headline font-bold tracking-tight text-white"
                      : "rounded-lg px-4 py-3 font-headline tracking-tight text-slate-700 transition hover:bg-slate-100 hover:text-blue-900"
                  }
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/layanan-mandiri"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 rounded-lg bg-primary-container px-4 py-3 text-center text-sm font-semibold text-on-primary transition-all hover:opacity-90"
            >
              Layanan Mandiri
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
