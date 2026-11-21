import { sectionIds } from "@/content/navigation";

/** Central URL builders so links never drift from the routes that exist. */
export const routes = {
  home: "/",
  section: (id: string) => `/#${id}`,
  service: (slug: string) => `/services/${slug}`,
  /**
   * Contact section, optionally pre-selecting a service in the enquiry form
   * (read from `?service=` by the form in Phase 4).
   */
  contact: (serviceSlug?: string) =>
    serviceSlug ? `/?service=${serviceSlug}#${sectionIds.contact}` : `/#${sectionIds.contact}`,
} as const;
