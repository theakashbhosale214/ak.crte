import { Reveal, RevealItem, RevealStagger } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { techCategories, technologyIntro } from "@/content/technology";
import { cn } from "@/lib/cn";

/*
 * Five columns on a hairline grid: 2 columns on mobile (last spans both),
 * 3 + 2 on tablets (6-column grid), 5 across on desktop.
 */
const cellSpans = [
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-3",
  "col-span-2 md:col-span-3",
];

/** Section 07 — the stack, as a calm spec sheet rather than a logo wall. */
export function Technology() {
  return (
    <Section id="technology" labelledBy="technology-title" divider>
      <Container>
        <SectionHeading
          id="technology-title"
          eyebrow={technologyIntro.eyebrow}
          index={technologyIntro.index}
          title={technologyIntro.title}
          description={technologyIntro.description}
          layout="split"
        />

        <Reveal className="relative mt-12 overflow-hidden rounded-3xl border border-line sm:mt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[16%] scan-sweep bg-[linear-gradient(180deg,transparent,rgb(197_240_74/0.05)_50%,transparent)]"
          />

          <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-6 lg:grid-cols-5">
            {techCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.name}
                  className={cn("relative bg-ink-900 p-5 sm:p-7 lg:col-span-1", cellSpans[index])}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-xl border border-line-strong bg-white/[0.03] text-signal-300">
                      <Icon className="size-[1.1rem]" strokeWidth={1.6} aria-hidden />
                    </span>
                    <span aria-hidden className="eyebrow text-fg-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-sans text-base font-semibold tracking-[-0.01em] text-fg">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-fg-subtle lg:min-h-[2lh]">{category.purpose}</p>

                  <RevealStagger as="ul" stagger={0.05} delay={0.1 + index * 0.06} className="mt-6 space-y-2.5">
                    {category.items.map((item) => (
                      <RevealItem
                        as="li"
                        key={item}
                        className="group flex items-center gap-3 text-[0.9375rem] text-fg-muted transition-colors hover:text-fg"
                      >
                        <span
                          aria-hidden
                          className="size-1.5 shrink-0 rounded-[2px] bg-fg-faint transition-[background-color,box-shadow] duration-300 group-hover:bg-signal-400 group-hover:shadow-[0_0_10px_rgb(197_240_74/0.8)]"
                        />
                        {item}
                      </RevealItem>
                    ))}
                  </RevealStagger>
                </div>
              );
            })}
          </div>

          <div className="border-t border-line bg-ink-900 px-5 py-4 sm:px-7">
            <p className="text-sm text-fg-subtle">{technologyIntro.footnote}</p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
