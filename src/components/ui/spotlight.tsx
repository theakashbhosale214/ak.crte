"use client";

import type { PointerEvent, ReactNode } from "react";

/**
 * Tracks the pointer over any descendant marked `data-spotlight` and exposes
 * its position as `--spot-x` / `--spot-y` on that element, so cards can paint
 * a cursor-following glow in CSS. One listener for the whole group, no
 * re-renders.
 */
export function SpotlightGroup({ className, children }: { className?: string; children: ReactNode }) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const card = (event.target as HTMLElement).closest<HTMLElement>("[data-spotlight]");
    if (!card || !event.currentTarget.contains(card)) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div className={className} onPointerMove={handlePointerMove}>
      {children}
    </div>
  );
}
