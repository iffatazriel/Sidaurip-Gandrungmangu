import { NextResponse } from "next/server";

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

export function apiPaginated<T>(data: T[], meta: { page: number; perPage: number; total: number; totalPages: number }, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ success: true, data, meta, ...extra });
}
