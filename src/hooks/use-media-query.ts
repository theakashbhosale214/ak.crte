"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Subscribes to a CSS media query. Returns `serverFallback` during SSR. */
export function useMediaQuery(query: string, serverFallback = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

const noopSubscribe = () => () => {};

/** False during SSR and hydration, true afterwards. Safe gate for portals. */
export function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
