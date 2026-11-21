"use client";

import Link from "next/link";
import { useRef, useState, type FocusEvent } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import type { NavItem } from "@/content/navigation";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Indicator = { x: number; width: number };

type DesktopNavProps = {
  items: readonly NavItem[];
  activeSection: string | null;
  className?: string;
};

/**
 * Primary navigation with a pill that glides between links on hover/focus,
 * and a signal dot marking the section currently in view.
 */
export function DesktopNav({ items, activeSection, className }: DesktopNavProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState<Indicator | null>(null);

  // Links sit in static <li>s, so their offsetParent is the positioned <ul>.
  const moveTo = (el: HTMLElement) => setIndicator({ x: el.offsetLeft, width: el.offsetWidth });

  const handleBlur = (event: FocusEvent<HTMLUListElement>) => {
    if (!listRef.current?.contains(event.relatedTarget as Node | null)) setIndicator(null);
  };

  return (
    <nav aria-label="Primary" className={className}>
      <ul
        ref={listRef}
        className="relative flex items-center"
        onMouseLeave={() => setIndicator(null)}
        onBlur={handleBlur}
      >
        <AnimatePresence>
          {indicator ? (
            <m.span
              key="nav-hover"
              aria-hidden
              className="absolute inset-y-0 left-0 rounded-full bg-white/[0.06] ring-1 ring-white/[0.06] ring-inset"
              initial={{ opacity: 0, x: indicator.x, width: indicator.width }}
              animate={{ opacity: 1, x: indicator.x, width: indicator.width }}
              exit={{ opacity: 0 }}
              transition={spring.snappy}
            />
          ) : null}
        </AnimatePresence>

        {items.map((item) => {
          const isActive = activeSection === item.section;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                onMouseEnter={(event) => moveTo(event.currentTarget)}
                onFocus={(event) => moveTo(event.currentTarget)}
                className={cn(
                  "relative z-10 flex h-9 items-center rounded-full px-3.5 text-sm font-medium transition-colors duration-200",
                  isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute bottom-[3px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-signal-400 shadow-[0_0_8px_rgb(197_240_74/0.8)] transition-[opacity,scale] duration-300",
                    isActive ? "scale-100 opacity-100" : "scale-0 opacity-0",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
