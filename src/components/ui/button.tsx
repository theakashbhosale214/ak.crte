import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Adds the sliding arrow used on forward-moving actions. */
  withArrow?: boolean;
};

const base =
  "group/btn relative isolate inline-flex shrink-0 select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-medium tracking-[-0.005em] transition-[background-color,border-color,color,box-shadow,translate] duration-200 ease-out-quart active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-signal-400 text-ink-950 shadow-signal hover:bg-signal-300 hover:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.5),0_1px_2px_0_rgb(0_0_0/0.35),0_14px_36px_-10px_rgb(197_240_74/0.75)] before:absolute before:inset-0 before:-z-10 before:-translate-x-full before:bg-[linear-gradient(105deg,transparent_25%,rgb(255_255_255/0.55)_50%,transparent_75%)] before:transition-transform before:duration-700 before:ease-out-expo hover:before:translate-x-full",
  secondary:
    "border border-line-strong bg-white/[0.035] text-fg hover:border-line-bright hover:bg-white/[0.07]",
  ghost: "text-fg-muted hover:text-fg",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-[0.9375rem] sm:h-[3.25rem] sm:px-7 sm:text-base",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: Omit<StyleProps, "withArrow"> & { className?: string }) {
  return cn(base, variants[variant], sizes[size], className);
}

/** Two stacked arrows: the first slides out as the second slides in. */
function ArrowGlyph() {
  return (
    <span aria-hidden className="relative -mr-1 inline-flex size-4 overflow-hidden">
      <ArrowRight className="absolute inset-0 size-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-full" />
      <ArrowRight className="absolute inset-0 size-4 -translate-x-full transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0" />
    </span>
  );
}

function Content({ children, withArrow }: { children: ReactNode; withArrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {withArrow ? <ArrowGlyph /> : null}
    </>
  );
}

type ButtonLinkProps = StyleProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href">;

/**
 * A link styled as a button.
 * - Root-relative paths (`/`, `/#contact`) use Next.js client navigation.
 * - Same-page anchors (`#contact`) use a native anchor for instant, JS-free scrolling.
 * - Absolute URLs open in a new tab.
 */
export function ButtonLink({
  href,
  variant,
  size,
  withArrow,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonClassName({ variant, size, className });

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...rest}>
        <Content withArrow={withArrow}>{children}</Content>
      </Link>
    );
  }

  const isExternal = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={classes}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      <Content withArrow={withArrow}>{children}</Content>
    </a>
  );
}

type ButtonProps = StyleProps & ComponentPropsWithoutRef<"button">;

export function Button({
  variant,
  size,
  withArrow,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonClassName({ variant, size, className })} {...rest}>
      <Content withArrow={withArrow}>{children}</Content>
    </button>
  );
}
