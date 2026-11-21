import type { Metadata } from "next";
import { brand } from "@/config/brand";

/**
 * Page-level metadata with complete Open Graph / Twitter tags. Next.js
 * replaces (rather than merges) nested openGraph objects, so every page
 * should build its metadata through this helper.
 */
export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const socialTitle = `${title} · ${brand.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: brand.name,
      locale: brand.locale,
      title: socialTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: socialTitle, description },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Organization + WebSite structured data for the home page. */
export function siteStructuredData() {
  const sameAs = [brand.social.linkedin, brand.social.github].filter(Boolean);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${brand.url}/#organization`,
      name: brand.legalName,
      url: brand.url,
      logo: `${brand.url}/icon.svg`,
      description: brand.description,
      slogan: brand.tagline,
      ...(brand.contact.email
        ? { contactPoint: { "@type": "ContactPoint", contactType: "sales", email: brand.contact.email } }
        : {}),
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${brand.url}/#website`,
      name: brand.name,
      url: brand.url,
      publisher: { "@id": `${brand.url}/#organization` },
    },
  ];
}
