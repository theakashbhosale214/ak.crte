import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  /** Optional section index, e.g. "01". */
  index?: string;
  className?: string;
};

/** Mono label that sits above headings. The square marker echoes the logo's nodes. */
export function Eyebrow({ children, index, className }: EyebrowProps) {
  return (
    <p className={cn("eyebrow inline-flex items-center gap-2.5 text-fg-subtle", className)}>
      <span
        aria-hidden
        className="size-1.5 rounded-[2px] bg-signal-400 shadow-[0_0_10px_rgb(197_240_74/0.7)]"
      />
      {index ? <span className="text-fg-faint">{index}</span> : null}
      <span>{children}</span>
    </p>
  );
}
