import { NextRequest, NextResponse } from "next/server";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, ensureAuthTables } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";
import { loginFormSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    await ensureAuthTables();

    const body = loginFormSchema.parse(await request.json());
    const nik = body.nik;
    const password = body.password;

    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';
    const rateKey = `login:${nik}:${ip}`;
    const rateCheck = checkRateLimit(rateKey);

    if (!rateCheck.allowed) {
      const waitMinutes = Math.ceil((rateCheck.resetAt - Date.now()) / 60000);
      return NextResponse.json(
        { message: `Terlalu banyak percobaan login. Coba lagi dalam ${waitMinutes} menit` },
        { status: 429 }
      );
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

    resetRateLimit(rateKey);
    await createSession(user.id);

    return NextResponse.json({
      id: user.id,
      nik: user.nik,
      name: user.name,
      role: user.role,
      status: user.status,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.issues.map((e) => e.message);
      return NextResponse.json({ message: messages.join(", ") }, { status: 400 });
    }
    console.error("LOGIN_ERROR", error);
    return NextResponse.json({ message: "Gagal login" }, { status: 500 });
  }
}
