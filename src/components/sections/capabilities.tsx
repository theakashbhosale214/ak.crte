import { RevealItem, RevealStagger } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { capabilities, capabilitiesIntro } from "@/content/capabilities";
import { cn } from "@/lib/cn";

/*
 * Five cells on a hairline grid: 2 columns on mobile (last cell spans both),
 * 3 + 2 on tablets (on a 6-column grid), 5 across on desktop.
 */
const cellSpans = [
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-3",
  "col-span-2 md:col-span-3",
];

/** Section 03 — a compact credibility band in place of a client-logo wall. */
export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="relative pt-10 pb-20 sm:pt-16 sm:pb-28"
    >
      <Container>
        <SectionHeading
          id="capabilities-title"
          eyebrow={capabilitiesIntro.eyebrow}
          title={capabilitiesIntro.title}
          description={capabilitiesIntro.description}
          layout="split"
          size="md"
        />

        <div className="relative mt-12 sm:mt-14">
          <span aria-hidden className="pointer-events-none absolute inset-x-8 -top-px z-10 h-px overflow-hidden">
            <span className="absolute inset-y-0 left-0 w-1/3 animate-sweep bg-gradient-to-r from-transparent via-signal-400/80 to-transparent" />
          </span>

          <RevealStagger
            as="ul"
            stagger={0.07}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-6 lg:grid-cols-5"
          >
            {capabilities.map(({ title, detail, icon: Icon }, index) => (
              <RevealItem
                as="li"
                key={title}
                className={cn(
                  "group relative flex flex-col bg-ink-900 p-5 transition-colors duration-300 hover:bg-ink-850 sm:p-6 lg:col-span-1",
                  cellSpans[index],
                )}
              >
                <span aria-hidden className="eyebrow absolute top-5 right-5 text-fg-faint sm:top-6 sm:right-6">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="grid size-10 place-items-center rounded-xl border border-line-strong bg-white/[0.03] text-fg-muted transition-colors duration-300 group-hover:border-signal-400/40 group-hover:text-signal-300">
                  <Icon className="size-[1.15rem]" strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="mt-6 font-sans text-[0.9375rem] font-semibold tracking-[-0.01em] text-fg">
                  {title}
                </h3>
                <p className="mt-1.5 flex flex-wrap gap-x-1.5 font-mono text-[0.6875rem] tracking-[0.06em] text-fg-subtle uppercase">
                  {detail.map((item, itemIndex) => (
                    <span key={item} className="whitespace-nowrap">
                      {item}
                      {itemIndex < detail.length - 1 ? (
                        <>
                          <span aria-hidden> ·</span>
                          <span className="sr-only">,</span>
                        </>
                      ) : null}
                    </span>
                  ))}
                </p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </Container>
    </section>
  );
}
