"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * - LazyMotion + `m` components keep the animation runtime small
 *   (`strict` throws if a full `motion.*` component slips in).
 * - reducedMotion="user" disables transform animations for visitors who
 *   prefer reduced motion, while keeping opacity fades.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
