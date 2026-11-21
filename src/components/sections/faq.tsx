import Link from "next/link";
import { ArrowUpRight, MessageCircleQuestionMark, Plus } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { JsonLd } from "@/components/ui/json-ld";
import { Section } from "@/components/ui/section";
import { faqIntro, faqs } from "@/content/faq";
import { getService } from "@/content/services";
import { routes } from "@/lib/routes";

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

/**
 * Section 11 — FAQ built on native <details>: keyboard and screen-reader
 * accessible, works without JavaScript, and every answer stays in the HTML.
 */
export function Faq() {
  const { contact } = faqIntro;
  return (
    <Section id="faq" labelledBy="faq-title" divider>
      <JsonLd data={faqStructuredData} />
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Eyebrow index={faqIntro.index}>{faqIntro.eyebrow}</Eyebrow>
                <h2 id="faq-title" className="mt-4 text-display-lg text-fg">
                  {faqIntro.title}
                </h2>
                <p className="mt-5 text-fg-muted">{faqIntro.description}</p>
              </Reveal>

              <Reveal delay={0.08} className="mt-10 rounded-2xl border border-line bg-ink-850/60 p-6">
                <span className="grid size-10 place-items-center rounded-xl border border-line-strong bg-white/[0.03] text-signal-300">
                  <MessageCircleQuestionMark aria-hidden className="size-5" strokeWidth={1.6} />
                </span>
                <p className="mt-5 font-display text-lg font-semibold tracking-[-0.02em] text-fg">{contact.title}</p>
                <p className="mt-2 text-[0.9375rem] text-fg-muted">{contact.text}</p>
                <ButtonLink href={routes.contact()} variant="secondary" withArrow className="mt-6">
                  {contact.cta}
                </ButtonLink>
              </Reveal>
            </div>
          </div>

          <Reveal className="border-t border-line lg:col-span-8">
            {faqs.map((faq, index) => {
              const service = faq.service ? getService(faq.service) : undefined;
              return (
                <details key={faq.question} className="disclosure group border-b border-line">
                  <summary className="flex cursor-pointer items-start gap-4 py-6 sm:gap-6">
                    <span aria-hidden className="w-6 shrink-0 pt-1 font-mono text-xs text-fg-faint transition-colors group-open:text-signal-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="flex-1 font-sans text-[1.0625rem] leading-snug font-medium tracking-[-0.01em] text-fg-muted transition-colors group-open:text-fg group-hover:text-fg sm:text-lg">
                      {faq.question}
                    </h3>
                    <span
                      aria-hidden
                      className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong text-fg-muted transition duration-300 ease-out-expo group-open:rotate-45 group-open:border-signal-400/50 group-open:text-signal-300"
                    >
                      <Plus className="size-4" strokeWidth={1.75} />
                    </span>
                  </summary>
                  <div className="pr-2 pb-7 pl-10 sm:pr-14 sm:pl-12">
                    <p className="text-fg-muted">{faq.answer}</p>
                    {service ? (
                      <Link
                        href={routes.service(service.slug)}
                        className="group/link mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fg underline decoration-line-bright underline-offset-4 transition-colors hover:decoration-signal-400"
                      >
                        Explore {service.shortName}
                        <ArrowUpRight aria-hidden className="size-4 text-fg-subtle transition group-hover/link:text-signal-400" />
                      </Link>
                    ) : null}
                  </div>
                </details>
              );
            })}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
