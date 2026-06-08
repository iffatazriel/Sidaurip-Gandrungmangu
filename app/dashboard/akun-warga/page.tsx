import AccountManager from "@/components/Dashboard/AkunWarga/AccountManager";
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

  return <AccountManager initialAccounts={accounts} />;
}
