"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import DocPreview from "@/components/ui/DocPreview";
import type { ServiceRequest, ResponseShape } from "./types";

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
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<ServiceRequest | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [documentNote, setDocumentNote] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [nextStatus, setNextStatus] = useState("PROCESSING");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(null), 3000);
    return () => clearTimeout(timer);
  }, [success]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const query = useMemo(() => {
    const params = new URLSearchParams({ page: String(page), perPage: "10" });
    if (status !== "ALL") params.set("status", status);
    if (debouncedSearch.trim()) params.set("search", debouncedSearch.trim());
    return params.toString();
  }, [page, status, debouncedSearch]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/layanan-mandiri?${query}`, { cache: "no-store" });
      const body = await result.json();
      if (!result.ok) throw new Error(body.message ?? "Gagal mengambil pengajuan layanan");
      setResponse({ data: body.data, meta: body.meta, stats: body.stats } as ResponseShape);
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

  useEffect(() => {
    const interval = setInterval(() => { void loadData(); }, 30000);
    return () => clearInterval(interval);
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

      const body = await response.json();
      const detail = body.data as ServiceRequest;
      setSelected(detail);
      setNextStatus(detail.status);
      setAdminNote(detail.adminNote ?? "");
      setDocumentNote(detail.documentNote ?? "");
      setRejectionReason(detail.rejectionReason ?? "");
    } catch {
      setError("Gagal memuat detail pengajuan");
      setSelected(null);
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

    const body = await result.json();
    if (!result.ok) {
      setError(body.message ?? "Gagal memperbarui status pengajuan");
      return;
    }

    setSelected(null);
    setSuccess("Status pengajuan berhasil diperbarui");
    await loadData();
  };

  const confirmDocumentAction = (documentId: number, status: string, documentName: string) => {
    setDocConfirmTarget({ documentId, status, documentName });
    setDocRejectNote("");
  };

  const updateDocument = async () => {
    if (!docConfirmTarget) return;
    const { documentId, status } = docConfirmTarget;

    if (status === "REJECTED" && !docRejectNote.trim()) {
      setError("Alasan penolakan wajib diisi");
      return;
    }

    const bodyData: Record<string, unknown> = { id: documentId, status };
    if (docRejectNote.trim()) bodyData.note = docRejectNote.trim();
    const result = await fetch("/api/layanan-mandiri/documents", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    const body = await result.json();
    if (!result.ok) {
      setError(body.message ?? "Gagal memperbarui status dokumen");
      return;
    }

    setDocConfirmTarget(null);
    setSuccess(`Dokumen berhasil ${status === "APPROVED" ? "diterima" : "ditolak"}`);
    if (selected) {
      await openRequest(selected);
    }
  };

  const [deleteTarget, setDeleteTarget] = useState<ServiceRequest | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [docConfirmTarget, setDocConfirmTarget] = useState<{ documentId: number; status: string; documentName: string } | null>(null);
  const [docRejectNote, setDocRejectNote] = useState("");

  const handleDeleteRequest = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const result = await fetch(
        `/api/layanan-mandiri?id=${encodeURIComponent(String(deleteTarget.id))}`,
        { method: "DELETE" },
      );
      const body = await result.json();
      if (!result.ok) throw new Error(body.message ?? "Gagal menghapus pengajuan");
      setDeleteTarget(null);
      await loadData();
    } catch {
      setError("Gagal menghapus pengajuan");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-8">
        <div>
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-tertiary">Management Hub</span>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary">Public Services</h1>
          <p className="mt-2 max-w-2xl text-on-surface-variant">Monitor pengajuan layanan warga dari portal layanan mandiri.</p>
        </div>
        <button
          type="button"
          onClick={loadData}
          className="ml-4 rounded-lg bg-primary-container px-4 py-2 text-sm font-bold text-on-primary shadow-md hover:opacity-90"
        >
          Refresh
        </button>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-6">
        {isLoading ? (
          <>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl bg-surface-container-lowest p-6 shadow-sm">
                <Skeleton className="mb-4 h-6 w-6 rounded-lg" />
                <Skeleton className="mb-2 h-3 w-20" />
                <Skeleton className="h-8 w-12" />
              </div>
            ))}
          </>
        ) : (
          [
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
          ))
        )}
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
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-outline">Diajukan</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-outline">Diupdate</th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest text-outline">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {isLoading ? (
                <>
                  {[...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-5"><Skeleton className="h-4 w-32" /></td>
                      <td className="px-6 py-5">
                        <Skeleton className="mb-2 h-4 w-40" />
                        <Skeleton className="h-3 w-32" />
                      </td>
                      <td className="px-6 py-5"><Skeleton className="h-4 w-36" /></td>
                      <td className="px-6 py-5"><Skeleton className="h-6 w-24 rounded-full" /></td>
                      <td className="px-6 py-5"><Skeleton className="h-4 w-28" /></td>
                      <td className="px-6 py-5"><Skeleton className="h-4 w-28" /></td>
                      <td className="px-6 py-5 text-right"><Skeleton className="ml-auto h-8 w-20" /></td>
                    </tr>
                  ))}
                </>
              ) : null}
              {!isLoading && response.data.length === 0 ? <tr><td colSpan={7} className="px-6 py-8 text-center text-sm font-semibold text-on-surface-variant">Belum ada pengajuan.</td></tr> : null}
              {!isLoading && response.data.map((request) => (
                <tr key={request.id} className="hover:bg-surface-container-low/40">
                  <td className="px-6 py-5 font-mono text-xs text-primary">{request.trackingNumber}</td>
                  <td className="px-6 py-5"><p className="font-bold text-primary">{request.applicantName}</p><p className="text-xs text-on-surface-variant">{request.nik}</p></td>
                  <td className="px-6 py-5 text-sm font-semibold text-on-surface">{request.serviceType}</td>
                  <td className="px-6 py-5"><span className="rounded-full bg-secondary-container px-3 py-1 text-[10px] font-bold uppercase text-on-secondary-container">{request.status}</span></td>
                  <td className="px-6 py-5 text-sm text-on-surface-variant">{formatDate(request.createdAt)}</td>
                  <td className="px-6 py-5 text-sm text-on-surface-variant">{formatDate(request.updatedAt)}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openRequest(request)} className="rounded-lg bg-primary-container px-4 py-2 text-xs font-bold text-on-primary">Proses</button>
                      <button onClick={() => setDeleteTarget(request)} className="rounded-lg bg-error-container px-3 py-2 text-xs font-bold text-on-error-container">
                        <span className="material-symbols-outlined text-sm" data-icon="delete">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {response.meta.totalPages > 1 ? (
          <div className="flex items-center justify-between border-t border-surface-container px-5 py-4">
            <p className="text-sm text-on-surface-variant">
              {response.meta.total} data — Halaman {response.meta.page} dari {response.meta.totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-lg border border-outline-variant/30 px-4 py-2 text-sm font-bold transition-all hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>
              {Array.from({ length: response.meta.totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`min-w-[36px] rounded-lg px-3 py-2 text-sm font-bold transition-all ${
                    page === num
                      ? "bg-primary-container text-on-primary"
                      : "hover:bg-surface-container-low"
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(response.meta.totalPages, p + 1))}
                disabled={page >= response.meta.totalPages}
                className="rounded-lg border border-outline-variant/30 px-4 py-2 text-sm font-bold transition-all hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
      {success ? <div className="rounded-xl bg-tertiary-container p-4 text-sm font-semibold text-on-tertiary-container">{success}</div> : null}
      {error ? <div className="rounded-xl bg-error-container p-4 text-sm font-semibold text-on-error-container">{error}</div> : null}

      <ConfirmDialog
        isOpen={docConfirmTarget !== null}
        onCancel={() => setDocConfirmTarget(null)}
        onConfirm={updateDocument}
        title={docConfirmTarget?.status === "APPROVED" ? "Terima Dokumen" : "Tolak Dokumen"}
        message={`Yakin ingin ${docConfirmTarget?.status === "APPROVED" ? "menerima" : "menolak"} dokumen "${docConfirmTarget?.documentName ?? ""}"?`}
        variant={docConfirmTarget?.status === "APPROVED" ? "info" : "danger"}
        confirmLabel={docConfirmTarget?.status === "APPROVED" ? "Terima" : "Tolak"}
      >
        {docConfirmTarget?.status === "REJECTED" ? (
          <textarea
            value={docRejectNote}
            onChange={(e) => setDocRejectNote(e.target.value)}
            className="min-h-20 w-full rounded-xl border border-outline-variant/30 px-4 py-3 text-sm"
            placeholder="Alasan penolakan (wajib diisi)"
          />
        ) : null}
      </ConfirmDialog>

      <ConfirmDialog
        isOpen={deleteTarget !== null}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteRequest}
        isLoading={isDeleting}
        title="Hapus Pengajuan"
        message={`Yakin ingin menghapus pengajuan ${deleteTarget?.trackingNumber ?? ""} dari ${deleteTarget?.applicantName ?? ""}? Tindakan ini tidak dapat dibatalkan.`}
        variant="danger"
        confirmLabel="Hapus"
      />

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/50 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
          onKeyDown={(e) => { if (e.key === "Escape") setSelected(null); }}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-surface-container-lowest p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
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
                      {selected.documents.map((document, dIdx) => (
                      <div key={document.id} className="flex flex-col justify-between gap-3 rounded-lg bg-surface-container-low p-3 md:flex-row md:items-center">
                        <button onClick={() => setPreviewIdx(dIdx)} className="text-left font-bold text-primary hover:underline">
                          {document.name}
                        </button>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-secondary-container px-3 py-1 text-[10px] font-bold uppercase text-on-secondary-container">{document.status}</span>
                          <button onClick={() => confirmDocumentAction(document.id, "APPROVED", document.name)} className="rounded-lg bg-primary-container px-3 py-2 text-xs font-bold text-on-primary">Terima</button>
                          <button onClick={() => confirmDocumentAction(document.id, "REJECTED", document.name)} className="rounded-lg bg-error-container px-3 py-2 text-xs font-bold text-on-error-container">Tolak</button>
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

      {previewIdx !== null && selected && (
        <DocPreview
          files={selected.documents.map((d) => ({ name: d.name, fileUrl: d.fileUrl, status: d.status }))}
          initialIndex={previewIdx}
          onClose={() => setPreviewIdx(null)}
        />
      )}
    </section>
  );
}
