import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { services } from "@/content/services";
import { routes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: brand.url, lastModified, changeFrequency: "monthly", priority: 1 },
    ...services.map((service) => ({
      url: `${brand.url}${routes.service(service.slug)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${brand.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${brand.url}/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
