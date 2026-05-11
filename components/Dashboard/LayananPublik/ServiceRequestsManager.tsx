"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type ServiceRequestDocument = {
  id: number;
  name: string;
  fileUrl: string;
  fileName: string;
  status: string;
  note: string | null;
  uploadedAt: string;
};

type ServiceRequest = {
  id: number;
  trackingNumber: string;
  serviceType: string;
  applicantName: string;
  nik: string;
  phone: string | null;
  address: string | null;
  notes: string | null;
  status: string;
  adminNote: string | null;
  documentNote: string | null;
  rejectionReason: string | null;
  completedAt: string | null;
  documents: ServiceRequestDocument[];
  createdAt: string;
};

type ResponseShape = {
  data: ServiceRequest[];
  meta: { page: number; perPage: number; total: number; totalPages: number };
  stats: {
    pending: number;
    needDocuments: number;
    documentReview: number;
    processing: number;
    approved: number;
    done: number;
  };
};

const emptyResponse: ResponseShape = {
  data: [],
  meta: { page: 1, perPage: 10, total: 0, totalPages: 1 },
  stats: { pending: 0, needDocuments: 0, documentReview: 0, processing: 0, approved: 0, done: 0 },
};

const statuses = [
  "ALL",
  "PENDING",
  "NEED_DOCUMENTS",
  "DOCUMENT_REVIEW",
  "PROCESSING",
  "APPROVED",
  "DONE",
  "REJECTED",
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function ServiceRequestsManager() {
  const [response, setResponse] = useState<ResponseShape>(emptyResponse);
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<ServiceRequest | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [documentNote, setDocumentNote] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [nextStatus, setNextStatus] = useState("PROCESSING");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const query = useMemo(() => {
    const params = new URLSearchParams({ page: String(page), perPage: "10" });
    if (status !== "ALL") params.set("status", status);
    if (search.trim()) params.set("search", search.trim());
    return params.toString();
  }, [page, search, status]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/layanan-mandiri?${query}`, { cache: "no-store" });
      if (!result.ok) throw new Error("Gagal mengambil pengajuan layanan");
      setResponse((await result.json()) as ResponseShape);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Gagal mengambil pengajuan layanan");
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    // Reload data when filters or pagination change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadData();
  }, [loadData]);

  const openRequest = async (request: ServiceRequest) => {
    setSelected(request);
    setNextStatus(request.status);
    setAdminNote(request.adminNote ?? "");
    setDocumentNote(request.documentNote ?? "");
    setRejectionReason(request.rejectionReason ?? "");

    try {
      const response = await fetch(`/api/layanan-mandiri?tracking=${encodeURIComponent(request.trackingNumber)}`, {
        cache: "no-store",
      });
      if (!response.ok) return;

      const detail = (await response.json()) as ServiceRequest;
      setSelected(detail);
      setNextStatus(detail.status);
      setAdminNote(detail.adminNote ?? "");
      setDocumentNote(detail.documentNote ?? "");
      setRejectionReason(detail.rejectionReason ?? "");
    } catch {
      setError("Gagal memuat detail pengajuan");
    }
  };

  const updateRequest = async () => {
    if (!selected) return;
    const result = await fetch("/api/layanan-mandiri", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selected.id,
        status: nextStatus,
        adminNote,
        documentNote,
        rejectionReason,
      }),
    });

    if (!result.ok) {
      setError("Gagal memperbarui status pengajuan");
      return;
    }

    setSelected(null);
    await loadData();
  };

  const updateDocument = async (documentId: number, documentStatus: string) => {
    const result = await fetch("/api/layanan-mandiri/documents", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: documentId, status: documentStatus }),
    });

    if (!result.ok) {
      setError("Gagal memperbarui status dokumen");
      return;
    }

    if (selected) {
      await openRequest(selected);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-8">
      <div>
        <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-tertiary">Management Hub</span>
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary">Public Services</h1>
        <p className="mt-2 max-w-2xl text-on-surface-variant">Monitor pengajuan layanan warga dari portal layanan mandiri.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-6">
        {[
          ["Pending", response.stats.pending, "pending_actions"],
          ["Need Docs", response.stats.needDocuments, "upload_file"],
          ["Review", response.stats.documentReview, "fact_check"],
          ["Processing", response.stats.processing, "hourglass_top"],
          ["Approved", response.stats.approved, "verified"],
          ["Done", response.stats.done, "task_alt"],
        ].map(([label, value, icon]) => (
          <div key={label} className="rounded-xl bg-surface-container-lowest p-6 shadow-sm">
            <span className="material-symbols-outlined mb-4 text-primary">{icon}</span>
            <p className="text-xs font-bold uppercase tracking-widest text-outline">{label}</p>
            <h3 className="mt-1 text-3xl font-extrabold text-primary">{value}</h3>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-surface-container-lowest shadow-sm">
        <div className="flex flex-col gap-3 border-b border-surface-container p-5 md:flex-row md:items-center md:justify-between">
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Cari resi, nama, atau NIK..."
            className="rounded-xl border border-outline-variant/30 px-4 py-3 text-sm md:w-80"
          />
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-outline-variant/30 px-4 py-3 text-sm font-semibold"
          >
            {statuses.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead className="bg-surface-container-low/40">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-outline">Resi</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-outline">Pemohon</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-outline">Layanan</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-outline">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-outline">Tanggal</th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest text-outline">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {isLoading ? <tr><td colSpan={6} className="px-6 py-8 text-center text-sm font-semibold text-on-surface-variant">Memuat data...</td></tr> : null}
              {!isLoading && response.data.length === 0 ? <tr><td colSpan={6} className="px-6 py-8 text-center text-sm font-semibold text-on-surface-variant">Belum ada pengajuan.</td></tr> : null}
              {!isLoading && response.data.map((request) => (
                <tr key={request.id} className="hover:bg-surface-container-low/40">
                  <td className="px-6 py-5 font-mono text-xs text-primary">{request.trackingNumber}</td>
                  <td className="px-6 py-5"><p className="font-bold text-primary">{request.applicantName}</p><p className="text-xs text-on-surface-variant">{request.nik}</p></td>
                  <td className="px-6 py-5 text-sm font-semibold text-on-surface">{request.serviceType}</td>
                  <td className="px-6 py-5"><span className="rounded-full bg-secondary-container px-3 py-1 text-[10px] font-bold uppercase text-on-secondary-container">{request.status}</span></td>
                  <td className="px-6 py-5 text-sm text-on-surface-variant">{formatDate(request.createdAt)}</td>
                  <td className="px-6 py-5 text-right"><button onClick={() => openRequest(request)} className="rounded-lg bg-primary-container px-4 py-2 text-xs font-bold text-on-primary">Proses</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {error ? <div className="rounded-xl bg-error-container p-4 text-sm font-semibold text-on-error-container">{error}</div> : null}

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-surface-container-lowest p-6 shadow-2xl">
            <h3 className="font-headline text-2xl font-extrabold text-primary">{selected.trackingNumber}</h3>
            <p className="mt-1 text-sm text-on-surface-variant">{selected.applicantName} - {selected.serviceType}</p>
            <div className="mt-5 space-y-4">
              <select value={nextStatus} onChange={(event) => setNextStatus(event.target.value)} className="w-full rounded-xl border border-outline-variant/30 px-4 py-3 font-semibold">
                {statuses.filter((item) => item !== "ALL").map((item) => <option key={item}>{item}</option>)}
              </select>
              <textarea value={adminNote} onChange={(event) => setAdminNote(event.target.value)} className="min-h-24 w-full rounded-xl border border-outline-variant/30 px-4 py-3" placeholder="Catatan umum untuk warga" />
              <textarea value={documentNote} onChange={(event) => setDocumentNote(event.target.value)} className="min-h-24 w-full rounded-xl border border-outline-variant/30 px-4 py-3" placeholder="Dokumen yang dibutuhkan. Isi saat status NEED_DOCUMENTS" />
              <textarea value={rejectionReason} onChange={(event) => setRejectionReason(event.target.value)} className="min-h-20 w-full rounded-xl border border-outline-variant/30 px-4 py-3" placeholder="Alasan penolakan. Isi saat status REJECTED" />

              {selected.documents.length ? (
                <div className="rounded-xl border border-outline-variant/30 p-4">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-outline">Dokumen Warga</p>
                  <div className="space-y-3">
                    {selected.documents.map((document) => (
                      <div key={document.id} className="flex flex-col justify-between gap-3 rounded-lg bg-surface-container-low p-3 md:flex-row md:items-center">
                        <a className="font-bold text-primary hover:underline" href={document.fileUrl} rel="noreferrer" target="_blank">
                          {document.name}
                        </a>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-secondary-container px-3 py-1 text-[10px] font-bold uppercase text-on-secondary-container">{document.status}</span>
                          <button onClick={() => updateDocument(document.id, "APPROVED")} className="rounded-lg bg-primary-container px-3 py-2 text-xs font-bold text-on-primary">Terima</button>
                          <button onClick={() => updateDocument(document.id, "REJECTED")} className="rounded-lg bg-error-container px-3 py-2 text-xs font-bold text-on-error-container">Tolak</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setSelected(null)} className="rounded-xl border border-outline-variant/30 px-5 py-2.5 text-sm font-bold">Batal</button>
              <button onClick={updateRequest} className="rounded-xl bg-primary-container px-5 py-2.5 text-sm font-bold text-on-primary">Simpan Status</button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
