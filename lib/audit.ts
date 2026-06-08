import { prisma } from "@/lib/prisma";

export async function ensureAuditTable() {
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      user_name TEXT NOT NULL,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id INTEGER,
      entity_name TEXT,
      old_value JSONB,
      new_value JSONB,
      ip_address TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS audit_logs_entity_idx ON audit_logs (entity_type, entity_id)
  `;

  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS audit_logs_user_idx ON audit_logs (user_id)
  `;

  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS audit_logs_created_idx ON audit_logs (created_at DESC)
  `;
}

export type AuditLogEntry = {
  id: number;
  user_id: number;
  user_name: string;
  action: "CREATE" | "UPDATE" | "DELETE";
  entity_type: string;
  entity_id: number | null;
  entity_name: string | null;
  old_value: Record<string, unknown> | null;
  new_value: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
};

export async function logAudit(
  userId: number,
  userName: string,
  action: AuditLogEntry["action"],
  entityType: string,
  entityId: number | null,
  entityName: string | null,
  oldValue: Record<string, unknown> | null,
  newValue: Record<string, unknown> | null,
  ipAddress?: string | null
) {
  await ensureAuditTable();

  await prisma.$executeRaw`
    INSERT INTO audit_logs (user_id, user_name, action, entity_type, entity_id, entity_name, old_value, new_value, ip_address)
    VALUES (
      ${userId},
      ${userName},
      ${action},
      ${entityType},
      ${entityId},
      ${entityName},
      ${oldValue ? JSON.stringify(oldValue) : null}::jsonb,
      ${newValue ? JSON.stringify(newValue) : null}::jsonb,
      ${ipAddress ?? null}
    )
  `;
}
