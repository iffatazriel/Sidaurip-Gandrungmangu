"use client";

import { useRef, useEffect } from "react";
import type { Notification } from "@/lib/notifications";
import { Skeleton } from "@/components/ui/Skeleton";

type NotificationPanelProps = {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
  onClose: () => void;
};

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

export default function NotificationPanel({
  notifications,
  unreadCount,
  loading,
  onMarkAsRead,
  onMarkAllAsRead,
  onClose,
}: NotificationPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-96 overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest shadow-2xl shadow-blue-950/20"
    >
      <div className="flex items-center justify-between border-b border-outline-variant/10 px-5 py-4">
        <h3 className="font-headline text-lg font-extrabold text-primary">
          Notifikasi
        </h3>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="text-xs font-bold text-primary hover:underline"
            >
              Tandai semua dibaca
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-full p-1 text-outline hover:bg-surface-container-low"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="space-y-3 p-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="mb-1 h-4 w-40" />
                  <Skeleton className="h-3 w-56" />
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <span className="material-symbols-outlined mb-3 text-4xl text-outline">
              notifications_off
            </span>
            <p className="text-sm font-semibold text-on-surface-variant">
              Tidak ada notifikasi
            </p>
            <p className="mt-1 text-xs text-outline">
              Notifikasi akan muncul di sini
            </p>
          </div>
        ) : (
          <div>
            {notifications.map((notif) => (
              <button
                key={notif.id}
                onClick={() => {
                  if (!notif.is_read) onMarkAsRead(notif.id);
                }}
                className={`flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-surface-container-low ${
                  !notif.is_read ? "bg-primary-container/10" : ""
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${colorMap[notif.type] ?? colorMap.INFO}`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {iconMap[notif.type] ?? iconMap.INFO}
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold text-primary">
                      {notif.title}
                    </p>
                    {!notif.is_read && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-on-surface-variant line-clamp-2">
                    {notif.message}
                  </p>
                  <p className="mt-1 text-[10px] text-outline">
                    {timeAgo(notif.created_at)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <a
          href="/dashboard/notifications"
          className="block border-t border-outline-variant/10 px-5 py-3 text-center text-xs font-bold text-primary hover:bg-surface-container-low"
        >
          Lihat semua notifikasi
        </a>
      )}
    </div>
  );
}
