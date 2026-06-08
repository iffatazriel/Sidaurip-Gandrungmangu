"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

type KbEntry = {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

const categories = ["umum", "persyaratan", "prosedur", "biaya", "pengaduan"];

export default function KnowledgeBaseManager() {
  const [entries, setEntries] = useState<KbEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<KbEntry> | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(t);
  }, [message]);

  const loadEntries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("published", "false");
      if (catFilter) params.set("category", catFilter);
      if (search) params.set("q", search);

      const res = await fetch(`/api/knowledge-base?${params.toString()}`);
      const body = await res.json();
      if (res.ok) setEntries(body.data ?? []);
      else setMessage(body.message ?? "Gagal memuat");
    } catch {
      setMessage("Gagal memuat knowledge base");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadEntries(); }, [catFilter]);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const method = editing.id ? "PATCH" : "POST";
      const res = await fetch("/api/knowledge-base", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      const body = await res.json();
      if (res.ok) {
        setEditing(null);
        setMessage(editing.id ? "Entri diperbarui" : "Entri ditambahkan");
        await loadEntries();
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
    if (!confirm("Yakin ingin menghapus entri ini?")) return;
    try {
      const res = await fetch(`/api/knowledge-base?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage("Entri dihapus");
        await loadEntries();
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

      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => setEditing({ title: "", content: "", category: "umum", tags: "", is_published: true })} className="rounded-xl bg-primary-container px-5 py-2.5 text-sm font-bold text-on-primary">
          + Tambah Entri
        </button>
        <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="rounded-xl border border-outline-variant/30 px-4 py-2.5 text-sm">
          <option value="">Semua kategori</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari..." className="flex-1 rounded-xl border border-outline-variant/30 px-4 py-2.5 text-sm" />
        <button onClick={() => void loadEntries()} className="rounded-xl bg-surface-container-high px-4 py-2.5 text-sm font-bold">Cari</button>
      </div>

      <div className="space-y-3">
        {entries.map((e) => (
          <div key={e.id} className="rounded-xl border border-outline-variant/30 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-bold">{e.title}</h4>
                <p className="mt-1 line-clamp-2 text-sm text-on-surface-variant">{e.content || "—"}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-secondary-container px-2.5 py-0.5 text-[10px] font-bold uppercase text-on-secondary-container">{e.category}</span>
                  {e.tags && e.tags.split(",").map((tag) => (
                    <span key={tag.trim()} className="rounded-full bg-surface-container-high px-2.5 py-0.5 text-[10px] text-on-surface-variant">{tag.trim()}</span>
                  ))}
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${e.is_published ? "bg-secondary-container text-on-secondary-container" : "bg-error-container text-on-error-container"}`}>
                    {e.is_published ? "Terbit" : "Draf"}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => setEditing(e)} className="text-xs font-bold text-primary hover:underline">Edit</button>
                <button onClick={() => handleDelete(e.id)} className="text-xs font-bold text-error hover:underline">Hapus</button>
              </div>
            </div>
          </div>
        ))}
        {entries.length === 0 && <p className="py-8 text-center text-on-surface-variant">Belum ada entri knowledge base</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/50 p-4 backdrop-blur-sm" onClick={() => setEditing(null)}>
          <div className="w-full max-w-2xl rounded-2xl bg-surface-container-lowest p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-headline text-xl font-extrabold text-primary">{editing.id ? "Edit Entri" : "Tambah Entri"}</h3>
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-outline">Judul</label>
                <input value={editing.title ?? ""} onChange={(e) => setEditing((p) => ({ ...p, title: e.target.value }))} className="w-full rounded-xl border border-outline-variant/30 px-4 py-3" placeholder="Judul entri" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-outline">Konten</label>
                <textarea value={editing.content ?? ""} onChange={(e) => setEditing((p) => ({ ...p, content: e.target.value }))} className="min-h-32 w-full rounded-xl border border-outline-variant/30 px-4 py-3" placeholder="Konten lengkap..." />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-outline">Kategori</label>
                  <select value={editing.category ?? "umum"} onChange={(e) => setEditing((p) => ({ ...p, category: e.target.value }))} className="w-full rounded-xl border border-outline-variant/30 px-4 py-3">
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-outline">Tags (koma)</label>
                  <input value={editing.tags ?? ""} onChange={(e) => setEditing((p) => ({ ...p, tags: e.target.value }))} className="w-full rounded-xl border border-outline-variant/30 px-4 py-3" placeholder="syarat,ktp,domisili" />
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={editing.is_published ?? true} onChange={(e) => setEditing((p) => ({ ...p, is_published: e.target.checked }))} className="h-4 w-4" />
                <span className="text-sm font-bold">Publikasikan</span>
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setEditing(null)} className="rounded-xl border border-outline-variant/30 px-5 py-2.5 text-sm font-bold">Batal</button>
              <button onClick={handleSave} disabled={saving || !editing.title?.trim()} className="rounded-xl bg-primary-container px-5 py-2.5 text-sm font-bold text-on-primary disabled:opacity-50">
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
