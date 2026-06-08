import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { ensureNotificationsTable } from "@/lib/notifications";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureNotificationsTable();

    const result = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*)::bigint AS count
      FROM notifications
      WHERE user_id = ${user.id} AND is_read = FALSE
    `;

    return NextResponse.json({ count: Number(result[0]?.count ?? 0) });
  } catch (error) {
    console.error("NOTIFICATIONS_COUNT_ERROR", error);
    return NextResponse.json({ count: 0 });
  }
}
