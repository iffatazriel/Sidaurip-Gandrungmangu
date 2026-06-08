"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Notification } from "@/lib/notifications";

type NotificationsResponse = {
  data: Notification[];
  unreadCount: number;
};

export function useNotifications() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<NotificationsResponse>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await fetch("/api/notifications");
      if (!res.ok) throw new Error("Failed to fetch notifications");
      return res.json();
    },
    refetchInterval: 30000,
    staleTime: 20000,
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [id] }),
      });
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });
      const previous = queryClient.getQueryData<NotificationsResponse>(["notifications"]);
      
      queryClient.setQueryData<NotificationsResponse>(["notifications"], (old) => {
        if (!old) return old;
        return {
          data: old.data.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
          unreadCount: Math.max(0, old.unreadCount - 1),
        };
      });

      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["notifications"], context.previous);
      }
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });
      const previous = queryClient.getQueryData<NotificationsResponse>(["notifications"]);
      
      queryClient.setQueryData<NotificationsResponse>(["notifications"], (old) => {
        if (!old) return old;
        return {
          data: old.data.map((n) => ({ ...n, is_read: true })),
          unreadCount: 0,
        };
      });

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["notifications"], context.previous);
      }
    },
  });

  return {
    notifications: data?.data ?? [],
    unreadCount: data?.unreadCount ?? 0,
    loading: isLoading,
    refresh: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
    markAsRead: (id: number) => markAsReadMutation.mutate(id),
    markAllAsRead: () => markAllAsReadMutation.mutate(),
  };
}
