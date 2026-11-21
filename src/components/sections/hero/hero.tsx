import { Fragment } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { hero } from "@/content/hero";
import { sectionIds } from "@/content/navigation";
import deckStyles from "./deck/command-deck.module.css";
import { CommandDeck } from "./deck/command-deck";
import { DeckProvider } from "./deck/deck-provider";
import { GridSpotlight } from "./grid-spotlight";

function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid [mask-image:radial-gradient(ellipse_90%_70%_at_60%_10%,#000_25%,transparent_78%)]" />
      <GridSpotlight />
      <div className="absolute -top-[20rem] left-[-10%] h-[40rem] w-[min(60rem,140vw)] rounded-full bg-[radial-gradient(closest-side,rgb(197_240_74/0.08),transparent_72%)]" />
      <div className="absolute top-[8%] right-[-18%] h-[58rem] w-[58rem] rounded-full bg-[radial-gradient(closest-side,rgb(197_240_74/0.13),rgb(95_227_236/0.07)_48%,transparent_72%)]" />
      <div className="absolute inset-0 grain opacity-[0.035]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-900" />
    </div>
  );
}

/**
 * Hero — copy on the left, the live 3D command deck on the right.
 * The copy is server-rendered and animated with CSS only, so the headline
 * paints immediately (good LCP) and works without JavaScript.
 */
export function Hero() {
  return (
    <section id={sectionIds.top} aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <HeroBackdrop />

      <DeckProvider>
        <Container className="grid min-h-[100svh] items-center gap-6 pt-[calc(var(--header-h)+2.5rem)] pb-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-2 lg:pt-[calc(var(--header-h)+1.5rem)]">
          <div className="relative z-10">
            <p className="inline-flex animate-rise items-center gap-2.5 rounded-full border border-line-strong bg-ink-900/60 py-1.5 pr-4 pl-1.5 text-[0.8125rem] text-fg-muted shadow-card backdrop-blur-sm">
              <span className="relative grid size-5 shrink-0 place-items-center rounded-full bg-signal-400/15">
                <span className="absolute size-2 animate-ping-soft rounded-full bg-signal-400" />
                <span className="relative size-2 rounded-full bg-signal-400" />
              </span>
              <span className="flex flex-wrap items-center gap-x-2">
                {hero.eyebrow.map((item, index) => (
                  <Fragment key={item}>
                    {index > 0 ? <span aria-hidden className="size-[3px] rounded-full bg-fg-faint" /> : null}
                    <span>{item}</span>
                  </Fragment>
                ))}
              </span>
            </p>

            <h1
              id="hero-title"
              className="mt-7 text-[clamp(2.6rem,1.15rem+4.2vw,5rem)] leading-[0.98] tracking-[-0.04em] text-fg sm:mt-8"
            >
              <span className="block animate-rise [--rise-from:0.2] [animation-delay:0ms]">
                {hero.headline.lead}
              </span>
              <span className="block animate-rise pb-[0.06em] [--rise-from:0.2] [animation-delay:80ms]">
                <span className="gradient-text">{hero.headline.accent}</span>
              </span>
            </h1>

            <p className="mt-6 max-w-[34rem] animate-rise text-lead text-fg-muted [--rise-from:0.2] [animation-delay:140ms]">
              {hero.description}
            </p>

            <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:260ms] sm:flex-row">
              <ButtonLink href={hero.primaryCta.href} size="lg" withArrow>
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} size="lg" variant="secondary">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>

            {/* Legend: hovering an item focuses that layer of the deck (and vice versa). */}
            <ul className="mt-10 grid animate-rise grid-cols-2 gap-2 [animation-delay:380ms] sm:flex sm:flex-wrap">
              {hero.layers.map((item) => (
                <li
                  key={item.layer}
                  data-layer-target={item.layer}
                  className={`${deckStyles.legendItem} flex cursor-default items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.02] py-1.5 pr-3.5 pl-2 text-sm text-fg-muted transition-colors duration-300`}
                >
                  <span
                    aria-hidden
                    className={`${deckStyles.legendDot} size-2 rounded-full bg-fg-faint transition-[background-color,box-shadow] duration-300`}
                  />
                  <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-fg-subtle">{item.number}</span>
                  <span className="font-medium">{item.stage}</span>
                  <span className="sr-only">: {item.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <figure className="relative mx-auto mt-10 w-full max-w-[36rem] lg:mt-0 lg:mr-[-0.5rem] lg:max-w-none xl:mr-[-3.5rem]">
            {/* The deck waits for JavaScript to start its intro; without it, show it at rest. */}
            <noscript>
              <style>
                {
                  "[data-deck-scene]:not([data-play]) *,[data-deck-scene]:not([data-play]) *::before,[data-deck-scene]:not([data-play]) *::after{animation-play-state:running!important}"
                }
              </style>
            </noscript>
            <CommandDeck />
            <figcaption className="eyebrow mt-2 text-center text-fg-subtle lg:mt-0">
              <span className="text-fg-faint">Fig. 01 — </span>
              {hero.figureCaption}
              <span className="sr-only">: {hero.figureDescription}</span>
            </figcaption>
          </figure>
        </Container>
      </DeckProvider>
    </section>
  );
}
