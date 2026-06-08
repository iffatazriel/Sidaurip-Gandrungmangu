import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

type UserRow = {
  id: number;
  nik: string;
  name: string;
  phone: string | null;
  role: string;
  status: string;
  created_at: Date;
};

function serializeUser(user: UserRow) {
  return {
    id: user.id,
    nik: user.nik,
    name: user.name,
    phone: user.phone,
    role: user.role,
    status: user.status,
    createdAt: user.created_at.toISOString(),
  };
}

async function requireAdminRequest() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Akses dashboard membutuhkan akun admin" },
      { status: 403 }
    );
  }

  return null;
}

export async function GET() {
  try {
    const unauthorized = await requireAdminRequest();
    if (unauthorized) return unauthorized;

    const users = await prisma.$queryRaw<UserRow[]>`
      SELECT id, nik, name, phone, role, status, created_at
      FROM users
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ data: users.map(serializeUser) });
  } catch (error) {
    console.error("GET_AUTH_USERS_ERROR", error);
    return NextResponse.json({ message: "Gagal mengambil akun warga" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const unauthorized = await requireAdminRequest();
    if (unauthorized) return unauthorized;

    const body = (await request.json()) as { id?: number; status?: string; role?: string };
    const id = Number(body.id);
    const status = body.status === "VERIFIED" ? "VERIFIED" : "PENDING";
    const role = body.role === "ADMIN" ? "ADMIN" : "CITIZEN";

    if (!id) {
      return NextResponse.json({ message: "ID akun wajib diisi" }, { status: 400 });
    }

    const rows = await prisma.$queryRaw<UserRow[]>`
      UPDATE users
      SET status = ${status}, role = ${role}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, nik, name, phone, role, status, created_at
    `;

    if (!rows.length) {
      return NextResponse.json({ message: "Akun tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(serializeUser(rows[0]));
  } catch (error) {
    console.error("PATCH_AUTH_USER_ERROR", error);
    return NextResponse.json({ message: "Gagal memperbarui akun" }, { status: 500 });
  }
}
