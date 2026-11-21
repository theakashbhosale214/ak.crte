"use client";

import { useCallback, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { mainNav, navCta, sectionIds } from "@/content/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useScrolled } from "@/hooks/use-scrolled";
import { DesktopNav } from "./desktop-nav";
import { MobileMenu } from "./mobile-menu";

const trackedSections = mainNav.map((item) => item.section);

/**
 * Sticky header. Transparent and full-width at the top of the page; once
 * scrolled it condenses into a floating, blurred capsule.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useScrolled(12);
  const isDesktop = useMediaQuery("(min-width: 64rem)");
  const spiedSection = useActiveSection(trackedSections, pathname);

  // On the home page the scroll position decides; elsewhere the route does.
  const activeSection =
    pathname === "/" ? spiedSection : pathname.startsWith("/services") ? sectionIds.services : null;
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // The mobile menu can never be open on desktop widths (e.g. after a resize).
  const open = menuOpen && !isDesktop;

  return (
    <header
      data-scrolled={scrolled ? "" : undefined}
      className="group/header fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto w-full max-w-site px-3 transition-[max-width,padding] duration-500 ease-out-expo sm:px-5 lg:px-6 group-data-scrolled/header:max-w-[68rem] group-data-scrolled/header:pt-3">
        <div className="flex h-(--header-h) items-center justify-between gap-6 rounded-2xl border border-transparent px-2 transition-[height,background-color,border-color,box-shadow] duration-500 ease-out-expo sm:px-3 lg:grid lg:grid-cols-[1fr_auto_1fr] group-data-scrolled/header:h-14 group-data-scrolled/header:border-line-strong group-data-scrolled/header:bg-ink-900/75 group-data-scrolled/header:shadow-float group-data-scrolled/header:backdrop-blur-xl">
          <Logo className="justify-self-start" />

          <DesktopNav items={mainNav} activeSection={activeSection} className="hidden lg:block" />

          <div className="flex items-center gap-2 justify-self-end">
            <ButtonLink href={navCta.href} size="sm" withArrow className="hidden sm:inline-flex">
              {navCta.label}
            </ButtonLink>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-label="Open menu"
              className="group/menu grid size-10 place-items-center rounded-full border border-line-strong bg-white/[0.03] text-fg transition-colors hover:bg-white/[0.08] lg:hidden"
            >
              <span aria-hidden className="flex w-[18px] flex-col items-end gap-[5px]">
                <span className="h-[1.5px] w-full rounded-full bg-current" />
                <span className="h-[1.5px] w-3/5 rounded-full bg-current transition-[width] duration-300 ease-out-expo group-hover/menu:w-full" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        open={open}
        onClose={closeMenu}
        activeSection={activeSection}
        returnFocusRef={toggleRef}
      />
    </header>
  );
}
