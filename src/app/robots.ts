import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

/** Open to search engines and AI crawlers alike — discoverability is the goal (GEO/AEO). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${brand.url}/sitemap.xml`,
    host: brand.url,
  };
}
