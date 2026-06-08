import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = (await request.json()) as {
      currentPassword?: string;
      newPassword?: string;
    };

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Password saat ini dan password baru wajib diisi" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: "Password baru minimal 8 karakter" },
        { status: 400 }
      );
    }

    const rows = await prisma.$queryRaw<{ password_hash: string }[]>`
      SELECT password_hash FROM users WHERE id = ${user.id}
    `;

    if (rows.length === 0) {
      return NextResponse.json({ message: "User tidak ditemukan" }, { status: 404 });
    }

    const isValid = await verifyPassword(currentPassword, rows[0].password_hash);
    if (!isValid) {
      return NextResponse.json(
        { message: "Password saat ini tidak sesuai" },
        { status: 400 }
      );
    }

    const newHash = await hashPassword(newPassword);
    await prisma.$executeRaw`
      UPDATE users SET password_hash = ${newHash} WHERE id = ${user.id}
    `;

    return NextResponse.json({ success: true, message: "Password berhasil diubah" });
  } catch (error) {
    console.error("CHANGE_PASSWORD_ERROR", error);
    return NextResponse.json({ message: "Gagal mengubah password" }, { status: 500 });
  }
}
