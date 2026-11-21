import { ChartColumn, Cloud, CodeXml, Search, Workflow, type LucideIcon } from "lucide-react";

export type Capability = {
  title: string;
  /** Short examples, rendered as a wrapping list. */
  detail: readonly string[];
  icon: LucideIcon;
};

export const capabilitiesIntro = {
  eyebrow: "Capabilities",
  title: "Technology, design, and strategy working together.",
  description:
    "One partner across your digital lifecycle — so your website, software, search visibility and automation are planned as a single system rather than separate projects.",
} as const;

export const capabilities: readonly Capability[] = [
  { title: "Custom Development", detail: ["Websites", "Web apps", "SaaS"], icon: CodeXml },
  { title: "Business Automation", detail: ["Workflows", "AI", "Integrations"], icon: Workflow },
  { title: "Search Optimization", detail: ["SEO", "GEO", "AEO"], icon: Search },
  { title: "Cloud Infrastructure", detail: ["AWS", "Vercel", "CI/CD"], icon: Cloud },
  { title: "Analytics & Insights", detail: ["GA4", "Tracking", "Dashboards"], icon: ChartColumn },
];
