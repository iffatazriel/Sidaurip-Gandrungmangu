import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { ensureNotificationsTable, type Notification } from "@/lib/notifications";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureNotificationsTable();

    const rows = await prisma.$queryRaw<Notification[]>`
      SELECT id, user_id, title, message, type, link, is_read, created_at
      FROM notifications
      WHERE user_id = ${user.id}
      ORDER BY created_at DESC
      LIMIT 20
    `;

    const countResult = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*)::bigint AS count
      FROM notifications
      WHERE user_id = ${user.id} AND is_read = FALSE
    `;

    const unreadCount = Number(countResult[0]?.count ?? 0);

    return NextResponse.json({ data: rows, unreadCount });
  } catch (error) {
    console.error("NOTIFICATIONS_GET_ERROR", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureNotificationsTable();

    const body = await request.json();
    const { ids, all } = body as { ids?: number[]; all?: boolean };

    if (all) {
      await prisma.$executeRaw`
        UPDATE notifications
        SET is_read = TRUE
        WHERE user_id = ${user.id} AND is_read = FALSE
      `;
    } else if (ids && ids.length > 0) {
      await prisma.$executeRaw`
        UPDATE notifications
        SET is_read = TRUE
        WHERE id = ANY(${ids}::int[]) AND user_id = ${user.id}
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("NOTIFICATIONS_PATCH_ERROR", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureNotificationsTable();

    const body = await request.json();
    const { userId, title, message, type, link } = body as {
      userId: number;
      title: string;
      message: string;
      type?: string;
      link?: string;
    };

    if (!userId || !title || !message) {
      return NextResponse.json({ error: "userId, title, and message are required" }, { status: 400 });
    }

    await prisma.$executeRaw`
      INSERT INTO notifications (user_id, title, message, type, link)
      VALUES (${userId}, ${title}, ${message}, ${type ?? "INFO"}, ${link ?? null})
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("NOTIFICATIONS_POST_ERROR", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
