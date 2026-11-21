/**
 * Section anchors used across the site. Sections render these ids and the
 * navigation links to them, so a rename only ever happens here.
 */
export const sectionIds = {
  top: "top",
  services: "services",
  solutions: "solutions",
  work: "work",
  about: "about",
  contact: "contact",
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];

export type NavItem = {
  label: string;
  /** Root-relative so links also work from secondary pages (privacy, terms). */
  href: `/#${SectionId}`;
  section: SectionId;
};

export const mainNav: readonly NavItem[] = [
  { label: "Home", href: "/#top", section: sectionIds.top },
  { label: "Services", href: "/#services", section: sectionIds.services },
  { label: "Solutions", href: "/#solutions", section: sectionIds.solutions },
  { label: "Our Work", href: "/#work", section: sectionIds.work },
  { label: "About", href: "/#about", section: sectionIds.about },
  { label: "Contact", href: "/#contact", section: sectionIds.contact },
];

export const navCta = {
  label: "Let's Talk",
  href: "/#contact",
} as const;
