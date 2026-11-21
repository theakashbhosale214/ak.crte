import type { Transition, Variants } from "motion/react";

/**
 * Motion tokens — the JS counterpart of the easing/duration tokens in
 * `globals.css`. Keep the two in sync so CSS and Motion animations feel
 * like one system.
 */
export const ease = {
  /** Fast start, long settle. The default for entrances. */
  outExpo: [0.16, 1, 0.3, 1],
  outQuart: [0.25, 1, 0.5, 1],
  inOutCirc: [0.85, 0, 0.15, 1],
} as const satisfies Record<string, [number, number, number, number]>;

export const duration = {
  fast: 0.15,
  base: 0.25,
  slow: 0.45,
  slower: 0.7,
} as const;

export const spring = {
  /** UI elements that should feel responsive but never bouncy. */
  snappy: { type: "spring", stiffness: 420, damping: 38, mass: 0.8 },
  /** Larger surfaces such as menus and panels. */
  soft: { type: "spring", stiffness: 180, damping: 28, mass: 1 },
} as const satisfies Record<string, Transition>;

/** Fade-and-rise used by scroll reveals. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: duration.slower, ease: ease.outExpo, delay },
  }),
};

/** Parent that staggers `revealVariants` children. */
export const staggerVariants = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});
