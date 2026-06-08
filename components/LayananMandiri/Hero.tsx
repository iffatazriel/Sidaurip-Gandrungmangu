"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import type { AuthUser } from "@/lib/auth/session";

type TrackingStatus = "PENDING" | "DOCUMENT_REVIEW" | "APPROVED" | "DONE" | "REJECTED";

interface ServiceRequest {
  id: string;
  type: string;
  status: TrackingStatus;
  trackingNumber: string;
  residentName: string;
  createdAt: string;
  updatedAt: string;
}

export default function Hero({ user }: { user: AuthUser | null }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginForm, setLoginForm] = useState({ nik: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ nik: '', name: '', phone: '', password: '' });
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState<ServiceRequest | null>(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState<string | null>(null);

  const statusLabels: Record<TrackingStatus, string> = {
    PENDING: "Menunggu Diproses",
    DOCUMENT_REVIEW: "Review Dokumen",
    APPROVED: "Disetujui",
    DONE: "Selesai",
    REJECTED: "Ditolak",
  };

  const handleTrack = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = trackingNumber.trim();
    if (!trimmed) return;

    setTrackingLoading(true);
    setTrackingResult(null);
    setTrackingError(null);

    try {
      const response = await fetch(`/api/layanan-mandiri?tracking=${encodeURIComponent(trimmed)}`);
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message ?? "Permohonan tidak ditemukan");
      }

      setTrackingResult(body.data);
    } catch (error) {
      setTrackingError(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setTrackingLoading(false);
    }
  };

  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message ?? 'Login gagal');
      }

      router.push(body.role === 'ADMIN' ? '/dashboard' : '/layanan-mandiri#ajukan-layanan');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Login gagal');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm),
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message ?? 'Registrasi gagal');
      }

      router.push(body.role === 'ADMIN' ? '/dashboard' : '/layanan-mandiri#ajukan-layanan');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Registrasi gagal');
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
        <form className="space-y-3" onSubmit={handleTrack}>
          <div className="relative max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-outline">
              <span className="material-symbols-outlined" data-icon="search">
                search
              </span>
            </div>
            <input
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="w-full rounded-xl border-none bg-surface-container-lowest py-4 pl-12 pr-32 text-on-surface shadow-sm transition-all focus:ring-2 focus:ring-primary-container/40"
              placeholder="Cek nomor resi permohonan..."
              type="text"
            />
            <button
              type="submit"
              disabled={trackingLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-primary-container px-5 py-2 text-sm font-bold text-on-primary shadow transition-all hover:bg-primary-container/80 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {trackingLoading ? "..." : "Cari"}
            </button>
          </div>
          {trackingError ? (
            <p className="max-w-md rounded-lg bg-error-container p-3 text-sm font-semibold text-on-error-container">
              {trackingError}
            </p>
          ) : null}
          {trackingResult ? (
            <div className="max-w-md rounded-lg bg-surface-container-lowest p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-primary">{trackingResult.trackingNumber}</span>
                <span className="rounded-full bg-secondary-fixed px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-on-secondary-fixed">
                  {statusLabels[trackingResult.status]}
                </span>
              </div>
              <p className="mt-2 text-sm text-on-surface-variant">
                {trackingResult.type} — {trackingResult.residentName}
              </p>
              <p className="mt-1 text-xs text-outline">
                Diajukan: {new Date(trackingResult.createdAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          ) : null}
        </form>
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
              <p className="mb-6 text-sm text-on-surface-variant">
                Gunakan NIK dan kata sandi akun warga Anda.
              </p>

              <div className="mb-6 flex gap-2 rounded-lg bg-surface-container p-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setMessage(null);
                  }}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                    activeTab === 'login'
                      ? 'bg-primary-container text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setMessage(null);
                  }}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                    activeTab === 'register'
                      ? 'bg-primary-container text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  Daftar
                </button>
              </div>

              {activeTab === 'login' ? (
                <form className="space-y-6" onSubmit={submitLogin}>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-outline">
                      Nomor Induk Kependudukan
                    </label>
                    <input
                      value={loginForm.nik}
                      onChange={(event) =>
                        setLoginForm((current) => ({ ...current, nik: event.target.value }))
                      }
                      className="w-full rounded-lg border-none bg-surface-container-low p-4 transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
                      placeholder="3201234567890123"
                      inputMode="numeric"
                      maxLength={16}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-outline">
                      Kata Sandi
                    </label>
                    <input
                      value={loginForm.password}
                      onChange={(event) =>
                        setLoginForm((current) => ({ ...current, password: event.target.value }))
                      }
                      className="w-full rounded-lg border-none bg-surface-container-low p-4 transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
                      type="password"
                      placeholder="Masukkan password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-primary-container py-4 font-bold text-on-primary shadow-lg shadow-primary-container/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? 'Masuk...' : 'Masuk Layanan Mandiri'}
                  </button>
                </form>
              ) : (
                <form className="space-y-4" onSubmit={submitRegister}>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-outline">
                      NIK
                    </label>
                    <input
                      value={registerForm.nik}
                      onChange={(event) =>
                        setRegisterForm((current) => ({ ...current, nik: event.target.value }))
                      }
                      className="w-full rounded-lg border-none bg-surface-container-low p-4 transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
                      placeholder="3201234567890123"
                      inputMode="numeric"
                      maxLength={16}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-outline">
                      Nama Lengkap
                    </label>
                    <input
                      value={registerForm.name}
                      onChange={(event) =>
                        setRegisterForm((current) => ({ ...current, name: event.target.value }))
                      }
                      className="w-full rounded-lg border-none bg-surface-container-low p-4 transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
                      placeholder="Nama sesuai KTP"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-outline">
                      No. HP
                    </label>
                    <input
                      value={registerForm.phone}
                      onChange={(event) =>
                        setRegisterForm((current) => ({ ...current, phone: event.target.value }))
                      }
                      className="w-full rounded-lg border-none bg-surface-container-low p-4 transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
                      placeholder="08123456789"
                      inputMode="tel"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-outline">
                      Password
                    </label>
                    <input
                      value={registerForm.password}
                      onChange={(event) =>
                        setRegisterForm((current) => ({ ...current, password: event.target.value }))
                      }
                      className="w-full rounded-lg border-none bg-surface-container-low p-4 transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
                      type="password"
                      placeholder="Minimal 8 karakter"
                      minLength={8}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-primary-container py-4 font-bold text-on-primary shadow-lg shadow-primary-container/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? 'Mendaftar...' : 'Daftar Akun Warga'}
                  </button>
                </form>
              )}

              {message ? (
                <p className="mt-5 rounded-lg bg-error-container p-3 text-sm font-semibold text-on-error-container">
                  {message}
                </p>
              ) : null}

              <div className="mt-8 flex items-center justify-between border-t border-outline-variant/15 pt-8">
                <Link className="text-xs font-bold text-secondary hover:underline" href="/kontak">
                  Butuh Bantuan?
                </Link>
                <Link className="text-xs font-bold text-primary hover:underline" href="/layanan">
                  Info Layanan
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
