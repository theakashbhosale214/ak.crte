"use client";

import { useRef } from "react";
import { useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";
import type { ApproachStep } from "@/content/approach";
import { useMediaQuery } from "@/hooks/use-media-query";

function TimelineStep({
  step,
  index,
  total,
  progress,
}: {
  step: ApproachStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // A stage's node lights up as the progress line reaches it. The text is
  // never dimmed, so it always keeps full contrast.
  const at = index / total;
  const lit = useTransform(progress, [Math.max(0, at - 0.04), at + 0.02], [0, 1]);
  const nodeScale = useTransform(lit, [0, 1], [0.6, 1]);

  return (
    <li className="relative pl-16 lg:pt-16 lg:pl-0">
      <span
        aria-hidden
        className="absolute top-0 left-0 grid size-10 place-items-center rounded-full border border-line-strong bg-ink-900 font-mono text-xs text-fg-subtle"
      >
        {step.number}
        <m.span
          className="absolute inset-0 grid place-items-center rounded-full bg-signal-400 font-mono text-xs font-semibold text-ink-950 shadow-[0_0_24px_rgb(197_240_74/0.45)]"
          style={{ opacity: lit, scale: nodeScale }}
        >
          {step.number}
        </m.span>
      </span>

      <div>
        <h3 className="text-xl font-semibold tracking-[-0.02em] text-fg">
          <span className="sr-only">Step {step.number}: </span>
          {step.title}
        </h3>
        <p className="mt-2.5 text-[0.9375rem] text-fg-muted">{step.description}</p>
        <ul className="mt-5 space-y-2">
          {step.deliverables.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 font-mono text-[0.6875rem] tracking-[0.08em] text-fg-subtle uppercase"
            >
              <span aria-hidden className="h-px w-3 bg-fg-faint" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/**
 * Five stages on a track whose signal line fills as the section scrolls
 * through the viewport — horizontal on desktop, vertical on smaller screens.
 * Under reduced motion every stage is shown fully lit.
 */
export function ApproachTimeline({ steps }: { steps: readonly ApproachStep[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const complete = useMotionValue(1);
  const progress = reduceMotion ? complete : smooth;

  return (
    <ol ref={ref} className="relative mt-14 grid gap-12 sm:mt-16 lg:mt-20 lg:grid-cols-5 lg:gap-8">
      <span aria-hidden className="absolute top-5 bottom-5 left-[19.5px] w-px bg-line lg:hidden" />
      <m.span
        aria-hidden
        className="absolute top-5 bottom-5 left-[19.5px] w-px origin-top bg-signal-400 shadow-[0_0_10px_rgb(197_240_74/0.6)] lg:hidden"
        style={{ scaleY: progress }}
      />
      <span aria-hidden className="absolute top-[19.5px] right-0 left-5 hidden h-px bg-line lg:block" />
      <m.span
        aria-hidden
        className="absolute top-[19.5px] right-0 left-5 hidden h-px origin-left bg-signal-400 shadow-[0_0_10px_rgb(197_240_74/0.6)] lg:block"
        style={{ scaleX: progress }}
      />

      {steps.map((step, index) => (
        <TimelineStep key={step.number} step={step} index={index} total={steps.length} progress={progress} />
      ))}
    </ol>
  );
}
