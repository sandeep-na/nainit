import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { getAllTeamRoles } from "@/data/dedicated-team";
import { projects, posts, jobs } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nainitsolutions.com";
  const staticPages = ["", "/about", "/services", "/industries", "/portfolio", "/blog", "/careers", "/contact", "/schedule-call", "/dedicated-team"];
  return [
    ...staticPages.map((p) => ({ url: `${base}${p || "/"}`, lastModified: new Date() as Date, changeFrequency: "weekly" as const, priority: 0.9 })),
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: new Date() as Date, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...industries.map((i) => ({ url: `${base}/industries/${i.slug}`, lastModified: new Date() as Date, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...getAllTeamRoles().map((r) => ({ url: `${base}/dedicated-team/${r.slug}`, lastModified: new Date() as Date, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...projects.map((p) => ({ url: `${base}/portfolio/${p.slug}`, lastModified: new Date() as Date, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date) as Date, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...jobs.map((j) => ({ url: `${base}/careers/${j.slug}`, lastModified: new Date() as Date, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
