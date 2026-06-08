import { prisma } from "@/lib/prisma";

export async function ensureNotificationsTable() {
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS notifications (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'INFO',
      link TEXT,
      is_read BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications (user_id)
  `;

  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS notifications_unread_idx ON notifications (user_id, is_read)
  `;
}

export type Notification = {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: "INFO" | "WARNING" | "SUCCESS" | "ERROR";
  link: string | null;
  is_read: boolean;
  created_at: string;
};

export type NotificationsResponse = {
  data: Notification[];
  unreadCount: number;
};
