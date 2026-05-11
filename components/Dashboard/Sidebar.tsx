"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "grid_view" },
  { label: "News Feed", href: "/dashboard/kelolaberita", icon: "newspaper" },
  {
    label: "Public Services",
    href: "/dashboard/layananpublic",
    icon: "account_balance",
  },
  { label: "Transparency", href: "/dashboard/transparansi", icon: "equalizer" },
  { label: "Residents", href: "/dashboard/kelolapenduduk", icon: "group" },
  { label: "Citizen Accounts", href: "/dashboard/akun-warga", icon: "verified_user" },
];

const secondaryNavItems = [
  { label: "Overview", href: "/dashboard", icon: "settings" },
];

function isActivePath(pathname: string, href: string) {
  // Exact match untuk dashboard root
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }
  
  // Untuk route lain, cek exact match atau child routes
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="sticky left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-outline-variant bg-surface-container-lowest text-sm font-medium text-on-surface">
      <div className="flex h-full flex-col gap-2 overflow-y-auto p-6">
        <Link className="mb-8 flex items-center gap-3" href="/dashboard">
          <Image
            src="/Logo-Cilacap.png"
            alt="Logo Kabupaten Cilacap"
            width={96}
            height={96}
            className="h-11 w-11 object-contain sm:h-12 sm:w-12"
            priority
            quality={100}
          />
          <div>
            <h1 className="font-headline text-lg font-extrabold leading-tight text-primary">
              Balaidesa Digital
            </h1>
            <p className="text-xs text-on-surface-variant">
              Village Administration
            </p>
          </div>
        </Link>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "flex items-center gap-3 rounded-lg bg-primary-container px-4 py-3 font-bold text-on-primary shadow-sm transition-all duration-300"
                    : "flex items-center gap-3 rounded-lg px-4 py-3 text-on-surface-variant transition-all duration-300 hover:translate-x-1 hover:text-primary"
                }
                href={item.href}
                key={item.href}
              >
                <span
                  className="material-symbols-outlined"
                  data-icon={item.icon}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-1 pt-6">
          {/* <Link
            className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 font-bold text-on-secondary transition-all hover:brightness-110 active:scale-95"
            href="/dashboard/kelolaberita"
          >
            <span 
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              add
            </span>
            New Entry
          </Link> */}

          {secondaryNavItems.map((item) => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "flex items-center gap-3 rounded-lg bg-primary-container px-4 py-3 font-bold text-on-primary shadow-sm transition-all duration-300"
                    : "flex items-center gap-3 rounded-lg px-4 py-3 text-on-surface-variant transition-all duration-300 hover:translate-x-1 hover:text-primary"
                }
                href={item.href}
                key={item.href}
              >
                <span
                  className="material-symbols-outlined"
                  data-icon={item.icon}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}

          <button
            aria-label="Log out from dashboard"
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-error transition-all duration-300 hover:translate-x-1"
            onClick={logout}
            type="button"
          >
            <span 
              className="material-symbols-outlined" 
              data-icon="logout"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              logout
            </span>
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
}
