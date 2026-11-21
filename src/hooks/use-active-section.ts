"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy: returns the id of the section crossing a thin band just above
 * the middle of the viewport. Ids that don't exist on the page are ignored,
 * so the hook keeps working as sections are added.
 *
 * Pass a stable (module-level) array, and the current pathname so the
 * observer is rebuilt after client-side navigation between pages.
 */
export function useActiveSection(ids: readonly string[], pathname: string) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const intersecting = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }
        // First match in document order wins; keep the last value when the
        // band sits between tracked sections.
        const next = ids.find((id) => intersecting.has(id));
        if (next) setActive(next);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, pathname]);

  return active;
}
