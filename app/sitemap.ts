import type { MetadataRoute } from "next";
import { apartments } from "@/data/apartments";
import { land } from "@/data/land";
import { stays } from "@/data/stays";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/land", "/apartments", "/stays", "/owners", "/about", "/contact"].map((p) => ({
    url: absoluteUrl(p),
    changeFrequency: "weekly" as const,
    priority: p === "/" ? 1 : 0.8,
  }));
  const listings = [
    ...land.map((l) => `/land/${l.slug}`),
    ...apartments.map((a) => `/apartments/${a.slug}`),
    ...stays.map((s) => `/stays/${s.slug}`),
  ].map((p) => ({ url: absoluteUrl(p), changeFrequency: "weekly" as const, priority: 0.6 }));
  return [...pages, ...listings];
}
