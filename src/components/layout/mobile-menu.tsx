"use client";

import Link from "next/link";
import { useEffect, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, type Variants } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { brand } from "@/config/brand";
import { mainNav, navCta } from "@/content/navigation";
import { useIsClient } from "@/hooks/use-media-query";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  activeSection: string | null;
  /** Element that receives focus again when the menu closes. */
  returnFocusRef: RefObject<HTMLButtonElement | null>;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const listVariants: Variants = {
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
  exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.outExpo } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
};

/**
 * Full-screen mobile navigation dialog.
 * Locks page scroll, traps focus, closes on Escape or link selection, and
 * returns focus to the menu button. Rendered in a portal so the header's
 * backdrop-filter can't become its containing block.
 */
export function MobileMenu({ open, onClose, activeSection, returnFocusRef }: MobileMenuProps) {
  const isClient = useIsClient();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const returnTarget = returnFocusRef.current;

    panel.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      returnTarget?.focus({ preventScroll: true });
    };
  }, [open, onClose, returnFocusRef]);

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <m.div
          key="mobile-menu"
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-ink-900 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3, ease: ease.outQuart } }}
          exit={{ opacity: 0, transition: { duration: 0.25, ease: ease.outQuart, delay: 0.05 } }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 blueprint-grid [--grid-size:48px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_0%,#000_30%,transparent_80%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-48 left-1/2 h-96 w-[40rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(197_240_74/0.13),transparent)]"
          />

          <div className="relative flex h-(--header-h) shrink-0 items-center justify-between px-5 sm:px-8">
            <Logo onClick={onClose} />
            <button
              type="button"
              data-autofocus
              onClick={onClose}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-full border border-line-strong bg-white/[0.03] text-fg transition-colors hover:bg-white/[0.08]"
            >
              <X className="size-[18px]" strokeWidth={1.75} />
            </button>
          </div>

          <nav aria-label="Mobile" className="relative flex-1 overflow-y-auto px-5 pt-4 sm:px-8">
            <m.ul
              className="border-t border-line"
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {mainNav.map((item, index) => {
                const isActive = activeSection === item.section;
                return (
                  <m.li key={item.href} className="border-b border-line" variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={isActive ? "true" : undefined}
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="eyebrow w-6 text-fg-faint">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-display text-[1.875rem] font-medium leading-none tracking-[-0.03em] transition-colors",
                            isActive ? "text-signal-300" : "text-fg group-hover:text-signal-200",
                          )}
                        >
                          {item.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="size-5 text-fg-subtle transition-transform duration-300 group-hover:rotate-45 group-hover:text-fg"
                        strokeWidth={1.5}
                      />
                    </Link>
                  </m.li>
                );
              })}
            </m.ul>
          </nav>

          <m.div
            className="relative space-y-4 border-t border-line px-5 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.28, duration: 0.5, ease: ease.outExpo } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <ButtonLink href={navCta.href} onClick={onClose} size="lg" withArrow className="w-full">
              {navCta.label}
            </ButtonLink>
            <p className="eyebrow text-center text-fg-subtle">{brand.lifecycle.join(" · ")}</p>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
