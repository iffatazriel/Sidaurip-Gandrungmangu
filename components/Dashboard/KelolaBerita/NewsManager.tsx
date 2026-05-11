"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import EntryModal from "./EntryModal";
import HeaderSection from "./HeaderSection";
import TableControl from "./TableControl";
import type { NewsPost, NewsPostForm, NewsResponse } from "./types";

const emptyResponse: NewsResponse = {
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
  },
};

const emptyForm: NewsPostForm = {
  title: "",
  author: "Admin Desa",
  category: "Umum",
  excerpt: "",
  content: "",
  imageUrl: "",
  status: "DRAFT",
};

function postToForm(post: NewsPost): NewsPostForm {
  return {
    id: post.id,
    title: post.title,
    author: post.author,
    category: post.category,
    excerpt: post.excerpt ?? "",
    content: post.content,
    imageUrl: post.imageUrl ?? "",
    status: post.status,
  };
}

function downloadCsv(posts: NewsPost[]) {
  const headers = ["title", "author", "category", "status", "createdAt"];
  const rows = posts.map((post) =>
    [post.title, post.author, post.category, post.status, post.createdAt]
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(",")
  );
  const blob = new Blob([[headers.join(","), ...rows].join("\n")], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "berita-desa.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function NewsManager() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") ?? "";
  const [response, setResponse] = useState<NewsResponse>(emptyResponse);
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<NewsPostForm>(emptyForm);

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

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetch(`/api/berita?${queryString}`, {
        cache: "no-store",
      });

      if (!result.ok) {
        throw new Error("Gagal mengambil data berita");
      }

      setResponse((await result.json()) as NewsResponse);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Gagal mengambil data berita"
      );
    } finally {
      setIsLoading(false);
    }
  }, [queryString]);

  useEffect(() => {
    // Data berita dimuat ulang setiap filter, search, atau halaman berubah.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadPosts();
  }, [loadPosts]);

  const openNewModal = () => {
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (post: NewsPost) => {
    setForm(postToForm(post));
    setIsModalOpen(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const result = await fetch("/api/berita", {
        method: form.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!result.ok) {
        const body = (await result.json()) as { message?: string };
        throw new Error(body.message ?? "Gagal menyimpan berita");
      }

      setIsModalOpen(false);
      await loadPosts();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal menyimpan berita"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (post: NewsPost) => {
    const confirmed = window.confirm(`Hapus berita "${post.title}"?`);

    if (!confirmed) {
      return;
    }

    const result = await fetch(`/api/berita?id=${post.id}`, {
      method: "DELETE",
    });

    if (!result.ok) {
      setError("Gagal menghapus berita");
      return;
    }

    await loadPosts();
  };

  const handleToggleStatus = async (post: NewsPost) => {
    const nextStatus = post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    const result = await fetch("/api/berita", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: post.id, status: nextStatus }),
    });

    if (!result.ok) {
      setError("Gagal mengubah status berita");
      return;
    }

    await loadPosts();
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
          posts={response.data}
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
          onToggleStatus={handleToggleStatus}
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
