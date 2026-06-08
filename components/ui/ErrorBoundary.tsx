'use client';

import { Component, ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
          <div className="max-w-md text-center">
            <span className="material-symbols-outlined mb-4 text-6xl text-error">
              error
            </span>
            <h2 className="mb-4 font-headline text-2xl font-bold text-primary">
              Terjadi Kesalahan
            </h2>
            <p className="mb-6 text-on-surface-variant">
              Maaf, terjadi kesalahan yang tidak terduga. Silakan muat ulang halaman atau hubungi administrator jika masalah berlanjut.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => window.location.reload()}
                className="rounded-lg bg-primary-container px-6 py-3 font-bold text-on-primary transition-all hover:opacity-90"
              >
                Muat Ulang Halaman
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="rounded-lg border border-outline-variant/40 px-6 py-3 font-bold text-primary transition-all hover:bg-surface-container-low"
              >
                Coba Lagi
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 rounded-lg bg-error-container p-4 text-left">
                <summary className="cursor-pointer font-bold text-on-error-container">
                  Detail Error (Development Only)
                </summary>
                <pre className="mt-2 overflow-auto text-xs text-on-error-container">
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
      <div className="max-w-md text-center">
        <span className="material-symbols-outlined mb-4 text-6xl text-error">
          error
        </span>
        <h2 className="mb-4 font-headline text-2xl font-bold text-primary">
          Terjadi Kesalahan
        </h2>
        <p className="mb-6 text-on-surface-variant">
          Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi atau hubungi administrator jika masalah berlanjut.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-primary-container px-6 py-3 font-bold text-on-primary transition-all hover:opacity-90"
          >
            Muat Ulang Halaman
          </button>
          <button
            onClick={reset}
            className="rounded-lg border border-outline-variant/40 px-6 py-3 font-bold text-primary transition-all hover:bg-surface-container-low"
          >
            Coba Lagi
          </button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 rounded-lg bg-error-container p-4 text-left">
            <summary className="cursor-pointer font-bold text-on-error-container">
              Detail Error (Development Only)
            </summary>
            <pre className="mt-2 overflow-auto text-xs text-on-error-container">
              {error.toString()}
              {'\n\n'}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
