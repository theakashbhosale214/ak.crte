/**
 * Central brand configuration.
 *
 * The brand name is not final. Everything that renders the name, tagline,
 * contact details or canonical URL reads from this file — change it here and
 * it updates across the navigation, metadata, footer and structured data.
 *
 * The logo mark itself lives in `components/brand/logo.tsx`.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const brand = {
  /** Display name. The wordmark renders this in uppercase via CSS. */
  name: "Nexora",
  /** Used for copyright lines and structured data. */
  legalName: "Nexora",

  tagline: "Your Business. Built for the Digital World.",
  taglineAlt: "From your first website to your next digital platform.",
  positioning:
    "We build digital experiences that help businesses launch, operate, and grow.",

  /** Default meta description — written for people first, search engines second. */
  description:
    "Nexora is a digital solutions partner for startups and growing businesses — high-performance websites, custom software and SaaS, SEO, GEO and AEO, analytics, AI automation, cloud hosting and ongoing support.",

  /** The four stages of the business lifecycle the brand is built around. */
  lifecycle: ["Build", "Manage", "Grow", "Scale"] as const,

  url: resolveSiteUrl(),
  locale: "en_US",
  themeColor: "#08090C",

  /**
   * Public contact details & social profiles.
   * TODO(launch): add the real values. Anything left `null` is hidden
   * everywhere it would render (footer, CTAs, structured data) — no
   * placeholder ever reaches the live site.
   */
  contact: {
    email: null as string | null,
  },
  social: {
    linkedin: null as string | null,
    github: null as string | null,
  },
} as const;

export type Brand = typeof brand;
