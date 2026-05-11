import { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth/session";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  await requireAdmin();

  return children;
}
