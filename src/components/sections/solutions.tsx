import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { RevealItem, RevealStagger } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightGroup } from "@/components/ui/spotlight";
import { sectionIds } from "@/content/navigation";
import { solutions, solutionsIntro } from "@/content/solutions";
import { routes } from "@/lib/routes";

/** Section 06 — help visitors recognise their business and the services that fit. */
export function Solutions() {
  return (
    <Section id={sectionIds.solutions} labelledBy="solutions-title" divider>
      <Container>
        <SectionHeading
          id="solutions-title"
          eyebrow={solutionsIntro.eyebrow}
          index={solutionsIntro.index}
          title={solutionsIntro.title}
          description={solutionsIntro.description}
          layout="split"
        />

        <SpotlightGroup className="mt-12 sm:mt-16">
          <RevealStagger as="ul" stagger={0.06} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <RevealItem as="li" key={solution.id}>
                  <article
                    id={solution.id}
                    data-spotlight=""
                    aria-labelledby={`${solution.id}-title`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-850/60 p-6 transition-colors duration-300 hover:border-line-strong sm:p-7"
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(22rem_circle_at_var(--spot-x,50%)_var(--spot-y,0%),rgb(197_240_74/0.09),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />

                    <div className="relative flex items-start justify-between">
                      <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-white/[0.03] text-fg-muted transition-colors duration-300 group-hover:border-signal-400/40 group-hover:text-signal-300">
                        <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                      </span>
                      <span aria-hidden className="eyebrow text-fg-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 id={`${solution.id}-title`} className="relative mt-8 text-xl font-semibold tracking-[-0.02em] text-fg">
                      {solution.title}
                    </h3>
                    <p className="relative mt-3 text-[0.9375rem] text-fg-muted">{solution.description}</p>

                    <div className="relative mt-auto pt-8">
                      <p className="eyebrow text-fg-subtle">Typical build</p>
                      <ul className="mt-3 divide-y divide-line border-t border-line">
                        {solution.typical.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={routes.service(item.service)}
                              className="group/link flex items-center justify-between gap-3 py-2.5 text-sm text-fg-muted transition-colors hover:text-fg"
                            >
                              {item.label}
                              <ArrowUpRight
                                aria-hidden
                                className="size-4 shrink-0 text-fg-faint transition duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-signal-400"
                                strokeWidth={1.75}
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </SpotlightGroup>

        <p className="mt-10 text-center text-fg-muted">
          Don&apos;t see your industry? We work with businesses of every kind.{" "}
          <Link
            href={routes.contact()}
            className="group inline-flex items-center gap-1 font-medium text-fg underline decoration-line-bright underline-offset-4 transition-colors hover:decoration-signal-400"
          >
            Tell us about yours
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </p>
      </Container>
    </Section>
  );
}
