import type { ServiceSlug } from "./services";

export type FaqItem = {
  question: string;
  /** Plain text — also used verbatim in FAQPage structured data. */
  answer: string;
  /** Optional related service page. */
  service?: ServiceSlug;
};

export const faqIntro = {
  eyebrow: "FAQ",
  index: "08",
  title: "Questions, answered.",
  description: "Straight answers to the questions businesses ask us most often.",
  contact: {
    title: "Still have a question?",
    text: "Tell us what you're working on and we'll get back to you with a clear answer.",
    cta: "Ask us directly",
  },
} as const;

export const faqs: readonly FaqItem[] = [
  {
    question: "How much does a business website cost?",
    answer:
      "It depends on the number of pages, the features you need and any integrations — a focused business website and a full e-commerce store are very different projects. We don't sell fixed packages. Once we understand your goals, we'll share a clear, itemised quote before any work begins, so you only pay for what your business actually needs.",
    service: "website-development",
  },
  {
    question: "How long does website development take?",
    answer:
      "Timelines depend on scope and on how quickly content and feedback are ready. As a general guide, a focused business website takes a few weeks, while larger sites, online stores and custom platforms take longer. We agree a schedule with clear milestones before we start, and keep you updated at every stage.",
  },
  {
    question: "Can I manage my website without a developer?",
    answer:
      "Yes. We can build your site with a content management system or a custom admin panel, so your team can update text, images, projects, products and articles without touching code. We'll also show you how to use it.",
    service: "website-development",
  },
  {
    question: "Do you provide custom admin panels?",
    answer:
      "Yes. We build admin panels and dashboards tailored to how your business runs — managing content, users, enquiries, orders, bookings or internal data — with role-based access for different members of your team.",
    service: "custom-software-saas",
  },
  {
    question: "Can you integrate Google Analytics?",
    answer:
      "Yes. We set up Google Analytics 4, Google Tag Manager and Google Search Console, and configure tracking for the actions that matter to you, such as enquiries, bookings and purchases. We can also build custom dashboards and automated reports.",
    service: "analytics-reporting",
  },
  {
    question: "What is GEO and how is it different from SEO?",
    answer:
      "SEO (search engine optimization) improves how your site ranks in traditional search results. GEO (generative engine optimization) focuses on how AI-powered tools — such as AI search summaries and chat assistants — understand, summarise and reference your business. The foundations overlap: clear structure, accurate information and structured data help both. AEO (answer engine optimization) is closely related and focuses on giving direct answers to specific questions.",
    service: "seo-geo-aeo",
  },
  {
    question: "Do you provide ongoing website maintenance?",
    answer:
      "Yes. Ongoing maintenance can cover updates, security, backups, performance monitoring, fixes and content changes, so your site stays fast, secure and up to date. It's available as part of our monthly growth and maintenance plans.",
    service: "cloud-hosting-maintenance",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Yes. We can modernise your current site's design, structure and performance while keeping what already works — including your content and existing search visibility, with proper redirects and SEO checks during the move.",
    service: "website-development",
  },
  {
    question: "Do you provide monthly SEO services?",
    answer:
      "Yes. Monthly SEO can include technical improvements, content optimization, local SEO, search performance monitoring and regular reporting on rankings and traffic. The exact scope depends on your goals and your market.",
    service: "seo-geo-aeo",
  },
  {
    question: "Can you build custom SaaS applications?",
    answer:
      "Yes. We design and build SaaS products end to end — architecture, user accounts and roles, multi-tenant data, subscriptions and payments, admin tools and integrations — starting with a focused first release and scaling as your users grow.",
    service: "custom-software-saas",
  },
  {
    question: "Do you provide hosting and domain setup?",
    answer:
      "Yes. We configure domains, DNS and SSL certificates, and deploy to reliable platforms such as Vercel or AWS depending on your needs. We can also set up automated deployments, monitoring and backups.",
    service: "cloud-hosting-maintenance",
  },
  {
    question: "Can you integrate AI chatbots?",
    answer:
      "Yes. We can add AI assistants to your website or support channels that answer questions using your own content, capture leads and hand more complex conversations to your team. We focus on practical, reliable use cases with sensible safeguards.",
    service: "ai-automation",
  },
];
