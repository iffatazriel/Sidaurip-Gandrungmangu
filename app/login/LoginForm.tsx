"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import type { AuthUser } from "@/lib/auth/session";

export default function LoginForm({ currentUser }: { currentUser: AuthUser | null }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ nik: "", password: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
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

      const next = searchParams.get("next");
      router.push(next || (body.role === "ADMIN" ? "/dashboard" : "/layanan-mandiri"));
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login gagal");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-widest text-tertiary">
        Login
      </p>
      <h2 className="mt-2 font-headline text-3xl font-extrabold text-primary">
        Selamat datang
      </h2>
      {currentUser ? (
        <p className="mt-4 rounded-lg bg-secondary-container p-3 text-sm font-semibold text-on-secondary-container">
          Saat ini login sebagai {currentUser.name}. Masukkan akun lain untuk
          ganti pengguna.
        </p>
      ) : null}

      <form className="mt-8 space-y-5" onSubmit={submit}>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
            NIK
          </span>
          <input
            value={form.nik}
            onChange={(event) => setForm((current) => ({ ...current, nik: event.target.value }))}
            className="w-full rounded-lg bg-surface-container-low p-4 text-sm outline-none ring-1 ring-transparent transition focus:ring-primary"
            inputMode="numeric"
            maxLength={16}
            required
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
            Password
          </span>
          <input
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            className="w-full rounded-lg bg-surface-container-low p-4 text-sm outline-none ring-1 ring-transparent transition focus:ring-primary"
            type="password"
            required
          />
        </label>
        <button
          disabled={isSubmitting}
          className="w-full rounded-lg bg-primary-container px-6 py-4 font-bold text-on-primary shadow-lg shadow-primary-container/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Masuk..." : "Masuk"}
        </button>
      </form>

      {message ? (
        <p className="mt-5 rounded-lg bg-error-container p-3 text-sm font-semibold text-on-error-container">
          {message}
        </p>
      ) : null}

      <p className="mt-6 text-sm text-on-surface-variant">
        Belum punya akun?{" "}
        <Link className="font-bold text-primary" href="/register">
          Daftar warga
        </Link>
      </p>
    </div>
  );
}
