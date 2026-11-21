"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

/** True while the deck should animate live data (visible, motion allowed, intro done). */
const DeckLiveContext = createContext(false);
export const useDeckLive = () => useContext(DeckLiveContext);

const LAYERS = ["4", "3", "2", "1"] as const;
const INTRO_MS = 2700;
const CYCLE_MS = 3200;
const IDLE_AFTER_HOVER_MS = 3500;

/**
 * Drives the hero's command deck without re-rendering React on every frame:
 * - pointer orbit and scroll "explode" are written as CSS variables on the rig;
 * - the focused layer is a `data-layer` attribute on this element, set by
 *   hovering a plate or legend item (`data-layer-target`) or by a slow
 *   auto-cycle when idle;
 * - live widgets only tick while the hero is on screen and the tab is visible.
 * Everything stays still for visitors who prefer reduced motion.
 */
export function DeckProvider({ children, className }: { children: ReactNode; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [introDone, setIntroDone] = useState(false);

  const live = !reduceMotion && inView && pageVisible && introDone;

  // Play the intro the first time the deck itself is on screen (immediately on
  // desktop; after scrolling on phones), then let the live data take over.
  useEffect(() => {
    const scene = rootRef.current?.querySelector<HTMLElement>("[data-deck-scene]");
    if (!scene) return;
    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        scene.dataset.play = "";
        timer = window.setTimeout(() => setIntroDone(true), INTRO_MS);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );
    observer.observe(scene);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(root);
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Focus: hover wins; otherwise cycle through the layers while live.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let hovered: string | null = null;
    let idleUntil = 0;
    let index = 0;

    const setLayer = (layer: string | null) => {
      if (layer) root.dataset.layer = layer;
      else delete root.dataset.layer;
    };
    const targetOf = (node: EventTarget | null) =>
      node instanceof Element ? node.closest<HTMLElement>("[data-layer-target]") : null;

    const onOver = (event: PointerEvent) => {
      const target = targetOf(event.target);
      if (!target) return;
      hovered = target.dataset.layerTarget ?? null;
      setLayer(hovered);
    };
    const onOut = (event: PointerEvent) => {
      const from = targetOf(event.target);
      if (!from || from === targetOf(event.relatedTarget)) return;
      hovered = null;
      idleUntil = Date.now() + IDLE_AFTER_HOVER_MS;
      setLayer(null);
    };

    root.addEventListener("pointerover", onOver);
    root.addEventListener("pointerout", onOut);

    const step = () => {
      if (hovered || Date.now() < idleUntil) return;
      setLayer(LAYERS[index % LAYERS.length]);
      index += 1;
    };
    const first = live ? window.setTimeout(step, 500) : undefined;
    const cycle = live ? window.setInterval(step, CYCLE_MS) : undefined;

    return () => {
      root.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerout", onOut);
      window.clearTimeout(first);
      window.clearInterval(cycle);
    };
  }, [live]);

  // Pointer orbit + scroll explode, eased in a rAF loop that sleeps when idle.
  useEffect(() => {
    if (reduceMotion) return;
    const root = rootRef.current;
    const rig = root?.querySelector<HTMLElement>("[data-rig]");
    if (!root || !rig) return;

    // Orbit and scroll explode are desktop flourishes; touch devices skip them
    // entirely (they would restyle the whole deck on every scroll frame).
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return;
    const target = { x: 0, y: 0, gap: 0 };
    const current = { x: 0, y: 0, gap: 0 };
    let frame = 0;

    const render = () => {
      current.x += (target.x - current.x) * 0.07;
      current.y += (target.y - current.y) * 0.07;
      current.gap += (target.gap - current.gap) * 0.12;
      rig.style.setProperty("--rz-mouse", `${(current.x * 8).toFixed(3)}deg`);
      rig.style.setProperty("--rx-mouse", `${(-current.y * 5).toFixed(3)}deg`);
      rig.style.setProperty("--gap-scroll", `${current.gap.toFixed(3)}em`);
      const settled =
        Math.abs(target.x - current.x) < 0.001 &&
        Math.abs(target.y - current.y) < 0.001 &&
        Math.abs(target.gap - current.gap) < 0.002;
      frame = settled ? 0 : requestAnimationFrame(render);
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.y = (event.clientY / window.innerHeight) * 2 - 1;
      wake();
    };
    const onPointerLeave = () => {
      target.x = 0;
      target.y = 0;
      wake();
    };
    const onScroll = () => {
      const rect = root.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / (rect.height * 0.55), 0), 1);
      target.gap = progress * 3.4;
      wake();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <DeckLiveContext.Provider value={live}>
      <div ref={rootRef} data-deck="" className={className}>
        {children}
      </div>
    </DeckLiveContext.Provider>
  );
}
