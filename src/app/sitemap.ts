import { MetadataRoute } from "next";

const BASE_URL = "https://parislocal.ca";
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "";

async function convexQuery(path: string, args: Record<string, unknown> = {}) {
  if (!CONVEX_URL) return [];
  const url = `${CONVEX_URL}/api/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, args }),
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const { value } = await res.json();
  return value ?? [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [businesses, categories, guides] = await Promise.all([
    convexQuery("businesses:list", {}),
    convexQuery("categories:list", {}),
    convexQuery("guides:list", {}),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/categories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/guides`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/events`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/list-your-business`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/emergency`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat: any) => ({
    url: `${BASE_URL}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const businessPages: MetadataRoute.Sitemap = businesses.map((biz: any) => ({
    url: `${BASE_URL}/businesses/${biz.slug}`,
    lastModified: biz.lastVerified ? new Date(biz.lastVerified) : new Date(),
    changeFrequency: "monthly" as const,
    priority: biz.featured ? 0.9 : 0.7,
  }));

  const guidePages: MetadataRoute.Sitemap = (guides as any[]).map((guide: any) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...guidePages, ...categoryPages, ...businessPages];
}
