"use client";

import { useState } from "react";

type CitizenAccount = {
  id: number;
  nik: string;
  name: string;
  phone: string | null;
  role: string;
  status: string;
  createdAt: string;
};

export default function AccountManager({ initialAccounts }: { initialAccounts: CitizenAccount[] }) {
  const [accounts, setAccounts] = useState<CitizenAccount[]>(initialAccounts);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadAccounts = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/users");
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message ?? "Gagal memuat akun");
      }

      setAccounts(body.data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Gagal memuat akun");
    } finally {
      setIsLoading(false);
    }
  };

  const updateAccount = async (account: CitizenAccount, patch: Partial<CitizenAccount>) => {
    setMessage(null);

    try {
      const response = await fetch("/api/auth/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: account.id, status: account.status, role: account.role, ...patch }),
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message ?? "Gagal memperbarui akun");
      }

      setAccounts((current) => current.map((item) => (item.id === body.id ? body : item)));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Gagal memperbarui akun");
    }
  };

  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-700">
            Verifikasi
          </p>
          <h1 className="mt-2 font-headline text-2xl font-extrabold text-blue-950">
            Akun Warga
          </h1>
        </div>
        <button
          className="rounded-lg bg-blue-950 px-4 py-2 text-sm font-bold text-white"
          onClick={loadAccounts}
          type="button"
        >
          Muat Ulang
        </button>
      </div>

      {message ? (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">
          {message}
        </p>
      ) : null}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase tracking-widest text-slate-500">
            <tr>
              <th className="py-3 pr-4">Nama</th>
              <th className="py-3 pr-4">NIK</th>
              <th className="py-3 pr-4">No. HP</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4">Role</th>
              <th className="py-3 pr-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td className="py-6 text-slate-500" colSpan={6}>
                  Memuat akun...
                </td>
              </tr>
            ) : accounts.length ? (
              accounts.map((account) => (
                <tr key={account.id}>
                  <td className="py-4 pr-4 font-bold text-slate-900">{account.name}</td>
                  <td className="py-4 pr-4 font-mono text-slate-600">{account.nik}</td>
                  <td className="py-4 pr-4 text-slate-600">{account.phone ?? "-"}</td>
                  <td className="py-4 pr-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      {account.status}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <select
                      className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold"
                      value={account.role}
                      onChange={(event) => updateAccount(account, { role: event.target.value })}
                    >
                      <option value="CITIZEN">CITIZEN</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td className="py-4 pr-4">
                    <button
                      className="rounded-lg bg-blue-950 px-3 py-2 text-xs font-bold text-white disabled:bg-slate-300"
                      disabled={account.status === "VERIFIED"}
                      onClick={() => updateAccount(account, { status: "VERIFIED" })}
                      type="button"
                    >
                      Verifikasi
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-6 text-slate-500" colSpan={6}>
                  Belum ada akun warga.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
