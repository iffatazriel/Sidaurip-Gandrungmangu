import FloatingWhatsApp from "@/components/Layout/FloatingWhatsApp";
import Header from "@/components/Layout/Header";
import SiteFooter from "@/components/Layout/SiteFooter";
import { prisma } from "@/lib/prisma";
import { sanitizeHtml, sanitizePlain } from "@/lib/sanitize";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const siteUrl = "https://sidaurip.desa.id";
const fallbackImage = `${siteUrl}/og-image.png`;

type BeritaDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getPost(slug: string) {
  return prisma.newsPost.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    select: {
      title: true,
      slug: true,
      author: true,
      category: true,
      excerpt: true,
      content: true,
      imageUrl: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

function getAbsoluteUrl(pathOrUrl: string | null) {
  if (!pathOrUrl) {
    return fallbackImage;
  }

  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  return `${siteUrl}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(value);
}

export async function generateMetadata({
  params,
}: BeritaDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Berita Tidak Ditemukan",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = post.excerpt ?? post.content.slice(0, 160);
  const image = getAbsoluteUrl(post.imageUrl);

  return {
    title: post.title,
    description,
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `${siteUrl}/berita/${post.slug}`,
      publishedTime: post.publishedAt?.toISOString() ?? post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author],
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [image],
    },
  };
}

export default async function BeritaDetailPage({ params }: BeritaDetailPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const publishedDate = post.publishedAt ?? post.createdAt;
  const image = getAbsoluteUrl(post.imageUrl);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? post.content.slice(0, 160),
    image,
    datePublished: publishedDate.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "GovernmentOrganization",
      name: "Pemerintah Desa Sidaurip",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/Logo-Cilacap.png`,
      },
    },
    mainEntityOfPage: `${siteUrl}/berita/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main className="bg-background">
        <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              {post.category}
            </span>
            <h1 className="mt-4 font-headline text-4xl font-extrabold leading-tight text-primary md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-on-surface-variant">
              <span>{post.author}</span>
              <span aria-hidden="true">/</span>
              <time dateTime={publishedDate.toISOString()}>
                {formatDate(publishedDate)}
              </time>
            </div>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            className="aspect-video w-full rounded-lg object-cover"
          />

           <div className="mt-10 whitespace-pre-line text-lg leading-8 text-on-surface">
             {sanitizeHtml(post.content)}
           </div>
        </article>
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
