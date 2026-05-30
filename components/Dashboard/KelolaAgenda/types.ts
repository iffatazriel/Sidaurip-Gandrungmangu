export type AgendaStatus = "DRAFT" | "PUBLISHED" | "CANCELLED";

export type VillageAgenda = {
  id: number;
  title: string;
  category: string;
  description: string | null;
  location: string;
  startAt: string;
  endAt: string | null;
  status: AgendaStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AgendaStats = {
  total: number;
  published: number;
  drafts: number;
  upcoming: number;
};

export type AgendaResponse = {
  data: VillageAgenda[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    categories: string[];
  };
  stats: AgendaStats;
};

export type AgendaForm = {
  id?: number;
  title: string;
  category: string;
  description: string;
  location: string;
  startAt: string;
  endAt: string;
  status: AgendaStatus;
  featured: boolean;
};
