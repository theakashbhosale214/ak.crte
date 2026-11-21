import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/*
 * Shared building blocks for the hero stage modules. Everything is sized in
 * `em` so a module scales with its slot's font-size.
 */

type StageCardProps = {
  /** Intrinsic size in em, e.g. [16.5, 12.5]. */
  size: [number, number];
  className?: string;
  children: ReactNode;
};

export function StageCard({ size, className, children }: StageCardProps) {
  const style: CSSProperties = { width: `${size[0]}em`, height: `${size[1]}em` };
  return (
    <div
      style={style}
      className={cn(
        "surface relative flex flex-col overflow-hidden rounded-[1em] shadow-float [--surface-bg:var(--color-ink-850)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  icon: Icon,
  title,
  meta,
}: {
  icon: LucideIcon;
  title: string;
  meta?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-[0.5em]">
      <div className="flex items-center gap-[0.55em]">
        <span className="grid size-[1.75em] place-items-center rounded-[0.5em] border border-line-strong bg-white/[0.04] text-signal-300">
          <Icon className="size-[0.95em]" strokeWidth={1.75} />
        </span>
        <span className="text-[0.8125em] font-medium text-fg">{title}</span>
      </div>
      {meta}
    </div>
  );
}

export function LiveBadge({ label = "Live" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-[0.45em] rounded-full border border-signal-400/25 bg-signal-400/10 px-[0.6em] py-[0.22em] font-mono text-[0.5625em] font-medium tracking-[0.08em] text-signal-300 uppercase">
      <span className="relative flex size-[0.55em]">
        <span className="absolute inset-0 animate-ping-soft rounded-full bg-signal-400" />
        <span className="relative size-full rounded-full bg-signal-400" />
      </span>
      {label}
    </span>
  );
}

export function MicroLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "font-mono text-[0.5625em] tracking-[0.14em] text-fg-subtle uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Skeleton text bar for mock interfaces. */
export function Bar({ className }: { className?: string }) {
  return <i aria-hidden className={cn("block h-[0.3em] rounded-full bg-white/10", className)} />;
}
