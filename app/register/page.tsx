import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import RegisterForm from "./RegisterForm";

export default async function RegisterPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect(user.role === "ADMIN" ? "/dashboard" : "/layanan-mandiri");
  }

  return (
    <main className="min-h-screen bg-surface-container-low px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-lg bg-surface-container-lowest shadow-xl shadow-blue-900/10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 lg:p-12">
            <RegisterForm />
          </div>
          <div className="bg-secondary-container p-8 text-on-secondary-container lg:p-12">
            <Link href="/" className="font-headline text-2xl font-extrabold">
              SIDAURIP
            </Link>
            <div className="mt-16 max-w-md">
              <p className="text-sm font-bold uppercase tracking-widest opacity-70">
                Registrasi
              </p>
              <h1 className="mt-3 font-headline text-4xl font-extrabold leading-tight">
                Daftar dengan NIK sesuai data penduduk.
              </h1>
              <p className="mt-5 text-sm leading-7 opacity-80">
                Jika NIK cocok dengan data penduduk, akun langsung aktif. Jika
                belum ada di data, akun masuk antrean verifikasi admin.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
