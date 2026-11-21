import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./eyebrow";

type SectionHeadingProps = {
  /** Heading id — pass the same value to the section's aria-labelledby. */
  id: string;
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  /** `split` puts the description beside the title on large screens. */
  layout?: "stacked" | "centered" | "split";
  size?: "lg" | "md";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  index,
  title,
  description,
  layout = "stacked",
  size = "lg",
  className,
}: SectionHeadingProps) {
  const titleClass = cn("text-fg", size === "lg" ? "text-display-lg" : "text-display-md");
  const label = eyebrow ? <Eyebrow index={index}>{eyebrow}</Eyebrow> : null;

  if (layout === "split") {
    return (
      <div className={cn("grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10", className)}>
        <Reveal className="lg:col-span-7">
          {label}
          <h2 id={id} className={cn(titleClass, label && "mt-4")}>
            {title}
          </h2>
        </Reveal>
        {description ? (
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="text-fg-muted lg:pb-1.5">{description}</p>
          </Reveal>
        ) : null}
      </div>
    );
  }

  const centered = layout === "centered";
  return (
    <Reveal className={cn("max-w-prose-wide", centered && "mx-auto text-center", className)}>
      {label}
      <h2 id={id} className={cn(titleClass, label && "mt-4")}>
        {title}
      </h2>
      {description ? <p className="mt-5 text-lead text-fg-muted">{description}</p> : null}
    </Reveal>
  );
}
