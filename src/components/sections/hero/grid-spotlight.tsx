"use client";

import { useEffect, useRef } from "react";

/**
 * A brighter copy of the blueprint grid, revealed in a soft circle around the
 * cursor. Updates CSS variables directly (no React re-renders), once per frame.
 * Only active for precise pointers and when motion is allowed.
 */
export function GridSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.closest("section");
    if (!el || !host) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      el.style.setProperty("--spot-x", `${x}px`);
      el.style.setProperty("--spot-y", `${y}px`);
    };
    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      el.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 opacity-0 transition-opacity duration-700 blueprint-grid [--grid-color:rgb(197_240_74/0.22)] [mask-image:radial-gradient(18rem_circle_at_var(--spot-x,50%)_var(--spot-y,20%),#000,transparent_70%)]"
    />
  );
}
