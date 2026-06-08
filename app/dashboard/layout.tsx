import { ReactNode } from "react";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/session";
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import SidebarWrapper from "@/components/Dashboard/SidebarWrapper";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  await requireAdmin();

  return (
    <SidebarWrapper sidebar={<Sidebar />} header={<Header />}>
      {children}
    </SidebarWrapper>
  );
}
