"use client";

import { useEffect, useRef } from "react";

import type { ReactNode } from "react";

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  children?: ReactNode;
};

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Hapus",
  cancelLabel = "Batal",
  variant = "danger",
  onConfirm,
  onCancel,
  isLoading = false,
  children,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      confirmRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: "warning",
      iconBg: "bg-error-container text-error",
      button: "bg-error text-white hover:opacity-90",
    },
    warning: {
      icon: "warning",
      iconBg: "bg-amber-100 text-amber-600",
      button: "bg-amber-600 text-white hover:opacity-90",
    },
    info: {
      icon: "info",
      iconBg: "bg-blue-100 text-blue-600",
      button: "bg-primary text-white hover:opacity-90",
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/50 px-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-6 shadow-2xl shadow-blue-950/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-full ${style.iconBg}`}
          >
            <span className="material-symbols-outlined text-3xl">
              {style.icon}
            </span>
          </span>
          <h3 className="mt-4 font-headline text-xl font-extrabold text-primary">
            {title}
          </h3>
          <p className="mt-2 text-sm text-on-surface-variant">{message}</p>
        </div>

        {children ? <div className="mt-4">{children}</div> : null}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-lg border border-outline-variant/40 px-6 py-3 font-bold text-primary transition-all hover:bg-surface-container-low disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            disabled={isLoading}
            className={`rounded-lg px-6 py-3 font-bold transition-all active:scale-95 disabled:opacity-50 ${style.button}`}
          >
            {isLoading ? "Memproses..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
