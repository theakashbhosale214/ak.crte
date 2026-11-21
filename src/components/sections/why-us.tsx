import type { CSSProperties } from "react";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { sectionIds } from "@/content/navigation";
import { differentiators, whyUsIntro } from "@/content/why-us";

const stages = [
  { label: "BUILD", detail: "Websites & apps", x: 48, y: 160, labelY: 192 },
  { label: "MANAGE", detail: "Admin & automation", x: 148, y: 72, labelY: 34 },
  { label: "GROW", detail: "Search & analytics", x: 252, y: 150, labelY: 182 },
  { label: "SCALE", detail: "SaaS & cloud", x: 352, y: 60, labelY: 22 },
];

const PATH = "M48 160C98 160 98 72 148 72C198 72 202 150 252 150C302 150 302 60 352 60";

/** The logo's four-node route, expanded: one partner across every stage. */
function LifecycleFigure() {
  const pulse = { "--flow-duration": "4.8s" } as CSSProperties;
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-line bg-ink-850 blueprint-grid [--grid-size:24px] [--grid-color:rgb(255_255_255/0.035)]">
      <svg viewBox="0 0 400 220" fill="none" aria-hidden focusable="false" className="h-auto w-full px-4 pt-8 pb-2 font-mono">
        <path d={PATH} strokeWidth="1.25" className="stroke-white/20" />
        <path d={PATH} pathLength={1} strokeWidth="6" strokeLinecap="round" className="trace-pulse stroke-signal-400/25" style={pulse} />
        <path d={PATH} pathLength={1} strokeWidth="1.75" strokeLinecap="round" className="trace-pulse stroke-signal-300" style={pulse} />
        {stages.map((stage, index) => {
          const last = index === stages.length - 1;
          return (
            <g key={stage.label}>
              {last ? <circle cx={stage.x} cy={stage.y} r="16" className="fill-signal-400/12" /> : null}
              <circle
                cx={stage.x}
                cy={stage.y}
                r={last ? 7 : 6}
                strokeWidth="1.5"
                className={last ? "fill-signal-400 stroke-signal-300" : "fill-ink-900 stroke-white/45"}
              />
              <text
                x={stage.x}
                y={stage.labelY}
                textAnchor="middle"
                fontSize="9"
                letterSpacing="1.4"
                className={last ? "fill-signal-300" : "fill-fg-muted"}
              >
                {stage.label}
              </text>
              <text x={stage.x} y={stage.labelY + 12} textAnchor="middle" fontSize="7" className="fill-fg-subtle">
                {stage.detail}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="eyebrow px-5 pb-4 text-fg-faint">{whyUsIntro.figureCaption}</figcaption>
    </figure>
  );
}

/** Section 09 — why choose us (the "About" destination in the navigation). */
export function WhyUs() {
  return (
    <Section id={sectionIds.about} labelledBy="about-title" divider>
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Eyebrow index={whyUsIntro.index}>{whyUsIntro.eyebrow}</Eyebrow>
                <h2 id="about-title" className="mt-4 text-display-lg text-fg">
                  {whyUsIntro.title}
                </h2>
                <p className="mt-6 text-fg-muted">{whyUsIntro.description}</p>
              </Reveal>
              <Reveal delay={0.1} className="mt-10">
                <LifecycleFigure />
              </Reveal>
            </div>
          </div>

          <RevealStagger as="ol" stagger={0.07} className="border-t border-line lg:col-span-7">
            {differentiators.map(({ title, description, icon: Icon }, index) => (
              <RevealItem
                as="li"
                key={title}
                className="group relative grid grid-cols-[auto_1fr] gap-x-5 border-b border-line py-7 sm:grid-cols-[3rem_auto_1fr] sm:gap-x-6 sm:py-9"
              >
                <span aria-hidden className="hidden pt-2 font-mono text-sm text-fg-faint transition-colors duration-300 group-hover:text-signal-300 sm:block">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-white/[0.03] text-fg-muted transition-colors duration-300 group-hover:border-signal-400/40 group-hover:text-signal-300">
                  <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-fg sm:text-[1.375rem]">{title}</h3>
                  <p className="mt-2 text-fg-muted">{description}</p>
                </div>
                <span
                  aria-hidden
                  className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-signal-400 transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                />
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </Container>
    </Section>
  );
}
