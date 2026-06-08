import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function optional(value: unknown): string | null {
  const normalized = text(value);
  return normalized.length ? normalized : null;
}

const allowedStatuses = ["PENDING", "NEED_DOCUMENTS", "DOCUMENT_REVIEW", "PROCESSING", "APPROVED", "DONE", "REJECTED"];

export function serviceStatus(value: unknown): string {
  const normalized = text(value).toUpperCase();
  return allowedStatuses.includes(normalized) ? normalized : "PENDING";
}

export function documentStatus(value: unknown): string {
  const normalized = text(value).toUpperCase();
  return ["PENDING", "APPROVED", "REJECTED"].includes(normalized) ? normalized : "PENDING";
}
