'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function AgendaError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => { console.error('Agenda error:', error); }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <div className="max-w-md text-center">
        <span className="material-symbols-outlined mb-6 text-7xl text-error">event_busy</span>
        <h1 className="mb-4 font-headline text-2xl font-extrabold text-primary">Gagal Memuat Agenda</h1>
        <p className="mb-8 text-on-surface-variant">Terjadi kesalahan saat memuat data agenda desa. Silakan coba lagi.</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button onClick={reset} className="rounded-lg bg-primary-container px-6 py-3 font-bold text-on-primary transition-all hover:opacity-90">Coba Lagi</button>
          <Link href="/dashboard" className="rounded-lg border border-outline-variant/40 px-6 py-3 font-bold text-primary transition-all hover:bg-surface-container-low">Dashboard</Link>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 rounded-lg bg-error-container p-4 text-left">
            <summary className="cursor-pointer font-bold text-on-error-container">Detail Error (Development)</summary>
            <pre className="mt-2 overflow-auto text-xs text-on-error-container">{error.message}</pre>
          </details>
        )}
      </div>
    </div>
  );
}
