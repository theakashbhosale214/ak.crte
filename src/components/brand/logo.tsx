import Link from "next/link";
import { brand } from "@/config/brand";
import { cn } from "@/lib/cn";

type MarkProps = {
  className?: string;
  /** Provide a title when the mark is used on its own as meaningful content. */
  title?: string;
};

/**
 * The "signal path" mark: four nodes on one continuous route — Build,
 * Manage, Grow, Scale — with the final node lit. Swap this component to
 * change the logo everywhere.
 */
export function BrandMark({ className, title }: MarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <circle
        cx="24"
        cy="8"
        r="7"
        className="fill-signal-400/0 transition-[fill] duration-500 group-hover:fill-signal-400/15"
      />
      <path
        d="M8 24V8l16 16V8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="24" r="3" fill="currentColor" />
      <circle cx="8" cy="8" r="3" fill="currentColor" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      <circle cx="24" cy="8" r="3.6" className="fill-signal-400" />
    </svg>
  );
}

/**
 * The brand name exactly as configured. A "." in the name (as in ak.crte)
 * is picked out in the signal colour — the same lit point as the mark.
 */
export function Wordmark({ className, dotClassName }: { className?: string; dotClassName?: string }) {
  const dot = brand.name.indexOf(".");
  return (
    <span className={className}>
      {dot === -1 ? (
        brand.name
      ) : (
        <>
          {brand.name.slice(0, dot)}
          <span className={cn("text-signal-400", dotClassName)}>.</span>
          {brand.name.slice(dot + 1)}
        </>
      )}
    </span>
  );
}

/** Mark + wordmark, linking home. The name is read from the brand config. */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/#top"
      onClick={onClick}
      aria-label={`${brand.name} — home`}
      className={cn("group inline-flex items-center gap-2.5 rounded-md py-1", className)}
    >
      <BrandMark className="size-7 text-fg" />
      <Wordmark className="font-display text-[1.3125rem] leading-none font-semibold tracking-[-0.025em] text-fg" />
    </Link>
  );
}
