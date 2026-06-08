"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/lib/dashboard";

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboard", "data"],
    queryFn: fetchDashboardData,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
}
