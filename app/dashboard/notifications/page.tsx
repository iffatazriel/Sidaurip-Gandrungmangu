"use client";

import { useNotifications } from "@/hooks/useNotifications";
import { Skeleton } from "@/components/ui/Skeleton";

const iconMap: Record<string, string> = {
  INFO: "info",
  WARNING: "warning",
  SUCCESS: "check_circle",
  ERROR: "error",
};

const colorMap: Record<string, string> = {
  INFO: "bg-blue-100 text-blue-600",
  WARNING: "bg-amber-100 text-amber-600",
  SUCCESS: "bg-green-100 text-green-600",
  ERROR: "bg-red-100 text-red-600",
};

function timeAgo(dateStr: string) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Baru saja";
  if (mins < 60) return `${mins}m lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}j lalu`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}h lalu`;
  return new Date(dateStr).toLocaleDateString("id-ID");
}

export default function NotificationsPage() {
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } =
    useNotifications();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-headline text-2xl font-extrabold text-primary">
            Notifikasi
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            {unreadCount > 0
              ? `${unreadCount} belum dibaca`
              : "Semua sudah dibaca"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="rounded-lg bg-primary-container px-4 py-2 text-sm font-bold text-on-primary transition-all hover:opacity-90"
          >
            Tandai Semua Dibaca
          </button>
        )}
      </div>

      <div className="space-y-3">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-5 shadow-sm"
            >
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="mb-1 h-5 w-48" />
                <Skeleton className="mb-2 h-4 w-72" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <span className="material-symbols-outlined mb-4 text-6xl text-outline">
              notifications_off
            </span>
            <h2 className="mb-2 font-headline text-xl font-bold text-primary">
              Tidak ada notifikasi
            </h2>
            <p className="text-on-surface-variant">
              Belum ada aktivitas yang memerlukan perhatian Anda.
            </p>
          </div>
        ) : (
          notifications.map((notif) => (
            <button
              key={notif.id}
              onClick={() => {
                if (!notif.is_read) markAsRead(notif.id);
              }}
              className={`flex w-full items-start gap-4 rounded-2xl border border-outline-variant/10 p-5 text-left shadow-sm transition-all hover:shadow-md ${
                !notif.is_read
                  ? "border-primary-container bg-primary-container/5"
                  : "bg-surface-container-lowest"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colorMap[notif.type] ?? colorMap.INFO}`}
              >
                <span className="material-symbols-outlined">
                  {iconMap[notif.type] ?? iconMap.INFO}
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-primary">{notif.title}</h3>
                  {!notif.is_read && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  )}
                </div>
                <p className="mt-1 text-sm text-on-surface-variant">
                  {notif.message}
                </p>
                <p className="mt-2 text-xs text-outline">
                  {timeAgo(notif.created_at)}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
