"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import type { AuthUser } from "@/lib/auth/session";

export default function Hero({ user }: { user: AuthUser | null }) {
  const router = useRouter();
  const [form, setForm] = useState({ nik: "", password: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message ?? "Login gagal");
      }

      router.push(body.role === "ADMIN" ? "/dashboard" : "/layanan-mandiri#ajukan-layanan");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login gagal");
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/layanan-mandiri");
    router.refresh();
  };

  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-8 py-30 lg:grid-cols-12">
      <div className="space-y-8 lg:col-span-7">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary-fixed px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-secondary-fixed">
          <span className="material-symbols-outlined text-sm" data-icon="verified_user">
            verified_user
          </span>
          Gerbang Digital Warga
        </div>
        <h1 className="font-headline text-6xl font-extrabold leading-[1.1] text-primary lg:text-7xl">
          Kesejahteraan <br />
          <span className="font-light italic text-secondary">dalam satu ketukan.</span>
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-on-surface-variant">
          Sistem Administrasi Mandiri dirancang untuk memberikan kemudahan akses
          permohonan dokumen dan pengaduan langsung dari kenyamanan rumah Anda.
        </p>
        <div className="relative max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-outline">
            <span className="material-symbols-outlined" data-icon="search">
              search
            </span>
          </div>
          <input
            className="w-full rounded-xl border-none bg-surface-container-lowest py-4 pl-12 pr-4 text-on-surface shadow-sm transition-all focus:ring-2 focus:ring-primary-container/40"
            placeholder="Cek nomor resi permohonan..."
            type="text"
          />
        </div>
      </div>

      <div className="relative lg:col-span-5">
        <div className="absolute -right-12 -top-12 -z-10 h-48 w-48 rounded-full bg-tertiary-container/10 blur-3xl" />
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-10 shadow-[0_24px_48px_-12px_rgba(0,30,64,0.08)]">
          <div className="absolute right-0 top-0 p-6 opacity-10">
            <span className="material-symbols-outlined text-7xl" data-icon="account_balance">
              account_balance
            </span>
          </div>

          {user ? (
            <div>
              <h2 className="mb-2 text-2xl font-bold text-primary">
                Halo, {user.name}
              </h2>
              <p className="mb-8 text-sm text-on-surface-variant">
                Anda sudah masuk sebagai {user.role === "ADMIN" ? "admin" : "warga"}.
              </p>
              <div className="grid gap-3">
                {user.role === "ADMIN" ? (
                  <Link
                    className="rounded-lg bg-primary-container py-4 text-center font-bold text-on-primary shadow-lg shadow-primary-container/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    href="/dashboard"
                  >
                    Buka Dashboard
                  </Link>
                ) : (
                  <Link
                    className="rounded-lg bg-primary-container py-4 text-center font-bold text-on-primary shadow-lg shadow-primary-container/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    href="#ajukan-layanan"
                  >
                    Ajukan Layanan
                  </Link>
                )}
                <button
                  className="rounded-lg bg-surface-container-low py-3 text-sm font-bold text-primary"
                  onClick={logout}
                  type="button"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="mb-2 text-2xl font-bold text-primary">Masuk ke Panel</h2>
              <p className="mb-8 text-sm text-on-surface-variant">
                Gunakan NIK dan kata sandi akun warga Anda.
              </p>
              <form className="space-y-6" onSubmit={login}>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-outline">
                    Nomor Induk Kependudukan
                  </label>
                  <input
                    className="w-full rounded-lg border-none bg-surface-container-low p-4 transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
                    inputMode="numeric"
                    maxLength={16}
                    onChange={(event) => setForm((current) => ({ ...current, nik: event.target.value }))}
                    required
                    type="text"
                    value={form.nik}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-outline">
                    Kata Sandi
                  </label>
                  <input
                    className="w-full rounded-lg border-none bg-surface-container-low p-4 transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
                    onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                    required
                    type="password"
                    value={form.password}
                  />
                </div>
                <button
                  className="w-full rounded-lg bg-primary-container py-4 font-bold text-on-primary shadow-lg shadow-primary-container/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Masuk..." : "Masuk Layanan Mandiri"}
                </button>
              </form>
              {message ? (
                <p className="mt-5 rounded-lg bg-error-container p-3 text-sm font-semibold text-on-error-container">
                  {message}
                </p>
              ) : null}
              <div className="mt-8 flex items-center justify-between border-t border-outline-variant/15 pt-8">
                <Link className="text-xs font-bold text-secondary hover:underline" href="/kontak">
                  Butuh Bantuan?
                </Link>
                <Link className="text-xs font-bold text-primary hover:underline" href="/register">
                  Daftar Akun Baru
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
