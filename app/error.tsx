'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Root error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface p-8">
      <div className="max-w-md text-center">
        <span className="material-symbols-outlined mb-6 text-8xl text-error">
          error
        </span>
        <h1 className="mb-4 font-headline text-3xl font-extrabold text-primary">
          Terjadi Kesalahan
        </h1>
        <p className="mb-8 text-lg text-on-surface-variant">
          Maaf, terjadi kesalahan yang tidak terduga. Silakan muat ulang halaman atau kembali ke beranda.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-lg bg-primary-container px-8 py-4 font-bold text-on-primary shadow-lg transition-all hover:opacity-90 active:scale-95"
          >
            Coba Lagi
          </button>
          <a
            href="/"
            className="rounded-lg border-2 border-outline-variant px-8 py-4 font-bold text-primary transition-all hover:bg-surface-container-low"
          >
            Kembali ke Beranda
          </a>
        </div>
        {process.env.NODE_ENV === 'development' && error.digest && (
          <p className="mt-6 text-xs text-on-surface-variant">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
