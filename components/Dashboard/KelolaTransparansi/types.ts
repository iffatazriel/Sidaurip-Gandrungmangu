export type TransparencyStatus = "DRAFT" | "PUBLISHED";

export type TransparencyRecord = {
  id: number;
  activity: string;
  category: string;
  budget: number;
  realized: number;
  note: string | null;
  status: TransparencyStatus;
  createdAt: string;
  updatedAt: string;
};

export type TransparencyStats = {
  totalBudget: number;
  totalRealized: number;
  realizationRate: number;
  totalRecords: number;
  publishedRecords: number;
};

export type TransparencyResponse = {
  data: TransparencyRecord[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    categories: string[];
  };
  stats: TransparencyStats;
};

export type TransparencyForm = {
  id?: number;
  activity: string;
  category: string;
  budget: string;
  realized: string;
  note: string;
  status: TransparencyStatus;
};
