import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import AccountManager from "@/components/Dashboard/AkunWarga/AccountManager";
import { ensureAuthTables } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

type UserRow = {
  id: number;
  nik: string;
  name: string;
  phone: string | null;
  role: string;
  status: string;
  created_at: Date;
};

async function getAccounts() {
  await ensureAuthTables();

  const users = await prisma.$queryRaw<UserRow[]>`
    SELECT id, nik, name, phone, role, status, created_at
    FROM users
    ORDER BY created_at DESC
  `;

  return users.map((user) => ({
    id: user.id,
    nik: user.nik,
    name: user.name,
    phone: user.phone,
    role: user.role,
    status: user.status,
    createdAt: user.created_at.toISOString(),
  }));
}

export default async function AkunWargaPage() {
  const accounts = await getAccounts();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 p-6">
          <AccountManager initialAccounts={accounts} />
        </main>
      </div>
    </div>
  );
}
