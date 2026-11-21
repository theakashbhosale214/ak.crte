import { sectionIds } from "./navigation";

export const hero = {
  eyebrow: ["Websites", "Software", "SEO", "AI Automation"],
  headline: {
    lead: "Your Digital Presence.",
    accent: "Engineered to Grow.",
  },
  description:
    "From high-performance websites and custom software to AI automation and search visibility, we build the digital systems that move your business forward.",
  primaryCta: { label: "Start Your Project", href: `#${sectionIds.contact}` },
  secondaryCta: { label: "Explore Our Services", href: `#${sectionIds.services}` },
} as const;
