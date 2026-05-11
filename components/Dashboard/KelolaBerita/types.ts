export type NewsPost = {
  id: number;
  title: string;
  slug: string;
  author: string;
  category: string;
  excerpt: string | null;
  content: string;
  imageUrl: string | null;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type NewsStats = {
  total: number;
  published: number;
  drafts: number;
};

export type NewsResponse = {
  data: NewsPost[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    categories: string[];
  };
  stats: NewsStats;
};

export type NewsPostForm = {
  id?: number;
  title: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  status: "DRAFT" | "PUBLISHED";
};
