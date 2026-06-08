import Article, { type PublicNewsPost } from "@/components/Berita/Article";
import Hero from "@/components/Berita/Hero";
import FloatingWhatsApp from "@/components/Layout/FloatingWhatsApp";
import Header from "@/components/Layout/Header";
import SiteFooter from "@/components/Layout/SiteFooter";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Berita Desa Sidaurip",
  description: "Kabar terbaru, agenda, dan informasi resmi dari Desa Sidaurip.",
};

type PublicNewsRow = {
  id: number;
  slug: string;
  title: string;
  author: string;
  category: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  published_at: Date | null;
  created_at: Date;
};

async function getPublishedPosts(): Promise<PublicNewsPost[]> {
  try {
    const posts = await prisma.$queryRaw<PublicNewsRow[]>`
      SELECT id, slug, title, author, category, excerpt, content, image_url, published_at, created_at
      FROM news_posts
      WHERE status = 'PUBLISHED'
      ORDER BY COALESCE(published_at, created_at) DESC
      LIMIT 12
    `;

    return posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      author: post.author,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.image_url,
      publishedAt: post.published_at?.toISOString() ?? null,
      createdAt: post.created_at.toISOString(),
    }));
  } catch (error) {
    console.error("PUBLIC_NEWS_POSTS_ERROR", error);
    return [];
  }
}

const BeritaPage = async () => {
  const posts = await getPublishedPosts();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Article posts={posts} />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
};

export default BeritaPage;
