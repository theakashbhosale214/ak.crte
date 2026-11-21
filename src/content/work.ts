import type { StaticImageData } from "next/image";
import { ChartNoAxesCombined, KeyRound, Network, WandSparkles, type LucideIcon } from "lucide-react";
import mashupInteriorsImage from "@/assets/work/mashup-interiors.jpg";
import zoomifyMediaImage from "@/assets/work/zoomify-media.jpg";
import type { ServiceSlug } from "./services";

/*
 * Case studies. Two kinds, deliberately kept separate:
 * - Client projects: freelance work delivered for real clients (live sites).
 * - Enterprise experience: platforms built inside enterprise engineering teams
 *   in previous roles. Those products belong to their companies and must never
 *   be presented as our own.
 *
 * Technologies listed for client projects were verified against the live
 * sites (response headers and markup) in November 2026.
 */

export type ClientProject = {
  slug: string;
  name: string;
  category: string;
  url: string;
  displayUrl: string;
  image: StaticImageData;
  imageAlt: string;
  summary: string;
  highlights: readonly string[];
  services: readonly { label: string; service: ServiceSlug }[];
  technologies: readonly string[];
};

export type ExperienceArea = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const workIntro = {
  eyebrow: "Selected work",
  index: "05",
  title: "Real projects, built to perform.",
  description:
    "A selection of client work, alongside the kinds of enterprise platforms our engineering experience comes from.",
} as const;

export const clientProjects: readonly ClientProject[] = [
  {
    slug: "mashup-interiors",
    name: "Mashup Interiors",
    category: "Interior design studio · Nashik & Pune",
    url: "https://www.mashupinteriors.in",
    displayUrl: "mashupinteriors.in",
    image: mashupInteriorsImage,
    imageAlt: "Homepage of the Mashup Interiors website",
    summary:
      "A digital presence for an interior design studio, including a project portfolio, service pages, structured SEO, and enquiry functionality.",
    highlights: [
      "Project portfolio and dedicated service pages",
      "Structured data for local search and FAQs",
      "Enquiry and space-planning flow for new clients",
    ],
    services: [
      { label: "Website Development", service: "website-development" },
      { label: "SEO & Structured Data", service: "seo-geo-aeo" },
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Vercel", "Schema.org"],
  },
  {
    slug: "zoomify-media",
    name: "Zoomify Media",
    category: "Content & growth studio",
    url: "https://zoomifymedia.vercel.app",
    displayUrl: "zoomifymedia.vercel.app",
    image: zoomifyMediaImage,
    imageAlt: "Homepage of the Zoomify Media website",
    summary:
      "A digital presence for a marketing agency, including service presentation, portfolio, and lead capture.",
    highlights: [
      "Editorial, interaction-led homepage",
      "Service presentation and work portfolio",
      "Lead capture for new brand enquiries",
    ],
    services: [
      { label: "Website Development", service: "website-development" },
      { label: "Lead Capture", service: "ai-automation" },
    ],
    technologies: ["React", "Vite", "Tailwind CSS", "Vercel"],
  },
];

export const enterpriseExperience = {
  label: "Enterprise experience",
  title: "Platforms built inside enterprise engineering teams",
  note: "Work delivered as part of in-house engineering teams in previous roles. These platforms belong to the companies we worked for — they are described here only to show the kinds of systems we have experience building.",
  cta: "Discuss a similar platform",
  areas: [
    {
      title: "IoT access-control platforms",
      description:
        "Connecting physical access hardware to cloud software for managing sites, permissions and real-time events.",
      icon: KeyRound,
    },
    {
      title: "Multi-tenant business applications",
      description:
        "Single platforms serving many client organisations, with isolated data, role-based access and per-tenant configuration.",
      icon: Network,
    },
    {
      title: "AI-powered content automation",
      description:
        "Workflows that use AI models to generate and process content at scale, integrated with existing business systems.",
      icon: WandSparkles,
    },
    {
      title: "KPI & performance-management platforms",
      description:
        "Systems for defining goals and KPIs, tracking performance across teams and reporting on progress.",
      icon: ChartNoAxesCombined,
    },
  ] satisfies ExperienceArea[],
} as const;
