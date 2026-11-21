import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** Id of the section's heading, for aria-labelledby. */
  labelledBy: string;
  /** Draw a hairline divider along the top edge. */
  divider?: boolean;
  /** Tighter rhythm for secondary pages with many short sections. */
  compact?: boolean;
};

/** Standard page section: consistent vertical rhythm and an accessible label. */
export function Section({ labelledBy, divider, compact, className, children, ...props }: SectionProps) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cn("relative", compact ? "py-16 sm:py-24" : "section-pad", className)}
      {...props}
    >
      {divider ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-line-strong)_20%,var(--color-line-strong)_80%,transparent)]"
        />
      ) : null}
      {children}
    </section>
  );
}
