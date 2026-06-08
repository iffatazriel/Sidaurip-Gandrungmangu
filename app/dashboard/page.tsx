import ActivityCard from "@/components/Dashboard/ActivityCard";
import SummaryCards from "@/components/Dashboard/SummaryCards";
import RecentActivityCard from "@/components/Dashboard/RecentActivityCard";
import FooterShift from "@/components/Dashboard/FooterShift";
import { prisma } from "@/lib/prisma";
import type {
  DashboardActivity,
  DashboardSummary,
  DashboardTrend,
} from "@/components/Dashboard/types";

export const dynamic = "force-dynamic";

type NewsActivityRow = {
  id: number;
  title: string;
  author: string;
  status: string;
  created_at: Date;
};

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

function timeAgo(value: Date) {
  const diffMs = Date.now() - value.getTime();
  const diffMinutes = Math.max(Math.floor(diffMs / 60000), 1);

  if (diffMinutes < 60) {
    return `${diffMinutes} mins ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hours ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} days ago`;
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
}

async function getDashboardData(): Promise<{
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
    await ensureNewsTable();

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
      prisma.$queryRaw<{ status: string; count: bigint }[]>`
        SELECT status, COUNT(*)::bigint AS count
        FROM news_posts
        GROUP BY status
      `,
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
      prisma.$queryRaw<NewsActivityRow[]>`
        SELECT id, title, author, status, created_at
        FROM news_posts
        ORDER BY created_at DESC
        LIMIT 4
      `,
      prisma.resident.findMany({
        orderBy: {
          createdAt: "desc",
        },
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

    const publishedNews = Number(
      newsCounts.find((row) => row.status === "PUBLISHED")?.count ?? 0
    );
    const draftNews = Number(
      newsCounts.find((row) => row.status === "DRAFT")?.count ?? 0
    );

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
      time: timeAgo(post.created_at),
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
        time: timeAgo(resident.createdAt),
      })
    );

    return {
      summary: {
        publishedNews,
        draftNews,
        totalResidents,
        activeResidents,
        latestResidents,
      },
      trends,
      activities: [...newsActivities, ...residentActivities]
        .sort((a, b) => {
          const aMinutes = Number(a.time.match(/^\d+/)?.[0] ?? 0);
          const bMinutes = Number(b.time.match(/^\d+/)?.[0] ?? 0);
          return aMinutes - bMinutes;
        })
        .slice(0, 5),
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

const DashboardPage = async () => {
  const dashboardData = await getDashboardData();

  return (
    <>
      <SummaryCards summary={dashboardData.summary} />
      <ActivityCard trends={dashboardData.trends} />
      <RecentActivityCard activities={dashboardData.activities} />
      <FooterShift />
    </>
  );
};

export default DashboardPage;
