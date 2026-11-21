import { Blocks, DraftingCompass, Gauge, Handshake, Layers, ListChecks, type LucideIcon } from "lucide-react";

export type Differentiator = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const whyUsIntro = {
  eyebrow: "Why choose us",
  index: "06",
  title: "One partner for the whole journey — not just the launch.",
  description:
    "We bring design, engineering, search and automation together, so the systems that run your business are planned as one and built to last. Whether you need your first website or your next digital platform, you work with a single team that understands the whole picture.",
  figureCaption: "Fig. 06 — One partner, every stage",
} as const;

export const differentiators: readonly Differentiator[] = [
  {
    title: "One Technology Partner",
    description:
      "Development, SEO, automation and analytics together — one team accountable for how everything works as a system.",
    icon: Layers,
  },
  {
    title: "Built Around Your Business",
    description:
      "Solutions tailored to your actual requirements, rather than templates or one-size-fits-all packages.",
    icon: DraftingCompass,
  },
  {
    title: "Performance First",
    description:
      "Fast, reliable, responsive experiences. Speed and stability are designed in from the start, not patched in later.",
    icon: Gauge,
  },
  {
    title: "Scalable Architecture",
    description:
      "Technology that supports future growth, so you can extend your platform instead of rebuilding it.",
    icon: Blocks,
  },
  {
    title: "Transparent Process",
    description:
      "Clear communication, defined milestones and straightforward estimates — you always know where things stand.",
    icon: ListChecks,
  },
  {
    title: "Long-Term Partnership",
    description:
      "Continued maintenance and technical support after launch, as your business and its needs evolve.",
    icon: Handshake,
  },
];
