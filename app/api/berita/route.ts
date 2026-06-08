import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/rate-limit";

type NewsPostRow = {
  id: number;
  title: string;
  slug: string;
  author: string;
  category: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  status: string;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

type NewsPostInput = {
  title?: string;
  author?: string;
  category?: string;
  excerpt?: string | null;
  content?: string;
  imageUrl?: string | null;
  status?: string;
};

let ensureNewsTablePromise: Promise<void> | null = null;

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeOptional(value: unknown) {
  const text = normalizeText(value);
  return text.length > 0 ? text : null;
}

function normalizeStatus(value: unknown) {
  const status = normalizeText(value).toUpperCase();
  return status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
}

function createSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function serializePost(post: NewsPostRow) {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    author: post.author,
    category: post.category,
    excerpt: post.excerpt,
    content: post.content,
    imageUrl: post.image_url,
    status: post.status,
    publishedAt: post.published_at?.toISOString() ?? null,
    createdAt: post.created_at.toISOString(),
    updatedAt: post.updated_at.toISOString(),
  };
}

async function ensureNewsTable() {
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS news_posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      author TEXT NOT NULL,
      category TEXT NOT NULL,
      excerpt TEXT,
      content TEXT NOT NULL,
      image_url TEXT,
      status TEXT NOT NULL DEFAULT 'DRAFT',
      published_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS news_posts_title_idx ON news_posts (title)
  `;
  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS news_posts_category_idx ON news_posts (category)
  `;
  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS news_posts_status_idx ON news_posts (status)
  `;
}

function ensureNewsTableReady() {
  ensureNewsTablePromise ??= ensureNewsTable();
  return ensureNewsTablePromise;
}

async function requireAdminRequest() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Akses dashboard membutuhkan akun admin" },
      { status: 403 }
    );
  }

  return null;
}

async function getUniqueSlug(title: string, excludeId?: number) {
  const baseSlug = createSlug(title) || `berita-${Date.now()}`;
  let slug = baseSlug;
  let suffix = 2;

  while (true) {
    const rows = await prisma.$queryRawUnsafe<{ id: number }[]>(
      excludeId
        ? "SELECT id FROM news_posts WHERE slug = $1 AND id <> $2 LIMIT 1"
        : "SELECT id FROM news_posts WHERE slug = $1 LIMIT 1",
      ...(excludeId ? [slug, excludeId] : [slug])
    );

    if (rows.length === 0) {
      return slug;
    }

    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';
    const rateCheck = checkRateLimit(`api:berita:${ip}`);

    if (!rateCheck.allowed) {
      const waitMinutes = Math.ceil((rateCheck.resetAt - Date.now()) / 60000);
      return NextResponse.json(
        { message: `Terlalu banyak permintaan. Coba lagi dalam ${waitMinutes} menit` },
        { status: 429 }
      );
    }

    await ensureNewsTableReady();

    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(Number(searchParams.get("page") ?? 1), 1);
    const perPage = Math.min(
      Math.max(Number(searchParams.get("perPage") ?? 10), 1),
      50
    );
    const search = normalizeText(searchParams.get("search"));
    const category = normalizeText(searchParams.get("category"));
    const status = normalizeText(searchParams.get("status"));

    const clauses: string[] = [];
    const values: unknown[] = [];

    if (search) {
      values.push(`%${search}%`);
      clauses.push(
        `(title ILIKE $${values.length} OR author ILIKE $${values.length})`
      );
    }

    if (category && category !== "ALL") {
      values.push(category);
      clauses.push(`category = $${values.length}`);
    }

    if (status && status !== "ALL") {
      values.push(status.toUpperCase());
      clauses.push(`status = $${values.length}`);
    }

    const whereSql = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
    const totalRows = await prisma.$queryRawUnsafe<{ count: bigint }[]>(
      `SELECT COUNT(*)::bigint AS count FROM news_posts ${whereSql}`,
      ...values
    );

    values.push(perPage, (page - 1) * perPage);
    const posts = await prisma.$queryRawUnsafe<NewsPostRow[]>(
      `SELECT id, title, slug, author, category, excerpt, content, image_url, status, published_at, created_at, updated_at
       FROM news_posts
       ${whereSql}
       ORDER BY created_at DESC
       LIMIT $${values.length - 1} OFFSET $${values.length}`,
      ...values
    );

    const [allCount, publishedCount, draftCount, categoryRows] =
      await prisma.$transaction([
        prisma.$queryRaw<{ count: bigint }[]>`
          SELECT COUNT(*)::bigint AS count FROM news_posts
        `,
        prisma.$queryRaw<{ count: bigint }[]>`
          SELECT COUNT(*)::bigint AS count FROM news_posts WHERE status = 'PUBLISHED'
        `,
        prisma.$queryRaw<{ count: bigint }[]>`
          SELECT COUNT(*)::bigint AS count FROM news_posts WHERE status = 'DRAFT'
        `,
        prisma.$queryRaw<{ category: string }[]>`
          SELECT DISTINCT category FROM news_posts ORDER BY category ASC
        `,
      ]);

    const total = Number(totalRows[0]?.count ?? 0);

    return NextResponse.json({
      data: posts.map(serializePost),
      meta: {
        page,
        perPage,
        total,
        totalPages: Math.max(Math.ceil(total / perPage), 1),
        categories: categoryRows.map((row) => row.category),
      },
      stats: {
        total: Number(allCount[0]?.count ?? 0),
        published: Number(publishedCount[0]?.count ?? 0),
        drafts: Number(draftCount[0]?.count ?? 0),
      },
    });
  } catch (error) {
    console.error("GET_NEWS_POSTS_ERROR", error);

    return NextResponse.json(
      { message: "Gagal mengambil data berita" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureNewsTableReady();
    const unauthorized = await requireAdminRequest();
    if (unauthorized) return unauthorized;

    const body = (await request.json()) as NewsPostInput;
    const title = normalizeText(body.title);
    const author = normalizeText(body.author) || "Admin Desa";
    const category = normalizeText(body.category) || "Umum";
    const content = normalizeText(body.content);
    const status = normalizeStatus(body.status);

    if (!title || !content) {
      return NextResponse.json(
        { message: "Judul dan isi berita wajib diisi" },
        { status: 400 }
      );
    }

    const slug = await getUniqueSlug(title);
    const rows = await prisma.$queryRaw<NewsPostRow[]>`
      INSERT INTO news_posts (
        title, slug, author, category, excerpt, content, image_url, status, published_at
      )
      VALUES (
        ${title},
        ${slug},
        ${author},
        ${category},
        ${normalizeOptional(body.excerpt)},
        ${content},
        ${normalizeOptional(body.imageUrl)},
        ${status},
        ${status === "PUBLISHED" ? new Date() : null}
      )
      RETURNING id, title, slug, author, category, excerpt, content, image_url, status, published_at, created_at, updated_at
    `;

    return NextResponse.json(serializePost(rows[0]), { status: 201 });
  } catch (error) {
    console.error("CREATE_NEWS_POST_ERROR", error);

    return NextResponse.json(
      { message: "Gagal membuat berita" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await ensureNewsTableReady();
    const unauthorized = await requireAdminRequest();
    if (unauthorized) return unauthorized;

    const body = (await request.json()) as NewsPostInput & { id?: number };
    const id = Number(body.id);
    const title = normalizeText(body.title);
    const author = normalizeText(body.author) || "Admin Desa";
    const category = normalizeText(body.category) || "Umum";
    const content = normalizeText(body.content);
    const status = normalizeStatus(body.status);

    if (!id || !title || !content) {
      return NextResponse.json(
        { message: "ID, judul, dan isi berita wajib diisi" },
        { status: 400 }
      );
    }

    const slug = await getUniqueSlug(title, id);
    const rows = await prisma.$queryRaw<NewsPostRow[]>`
      UPDATE news_posts
      SET
        title = ${title},
        slug = ${slug},
        author = ${author},
        category = ${category},
        excerpt = ${normalizeOptional(body.excerpt)},
        content = ${content},
        image_url = ${normalizeOptional(body.imageUrl)},
        status = ${status},
        published_at = CASE
          WHEN ${status} = 'PUBLISHED' AND published_at IS NULL THEN NOW()
          WHEN ${status} = 'DRAFT' THEN NULL
          ELSE published_at
        END,
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, title, slug, author, category, excerpt, content, image_url, status, published_at, created_at, updated_at
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(serializePost(rows[0]));
  } catch (error) {
    console.error("UPDATE_NEWS_POST_ERROR", error);

    return NextResponse.json(
      { message: "Gagal memperbarui berita" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await ensureNewsTableReady();
    const unauthorized = await requireAdminRequest();
    if (unauthorized) return unauthorized;

    const body = (await request.json()) as { id?: number; status?: string };
    const id = Number(body.id);
    const status = normalizeStatus(body.status);

    if (!id) {
      return NextResponse.json(
        { message: "ID berita wajib diisi" },
        { status: 400 }
      );
    }

    const rows = await prisma.$queryRaw<NewsPostRow[]>`
      UPDATE news_posts
      SET
        status = ${status},
        published_at = CASE WHEN ${status} = 'PUBLISHED' THEN COALESCE(published_at, NOW()) ELSE NULL END,
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, title, slug, author, category, excerpt, content, image_url, status, published_at, created_at, updated_at
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(serializePost(rows[0]));
  } catch (error) {
    console.error("PATCH_NEWS_POST_ERROR", error);

    return NextResponse.json(
      { message: "Gagal mengubah status berita" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await ensureNewsTableReady();
    const unauthorized = await requireAdminRequest();
    if (unauthorized) return unauthorized;

    const id = Number(request.nextUrl.searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        { message: "ID berita wajib diisi" },
        { status: 400 }
      );
    }

    await prisma.$executeRaw`DELETE FROM news_posts WHERE id = ${id}`;

    return NextResponse.json({ deleted: true });
  } catch (error) {
    console.error("DELETE_NEWS_POST_ERROR", error);

    return NextResponse.json(
      { message: "Gagal menghapus berita" },
      { status: 500 }
    );
  }
}
