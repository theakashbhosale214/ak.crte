export type EngagementShape = "project" | "monthly" | "dedicated";

export type EngagementModel = {
  number: string;
  name: string;
  shape: EngagementShape;
  description: string;
  includes: readonly string[];
  /** How the engagement is structured commercially — never a price. */
  basis: string;
  cta: string;
};

export const engagementIntro = {
  eyebrow: "Engagement models",
  index: "07",
  title: "Flexible ways to work together.",
  description:
    "Start with a single project, keep improving month by month, or build with a dedicated team. Every engagement is shaped around your goals.",
  note: "We don't publish fixed prices, because every business is different. Scope, timelines and pricing depend on your requirements — after a short conversation we'll recommend the right model and share a clear proposal.",
  noteCta: "Discuss your project",
} as const;

export const engagementModels: readonly EngagementModel[] = [
  {
    number: "01",
    name: "Project-Based Development",
    shape: "project",
    description: "For businesses that need a website, application, or specific digital solution.",
    includes: [
      "Defined scope, milestones and timeline",
      "Design, development and testing",
      "Launch, handover and training",
      "Documentation for your team",
    ],
    basis: "Quoted per project",
    cta: "Request a quote",
  },
  {
    number: "02",
    name: "Monthly Growth & Maintenance",
    shape: "monthly",
    description:
      "For businesses that need continuous technical support, SEO, performance improvements, and analytics.",
    includes: [
      "Updates, security and backups",
      "SEO and performance improvements",
      "Analytics reviews and reporting",
      "Content changes and small enhancements",
    ],
    basis: "Monthly plan, flexible scope",
    cta: "Discuss a monthly plan",
  },
  {
    number: "03",
    name: "Dedicated Development Partnership",
    shape: "dedicated",
    description:
      "For startups and businesses that need ongoing development, integrations, and product engineering.",
    includes: [
      "Ongoing product engineering",
      "New features and integrations",
      "Architecture and technical guidance",
      "Regular planning and progress reviews",
    ],
    basis: "Ongoing, dedicated capacity",
    cta: "Discuss a partnership",
  },
];
