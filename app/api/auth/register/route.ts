import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { createSession, ensureAuthTables } from "@/lib/auth/session";
import { registerFormSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    await ensureAuthTables();

    const body = registerFormSchema.parse(await request.json());
    const nik = body.nik;
    const name = body.name;
    const phone = body.phone || null;
    const password = body.password;

    const existing = await prisma.$queryRaw<{ id: number }[]>`
      SELECT id FROM users WHERE nik = ${nik} LIMIT 1
    `;

    if (existing.length) {
      return NextResponse.json({ message: "NIK sudah terdaftar" }, { status: 409 });
    }

    const [residentRows, userCountRows] = await prisma.$transaction([
      prisma.$queryRaw<{ id: number; nama: string }[]>`
        SELECT id, nama FROM residents WHERE nik = ${nik} LIMIT 1
      `,
      prisma.$queryRaw<{ count: bigint }[]>`SELECT COUNT(*)::bigint AS count FROM users`,
    ]);

    const resident = residentRows[0];
    const isFirstUser = Number(userCountRows[0]?.count ?? 0) === 0;
    const role = isFirstUser ? "ADMIN" : "CITIZEN";
    const status = isFirstUser || resident ? "VERIFIED" : "PENDING";
    const passwordHash = await hashPassword(password);

    const users = await prisma.$queryRaw<{ id: number; role: string; status: string }[]>`
      INSERT INTO users (nik, name, phone, password_hash, role, status, resident_id)
      VALUES (
        ${nik},
        ${resident?.nama ?? name},
        ${phone},
        ${passwordHash},
        ${role},
        ${status},
        ${resident?.id ?? null}
      )
      RETURNING id, role, status
    `;

    await createSession(users[0].id);

    return NextResponse.json(
      {
        message:
          status === "VERIFIED"
            ? "Registrasi berhasil"
            : "Registrasi berhasil. Akun menunggu verifikasi admin.",
        role: users[0].role,
        status: users[0].status,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.issues.map((e) => e.message);
      return NextResponse.json({ message: messages.join(", ") }, { status: 400 });
    }
    console.error("REGISTER_ERROR", error);
    return NextResponse.json({ message: "Gagal membuat akun" }, { status: 500 });
  }
}
