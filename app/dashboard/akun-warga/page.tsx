import AccountManager from "@/components/Dashboard/AkunWarga/AccountManager";
import { prisma } from "@/lib/prisma";

type UserRow = {
  id: number;
  nik: string;
  name: string;
  phone: string | null;
  role: string;
  status: string;
  createdAt: Date;
};

async function getAccounts() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      nik: true,
      name: true,
      phone: true,
      role: true,
      status: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return users.map((user) => ({
    id: user.id,
    nik: user.nik,
    name: user.name,
    phone: user.phone,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt.toISOString(),
  }));
}

export default async function AkunWargaPage() {
  const accounts = await getAccounts();

  return <AccountManager initialAccounts={accounts} />;
}
