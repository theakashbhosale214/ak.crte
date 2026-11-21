"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/**
 * True once the page has scrolled past `threshold` pixels.
 * Re-renders only when the boolean flips, not on every scroll event.
 */
export function useScrolled(threshold = 8) {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false,
  );
}
