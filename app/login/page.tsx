import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const user = await getCurrentUser();

  return (
    <main className="min-h-screen bg-surface-container-low px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-lg bg-surface-container-lowest shadow-xl shadow-blue-900/10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-primary-container p-8 text-on-primary lg:p-12">
            <Link href="/" className="font-headline text-2xl font-extrabold">
              SIDAURIP
            </Link>
            <div className="mt-16 max-w-md">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-100">
                Akun Warga
              </p>
              <h1 className="mt-3 font-headline text-4xl font-extrabold leading-tight">
                Masuk untuk mengajukan layanan mandiri.
              </h1>
              <p className="mt-5 text-sm leading-7 text-blue-100">
                Gunakan NIK dan password yang sudah terdaftar. Admin pertama
                yang dibuat di sistem otomatis mendapat akses dashboard.
              </p>
            </div>
          </div>
          <div className="p-8 lg:p-12">
            <LoginForm currentUser={user} />
          </div>
        </section>
      </div>
    </main>
  );
}
