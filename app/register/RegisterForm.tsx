"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ nik: "", name: "", phone: "", password: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message ?? "Registrasi gagal");
      }

      router.push(body.role === "ADMIN" ? "/dashboard" : "/layanan-mandiri");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Registrasi gagal");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-widest text-tertiary">
        Buat Akun
      </p>
      <h2 className="mt-2 font-headline text-3xl font-extrabold text-primary">
        Akun layanan warga
      </h2>

      <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={submit}>
        <label className="md:col-span-2">
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
        <label>
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
            Nama Lengkap
          </span>
          <input
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className="w-full rounded-lg bg-surface-container-low p-4 text-sm outline-none ring-1 ring-transparent transition focus:ring-primary"
            required
          />
        </label>
        <label>
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
            No. HP
          </span>
          <input
            value={form.phone}
            onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            className="w-full rounded-lg bg-surface-container-low p-4 text-sm outline-none ring-1 ring-transparent transition focus:ring-primary"
            inputMode="tel"
          />
        </label>
        <label className="md:col-span-2">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
            Password
          </span>
          <input
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            className="w-full rounded-lg bg-surface-container-low p-4 text-sm outline-none ring-1 ring-transparent transition focus:ring-primary"
            minLength={8}
            type="password"
            required
          />
        </label>
        <button
          disabled={isSubmitting}
          className="rounded-lg bg-primary-container px-6 py-4 font-bold text-on-primary shadow-lg shadow-primary-container/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2"
        >
          {isSubmitting ? "Mendaftar..." : "Daftar"}
        </button>
      </form>

      {message ? (
        <p className="mt-5 rounded-lg bg-error-container p-3 text-sm font-semibold text-on-error-container">
          {message}
        </p>
      ) : null}

      <p className="mt-6 text-sm text-on-surface-variant">
        Sudah punya akun?{" "}
        <Link className="font-bold text-primary" href="/login">
          Masuk
        </Link>
      </p>
    </div>
  );
}
