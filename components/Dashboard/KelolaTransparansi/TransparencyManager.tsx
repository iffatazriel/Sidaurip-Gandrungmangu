"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import type {
  TransparencyForm,
  TransparencyRecord,
  TransparencyResponse,
  TransparencyStatus,
} from "./types";

const emptyResponse: TransparencyResponse = {
  data: [],
  meta: {
    page: 1,
    perPage: 10,
    total: 0,
    totalPages: 1,
    categories: [],
  },
  stats: {
    totalBudget: 0,
    totalRealized: 0,
    realizationRate: 0,
    totalRecords: 0,
    publishedRecords: 0,
  },
};

const emptyForm: TransparencyForm = {
  activity: "",
  category: "Pemerintahan",
  budget: "",
  realized: "",
  note: "",
  status: "DRAFT",
};

const fallbackCategories = [
  "Pemerintahan",
  "Infrastruktur",
  "Pembinaan",
  "Pemberdayaan",
  "Bencana",
];

const statuses = ["ALL", "PUBLISHED", "DRAFT"];

function formatRupiah(value: number) {
  return value.toLocaleString("id-ID");
}

function formatCompactRupiah(value: number) {
  if (value >= 1_000_000_000) {
    return `Rp ${(value / 1_000_000_000).toLocaleString("id-ID", {
      maximumFractionDigits: 2,
    })}B`;
  }

  return `Rp ${(value / 1_000_000).toLocaleString("id-ID", {
    maximumFractionDigits: 0,
  })}M`;
}

function parseMoney(value: string) {
  const numeric = value.replace(/[^\d]/g, "");
  return numeric ? Number(numeric) : 0;
}

function recordToForm(record: TransparencyRecord): TransparencyForm {
  return {
    id: record.id,
    activity: record.activity,
    category: record.category,
    budget: String(record.budget),
    realized: String(record.realized),
    note: record.note ?? "",
    status: record.status,
  };
}

function downloadCsv(records: TransparencyRecord[]) {
  const headers = ["activity", "category", "budget", "realized", "status", "note"];
  const rows = records.map((record) =>
    [
      record.activity,
      record.category,
      record.budget,
      record.realized,
      record.status,
      record.note ?? "",
    ]
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(",")
  );
  const blob = new Blob([[headers.join(","), ...rows].join("\n")], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "transparansi-apbdes.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function TransparencyManager() {
  const [response, setResponse] = useState<TransparencyResponse>(emptyResponse);
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [form, setForm] = useState<TransparencyForm>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryString = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      perPage: "10",
    });

    if (category !== "ALL") params.set("category", category);
    if (status !== "ALL") params.set("status", status);
    if (search.trim()) params.set("search", search.trim());

    return params.toString();
  }, [category, page, search, status]);

  const categoryOptions = useMemo(
    () => Array.from(new Set(["Semua Data", ...fallbackCategories, ...response.meta.categories])),
    [response.meta.categories]
  );

  const loadRecords = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetch(`/api/transparansi?${queryString}`, {
        cache: "no-store",
      });

      if (!result.ok) {
        throw new Error("Gagal mengambil data transparansi");
      }

      setResponse((await result.json()) as TransparencyResponse);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Gagal mengambil data transparansi"
      );
    } finally {
      setIsLoading(false);
    }
  }, [queryString]);

  useEffect(() => {
    // Data transparansi dimuat ulang saat filter berubah.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadRecords();
  }, [loadRecords]);

  const resetForm = () => setForm(emptyForm);

  const submitRecord = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const result = await fetch("/api/transparansi", {
        method: form.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          budget: parseMoney(form.budget),
          realized: parseMoney(form.realized),
        }),
      });

      if (!result.ok) {
        const body = (await result.json()) as { message?: string };
        throw new Error(body.message ?? "Gagal menyimpan data transparansi");
      }

      resetForm();
      await loadRecords();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal menyimpan data transparansi"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const deleteRecord = async (record: TransparencyRecord) => {
    const confirmed = window.confirm(`Hapus data "${record.activity}"?`);
    if (!confirmed) return;

    const result = await fetch(`/api/transparansi?id=${record.id}`, {
      method: "DELETE",
    });

    if (!result.ok) {
      setError("Gagal menghapus data transparansi");
      return;
    }

    await loadRecords();
  };

  const updateStatus = async (
    record: TransparencyRecord,
    nextStatus: TransparencyStatus
  ) => {
    const result = await fetch("/api/transparansi", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: record.id, status: nextStatus }),
    });

    if (!result.ok) {
      setError("Gagal mengubah status data");
      return;
    }

    await loadRecords();
  };

  const firstShown =
    response.meta.total === 0
      ? 0
      : (response.meta.page - 1) * response.meta.perPage + 1;
  const lastShown = Math.min(
    response.meta.page * response.meta.perPage,
    response.meta.total
  );

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 p-8">
      <section className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary-container">
            Financial Transparency
          </h2>
          <p className="font-medium text-on-surface-variant">
            Manage APBDes allocation and realization data shown on the public transparency page.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => downloadCsv(response.data)}
            className="flex items-center gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest px-5 py-2.5 text-sm font-semibold text-on-surface shadow-sm transition-colors hover:bg-surface-bright"
          >
            <span className="material-symbols-outlined text-lg">file_download</span>
            Export Report
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="flex items-center gap-2 rounded-xl bg-secondary px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-secondary/20 transition-all hover:opacity-90 active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            New Data
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="group relative overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
          <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <span className="material-symbols-outlined text-6xl text-primary">payments</span>
          </div>
          <div className="relative z-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
              Total Budget
            </p>
            <h3 className="text-2xl font-extrabold text-blue-900">
              {formatCompactRupiah(response.stats.totalBudget)}
            </h3>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
          <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <span className="material-symbols-outlined text-6xl text-secondary">
              account_balance_wallet
            </span>
          </div>
          <div className="relative z-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
              Total Realization
            </p>
            <h3 className="text-2xl font-extrabold text-blue-900">
              {formatCompactRupiah(response.stats.totalRealized)}
            </h3>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="transparency-data-bar h-full rounded-full bg-secondary"
                style={{ width: `${Math.min(response.stats.realizationRate, 100)}%` }}
              />
            </div>
            <p className="mt-2 text-[10px] font-bold uppercase text-slate-400">
              {response.stats.realizationRate}% Absorbed
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-primary-container p-6 text-white shadow-xl shadow-blue-900/20 md:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-transparent opacity-50" />
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-blue-200">
                Published Data
              </p>
              <h3 className="text-xl font-bold">
                {response.stats.publishedRecords} of {response.stats.totalRecords} Records
              </h3>
            </div>
            <span className="material-symbols-outlined text-blue-200">query_stats</span>
          </div>
          <div className="relative z-10 mt-6 grid grid-cols-3 gap-4">
            {response.data.slice(0, 3).map((record, index) => {
              const rate =
                record.budget === 0
                  ? 0
                  : Math.round((record.realized / record.budget) * 1000) / 10;

              return (
                <div className="space-y-2" key={record.id}>
                  <div className="flex h-16 items-end gap-1">
                    <div
                      className="transparency-data-column w-full rounded-t-sm bg-secondary"
                      style={{
                        height: `${Math.max(Math.min(rate, 100), 8)}%`,
                        animationDelay: `${index * 120}ms`,
                      }}
                    />
                  </div>
                  <p className="truncate text-center text-[10px] font-bold uppercase tracking-tighter text-blue-100">
                    {record.category}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl bg-error-container px-5 py-4 text-sm font-semibold text-on-error-container">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-2xl bg-surface-container-low p-6">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-primary-container">
              <span className="material-symbols-outlined text-secondary">
                edit_document
              </span>
              {form.id ? "Edit Allocation" : "Create Allocation"}
            </h3>
            <form className="space-y-4" onSubmit={submitRecord}>
              <label className="block space-y-1.5">
                <span className="text-xs font-bold uppercase text-slate-500">
                  Uraian Kegiatan
                </span>
                <input
                  value={form.activity}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      activity: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-4 py-3 text-sm font-bold text-blue-900 focus:ring-2 focus:ring-primary-container/20"
                  placeholder="Pembangunan Desa"
                  required
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-bold uppercase text-slate-500">
                  Kategori
                </span>
                <input
                  value={form.category}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-4 py-3 text-sm focus:ring-2 focus:ring-primary-container/20"
                  placeholder="Infrastruktur"
                />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block space-y-1.5">
                  <span className="text-xs font-bold uppercase text-slate-500">
                    Budgeted
                  </span>
                  <input
                    value={form.budget}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        budget: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-4 py-3 text-sm font-bold text-blue-900 focus:ring-2 focus:ring-primary-container/20"
                    placeholder="1250000000"
                    required
                  />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-xs font-bold uppercase text-slate-500">
                    Realized
                  </span>
                  <input
                    value={form.realized}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        realized: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-4 py-3 text-sm focus:ring-2 focus:ring-primary-container/20"
                    placeholder="0"
                  />
                </label>
              </div>

              <label className="block space-y-1.5">
                <span className="text-xs font-bold uppercase text-slate-500">
                  Status
                </span>
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      status: event.target.value as TransparencyStatus,
                    }))
                  }
                  className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-4 py-3 text-sm focus:ring-2 focus:ring-primary-container/20"
                >
                  <option value="DRAFT">DRAFT</option>
                  <option value="PUBLISHED">PUBLISHED</option>
                </select>
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-bold uppercase text-slate-500">
                  Project Notes
                </span>
                <textarea
                  value={form.note}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      note: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-4 py-3 text-sm focus:ring-2 focus:ring-primary-container/20"
                  placeholder="Gaji & Ops Kantor"
                  rows={3}
                />
              </label>

              <div className="flex gap-3">
                <button
                  className="flex-1 rounded-xl bg-primary-container py-3 font-bold text-white shadow-lg shadow-blue-900/30 transition-all active:scale-95 disabled:opacity-60"
                  disabled={isSaving}
                  type="submit"
                >
                  {isSaving ? "Saving..." : "Save Financial Data"}
                </button>
                {form.id ? (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-outline-variant/30 px-4 font-bold text-on-surface-variant"
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </form>
          </div>

          <div className="rounded-2xl border border-tertiary-container/20 bg-tertiary-container/10 p-6">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-3xl text-tertiary-container">
                lightbulb
              </span>
              <div>
                <h4 className="mb-1 font-bold text-on-tertiary-container">
                  Data Sync
                </h4>
                <p className="text-sm leading-relaxed text-on-tertiary-container/80">
                  Data berstatus <span className="font-bold">PUBLISHED</span>{" "}
                  otomatis tampil di halaman Transparansi publik.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-lowest shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between">
              <h3 className="text-lg font-bold text-primary-container">
                Active Financial Records
              </h3>
              <div className="flex flex-wrap gap-3">
                <div className="relative flex flex-1 items-center md:flex-initial">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-base text-slate-400">
                    search
                  </span>
                  <input
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Cari kegiatan..."
                    className="h-10 w-full rounded-xl border border-outline-variant/30 bg-white pl-9 pr-3 text-sm font-medium text-on-surface-variant shadow-sm md:w-56"
                  />
                </div>
                <select
                  value={category}
                  onChange={(event) => {
                    setCategory(event.target.value);
                    setPage(1);
                  }}
                  className="h-10 rounded-xl border border-outline-variant/30 bg-white px-3 text-sm font-semibold text-on-surface-variant"
                >
                  {categoryOptions.map((item) => (
                    <option
                      value={item === "Semua Data" ? "ALL" : item}
                      key={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
                <select
                  value={status}
                  onChange={(event) => {
                    setStatus(event.target.value);
                    setPage(1);
                  }}
                  className="h-10 rounded-xl border border-outline-variant/30 bg-white px-3 text-sm font-semibold text-on-surface-variant"
                >
                  {statuses.map((item) => (
                    <option value={item} key={item}>
                      {item === "ALL" ? "Semua Status" : item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Activity
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Category
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Funding Status
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Completion
                    </th>
                    <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-sm font-semibold text-on-surface-variant">
                        Memuat data transparansi...
                      </td>
                    </tr>
                  ) : null}
                  {!isLoading && response.data.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-sm font-semibold text-on-surface-variant">
                        Belum ada data yang cocok.
                      </td>
                    </tr>
                  ) : null}
                  {!isLoading &&
                    response.data.map((record, index) => {
                      const completion =
                        record.budget === 0
                          ? 0
                          : Math.round((record.realized / record.budget) * 1000) / 10;
                      const isPublished = record.status === "PUBLISHED";

                      return (
                        <tr
                          className="transparency-data-row transition-colors hover:bg-slate-50/50"
                          key={record.id}
                          style={{ animationDelay: `${index * 60}ms` }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-blue-900">
                                {record.activity}
                              </span>
                              <span className="text-[10px] font-medium italic text-slate-400">
                                {record.note ?? "No notes"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="rounded-md bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                              {record.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={
                                  isPublished
                                    ? "h-2 w-2 rounded-full bg-secondary"
                                    : "h-2 w-2 rounded-full bg-tertiary-container"
                                }
                              />
                              <span className="text-xs font-bold text-on-surface">
                                Rp {formatCompactRupiah(record.realized).replace("Rp ", "")} /{" "}
                                {formatCompactRupiah(record.budget).replace("Rp ", "")}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-bold text-slate-500">
                                {completion}%
                              </span>
                              <div className="h-1 w-24 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className="transparency-data-bar h-full bg-secondary"
                                  style={{ width: `${Math.min(completion, 100)}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  updateStatus(
                                    record,
                                    isPublished ? "DRAFT" : "PUBLISHED"
                                  )
                                }
                                className="rounded-lg p-2 text-secondary transition-colors hover:bg-secondary-container/40"
                                title={isPublished ? "Move to Draft" : "Publish"}
                              >
                                <span className="material-symbols-outlined">
                                  {isPublished ? "unpublished" : "publish"}
                                </span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setForm(recordToForm(record))}
                                className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container-highest"
                                title="Edit"
                              >
                                <span className="material-symbols-outlined">edit</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteRecord(record)}
                                className="rounded-lg p-2 text-error transition-colors hover:bg-error-container/20"
                                title="Delete"
                              >
                                <span className="material-symbols-outlined">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/50 p-4 md:flex-row md:items-center md:justify-between">
              <p className="text-sm font-medium text-on-surface-variant">
                Showing{" "}
                <span className="font-bold text-primary">
                  {firstShown}-{lastShown}
                </span>{" "}
                of{" "}
                <span className="font-bold text-primary">
                  {response.meta.total}
                </span>{" "}
                entries
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low disabled:opacity-30"
                  disabled={response.meta.page <= 1}
                  onClick={() => setPage(Math.max(1, response.meta.page - 1))}
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container font-bold text-on-primary">
                  {response.meta.page}
                </button>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low disabled:opacity-30"
                  disabled={response.meta.page >= response.meta.totalPages}
                  onClick={() =>
                    setPage(Math.min(response.meta.totalPages, response.meta.page + 1))
                  }
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="group flex cursor-pointer flex-col items-center justify-center space-y-4 rounded-2xl border-2 border-dashed border-outline-variant/10 bg-surface-container-lowest p-6 text-center shadow-sm transition-colors hover:bg-slate-50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container/10 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-2xl text-primary-container">
                  picture_as_pdf
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-surface">
                  Official APBD Document
                </h4>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Placeholder upload area
                </p>
              </div>
            </div>
            <div className="group flex cursor-pointer flex-col items-center justify-center space-y-4 rounded-2xl border-2 border-dashed border-outline-variant/10 bg-surface-container-lowest p-6 text-center shadow-sm transition-colors hover:bg-slate-50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-2xl text-secondary">
                  photo_library
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-surface">
                  Realization Photos
                </h4>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Placeholder upload area
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
