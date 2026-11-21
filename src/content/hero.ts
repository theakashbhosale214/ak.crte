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
  /** The four layers of the command deck, top to bottom — one per lifecycle stage. */
  layers: [
    { layer: 4, number: "04", stage: "Build", detail: "Websites & apps" },
    { layer: 3, number: "03", stage: "Manage", detail: "Dashboards & automation" },
    { layer: 2, number: "02", stage: "Grow", detail: "SEO, GEO & analytics" },
    { layer: 1, number: "01", stage: "Scale", detail: "Cloud & SaaS" },
  ],
  figureCaption: "Every layer of your digital system",
  figureDescription:
    "A live, layered view of a digital business: the website customers see, an admin dashboard with automation, search and analytics, and the cloud infrastructure underneath.",
} as const;
