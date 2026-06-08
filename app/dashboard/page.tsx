"use client";

import { useDashboardData } from "@/hooks/useDashboardData";
import ActivityCard from "@/components/Dashboard/ActivityCard";
import SummaryCards from "@/components/Dashboard/SummaryCards";
import RecentActivityCard from "@/components/Dashboard/RecentActivityCard";
import FooterShift from "@/components/Dashboard/FooterShift";

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboardData();

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-lg bg-error-container p-6 text-center">
          <p className="font-bold text-on-error-container">
            Gagal memuat data dashboard
          </p>
          <p className="mt-2 text-sm text-on-error-container/80">
            {error instanceof Error ? error.message : "Terjadi kesalahan"}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary-container border-t-primary" />
          <p className="mt-4 text-sm font-semibold text-on-surface-variant">
            Memuat data dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SummaryCards summary={data.summary} />
      <ActivityCard trends={data.trends} />
      <RecentActivityCard activities={data.activities} />
      <FooterShift />
    </>
  );
}
