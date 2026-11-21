import { Braces, Cloud, Database, Server, Sparkles, type LucideIcon } from "lucide-react";

export type TechCategory = {
  name: string;
  purpose: string;
  icon: LucideIcon;
  items: readonly string[];
};

export const technologyIntro = {
  eyebrow: "Technology",
  index: "04",
  title: "Modern, proven technology — chosen for your goals.",
  description:
    "We build on a dependable, widely supported stack, so your platform is fast, secure and easy to maintain as you grow.",
  footnote: "We also work with the tools your business already uses — integrating rather than replacing.",
} as const;

export const techCategories: readonly TechCategory[] = [
  {
    name: "Frontend",
    purpose: "Fast, accessible interfaces",
    icon: Braces,
    items: ["React", "Next.js", "Vue.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    name: "Backend",
    purpose: "Reliable APIs & business logic",
    icon: Server,
    items: ["Node.js", "Express.js", "NestJS", "REST APIs", "GraphQL"],
  },
  {
    name: "Database",
    purpose: "Structured, scalable data",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "MySQL", "DynamoDB", "Redis"],
  },
  {
    name: "Cloud & Infrastructure",
    purpose: "Automated, secure delivery",
    icon: Cloud,
    items: ["AWS", "Vercel", "Docker", "GitHub Actions", "Terraform"],
  },
  {
    name: "AI & Integrations",
    purpose: "Connected, intelligent systems",
    icon: Sparkles,
    items: ["OpenAI APIs", "AI integrations", "Third-party APIs", "Authentication", "Payment integrations"],
  },
];
