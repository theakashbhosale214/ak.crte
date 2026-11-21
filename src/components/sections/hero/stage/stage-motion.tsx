"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { useMediaQuery } from "@/hooks/use-media-query";

const STATIC_STYLE = { rotateX: 0, rotateY: 0, scale: 1 };

/**
 * Gives the stage its sense of depth:
 * - it starts slightly tilted back and settles flat as it scrolls into view;
 * - on precise pointers it leans gently toward the cursor.
 * The whole stage moves as one plane, so the traces stay aligned with the
 * modules they connect. Disabled for reduced-motion users.
 */
export function StageMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // useSyncExternalStore-based, so server and hydration renders always agree.
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const settle = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0]), {
    stiffness: 90,
    damping: 24,
    mass: 0.6,
  });

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 60, damping: 18, mass: 0.8 });
  const smoothY = useSpring(pointerY, { stiffness: 60, damping: 18, mass: 0.8 });

  const rotateX = useTransform(
    [settle, smoothY],
    ([tilt, y]: number[]) => tilt * 9 - y * 2.5,
  );
  const rotateY = useTransform(smoothX, (x) => x * 3.5);
  const scale = useTransform(settle, (tilt) => 1 - tilt * 0.04);

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const host = ref.current?.closest("section");
    if (!host) return;

    const onMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion, pointerX, pointerY]);

  return (
    <div ref={ref} className="[perspective:2200px]">
      <m.div
        className="origin-top"
        style={reduceMotion ? STATIC_STYLE : { rotateX, rotateY, scale }}
      >
        {children}
      </m.div>
    </div>
  );
}
