"use client";

const categories = ["Semua Berita", "Infrastruktur", "Pendidikan", "Sosial"];

const posts = [
  {
    title: "Pembangunan Jalan Desa Tahap 3 Dimulai",
    author: "Budi Santoso",
    category: "Infrastruktur",
    date: "12 Oct 2023",
    status: "Published",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAfD_cn0V2o6LKSdcTvGn1Ms3D7487ldru8brOm9HdRGO7igb4V1nvA0BcrHirH26j2MwyPneVdQvlHSv-GzQvXzsLhq61UGDlGXhh6s9NFpdIF4XwSTuloDxkiyoV63EOq2PqxM1UxI62RugFCzIC1AZqMeBP3jxJproVFhT11sanenLHS8gl5Ox2HVuZEOYj70W9C80ZTU4QpBnnKSPEkQG4OkHgSoe7rSZEYcxnf2JAK4e3mLRrawgPCTTEoy2fykJL9neTUAA",
  },
  {
    title: "Program Literasi Digital untuk Lansia",
    author: "Siti Aminah",
    category: "Pendidikan",
    date: "10 Oct 2023",
    status: "Draft",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDq1ryhnInFcxZQByE_rjbhwgAizbDo2mGqb7G-0RNjrvcFCBscY1_eO2Fxq9p_oGwCGMtOVaRUM_UW3T65lO108XwNTVJuH4mAmKrWFKchVb6fcr9uLW6LPnZBtkS96saG7UfMmJQPQFkDLzmkgl6w-lUo1j2hCOWzrssndRthsQSoJOBbiYLw5JWf-QNl5EQJxA7hGxL8WG7gI-HRJ_m2n0eGRCXdALqzsybfNpPO-DNvIO8DMEBxR2zbtnqx9oujDI4rHLo4FQ",
  },
  {
    title: "Festival UMKM Desa 2023",
    author: "Ahmad Fauzi",
    category: "Ekonomi",
    date: "08 Oct 2023",
    status: "Published",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvIX_vMQks_qNZ09jaYdCiJeayKBsSVT6WgQ7OTwWvIIH68l4xWtjtfiFNb72xdG2eYxT8zScju8nD6oApGdUkXlk16sj6rOKzQUvysgNZL8PiG-iXilR16OtV1XW4I-DtOl6UYL__wBCVIqOrGczCupC87NXInbCSVIxOVktyJAIyPUgeI_tSrfcgMDNHfWi_mVMxeqt9WFbFS2VrUgWVrxst3h9uqkBkduPxylHqPAAv1XWDR7NobsJ8Dqfj_MfiYoCjyLKc5g",
  },
  {
    title: "Jadwal Vaksinasi Booster Pekan Depan",
    author: "Admin Desa",
    category: "Kesehatan",
    date: "05 Oct 2023",
    status: "Published",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDm079iOsp1TMDKkXqyi_jPccF30q4PfQpkpCLpZ_PMQe57Pe8MWcNvmUNIU49re_YfeERlTmbOgSfFVqy0sz2vjj-ER5As2EESqs7cT0uQ0ZAfQbjugovCwH9sOC0FWFQDm7U9ukvOpJ1mcw6ISb-mbSccY6j0idfQj6jZzh6Z2iH8uDYX3famTrdJsUP7VXD0kKITcfrt-NvMsvhlSEMHO8aHIuWBJAiYPFTvTnrwbr1o1dDro8lxuP5_ujIuHdCKtMOhI-FXQg",
  },
];

export default function TableControl() {
  return (
    <div className="overflow-hidden rounded-2xl border border-surface-container bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-surface-container bg-surface-container-low/50 p-4 md:flex-row md:items-center md:justify-between md:p-6">
        <div className="flex flex-1 gap-2 overflow-x-auto">
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              className={
                index === 0
                  ? "whitespace-nowrap rounded-full bg-primary-container px-5 py-2 text-xs font-bold uppercase tracking-wider text-on-primary"
                  : "whitespace-nowrap rounded-full bg-surface-container-high px-5 py-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:bg-surface-container-highest"
              }
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-outline-variant/30 px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-low"
          >
            <span className="material-symbols-outlined text-sm">
              filter_list
            </span>
            Filter
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-outline-variant/30 px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-low"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 text-left">
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
            {posts.map((post) => {
              const isPublished = post.status === "Published";

              return (
                <tr
                  key={post.title}
                  className="group transition-colors duration-200 hover:bg-surface-container-low"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-surface-container">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
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
                    {post.date}
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
                        title="Edit"
                        className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container-highest"
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>

                      <button
                        type="button"
                        title="Delete"
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
        <div className="p-8 flex items-center justify-between bg-surface-container-low/20">
          <p className="text-sm font-medium text-on-surface-variant">
            Showing <span className="text-primary font-bold">1-4</span> of{" "}
            <span className="text-primary font-bold">124</span> entries
          </p>
          <div className="flex items-center gap-2">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low disabled:opacity-30"
              disabled
            >
              <span
                className="material-symbols-outlined"
                data-icon="chevron_left"
              >
                chevron_left
              </span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-container text-on-primary font-bold">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container-low font-bold text-on-surface-variant">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container-low font-bold text-on-surface-variant">
              3
            </button>
            <span className="px-2 text-outline">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container-low font-bold text-on-surface-variant">
              31
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low">
              <span
                className="material-symbols-outlined"
                data-icon="chevron_right"
              >
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
