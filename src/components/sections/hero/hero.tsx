import { Fragment } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { hero } from "@/content/hero";
import { sectionIds } from "@/content/navigation";
import { EcosystemStage } from "./ecosystem-stage";
import { GridSpotlight } from "./grid-spotlight";

function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid [mask-image:radial-gradient(ellipse_80%_55%_at_50%_0%,#000_25%,transparent_75%)]" />
      <GridSpotlight />
      <div className="absolute -top-[22rem] left-1/2 h-[44rem] w-[min(80rem,150vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(197_240_74/0.1),rgb(95_227_236/0.05)_45%,transparent_75%)]" />
      <div className="absolute inset-0 grain opacity-[0.035]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink-900" />
    </div>
  );
}

/**
 * Hero. The copy is server-rendered and animated with CSS only, so the
 * headline paints immediately (good LCP) and works without JavaScript.
 */
export function Hero() {
  return (
    <section
      id={sectionIds.top}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-[calc(var(--header-h)+3.25rem)] pb-16 sm:pt-[calc(var(--header-h)+5rem)] sm:pb-20 lg:pt-[calc(var(--header-h)+5.5rem)]"
    >
      <HeroBackdrop />

      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="inline-flex animate-rise items-center gap-2.5 rounded-full border border-line-strong bg-ink-900/60 py-1.5 pr-4 pl-1.5 text-[0.8125rem] text-fg-muted shadow-card backdrop-blur-sm">
            <span className="relative grid size-5 shrink-0 place-items-center rounded-full bg-signal-400/15">
              <span className="absolute size-2 animate-ping-soft rounded-full bg-signal-400" />
              <span className="relative size-2 rounded-full bg-signal-400" />
            </span>
            <span className="flex flex-wrap items-center justify-center gap-x-2">
              {hero.eyebrow.map((item, index) => (
                <Fragment key={item}>
                  {index > 0 ? <span aria-hidden className="size-[3px] rounded-full bg-fg-faint" /> : null}
                  <span>{item}</span>
                </Fragment>
              ))}
            </span>
          </p>

          <h1 id="hero-title" className="mt-7 text-display-2xl text-fg sm:mt-8">
            <span className="block animate-rise [--rise-from:0.2] [animation-delay:0ms]">
              {hero.headline.lead}
            </span>
            <span className="block animate-rise pb-[0.06em] [--rise-from:0.2] [animation-delay:80ms]">
              <span className="gradient-text">{hero.headline.accent}</span>
            </span>
          </h1>

          <p className="mt-6 max-w-[40rem] animate-rise text-lead text-fg-muted [--rise-from:0.2] [animation-delay:140ms] sm:mt-7">
            {hero.description}
          </p>

          <div className="mt-9 flex w-full animate-rise flex-col gap-3 [animation-delay:300ms] sm:w-auto sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} size="lg" withArrow>
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} size="lg" variant="secondary">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <EcosystemStage />
        </div>
      </Container>
    </section>
  );
}
