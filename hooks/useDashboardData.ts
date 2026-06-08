"use client";

import { useQuery } from "@tanstack/react-query";
import type { DashboardSummary, DashboardTrend, DashboardActivity } from "@/lib/dashboard";

type DashboardResponse = {
  summary: DashboardSummary;
  trends: DashboardTrend[];
  activities: DashboardActivity[];
};

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboard", "data"],
    queryFn: async (): Promise<DashboardResponse> => {
      const response = await fetch("/api/dashboard");
      if (!response.ok) throw new Error("Failed to fetch dashboard data");
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
}
