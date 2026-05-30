"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import EntryModal from "./EntryModal";
import HeaderSection from "./HeaderSection";
import TableControl from "./TableControl";
import type { AgendaForm, AgendaResponse, VillageAgenda } from "./types";

const emptyResponse: AgendaResponse = {
  data: [],
  meta: {
    page: 1,
    perPage: 10,
    total: 0,
    totalPages: 1,
    categories: [],
  },
  stats: {
    total: 0,
    published: 0,
    drafts: 0,
    upcoming: 0,
  },
};

const emptyForm: AgendaForm = {
  title: "",
  category: "Umum",
  description: "",
  location: "Balai Desa Sidaurip",
  startAt: "",
  endAt: "",
  status: "DRAFT",
  featured: true,
};

function toDateTimeLocal(value: string | null) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
}

function agendaToForm(agenda: VillageAgenda): AgendaForm {
  return {
    id: agenda.id,
    title: agenda.title,
    category: agenda.category,
    description: agenda.description ?? "",
    location: agenda.location,
    startAt: toDateTimeLocal(agenda.startAt),
    endAt: toDateTimeLocal(agenda.endAt),
    status: agenda.status,
    featured: agenda.featured,
  };
}

function downloadCsv(agendas: VillageAgenda[]) {
  const headers = ["title", "category", "location", "startAt", "status", "featured"];
  const rows = agendas.map((agenda) =>
    [
      agenda.title,
      agenda.category,
      agenda.location,
      agenda.startAt,
      agenda.status,
      agenda.featured ? "yes" : "no",
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
  anchor.download = "agenda-desa.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function AgendaManager() {
  const [response, setResponse] = useState<AgendaResponse>(emptyResponse);
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<AgendaForm>(emptyForm);

  const queryString = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      perPage: "10",
    });

    if (category !== "ALL") {
      params.set("category", category);
    }
    if (status !== "ALL") {
      params.set("status", status);
    }
    if (search.trim()) {
      params.set("search", search.trim());
    }

    return params.toString();
  }, [category, page, search, status]);

  const loadAgendas = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetch(`/api/agenda?${queryString}`, {
        cache: "no-store",
      });

      if (!result.ok) {
        throw new Error("Gagal mengambil data agenda");
      }

      setResponse((await result.json()) as AgendaResponse);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Gagal mengambil data agenda"
      );
    } finally {
      setIsLoading(false);
    }
  }, [queryString]);

  useEffect(() => {
    // Data agenda dimuat ulang setiap filter, search, atau halaman berubah.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadAgendas();
  }, [loadAgendas]);

  const openNewModal = () => {
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (agenda: VillageAgenda) => {
    setForm(agendaToForm(agenda));
    setIsModalOpen(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const result = await fetch("/api/agenda", {
        method: form.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!result.ok) {
        const body = (await result.json()) as { message?: string };
        throw new Error(body.message ?? "Gagal menyimpan agenda");
      }

      setIsModalOpen(false);
      await loadAgendas();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal menyimpan agenda"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (agenda: VillageAgenda) => {
    const confirmed = window.confirm(`Hapus agenda "${agenda.title}"?`);

    if (!confirmed) {
      return;
    }

    const result = await fetch(`/api/agenda?id=${agenda.id}`, {
      method: "DELETE",
    });

    if (!result.ok) {
      setError("Gagal menghapus agenda");
      return;
    }

    await loadAgendas();
  };

  const handleStatusUpdate = async (
    agenda: VillageAgenda,
    nextStatus: VillageAgenda["status"]
  ) => {
    const result = await fetch("/api/agenda", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: agenda.id, status: nextStatus }),
    });

    if (!result.ok) {
      setError("Gagal mengubah status agenda");
      return;
    }

    await loadAgendas();
  };

  const changeFilter = (nextCategory: string) => {
    setCategory(nextCategory);
    setPage(1);
  };

  const changeStatus = (nextStatus: string) => {
    setStatus(nextStatus);
    setPage(1);
  };

  const changeSearch = (nextSearch: string) => {
    setSearch(nextSearch);
    setPage(1);
  };

  return (
    <>
      <HeaderSection stats={response.stats} onNewEntry={openNewModal} />
      <div className="px-8 pb-8">
        {error ? (
          <div className="mb-6 rounded-xl bg-error-container px-5 py-4 text-sm font-semibold text-on-error-container">
            {error}
          </div>
        ) : null}
        <TableControl
          agendas={response.data}
          categories={response.meta.categories}
          activeCategory={category}
          activeStatus={status}
          search={search}
          meta={response.meta}
          isLoading={isLoading}
          onCategoryChange={changeFilter}
          onStatusChange={changeStatus}
          onSearchChange={changeSearch}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onStatusUpdate={handleStatusUpdate}
          onExport={() => downloadCsv(response.data)}
          onPageChange={setPage}
        />
      </div>
      <EntryModal
        form={form}
        isOpen={isModalOpen}
        isSaving={isSaving}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        onChange={(field, value) =>
          setForm((current) => ({ ...current, [field]: value }))
        }
      />
    </>
  );
}
