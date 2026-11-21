import {
  Armchair,
  BriefcaseBusiness,
  BuildingComplex,
  Rocket,
  ShoppingBag,
  Store,
  type LucideIcon,
} from "lucide-react";
import type { ServiceSlug } from "./services";

export type Solution = {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  /** The services this kind of business most often starts with. */
  typical: readonly { label: string; service: ServiceSlug }[];
};

export const solutionsIntro = {
  eyebrow: "Solutions",
  index: "03",
  title: "Built around the way your business works.",
  description:
    "Every business has different priorities. Find yours to see the solutions that usually make the biggest difference.",
} as const;

export const solutions: readonly Solution[] = [
  {
    id: "startups",
    title: "Startups & Founders",
    icon: Rocket,
    description:
      "Turn an idea into a launch-ready product — from a landing page and first release to a SaaS platform built to grow with your users.",
    typical: [
      { label: "Landing page & MVP", service: "website-development" },
      { label: "SaaS product development", service: "custom-software-saas" },
      { label: "Subscriptions & payments", service: "custom-software-saas" },
      { label: "Product analytics", service: "analytics-reporting" },
    ],
  },
  {
    id: "small-business",
    title: "Small & Medium Businesses",
    icon: Store,
    description:
      "Get a professional website, show up in local search, capture more enquiries and automate the admin that slows your team down.",
    typical: [
      { label: "Business website", service: "website-development" },
      { label: "Local SEO", service: "seo-geo-aeo" },
      { label: "Lead capture & CRM", service: "ai-automation" },
      { label: "Ongoing maintenance", service: "cloud-hosting-maintenance" },
    ],
  },
  {
    id: "interior-architecture",
    title: "Interior Design & Architecture",
    icon: Armchair,
    description:
      "Showcase projects, manage enquiries, publish services, and build a professional digital presence.",
    typical: [
      { label: "Portfolio website", service: "website-development" },
      { label: "Project galleries & CMS", service: "website-development" },
      { label: "Enquiry & consultation booking", service: "website-development" },
      { label: "Local & visual search", service: "seo-geo-aeo" },
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce Brands",
    icon: ShoppingBag,
    description:
      "Launch your online store with product management, payments, analytics, and conversion-focused experiences.",
    typical: [
      { label: "Online store", service: "website-development" },
      { label: "Payment integration", service: "custom-software-saas" },
      { label: "Conversion tracking", service: "analytics-reporting" },
      { label: "Speed & performance", service: "cloud-hosting-maintenance" },
    ],
  },
  {
    id: "professional-services",
    title: "Professional Services",
    icon: BriefcaseBusiness,
    description:
      "Turn expertise into enquiries — with clear service pages, online appointment booking and secure client portals.",
    typical: [
      { label: "Corporate website", service: "website-development" },
      { label: "Appointment booking", service: "website-development" },
      { label: "Client portals", service: "custom-software-saas" },
      { label: "Answer-ready content", service: "seo-geo-aeo" },
    ],
  },
  {
    id: "enterprises",
    title: "Growing Enterprises",
    icon: BuildingComplex,
    description:
      "Modernise operations with custom dashboards, internal tools, integrations and cloud infrastructure that scale with the business.",
    typical: [
      { label: "Custom web applications", service: "custom-software-saas" },
      { label: "Admin panels & dashboards", service: "custom-software-saas" },
      { label: "Workflow automation", service: "ai-automation" },
      { label: "Cloud & CI/CD", service: "cloud-hosting-maintenance" },
    ],
  },
];
