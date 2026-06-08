import { useQuery } from "@tanstack/react-query";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await fetch("/api/notifications");
      if (!response.ok) throw new Error("Failed to fetch notifications");
      return response.json();
    },
  });
}

export function useNotificationCount() {
  return useQuery({
    queryKey: ["notifications", "count"],
    queryFn: async () => {
      const response = await fetch("/api/notifications/count");
      if (!response.ok) throw new Error("Failed to fetch notification count");
      return response.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}
