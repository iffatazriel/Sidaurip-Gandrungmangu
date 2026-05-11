export type DashboardSummary = {
  publishedNews: number;
  draftNews: number;
  totalResidents: number;
  activeResidents: number;
  latestResidents: number;
};

export type DashboardTrend = {
  label: string;
  value: number;
};

export type DashboardActivity = {
  id: string;
  icon: string;
  title: string;
  description: string;
  status: string;
  tone: "success" | "warning" | "info" | "neutral";
  time: string;
};
