/**
 * Copy and options for the final call-to-action and the enquiry form.
 * Service option values match service slugs, so `?service=<slug>` links
 * pre-select the right option.
 */

export const serviceOptions = [
  { value: "website-development", label: "Website Development" },
  { value: "custom-software-saas", label: "Custom Software / SaaS" },
  { value: "seo-geo-aeo", label: "SEO / GEO / AEO" },
  { value: "analytics-reporting", label: "Analytics & Reporting" },
  { value: "ai-automation", label: "AI & Automation" },
  { value: "cloud-hosting-maintenance", label: "Hosting & Maintenance" },
  { value: "multiple", label: "Multiple Services" },
  { value: "other", label: "Other" },
] as const;

/** Optional. Ranges are in INR — adjust here if you quote in another currency. */
export const budgetOptions = [
  { value: "under-50k", label: "Under ₹50,000" },
  { value: "50k-150k", label: "₹50,000 – ₹1.5 lakh" },
  { value: "150k-500k", label: "₹1.5 lakh – ₹5 lakh" },
  { value: "500k-plus", label: "₹5 lakh and above" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export type ServiceOptionValue = (typeof serviceOptions)[number]["value"];
export type BudgetOptionValue = (typeof budgetOptions)[number]["value"];

export const finalCta = {
  titleLead: "Have an Idea?",
  titleAccent: "Let's Build Something That Matters.",
  description:
    "Tell us about your business, your challenges, and where you want to go. We'll help you find the right digital solution.",
  primary: "Start a Project",
  secondary: "Contact Us",
} as const;

export const contactIntro = {
  eyebrow: "Contact",
  index: "09",
  title: "Tell us about your project.",
  description:
    "Share a few details and we'll come back to you with questions, ideas and a clear next step — no jargon, no pressure.",
  stepsTitle: "What happens next",
  steps: [
    { title: "We review your enquiry", text: "We read every message carefully to understand your goals and context." },
    { title: "We talk it through", text: "A short call to discuss requirements, priorities and options." },
    { title: "You get a clear proposal", text: "Scope, timeline and pricing based on what you actually need." },
  ],
} as const;

export const contactForm = {
  submit: "Send enquiry",
  submitting: "Sending…",
  success: {
    title: "Thank you — your enquiry is on its way.",
    text: "We'll review the details and get back to you soon. If anything changes in the meantime, just send another message.",
    again: "Send another enquiry",
  },
  error: "Something went wrong while sending your enquiry. Please try again in a moment.",
  privacyNote: "We'll only use these details to respond to your enquiry.",
} as const;
