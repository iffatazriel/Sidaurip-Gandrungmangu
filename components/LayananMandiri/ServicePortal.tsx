"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const serviceTypes = [
  "Surat Domisili",
  "Surat Pengantar KTP",
  "Surat Keterangan Usaha",
  "SKTM",
  "Kartu Keluarga",
  "Aspirasi & Pengaduan",
];

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
  documents: ServiceRequestDocument[];
  createdAt: string;
};

type ServiceRequestDocument = {
  id: number;
  name: string;
  fileUrl: string;
  fileName: string;
  status: string;
  note: string | null;
  uploadedAt: string;
};

type ServicePortalUser = {
  nik: string;
  name: string;
  phone: string | null;
  role: string;
  status: string;
};

export default function ServicePortal({ user }: { user: ServicePortalUser }) {
  const router = useRouter();
  const [form, setForm] = useState({
    serviceType: serviceTypes[0],
    applicantName: user.name,
    nik: user.nik,
    phone: user.phone ?? "",
    address: "",
    notes: "",
  });
  const [tracking, setTracking] = useState("");
  const [result, setResult] = useState<ServiceRequest | null>(null);
  const [trackedRequest, setTrackedRequest] = useState<ServiceRequest | null>(null);
  const [myRequests, setMyRequests] = useState<ServiceRequest[]>([]);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  const loadMyRequests = async () => {
    try {
      const response = await fetch("/api/layanan-mandiri?mine=1", { cache: "no-store" });
      const body = await response.json();

      if (response.ok) {
        setMyRequests(body.data ?? []);
      }
    } catch {
      setMessage("Gagal memuat riwayat pengajuan");
    }
  };

  useEffect(() => {
    // Load the citizen's request history after the interactive form hydrates.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadMyRequests();
  }, []);

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/layanan-mandiri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.message ?? "Gagal mengirim pengajuan");
      }

      setResult(body as ServiceRequest);
      await loadMyRequests();
      setForm({
        serviceType: serviceTypes[0],
        applicantName: user.name,
        nik: user.nik,
        phone: user.phone ?? "",
        address: "",
        notes: "",
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Gagal mengirim pengajuan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const trackRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsTracking(true);
    setMessage(null);
    setTrackedRequest(null);

    try {
      const response = await fetch(`/api/layanan-mandiri?tracking=${encodeURIComponent(tracking.trim())}`);
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message ?? "Nomor resi tidak ditemukan");
      }

      setTrackedRequest(body as ServiceRequest);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Nomor resi tidak ditemukan");
    } finally {
      setIsTracking(false);
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const uploadDocument = async (event: FormEvent<HTMLFormElement>, requestId: number) => {
    event.preventDefault();
    setUploadingId(requestId);
    setMessage(null);

    const uploadForm = new FormData(event.currentTarget);
    uploadForm.set("serviceRequestId", String(requestId));

    try {
      const response = await fetch("/api/layanan-mandiri/documents", {
        method: "POST",
        body: uploadForm,
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message ?? "Gagal mengupload dokumen");
      }

      event.currentTarget.reset();
      await loadMyRequests();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Gagal mengupload dokumen");
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <section id="ajukan-layanan" className="bg-surface-container-low py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-8 lg:grid-cols-12">
        <div className="rounded-xl bg-surface-container-lowest p-8 shadow-sm lg:col-span-7">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-tertiary">
                Ajukan Layanan
              </span>
              <h2 className="font-headline text-3xl font-extrabold text-primary">
                Form Pengajuan Warga
              </h2>
              <p className="mt-2 text-sm font-semibold text-on-surface-variant">
                Login sebagai {user.name}
              </p>
            </div>
            <button
              className="rounded-lg bg-surface-container-low px-4 py-2 text-sm font-bold text-primary"
              onClick={logout}
              type="button"
            >
              Logout
            </button>
          </div>
          {user.status !== "VERIFIED" ? (
            <div className="mb-6 rounded-lg bg-tertiary-container p-4 text-sm font-semibold text-on-tertiary-container">
              Akun Anda masih menunggu verifikasi admin. Pengajuan dapat dikirim
              setelah akun aktif.
            </div>
          ) : null}
          <form className="grid grid-cols-1 gap-5 md:grid-cols-2" onSubmit={submitRequest}>
            <label className="md:col-span-2">
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">Jenis Layanan</span>
              <select
                value={form.serviceType}
                onChange={(event) => setForm((current) => ({ ...current, serviceType: event.target.value }))}
                className="w-full rounded-lg border-none bg-surface-container-low p-4 text-sm font-semibold text-primary"
              >
                {serviceTypes.map((service) => (
                  <option key={service}>{service}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">Nama Lengkap</span>
              <input value={form.applicantName} readOnly className="w-full rounded-lg border-none bg-surface-container-low p-4 text-on-surface-variant" required />
            </label>
            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">NIK</span>
              <input value={form.nik} readOnly className="w-full rounded-lg border-none bg-surface-container-low p-4 text-on-surface-variant" required />
            </label>
            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">No. HP</span>
              <input value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} className="w-full rounded-lg border-none bg-surface-container-low p-4" />
            </label>
            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">Alamat</span>
              <input value={form.address} onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))} className="w-full rounded-lg border-none bg-surface-container-low p-4" />
            </label>
            <label className="md:col-span-2">
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-outline">Catatan / Keperluan</span>
              <textarea value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} className="min-h-28 w-full rounded-lg border-none bg-surface-container-low p-4" />
            </label>
            <button disabled={isSubmitting || user.status !== "VERIFIED"} className="rounded-lg bg-primary-container px-6 py-4 font-bold text-on-primary shadow-lg shadow-primary-container/20 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2">
              {isSubmitting ? "Mengirim..." : "Kirim Pengajuan"}
            </button>
          </form>
          {result ? (
            <div className="mt-6 rounded-xl bg-secondary-container p-5 text-on-secondary-container">
              <p className="text-sm font-bold">Pengajuan berhasil dikirim.</p>
              <p className="mt-1 font-mono text-xl font-extrabold">{result.trackingNumber}</p>
            </div>
          ) : null}
        </div>

        <div className="rounded-xl bg-primary-container p-8 text-on-primary shadow-xl shadow-blue-900/10 lg:col-span-5">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest opacity-70">Cek Status</span>
          <h2 className="mb-6 font-headline text-3xl font-extrabold">Lacak Pengajuan</h2>
          <form className="flex gap-3" onSubmit={trackRequest}>
            <input value={tracking} onChange={(event) => setTracking(event.target.value)} placeholder="LYN-20260503-ABCDE" className="min-w-0 flex-1 rounded-lg border-none bg-white/10 px-4 py-3 text-sm placeholder:text-blue-200" />
            <button disabled={isTracking} className="rounded-lg bg-white px-5 py-3 text-sm font-bold text-primary-container">
              Lacak
            </button>
          </form>
          {trackedRequest ? (
            <div className="mt-6 rounded-xl bg-white/10 p-5">
              <p className="font-bold">{trackedRequest.serviceType}</p>
              <p className="text-sm opacity-80">{trackedRequest.applicantName}</p>
              <div className="mt-4 inline-flex rounded-full bg-secondary-fixed px-3 py-1 text-xs font-bold uppercase text-on-secondary-fixed">
                {trackedRequest.status}
              </div>
              {trackedRequest.adminNote ? <p className="mt-4 text-sm text-blue-100">{trackedRequest.adminNote}</p> : null}
            </div>
          ) : null}
          {message ? <p className="mt-5 rounded-lg bg-error-container p-3 text-sm font-semibold text-on-error-container">{message}</p> : null}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-8">
        <div className="rounded-xl bg-surface-container-lowest p-8 shadow-sm">
          <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-tertiary">
                Riwayat
              </span>
              <h2 className="font-headline text-3xl font-extrabold text-primary">
                Pengajuan Saya
              </h2>
            </div>
            <button
              className="rounded-lg bg-surface-container-low px-4 py-2 text-sm font-bold text-primary"
              onClick={loadMyRequests}
              type="button"
            >
              Muat Ulang
            </button>
          </div>

          <div className="grid gap-4">
            {myRequests.length ? (
              myRequests.map((request) => (
                <article key={request.id} className="rounded-lg border border-outline-variant/20 p-5">
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                    <div>
                      <p className="font-mono text-xs font-bold text-primary">{request.trackingNumber}</p>
                      <h3 className="mt-1 text-lg font-extrabold text-primary">{request.serviceType}</h3>
                      <p className="mt-1 text-sm text-on-surface-variant">{request.notes || "Tanpa catatan keperluan"}</p>
                    </div>
                    <span className="w-fit rounded-full bg-secondary-container px-3 py-1 text-[10px] font-bold uppercase text-on-secondary-container">
                      {request.status}
                    </span>
                  </div>

                  {request.adminNote ? (
                    <p className="mt-4 rounded-lg bg-surface-container-low p-3 text-sm font-semibold text-on-surface-variant">
                      Catatan admin: {request.adminNote}
                    </p>
                  ) : null}

                  {request.rejectionReason ? (
                    <p className="mt-4 rounded-lg bg-error-container p-3 text-sm font-semibold text-on-error-container">
                      Alasan ditolak: {request.rejectionReason}
                    </p>
                  ) : null}

                  {request.documentNote ? (
                    <div className="mt-4 rounded-lg bg-tertiary-container p-4 text-sm text-on-tertiary-container">
                      <p className="font-bold">Dokumen yang dibutuhkan</p>
                      <p className="mt-1">{request.documentNote}</p>
                    </div>
                  ) : null}

                  {request.status === "NEED_DOCUMENTS" ? (
                    <form className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto]" onSubmit={(event) => uploadDocument(event, request.id)}>
                      <input
                        className="rounded-lg bg-surface-container-low p-3 text-sm"
                        name="name"
                        placeholder="Nama dokumen, contoh: KTP"
                        required
                      />
                      <input
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="rounded-lg bg-surface-container-low p-3 text-sm"
                        name="file"
                        required
                        type="file"
                      />
                      <button
                        className="rounded-lg bg-primary-container px-5 py-3 text-sm font-bold text-on-primary disabled:opacity-60"
                        disabled={uploadingId === request.id}
                      >
                        {uploadingId === request.id ? "Upload..." : "Upload"}
                      </button>
                    </form>
                  ) : null}

                  {request.documents.length ? (
                    <div className="mt-4 grid gap-2">
                      {request.documents.map((document) => (
                        <a
                          className="flex flex-col justify-between gap-2 rounded-lg bg-surface-container-low px-4 py-3 text-sm md:flex-row md:items-center"
                          href={document.fileUrl}
                          key={document.id}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <span className="font-bold text-primary">{document.name}</span>
                          <span className="text-xs font-bold uppercase text-on-surface-variant">{document.status}</span>
                        </a>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))
            ) : (
              <p className="rounded-lg bg-surface-container-low p-5 text-sm font-semibold text-on-surface-variant">
                Belum ada pengajuan dari akun ini.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
