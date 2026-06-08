"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationPanel from "@/components/Dashboard/NotificationPanel";

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } =
    useNotifications();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = search.trim();

    if (query) {
      router.push(`/dashboard/kelolaberita?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-slate-100 bg-white/80 px-8 py-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-center gap-6">
        <Link
          href="/dashboard"
          className="font-['Plus_Jakarta_Sans'] text-xl font-bold uppercase tracking-wider text-blue-900 dark:text-white"
        >
          Civic Sanctuary Console
        </Link>
        <form className="relative hidden md:flex" onSubmit={handleSearch}>
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>
          <input
            className="w-64 rounded-full border-none bg-slate-100 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-900/20 dark:bg-slate-800"
            placeholder="Search news records..."
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </form>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowNotif((prev) => !prev)}
            className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
            title="Notifikasi"
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[9px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
          {showNotif && (
            <NotificationPanel
              notifications={notifications}
              unreadCount={unreadCount}
              loading={loading}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
              onClose={() => setShowNotif(false)}
            />
          )}
        </div>
        <Link
          href="/dashboard/kelolapenduduk"
          className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
          title="Resident registry"
        >
          <span className="material-symbols-outlined">mail</span>
        </Link>
        <Link
          href="/dashboard"
          className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
          title="Dashboard overview"
        >
          <span className="material-symbols-outlined">help</span>
        </Link>
        <div className="mx-2 h-8 w-px bg-slate-100 dark:bg-slate-800" />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-bold text-blue-900 dark:text-blue-100">
              Admin Utama
            </p>
            <p className="text-[10px] uppercase tracking-tighter text-slate-500">
              Office Level 4
            </p>
          </div>
          <Image
            alt="Administrator Profile"
            className="h-10 w-10 rounded-full border-2 border-primary-container object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmb1H0GQcwkLNKIdhMNAIwmdeqNQ5_2STlOCgQkUa_KQNNvgJSswKJWesYbr8UjFDMuB0z-brIDOk5hat0-PyTHEonSZHE5LJhNXe5uLaBFnYPWblFXA8fayR-3gKp9GIG491P2H9vqJXt3Do1pAusqJHjCp8iKSfT198Ac0USRUobgLCesqei7osOWChY4YH0a1aONMi7MANA7cUrPNV7p9MOxi_tOSM76tzl5bVtgUe4x80LYfiUz3oknIv9YSEB0ALBX5XMLQ"
            width={40}
            height={40}
          />
        </div>
      </div>
    </header>
  );
}
