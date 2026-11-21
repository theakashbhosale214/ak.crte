import { AppWindow, Bot, Boxes, ChartColumn, Cloud, Search, type LucideIcon } from "lucide-react";
import type { brand } from "@/config/brand";

/**
 * Single source of truth for services. Drives the homepage explorer, the
 * /services/[slug] pages, their metadata and their structured data.
 */

export type LifecycleStage = (typeof brand.lifecycle)[number];

export type ServiceItem = {
  name: string;
  description: string;
};

export type Service = {
  slug: string;
  name: string;
  /** Compact label for tight spaces (lists, chips). */
  shortName: string;
  /** Where the service sits in the Build → Manage → Grow → Scale lifecycle. */
  stage: LifecycleStage;
  icon: LucideIcon;
  /** One-sentence description used on cards and as the meta description. */
  summary: string;
  /** Longer introduction for the service page. */
  intro: string;
  outcomes: readonly string[];
  included: readonly ServiceItem[];
  related: readonly ServiceSlug[];
};

export const servicesIntro = {
  eyebrow: "Services",
  index: "01",
  title: "Everything your business needs to launch, operate and grow.",
  description:
    "Six connected service areas — from your first website to custom platforms, search visibility, analytics, automation and the infrastructure that keeps it all running.",
  recommendation: {
    title: "Not sure what you need?",
    text: "Tell us about your goals and we'll recommend the right combination of services.",
    cta: "Get a recommendation",
  },
} as const;

const serviceList = [
  {
    slug: "website-development",
    name: "Website Development",
    shortName: "Websites",
    stage: "Build",
    icon: AppWindow,
    summary:
      "High-performance websites designed to represent your brand, engage visitors, and convert them into customers.",
    intro:
      "Your website is often the first conversation a customer has with your business. We design and build fast, responsive, search-ready websites that explain what you do clearly, earn trust quickly and turn visitors into enquiries — and we make them easy for your team to update.",
    outcomes: [
      "A fast, responsive site that works beautifully on every device",
      "Clear structure and messaging that guides visitors to enquire or buy",
      "Search-ready foundations: semantic markup, metadata and structured data",
      "Content you can update yourself through a simple CMS or admin panel",
    ],
    included: [
      { name: "Business Websites", description: "A professional online presence that explains your services and builds trust." },
      { name: "Corporate Websites", description: "Multi-section sites for established companies, teams and several service lines." },
      { name: "Dynamic Websites", description: "Content-driven sites powered by a CMS or database, updated without code." },
      { name: "Custom Landing Pages", description: "Focused pages for campaigns, launches and paid traffic, built to convert." },
      { name: "E-commerce Websites", description: "Online stores with product catalogues, carts, payments and order management." },
      { name: "Portfolio Websites", description: "Visual showcases for studios, creatives and professionals to present their work." },
      { name: "Booking & Appointment Systems", description: "Let customers check availability and book consultations or services online." },
      { name: "Website Redesign", description: "Modernise an existing site's design, speed and structure while protecting its search visibility." },
      { name: "Responsive Web Development", description: "Layouts engineered to work seamlessly across mobile, tablet and desktop." },
    ],
    related: ["seo-geo-aeo", "analytics-reporting", "cloud-hosting-maintenance"],
  },
  {
    slug: "custom-software-saas",
    name: "Custom Software & SaaS Development",
    shortName: "Custom Software & SaaS",
    stage: "Scale",
    icon: Boxes,
    summary:
      "Custom digital platforms and business applications designed around your operations and growth.",
    intro:
      "When off-the-shelf tools stop fitting the way you work, we build software that does. From internal dashboards and customer portals to full multi-tenant SaaS products, we design the architecture, build the product and connect it to the systems you already use.",
    outcomes: [
      "Software shaped around your workflows, not the other way round",
      "Secure, role-based access for your team, clients and partners",
      "Architecture that can grow from first users to many organisations",
      "Clean integrations with payments, CRMs and third-party services",
    ],
    included: [
      { name: "SaaS Product Development", description: "Subscription software products, from first release through to a scalable platform." },
      { name: "Custom Web Applications", description: "Browser-based tools built around a specific business process or service." },
      { name: "Admin Panels & Dashboards", description: "Control centres to manage content, users, orders and operational data." },
      { name: "Customer Portals", description: "Secure areas where clients can view projects, documents, invoices and updates." },
      { name: "Employee Management Systems", description: "Tools for staff records, roles, schedules, attendance and internal workflows." },
      { name: "CRM Development", description: "Track leads, customers and conversations in a CRM built around your sales process." },
      { name: "CMS Development", description: "Custom content management so your team can publish without touching code." },
      { name: "Multi-tenant Applications", description: "One platform serving many organisations, each with isolated data and settings." },
      { name: "Subscription & Payment Integrations", description: "Recurring billing, invoicing and secure checkout with established payment providers." },
      { name: "API Development & Integrations", description: "Robust APIs and connections between your software and the services you rely on." },
    ],
    related: ["website-development", "ai-automation", "cloud-hosting-maintenance"],
  },
  {
    slug: "seo-geo-aeo",
    name: "SEO, GEO & AEO",
    shortName: "SEO, GEO & AEO",
    stage: "Grow",
    icon: Search,
    summary:
      "Improve your digital visibility across traditional search engines and emerging AI-powered discovery platforms.",
    intro:
      "Customers now find businesses through search engines and through AI assistants that answer questions directly. We improve how your site is crawled, understood and ranked — and structure your content so it can be referenced in AI-generated answers as well as traditional results.",
    outcomes: [
      "A technically sound site that search engines can crawl and index",
      "Content structured to answer the questions your customers ask",
      "Stronger visibility for customers searching locally",
      "Ongoing reporting on rankings, traffic and search performance",
    ],
    included: [
      { name: "Technical SEO", description: "Fix crawlability, indexing, site speed, redirects and other technical foundations." },
      { name: "On-page SEO", description: "Optimise titles, headings, copy and internal links for the searches that matter." },
      { name: "Off-page SEO", description: "Build authority through quality mentions, listings and relevant links." },
      { name: "Local SEO", description: "Improve visibility in local and map results for customers searching nearby." },
      { name: "Keyword Research", description: "Identify the terms and questions your customers actually use to search." },
      { name: "Website Audits", description: "A clear, prioritised review of the technical and content issues holding you back." },
      { name: "Google Search Console Setup", description: "Verify your site, submit sitemaps and monitor indexing and search queries." },
      { name: "Schema Markup", description: "Structured data that helps search engines understand your business and content." },
      { name: "GEO (Generative Engine Optimization)", description: "Make your content clear and credible enough to be referenced by AI-powered search." },
      { name: "AEO (Answer Engine Optimization)", description: "Structure content as direct answers for featured snippets, voice and AI assistants." },
      { name: "Content Structure Optimization", description: "Organise pages and information so both people and machines can follow them." },
      { name: "Search Performance Monitoring", description: "Track rankings, clicks and visibility over time, and act on what changes." },
    ],
    related: ["analytics-reporting", "website-development"],
  },
  {
    slug: "analytics-reporting",
    name: "Analytics & Reporting",
    shortName: "Analytics",
    stage: "Manage",
    icon: ChartColumn,
    summary:
      "Understand how visitors interact with your business and turn meaningful data into better decisions.",
    intro:
      "Good decisions need reliable data. We set up analytics properly, track the actions that matter to your business — enquiries, bookings, purchases — and turn the numbers into clear dashboards and reports you can actually use.",
    outcomes: [
      "Accurate tracking of the actions that drive your revenue",
      "One clear view of traffic, leads and conversions",
      "Insight into how visitors move through your site",
      "Reports delivered automatically, without manual work",
    ],
    included: [
      { name: "Google Analytics 4 Integration", description: "A correctly configured GA4 property with the events and conversions you need." },
      { name: "Google Search Console Integration", description: "Connect search data to see which queries bring people to your site." },
      { name: "Google Tag Manager", description: "Manage tracking tags in one place without editing your website's code." },
      { name: "Conversion Tracking", description: "Measure enquiries, sign-ups, bookings and purchases as meaningful goals." },
      { name: "Event Tracking", description: "Capture key interactions such as clicks, downloads, video plays and form steps." },
      { name: "Custom Analytics Dashboards", description: "Visual dashboards that bring your most important metrics together." },
      { name: "Website Traffic Monitoring", description: "Keep an eye on visitor trends, sources and unusual changes in traffic." },
      { name: "Lead Tracking", description: "Follow where each lead came from and what led them to get in touch." },
      { name: "User Behaviour Analysis", description: "Understand how visitors navigate, where they hesitate and where they drop off." },
      { name: "Automated Performance Reports", description: "Scheduled reports that summarise performance without manual effort." },
    ],
    related: ["seo-geo-aeo", "ai-automation"],
  },
  {
    slug: "ai-automation",
    name: "AI & Business Automation",
    shortName: "AI & Automation",
    stage: "Manage",
    icon: Bot,
    summary:
      "Reduce repetitive work and create smarter customer experiences using AI and business automation.",
    intro:
      "Much of the work that slows a business down is repetitive: answering the same questions, copying data between tools, chasing follow-ups. We design practical AI assistants and automated workflows that handle this reliably, so your team can focus on the work that needs people.",
    outcomes: [
      "Faster answers for customers, at any hour",
      "Less manual data entry between your tools",
      "Leads captured, qualified and followed up automatically",
      "AI grounded in your own documents and knowledge",
    ],
    included: [
      { name: "AI Chatbot Integration", description: "Add a helpful chat assistant to your website or customer channels." },
      { name: "Custom AI Assistants", description: "Assistants designed for specific tasks such as quoting, onboarding or support." },
      { name: "RAG-Based Knowledge Assistants", description: "AI that answers from your own documents, policies and knowledge base." },
      { name: "AI-Powered Customer Support", description: "Resolve common questions instantly and hand complex cases to your team." },
      { name: "Automated Email Workflows", description: "Timely, personalised emails triggered by actions such as enquiries or sign-ups." },
      { name: "Lead Capture Automation", description: "Capture, qualify and route new leads to the right person automatically." },
      { name: "CRM Integrations", description: "Keep your CRM up to date with data from forms, chats and other tools." },
      { name: "Third-Party API Integrations", description: "Connect the platforms you use so information flows between them." },
      { name: "Business Workflow Automation", description: "Automate approvals, notifications, document handling and routine processes." },
      { name: "AI Content Automation", description: "Speed up drafting and repurposing content, with human review built in." },
    ],
    related: ["custom-software-saas", "analytics-reporting"],
  },
  {
    slug: "cloud-hosting-maintenance",
    name: "Cloud, Hosting & Maintenance",
    shortName: "Cloud & Maintenance",
    stage: "Scale",
    icon: Cloud,
    summary: "Keep your digital platforms secure, fast, reliable, and ready to scale.",
    intro:
      "Launching is only the beginning. We deploy your platforms on reliable cloud infrastructure, automate releases, secure and back up your data, and stay on hand to keep everything fast, up to date and running smoothly.",
    outcomes: [
      "Reliable hosting on established cloud platforms",
      "Automated, low-risk releases through CI/CD",
      "Security hardening, monitoring and regular backups",
      "A dependable partner for updates, fixes and support",
    ],
    included: [
      { name: "Domain Configuration", description: "Set up domains, DNS records and SSL certificates correctly from day one." },
      { name: "Website Hosting", description: "Fast, secure hosting matched to your site's traffic and technical needs." },
      { name: "AWS Cloud Deployment", description: "Deploy applications on AWS with scalable, well-architected infrastructure." },
      { name: "Vercel Deployment", description: "Ship modern web applications on Vercel's global edge network." },
      { name: "CI/CD Setup", description: "Automated pipelines that test and deploy every change consistently." },
      { name: "Database Configuration", description: "Provision, secure and tune databases for performance and reliability." },
      { name: "Website Performance Optimization", description: "Improve load times and Core Web Vitals for a faster experience." },
      { name: "Security Implementation", description: "Security headers, access controls, updates and protection against common threats." },
      { name: "Backup & Recovery", description: "Scheduled backups and a clear plan to restore quickly if something goes wrong." },
      { name: "Ongoing Maintenance", description: "Regular updates, dependency upgrades and fixes to keep your platform healthy." },
      { name: "Technical Support", description: "Help when you need changes, have questions or run into an issue." },
    ],
    related: ["website-development", "custom-software-saas"],
  },
] as const satisfies readonly (Omit<Service, "related"> & { related: readonly string[] })[];

export type ServiceSlug = (typeof serviceList)[number]["slug"];

export const services: readonly Service[] = serviceList;

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
