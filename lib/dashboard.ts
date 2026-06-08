import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { formatTimeAgo, timeAgoMs } from "@/lib/dateUtils";
import type {
  DashboardActivity,
  DashboardSummary,
  DashboardTrend,
} from "@/components/Dashboard/types";

function getMonthLabels() {
  const formatter = new Intl.DateTimeFormat("id-ID", { month: "short" });
  const now = new Date();

  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    return {
      key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
      label: formatter.format(date),
    };
  });
}

export async function fetchDashboardData(): Promise<{
  summary: DashboardSummary;
  trends: DashboardTrend[];
  activities: DashboardActivity[];
}> {
  const monthLabels = getMonthLabels();
  const defaultTrends = monthLabels.map((month) => ({
    label: month.label,
    value: 0,
  }));

  try {
    const [
      totalResidents,
      activeResidents,
      latestResidents,
      newsCounts,
      trendRows,
      newsRows,
      residentRows,
    ] = await prisma.$transaction([
      prisma.resident.count(),
      prisma.resident.count({ where: { status: "AKTIF" } }),
      prisma.resident.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),
      prisma.newsPost.groupBy({
        by: ["status"],
        _count: { _all: true },
        orderBy: { status: "asc" },
      }),
      prisma.$queryRaw<{ month_key: string; count: bigint }[]>`
        SELECT month_key, SUM(count)::bigint AS count
        FROM (
          SELECT TO_CHAR(created_at, 'YYYY-MM') AS month_key, COUNT(*) AS count
          FROM news_posts
          WHERE created_at >= DATE_TRUNC('month', NOW()) - INTERVAL '5 months'
          GROUP BY month_key
          UNION ALL
          SELECT TO_CHAR("createdAt", 'YYYY-MM') AS month_key, COUNT(*) AS count
          FROM residents
          WHERE "createdAt" >= DATE_TRUNC('month', NOW()) - INTERVAL '5 months'
          GROUP BY month_key
        ) activity
        GROUP BY month_key
        ORDER BY month_key ASC
      `,
      prisma.newsPost.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
        take: 4,
        select: {
          id: true,
          title: true,
          author: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.resident.findMany({
        orderBy: { createdAt: "desc" },
        take: 4,
        select: {
          id: true,
          nama: true,
          dusun: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    const publishedNews = newsCounts.find((row) => row.status === "PUBLISHED")?._count?._all ?? 0;
    const draftNews = newsCounts.find((row) => row.status === "DRAFT")?._count?._all ?? 0;

    const trends = monthLabels.map((month) => ({
      label: month.label,
      value: Number(
        trendRows.find((row) => row.month_key === month.key)?.count ?? 0
      ),
    }));

    const newsActivities: DashboardActivity[] = newsRows.map((post) => ({
      id: `news-${post.id}`,
      icon: "campaign",
      title: post.title,
      description: `Written by ${post.author}`,
      status: post.status,
      tone: post.status === "PUBLISHED" ? "success" : "neutral",
      time: formatTimeAgo(post.createdAt),
      createdAt: post.createdAt,
    }));

    const residentActivities: DashboardActivity[] = residentRows.map(
      (resident) => ({
        id: `resident-${resident.id}`,
        icon: "assignment_ind",
        title: `Resident record: ${resident.nama}`,
        description: resident.dusun
          ? `Registered in ${resident.dusun}`
          : "Resident registry updated",
        status: resident.status,
        tone: resident.status === "AKTIF" ? "info" : "warning",
        time: formatTimeAgo(resident.createdAt),
        createdAt: resident.createdAt,
      })
    );

    const activities = [...newsActivities, ...residentActivities]
      .sort((a, b) => timeAgoMs(b.createdAt) - timeAgoMs(a.createdAt))
      .slice(0, 5);

    return {
      summary: {
        publishedNews,
        draftNews,
        totalResidents,
        activeResidents,
        latestResidents,
      },
      trends,
      activities,
    };
  } catch (error) {
    console.error("DASHBOARD_DATA_ERROR", error);

    return {
      summary: {
        publishedNews: 0,
        draftNews: 0,
        totalResidents: 0,
        activeResidents: 0,
        latestResidents: 0,
      },
      trends: defaultTrends,
      activities: [],
    };
  }
}
