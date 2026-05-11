import type { FormEvent } from "react";
import type { NewsPostForm } from "./types";

type EntryModalProps = {
  form: NewsPostForm;
  isOpen: boolean;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (field: keyof NewsPostForm, value: string) => void;
};

export default function EntryModal({
  form,
  isOpen,
  isSaving,
  onClose,
  onSubmit,
  onChange,
}: EntryModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/50 px-4 py-8 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-surface-container-lowest shadow-2xl shadow-blue-950/30">
        <div className="flex items-center justify-between border-b border-surface-container bg-primary-container px-6 py-5 text-on-primary">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">
              News Console
            </p>
            <h3 className="font-headline text-2xl font-extrabold">
              {form.id ? "Edit Berita" : "New Entry Berita"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 transition-colors hover:bg-white/10"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={onSubmit} className="max-h-[calc(90vh-88px)] overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="md:col-span-2">
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                Judul
              </span>
              <input
                value={form.title}
                onChange={(event) => onChange("title", event.target.value)}
                className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm"
                placeholder="Masukkan judul berita"
                required
              />
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                Penulis
              </span>
              <input
                value={form.author}
                onChange={(event) => onChange("author", event.target.value)}
                className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm"
                placeholder="Admin Desa"
              />
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                Kategori
              </span>
              <input
                value={form.category}
                onChange={(event) => onChange("category", event.target.value)}
                className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm"
                placeholder="Infrastruktur"
              />
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                Status
              </span>
              <select
                value={form.status}
                onChange={(event) => onChange("status", event.target.value)}
                className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm"
              >
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
              </select>
            </label>

            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                Image URL
              </span>
              <input
                value={form.imageUrl}
                onChange={(event) => onChange("imageUrl", event.target.value)}
                className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm"
                placeholder="https://..."
              />
            </label>

            <label className="md:col-span-2">
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                Ringkasan
              </span>
              <textarea
                value={form.excerpt}
                onChange={(event) => onChange("excerpt", event.target.value)}
                className="min-h-24 w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-medium text-primary shadow-sm"
                placeholder="Ringkasan singkat berita"
              />
            </label>

            <label className="md:col-span-2">
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">
                Isi Berita
              </span>
              <textarea
                value={form.content}
                onChange={(event) => onChange("content", event.target.value)}
                className="min-h-44 w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm font-medium leading-relaxed text-primary shadow-sm"
                placeholder="Tulis isi berita lengkap"
                required
              />
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-surface-container pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-outline-variant/40 px-5 py-2.5 text-sm font-bold text-on-surface-variant transition-colors hover:bg-surface-container-low"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 rounded-xl bg-primary-container px-5 py-2.5 text-sm font-bold text-on-primary shadow-lg shadow-primary-container/20 transition-transform active:scale-95 disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-lg">save</span>
              {isSaving ? "Saving..." : "Save Entry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
