import type { MetadataRoute } from "next";
import { getAllCultures, getSectionHref } from "@/lib/cultures";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = new Map<string, MetadataRoute.Sitemap[number]>();
  const addRoute = (pathname: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly") => {
    const url = new URL(pathname, siteUrl).toString();
    if (!routes.has(url)) {
      routes.set(url, { url, priority, changeFrequency });
    }
  };

  addRoute("/uk", 1, "weekly");
  addRoute("/uk/catalog", 0.9, "weekly");
  addRoute("/uk/calendar", 0.8, "monthly");

  for (const culture of getAllCultures()) {
    addRoute(`/uk/${culture.slug}`, 0.8, "weekly");
    for (const section of culture.sections) {
      addRoute(getSectionHref("uk", culture.slug, section), 0.7, "monthly");
    }
  }

  return Array.from(routes.values());
}
