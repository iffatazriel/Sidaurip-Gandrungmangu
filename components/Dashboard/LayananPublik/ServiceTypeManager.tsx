"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

type ServiceType = {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  sort_order: number;
};

export default function ServiceTypeManager() {
  const [types, setTypes] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<ServiceType> | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(t);
  }, [message]);

  const loadTypes = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/service-types");
      const body = await res.json();
      if (res.ok) setTypes(body.data ?? []);
      else setMessage(body.message ?? "Gagal memuat");
    } catch {
      setMessage("Gagal memuat jenis layanan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadTypes(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const method = editing.id ? "PATCH" : "POST";
      const res = await fetch("/api/service-types", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      const body = await res.json();
      if (res.ok) {
        setEditing(null);
        setMessage(editing.id ? "Jenis layanan diperbarui" : "Jenis layanan ditambahkan");
        await loadTypes();
      } else {
        setMessage(body.message ?? "Gagal menyimpan");
      }
    } catch {
      setMessage("Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus jenis layanan ini?")) return;
    try {
      const res = await fetch(`/api/service-types?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage("Jenis layanan dihapus");
        await loadTypes();
      } else {
        const body = await res.json();
        setMessage(body.message ?? "Gagal menghapus");
      }
    } catch {
      setMessage("Gagal menghapus");
    }
  };

  if (loading) return <div className="space-y-3"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-3/4" /></div>;

  return (
    <div className="space-y-6">
      {message && <div className="rounded-xl bg-secondary-container px-4 py-3 text-sm font-semibold text-on-secondary-container">{message}</div>}

      <button onClick={() => setEditing({ name: "", description: "", sort_order: types.length })} className="rounded-xl bg-primary-container px-5 py-2.5 text-sm font-bold text-on-primary">+ Tambah Jenis Layanan</button>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant/30 text-xs font-bold uppercase tracking-widest text-outline">
              <th className="px-3 py-3">Urutan</th>
              <th className="px-3 py-3">Nama</th>
              <th className="px-3 py-3">Deskripsi</th>
              <th className="px-3 py-3">Aktif</th>
              <th className="px-3 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {types.map((t) => (
              <tr key={t.id} className="border-b border-outline-variant/20">
                <td className="px-3 py-3">{t.sort_order}</td>
                <td className="px-3 py-3 font-semibold">{t.name}</td>
                <td className="max-w-xs truncate px-3 py-3 text-on-surface-variant">{t.description || "—"}</td>
                <td className="px-3 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${t.is_active ? "bg-secondary-container text-on-secondary-container" : "bg-error-container text-on-error-container"}`}>
                    {t.is_active ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
                <td className="flex gap-2 px-3 py-3">
                  <button onClick={() => setEditing(t)} className="text-xs font-bold text-primary hover:underline">Edit</button>
                  <button onClick={() => handleDelete(t.id)} className="text-xs font-bold text-error hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
            {types.length === 0 && <tr><td colSpan={5} className="py-8 text-center text-on-surface-variant">Belum ada jenis layanan</td></tr>}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/50 p-4 backdrop-blur-sm" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg rounded-2xl bg-surface-container-lowest p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-headline text-xl font-extrabold text-primary">{editing.id ? "Edit Jenis Layanan" : "Tambah Jenis Layanan"}</h3>
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-outline">Nama</label>
                <input value={editing.name ?? ""} onChange={(e) => setEditing((prev) => ({ ...prev, name: e.target.value }))} className="w-full rounded-xl border border-outline-variant/30 px-4 py-3" placeholder="Nama layanan" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-outline">Deskripsi</label>
                <textarea value={editing.description ?? ""} onChange={(e) => setEditing((prev) => ({ ...prev, description: e.target.value }))} className="min-h-20 w-full rounded-xl border border-outline-variant/30 px-4 py-3" placeholder="Deskripsi opsional" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-outline">Urutan</label>
                  <input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing((prev) => ({ ...prev, sort_order: Number(e.target.value) }))} className="w-full rounded-xl border border-outline-variant/30 px-4 py-3" />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-outline">Aktif</label>
                  <select value={String(editing.is_active ?? true)} onChange={(e) => setEditing((prev) => ({ ...prev, is_active: e.target.value === "true" }))} className="w-full rounded-xl border border-outline-variant/30 px-4 py-3">
                    <option value="true">Aktif</option>
                    <option value="false">Nonaktif</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setEditing(null)} className="rounded-xl border border-outline-variant/30 px-5 py-2.5 text-sm font-bold">Batal</button>
              <button onClick={handleSave} disabled={saving || !editing.name?.trim()} className="rounded-xl bg-primary-container px-5 py-2.5 text-sm font-bold text-on-primary disabled:opacity-50">
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
