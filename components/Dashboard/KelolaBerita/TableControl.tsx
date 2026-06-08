import type { NewsPost, NewsResponse } from "./types";
import { Skeleton } from "@/components/ui/Skeleton";

type TableControlProps = {
  posts: NewsPost[];
  categories: string[];
  activeCategory: string;
  activeStatus: string;
  search: string;
  meta: NewsResponse["meta"];
  isLoading: boolean;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  onSearchChange: (search: string) => void;
  onEdit: (post: NewsPost) => void;
  onDelete: (post: NewsPost) => void;
  onToggleStatus: (post: NewsPost) => void;
  onExport: () => void;
  onPageChange: (page: number) => void;
};

const fallbackCategories = ["Infrastruktur", "Pendidikan", "Sosial", "Kesehatan"];
const statuses = ["ALL", "PUBLISHED", "DRAFT"];

function formatDate(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function TableControl({
  posts,
  categories,
  activeCategory,
  activeStatus,
  search,
  meta,
  isLoading,
  onCategoryChange,
  onStatusChange,
  onSearchChange,
  onEdit,
  onDelete,
  onToggleStatus,
  onExport,
  onPageChange,
}: TableControlProps) {
  const categoryOptions = Array.from(
    new Set(["Semua Berita", ...fallbackCategories, ...categories])
  );
  const firstShown = meta.total === 0 ? 0 : (meta.page - 1) * meta.perPage + 1;
  const lastShown = Math.min(meta.page * meta.perPage, meta.total);

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-container bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-surface-container bg-surface-container-low/50 p-4 md:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 gap-2 overflow-x-auto">
            {categoryOptions.map((category) => {
              const value = category === "Semua Berita" ? "ALL" : category;
              const isActive = activeCategory === value;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(value)}
                  className={
                    isActive
                      ? "whitespace-nowrap rounded-full bg-primary-container px-5 py-2 text-xs font-bold uppercase tracking-wider text-on-primary"
                      : "whitespace-nowrap rounded-full bg-surface-container-high px-5 py-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:bg-surface-container-highest"
                  }
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="relative flex items-center flex-1 md:flex-initial">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-base text-slate-400 ">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Cari judul atau penulis..."
                className="h-10 w-full rounded-xl border border-outline-variant/30 bg-white pl-9 pr-3 text-sm font-medium text-on-surface-variant shadow-sm md:w-64"
              />
            </div>
            <select
              value={activeStatus}
              onChange={(event) => onStatusChange(event.target.value)}
              className="h-10 rounded-xl border border-outline-variant/30 bg-white px-3 text-sm font-semibold text-on-surface-variant"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "ALL" ? "Semua Status" : status}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={onExport}
              className="flex h-10 items-center gap-2 rounded-xl border border-outline-variant/30 px-4 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] border-separate border-spacing-0 text-left">
          <thead>
            <tr className="bg-surface-container-low/30">
              <th className="border-b border-surface-container px-8 py-5 text-xs font-bold uppercase tracking-widest text-outline">
                Judul Berita
              </th>
              <th className="border-b border-surface-container px-6 py-5 text-xs font-bold uppercase tracking-widest text-outline">
                Kategori
              </th>
              <th className="border-b border-surface-container px-6 py-5 text-xs font-bold uppercase tracking-widest text-outline">
                Tanggal Post
              </th>
              <th className="border-b border-surface-container px-6 py-5 text-xs font-bold uppercase tracking-widest text-outline">
                Status
              </th>
              <th className="border-b border-surface-container px-8 py-5 text-right text-xs font-bold uppercase tracking-widest text-outline">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-surface-container">
            {isLoading ? (
              <>
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <div>
                          <Skeleton className="mb-1 h-4 w-44" />
                          <Skeleton className="h-3 w-28" />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </td>
                    <td className="px-8 py-6">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-8 py-6 text-center">
                      <Skeleton className="mx-auto h-6 w-20 rounded-full" />
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <Skeleton className="h-8 w-8 rounded-lg" />
                        <Skeleton className="h-8 w-8 rounded-lg" />
                        <Skeleton className="h-8 w-8 rounded-lg" />
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ) : null}
            {!isLoading && posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-8 py-10 text-center text-sm font-semibold text-on-surface-variant">
                  Belum ada berita yang cocok.
                </td>
              </tr>
            ) : null}
            {!isLoading &&
              posts.map((post) => {
                const isPublished = post.status === "PUBLISHED";

                return (
                  <tr
                    key={post.id}
                    className="group transition-colors duration-200 hover:bg-surface-container-low"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div
                          className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary-container text-on-primary"
                          style={
                            post.imageUrl
                              ? {
                                  backgroundImage: `url(${post.imageUrl})`,
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                }
                              : undefined
                          }
                        >
                          {!post.imageUrl ? (
                            <span className="material-symbols-outlined">
                              article
                            </span>
                          ) : null}
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-xs truncate font-bold text-primary group-hover:text-primary-container">
                            {post.title}
                          </p>
                          <p className="text-xs text-on-surface-variant">
                            By {post.author}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-6">
                      <span className="rounded-lg bg-surface-container-high px-3 py-1 text-xs font-bold text-on-surface-variant">
                        {post.category}
                      </span>
                    </td>

                    <td className="px-6 py-6 text-sm font-medium text-on-surface-variant">
                      {formatDate(post.publishedAt ?? post.createdAt)}
                    </td>

                    <td className="px-6 py-6">
                      <span
                        className={
                          isPublished
                            ? "inline-flex items-center gap-1.5 rounded-full bg-secondary-container px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-secondary-container"
                            : "inline-flex items-center gap-1.5 rounded-full bg-tertiary-fixed px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-tertiary-fixed"
                        }
                      >
                        <span
                          className={
                            isPublished
                              ? "h-1.5 w-1.5 rounded-full bg-secondary"
                              : "h-1.5 w-1.5 rounded-full bg-tertiary"
                          }
                        />
                        {post.status}
                      </span>
                    </td>

                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          title={isPublished ? "Move to Draft" : "Publish"}
                          onClick={() => onToggleStatus(post)}
                          className="rounded-lg p-2 text-secondary transition-colors hover:bg-secondary-container/40"
                        >
                          <span className="material-symbols-outlined">
                            {isPublished ? "unpublished" : "publish"}
                          </span>
                        </button>
                        <button
                          type="button"
                          title="Edit"
                          onClick={() => onEdit(post)}
                          className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container-highest"
                        >
                          <span className="material-symbols-outlined">edit</span>
                        </button>

                        <button
                          type="button"
                          title="Delete"
                          onClick={() => onDelete(post)}
                          className="rounded-lg p-2 text-error transition-colors hover:bg-error-container/20"
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="flex flex-col gap-4 bg-surface-container-low/20 p-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-medium text-on-surface-variant">
            Showing{" "}
            <span className="font-bold text-primary">
              {firstShown}-{lastShown}
            </span>{" "}
            of <span className="font-bold text-primary">{meta.total}</span>{" "}
            entries
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low disabled:opacity-30"
              disabled={meta.page <= 1}
              onClick={() => onPageChange(Math.max(1, meta.page - 1))}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container font-bold text-on-primary">
              {meta.page}
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low disabled:opacity-30"
              disabled={meta.page >= meta.totalPages}
              onClick={() => onPageChange(Math.min(meta.totalPages, meta.page + 1))}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
