"use client";

import type { ReactNode } from "react";
import * as m from "motion/react-m";
import { revealVariants, staggerVariants } from "@/lib/motion";

type Tag = "div" | "li" | "ul" | "ol" | "section" | "p" | "span";

const components = {
  div: m.div,
  li: m.li,
  ul: m.ul,
  ol: m.ol,
  section: m.section,
  p: m.p,
  span: m.span,
};

type BaseProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
};

/** Reveal once when the element scrolls into view. */
const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Fades and lifts its content into view the first time it is scrolled to. */
export function Reveal({ children, className, as = "div", delay = 0 }: BaseProps & { delay?: number }) {
  const Component = components[as] as typeof m.div;
  return (
    <Component
      data-reveal=""
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      custom={delay}
    >
      {children}
    </Component>
  );
}

/** Parent that reveals its `RevealItem` children one after another. */
export function RevealStagger({
  children,
  className,
  as = "div",
  stagger = 0.08,
  delay = 0,
}: BaseProps & { stagger?: number; delay?: number }) {
  const Component = components[as] as typeof m.div;
  return (
    <Component
      className={className}
      variants={staggerVariants(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, className, as = "div" }: BaseProps) {
  const Component = components[as] as typeof m.div;
  return (
    <Component data-reveal="" className={className} variants={revealVariants}>
      {children}
    </Component>
  );
}
