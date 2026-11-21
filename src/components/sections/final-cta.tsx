import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { brand } from "@/config/brand";
import { finalCta } from "@/content/contact";
import { sectionIds } from "@/content/navigation";

/** The logo's signal path, drawn large behind the closing statement. */
function SignalPathArt() {
  const pulse = { "--flow-duration": "5.5s" } as CSSProperties;
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      focusable="false"
      className="absolute top-1/2 left-1/2 h-[140%] -translate-x-1/2 -translate-y-1/2 sm:h-[160%]"
    >
      <path
        d="M8 24V8l16 16V8"
        strokeWidth="0.06"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-white/15"
      />
      <path
        d="M8 24V8l16 16V8"
        pathLength={1}
        strokeWidth="0.14"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="trace-pulse stroke-signal-400/55"
        style={pulse}
      />
      <circle cx="8" cy="24" r="0.32" strokeWidth="0.06" className="fill-ink-900 stroke-white/30" />
      <circle cx="8" cy="8" r="0.32" strokeWidth="0.06" className="fill-ink-900 stroke-white/30" />
      <circle cx="24" cy="24" r="0.32" strokeWidth="0.06" className="fill-ink-900 stroke-white/30" />
      <circle cx="24" cy="8" r="1.2" className="fill-signal-400/10" />
      <circle cx="24" cy="8" r="0.42" className="fill-signal-400/80" />
    </svg>
  );
}

/** Section 12 — the closing statement before the enquiry form. */
export function FinalCta() {
  const contactHref = brand.contact.email ? `mailto:${brand.contact.email}` : `#${sectionIds.contact}`;

  return (
    <section aria-labelledby="final-cta-title" className="relative isolate overflow-hidden py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 blueprint-grid [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,#000_20%,transparent_75%)]" />
        <div className="absolute top-1/2 left-1/2 h-[36rem] w-[min(70rem,160vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(197_240_74/0.13),rgb(95_227_236/0.06)_50%,transparent_75%)]" />
        <SignalPathArt />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-line-strong),transparent)]" />
      </div>

      <Container className="text-center">
        <Reveal>
          <h2 id="final-cta-title" className="mx-auto max-w-4xl text-display-xl text-fg">
            <span className="block">{finalCta.titleLead}</span>
            <span className="gradient-text block pb-[0.06em]">{finalCta.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lead text-fg-muted">{finalCta.description}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={`#${sectionIds.contact}`} size="lg" withArrow>
              {finalCta.primary}
            </ButtonLink>
            <ButtonLink href={contactHref} size="lg" variant="secondary">
              {finalCta.secondary}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
