import type { CSSProperties } from "react";
import { Check, Info } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { engagementIntro, engagementModels, type EngagementShape } from "@/content/engagement";
import { routes } from "@/lib/routes";

function Pulse({ d, duration, delay = 0 }: { d: string; duration: number; delay?: number }) {
  const timing = { "--flow-duration": `${duration}s`, "--flow-delay": `${delay}s` } as CSSProperties;
  return (
    <>
      <path d={d} pathLength={1} strokeWidth="5" strokeLinecap="round" className="trace-pulse stroke-signal-400/25" style={timing} />
      <path d={d} pathLength={1} strokeWidth="1.5" strokeLinecap="round" className="trace-pulse stroke-signal-300" style={timing} />
    </>
  );
}

/**
 * The "shape" of each engagement: a bounded run with milestones, a repeating
 * monthly cycle, and a continuous line that keeps going.
 */
function EngagementGlyph({ shape }: { shape: EngagementShape }) {
  return (
    <svg viewBox="0 0 240 48" fill="none" aria-hidden focusable="false" className="h-12 w-full">
      {shape === "project" ? (
        <>
          <path d="M20 24H220" strokeWidth="1.25" className="stroke-white/20" />
          <Pulse d="M20 24H220" duration={3.2} />
          <circle cx="20" cy="24" r="5" strokeWidth="1.5" className="fill-ink-900 stroke-white/45" />
          <circle cx="86" cy="24" r="3.5" className="fill-white/40" />
          <circle cx="153" cy="24" r="3.5" className="fill-white/40" />
          <circle cx="220" cy="24" r="12" className="fill-signal-400/12" />
          <circle cx="220" cy="24" r="6" className="fill-signal-400" />
        </>
      ) : null}
      {shape === "monthly" ? (
        <>
          <path d="M12 24Q36 4 60 24T108 24T156 24T204 24T228 24" strokeWidth="1.25" className="stroke-white/20" />
          <Pulse d="M12 24Q36 4 60 24T108 24T156 24T204 24T228 24" duration={4} />
          {[60, 108, 156, 204].map((x) => (
            <circle key={x} cx={x} cy="24" r="4" strokeWidth="1.5" className="fill-ink-900 stroke-signal-400/70" />
          ))}
        </>
      ) : null}
      {shape === "dedicated" ? (
        <>
          <defs>
            <linearGradient id="engagement-fade" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="white" stopOpacity="0" />
              <stop offset="0.15" stopColor="white" stopOpacity="1" />
              <stop offset="0.85" stopColor="white" stopOpacity="1" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="engagement-mask">
              <rect width="240" height="48" fill="url(#engagement-fade)" />
            </mask>
          </defs>
          <g mask="url(#engagement-mask)">
            <path d="M0 24H240" strokeWidth="1.25" className="stroke-white/20" />
            <Pulse d="M0 24H240" duration={2.6} />
            <Pulse d="M0 24H240" duration={2.6} delay={-1.3} />
            {Array.from({ length: 10 }, (_, index) => (
              <circle key={index} cx={12 + index * 24} cy="24" r="3" className="fill-signal-400/80" />
            ))}
          </g>
        </>
      ) : null}
    </svg>
  );
}

/** Section 10 — three ways to work together. No prices: scope comes first. */
export function Engagement() {
  return (
    <Section id="engagement" labelledBy="engagement-title" divider>
      <Container>
        <SectionHeading
          id="engagement-title"
          eyebrow={engagementIntro.eyebrow}
          index={engagementIntro.index}
          title={engagementIntro.title}
          description={engagementIntro.description}
          layout="split"
        />

        <RevealStagger as="ul" stagger={0.08} className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-3">
          {engagementModels.map((model) => (
            <RevealItem
              as="li"
              key={model.number}
              className="group flex flex-col rounded-3xl border border-line bg-ink-850/60 p-6 transition-colors duration-300 hover:border-line-strong sm:p-8"
            >
              <div className="rounded-xl border border-line bg-ink-900/70 px-4 py-2 blueprint-grid [--grid-size:16px] [--grid-color:rgb(255_255_255/0.03)]">
                <EngagementGlyph shape={model.shape} />
              </div>

              <span className="mt-8 font-mono text-xs text-signal-300">{model.number}</span>
              <h3 className="mt-3 text-2xl leading-tight font-semibold tracking-[-0.025em] text-fg">{model.name}</h3>
              <p className="mt-3 text-fg-muted">{model.description}</p>

              <ul className="mt-7 space-y-3 border-t border-line pt-6">
                {model.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-fg">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-signal-400" strokeWidth={2.25} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <p className="flex items-center justify-between gap-4 border-t border-line pt-5 text-sm">
                  <span className="eyebrow text-fg-subtle">Structure</span>
                  <span className="text-right text-fg">{model.basis}</span>
                </p>
                <ButtonLink href={routes.contact()} variant="secondary" withArrow className="mt-5 w-full">
                  {model.cta}
                </ButtonLink>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-6 flex flex-col gap-5 rounded-2xl border border-line bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <p className="flex max-w-3xl gap-3 text-[0.9375rem] text-fg-muted">
            <Info aria-hidden className="mt-0.5 size-[1.125rem] shrink-0 text-signal-300" strokeWidth={2} />
            {engagementIntro.note}
          </p>
          <ButtonLink href={routes.contact()} withArrow className="shrink-0 self-start sm:self-auto">
            {engagementIntro.noteCta}
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
