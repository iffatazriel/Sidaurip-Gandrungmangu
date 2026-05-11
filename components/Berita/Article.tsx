export type PublicNewsPost = {
  id: number;
  title: string;
  author: string;
  category: string;
  excerpt: string | null;
  content: string;
  imageUrl: string | null;
  publishedAt: string | null;
  createdAt: string;
};

type ArticleProps = {
  posts: PublicNewsPost[];
};

const fallbackImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCxyQQ1t1U7pCyJslwyLcUfZ8sPkbqr4Q-15g11v8VVZdaHjm10LFmGDVcDjlNUi-RSGAiH4gfZZGPx6a21ISzl2xLh2O7bTY5fk4OsflbHo_UrczIc2NqPs9yQ31UM2r4lEE0Lp3akYHWaqKQGO29Q959c025y7UNTi2E_lvyM0pMSqL1w_QUyHRYEpqONf3H3xAWAm3zdhUBrhnfyt1t9UcjCDP2lnnowtfH6zlZRmGEQwcVmwJsw0wi5HB2zV5qYAVvfOdAfRg";

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

function getExcerpt(post: PublicNewsPost) {
  return post.excerpt || post.content.slice(0, 180);
}

function ImagePanel({
  post,
  className,
}: {
  post: PublicNewsPost;
  className: string;
}) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: `url(${post.imageUrl || fallbackImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    />
  );
}

export default function Article({ posts }: ArticleProps) {
  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-surface-container-lowest p-10 text-center shadow-sm">
          <span className="material-symbols-outlined mb-4 text-5xl text-outline">
            article
          </span>
          <h2 className="font-headline text-2xl font-bold text-primary">
            Belum ada berita terbit
          </h2>
          <p className="mt-3 text-sm text-on-surface-variant">
            Berita yang dipublikasikan dari dashboard akan tampil di sini.
          </p>
        </div>
      </div>
    );
  }

  const [featuredPost, ...otherPosts] = posts;
  const sidePosts = otherPosts.slice(0, 2);
  const gridPosts = otherPosts.slice(2);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 md:grid-cols-12 md:py-1 lg:px-8">
      <article className="group cursor-pointer md:col-span-8">
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-surface-container-lowest">
          <div className="aspect-video w-full overflow-hidden">
            <ImagePanel
              post={featuredPost}
              className="h-full w-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col p-8">
            <div className="mb-4 flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                {featuredPost.category}
              </span>
              <span className="text-xs text-outline">
                {formatDate(featuredPost.publishedAt ?? featuredPost.createdAt)}
              </span>
            </div>
            <h2 className="font-headline mb-4 text-3xl font-bold text-primary transition-colors group-hover:text-surface-tint">
              {featuredPost.title}
            </h2>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              {getExcerpt(featuredPost)}
            </p>
            <div className="mt-auto flex items-center gap-2 text-sm font-bold text-primary">
              Baca Selengkapnya
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </div>
          </div>
        </div>
      </article>

      <div className="order-first flex flex-col gap-8 md:order-none md:col-span-4">
        {sidePosts.map((post, index) => (
          <article
            key={post.id}
            className={
              index === 1
                ? "group cursor-pointer rounded-xl border-l-4 border-tertiary-container bg-surface-container-lowest p-6 transition-all hover:bg-surface-bright"
                : "group cursor-pointer rounded-xl bg-surface-container-lowest p-6 transition-all hover:bg-surface-bright"
            }
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded bg-secondary-fixed px-2 py-0.5 text-[10px] font-bold uppercase text-on-secondary-fixed">
                {post.category}
              </span>
              <span className="text-[10px] text-outline">
                {formatDate(post.publishedAt ?? post.createdAt)}
              </span>
            </div>
            <h3 className="font-headline mb-2 text-lg font-bold text-primary group-hover:text-surface-tint">
              {post.title}
            </h3>
            <p className="line-clamp-2 text-sm text-on-surface-variant">
              {getExcerpt(post)}
            </p>
          </article>
        ))}

        <div className="relative overflow-hidden rounded-xl bg-primary-container p-8 text-white">
          <div className="relative z-10">
            <span className="material-symbols-outlined mb-4 text-tertiary-fixed">
              mail
            </span>
            <h3 className="font-headline mb-2 text-xl font-bold">
              Langganan Buletin
            </h3>
            <p className="mb-6 text-sm text-blue-200">
              Dapatkan ringkasan berita mingguan langsung di email Anda.
            </p>
            <div className="space-y-3">
              <input
                className="w-full rounded-lg border-white/20 bg-white/10 px-4 py-2 text-sm placeholder:text-blue-300 focus:ring-white/40"
                placeholder="Alamat Email"
                type="email"
              />
              <button className="w-full rounded-lg bg-white py-2 text-sm font-bold text-primary-container transition-colors hover:bg-blue-50">
                Daftar Sekarang
              </button>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />
        </div>
      </div>

      {gridPosts.map((post) => (
        <article
          key={post.id}
          className="group cursor-pointer overflow-hidden rounded-xl bg-surface-container-lowest md:col-span-4"
        >
          <div className="h-48 overflow-hidden">
            <ImagePanel
              post={post}
              className="h-full w-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                {post.category}
              </span>
              <span className="text-[10px] text-outline">
                {formatDate(post.publishedAt ?? post.createdAt)}
              </span>
            </div>
            <h3 className="font-headline mb-3 text-xl font-bold leading-snug text-primary group-hover:text-surface-tint">
              {post.title}
            </h3>
            <p className="mb-4 line-clamp-3 text-sm text-on-surface-variant">
              {getExcerpt(post)}
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-primary">
              Baca Selengkapnya
              <span className="material-symbols-outlined text-xs">
                chevron_right
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
