import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { registerFormSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = registerFormSchema.parse(await request.json());
    const nik = body.nik;
    const name = body.name;
    const phone = body.phone || null;
    const password = body.password;

    const existing = await prisma.user.findUnique({
      where: { nik },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json({ message: "NIK sudah terdaftar" }, { status: 409 });
    }

    const [resident, userCount] = await prisma.$transaction([
      prisma.resident.findUnique({
        where: { nik },
        select: { id: true, nama: true },
      }),
      prisma.user.count(),
    ]);

    const isFirstUser = userCount === 0;
    const role = isFirstUser ? "ADMIN" : "CITIZEN";
    const status = isFirstUser || resident ? "VERIFIED" : "PENDING";
    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        nik,
        name: resident?.nama ?? name,
        phone,
        passwordHash,
        role,
        status,
        residentId: resident?.id ?? null,
      },
      select: { id: true, role: true, status: true },
    });

    await createSession(user.id);

    return NextResponse.json(
      {
        message:
          status === "VERIFIED"
            ? "Registrasi berhasil"
            : "Registrasi berhasil. Akun menunggu verifikasi admin.",
        role: user.role,
        status: user.status,
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
