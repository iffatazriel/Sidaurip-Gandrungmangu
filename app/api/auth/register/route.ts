import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { createSession, ensureAuthTables } from "@/lib/auth/session";

type RegisterInput = {
  nik?: string;
  name?: string;
  phone?: string;
  password?: string;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  try {
    await ensureAuthTables();

    const body = (await request.json()) as RegisterInput;
    const nik = text(body.nik).replace(/\D/g, "");
    const name = text(body.name);
    const phone = text(body.phone) || null;
    const password = text(body.password);

    if (nik.length !== 16) {
      return NextResponse.json({ message: "NIK harus 16 digit" }, { status: 400 });
    }

    if (!name || password.length < 8) {
      return NextResponse.json(
        { message: "Nama wajib diisi dan password minimal 8 karakter" },
        { status: 400 }
      );
    }

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
    console.error("REGISTER_ERROR", error);
    return NextResponse.json({ message: "Gagal membuat akun" }, { status: 500 });
  }
}
