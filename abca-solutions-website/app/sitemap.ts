import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    entry("/get-audit", 0.9, "monthly"),
    entry("/how-it-works", 0.8, "monthly"),
    entry("/what-we-audit", 0.8, "monthly"),
    entry("/sectors", 0.8, "monthly"),
    entry("/our-fees", 0.8, "monthly"),
    entry("/partners", 0.7, "monthly"),
    entry("/about", 0.6, "monthly"),
    entry("/contact", 0.6, "monthly"),
    ...services.map((s) => entry(`/what-we-audit/${s.slug}`, 0.7, "monthly")),
    ...sectors.map((s) => entry(`/sectors/${s.slug}`, 0.7, "monthly")),
    entry("/legal/privacy", 0.3, "yearly"),
    entry("/legal/cookies", 0.3, "yearly"),
    entry("/legal/terms", 0.3, "yearly"),
    entry("/legal/complaints", 0.3, "yearly"),
  ];
}
