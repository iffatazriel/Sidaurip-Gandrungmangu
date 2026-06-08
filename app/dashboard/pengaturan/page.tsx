"use client";

import { FormEvent, useState } from "react";

export default function PengaturanPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Konfirmasi password tidak sesuai" });
      return;
    }

    if (newPassword.length < 8) {
      setMessage({ type: "error", text: "Password baru minimal 8 karakter" });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.message ?? "Gagal mengubah password" });
        return;
      }

      setMessage({ type: "success", text: "Password berhasil diubah!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setMessage({ type: "error", text: "Gagal mengubah password" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="font-headline text-2xl font-extrabold text-primary">
          Pengaturan
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Kelola pengaturan akun admin Anda
        </p>
      </div>

      <div className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm">
        <h2 className="mb-6 font-headline text-lg font-extrabold text-primary">
          Ubah Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
              Password Saat Ini
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm text-primary shadow-sm"
              placeholder="Masukkan password saat ini"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
              Password Baru
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm text-primary shadow-sm"
              placeholder="Minimal 8 karakter"
              minLength={8}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
              Konfirmasi Password Baru
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm text-primary shadow-sm"
              placeholder="Ketik ulang password baru"
              minLength={8}
              required
            />
          </div>

          {message && (
            <div
              className={`rounded-xl px-5 py-4 text-sm font-semibold ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-error-container text-on-error-container"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-primary-container px-8 py-4 font-bold text-on-primary shadow-lg transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
          >
            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </form>
      </div>
    </div>
  );
}
