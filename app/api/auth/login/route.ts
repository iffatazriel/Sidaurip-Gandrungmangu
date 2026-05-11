import { NextRequest, NextResponse } from "next/server";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, ensureAuthTables } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

type LoginInput = {
  nik?: string;
  password?: string;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  try {
    await ensureAuthTables();

    const body = (await request.json()) as LoginInput;
    const nik = text(body.nik).replace(/\D/g, "");
    const password = text(body.password);

    if (!nik || !password) {
      return NextResponse.json({ message: "NIK dan password wajib diisi" }, { status: 400 });
    }

    const users = await prisma.$queryRaw<
      { id: number; nik: string; name: string; password_hash: string; role: string; status: string }[]
    >`
      SELECT id, nik, name, password_hash, role, status
      FROM users
      WHERE nik = ${nik}
      LIMIT 1
    `;
    const user = users[0];

    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return NextResponse.json({ message: "NIK atau password salah" }, { status: 401 });
    }

    await createSession(user.id);

    return NextResponse.json({
      id: user.id,
      nik: user.nik,
      name: user.name,
      role: user.role,
      status: user.status,
    });
  } catch (error) {
    console.error("LOGIN_ERROR", error);
    return NextResponse.json({ message: "Gagal login" }, { status: 500 });
  }
}
