import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const sessionCookieName = "sidaurip_session";
const sessionMaxAge = 60 * 60 * 24 * 7;

export type AuthUser = {
  id: number;
  nik: string;
  name: string;
  phone: string | null;
  role: string;
  status: string;
};

type AuthUserRow = AuthUser & {
  expires_at: Date;
};

export function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function ensureAuthTables() {
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      nik TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      phone TEXT,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'CITIZEN',
      status TEXT NOT NULL DEFAULT 'PENDING',
      resident_id INTEGER UNIQUE REFERENCES residents(id) ON DELETE SET NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS users_role_idx ON users (role)`;
  await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS users_status_idx ON users (status)`;

  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS user_sessions (
      id SERIAL PRIMARY KEY,
      token_hash TEXT NOT NULL UNIQUE,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS user_sessions_user_id_idx ON user_sessions (user_id)`;
  await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS user_sessions_expires_at_idx ON user_sessions (expires_at)`;
}

export async function createSession(userId: number) {
  await ensureAuthTables();

  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + sessionMaxAge * 1000);

  await prisma.$executeRaw`
    INSERT INTO user_sessions (token_hash, user_id, expires_at)
    VALUES (${hashSessionToken(token)}, ${userId}, ${expiresAt})
  `;

  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAge,
  });
}

export async function destroySession() {
  await ensureAuthTables();

  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  if (token) {
    await prisma.$executeRaw`DELETE FROM user_sessions WHERE token_hash = ${hashSessionToken(token)}`;
  }

  cookieStore.delete(sessionCookieName);
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  await ensureAuthTables();

  const token = (await cookies()).get(sessionCookieName)?.value;
  if (!token) {
    return null;
  }

  const rows = await prisma.$queryRaw<AuthUserRow[]>`
    SELECT u.id, u.nik, u.name, u.phone, u.role, u.status, s.expires_at
    FROM user_sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.token_hash = ${hashSessionToken(token)}
    LIMIT 1
  `;
  const user = rows[0];

  if (!user) {
    return null;
  }

  if (user.expires_at.getTime() <= Date.now()) {
    await prisma.$executeRaw`DELETE FROM user_sessions WHERE token_hash = ${hashSessionToken(token)}`;
    return null;
  }

  return {
    id: user.id,
    nik: user.nik,
    name: user.name,
    phone: user.phone,
    role: user.role,
    status: user.status,
  };
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireUser();

  if (user.role !== "ADMIN") {
    redirect("/layanan-mandiri");
  }

  return user;
}
