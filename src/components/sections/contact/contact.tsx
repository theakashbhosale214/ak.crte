import { Mail } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { brand } from "@/config/brand";
import { contactIntro } from "@/content/contact";
import { sectionIds } from "@/content/navigation";
import { ContactFormPanel } from "./contact-form";

/** The enquiry form — the destination of every "Start a project" link. */
export function Contact() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || undefined;

  return (
    <Section id={sectionIds.contact} labelledBy="contact-title" divider>
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow index={contactIntro.index}>{contactIntro.eyebrow}</Eyebrow>
              <h2 id="contact-title" className="mt-4 text-display-lg text-fg">
                {contactIntro.title}
              </h2>
              <p className="mt-5 text-lead text-fg-muted">{contactIntro.description}</p>
            </Reveal>

            <Reveal delay={0.08} className="mt-12">
              <h3 className="eyebrow text-fg-subtle">{contactIntro.stepsTitle}</h3>
              <ol className="relative mt-6 space-y-7">
                <span aria-hidden className="absolute top-2 bottom-2 left-[15.5px] w-px bg-line-strong" />
                {contactIntro.steps.map((step, index) => (
                  <li key={step.title} className="relative flex gap-5">
                    <span className="relative grid size-8 shrink-0 place-items-center rounded-full border border-line-strong bg-ink-900 font-mono text-[0.6875rem] text-signal-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="pt-1">
                      <p className="font-medium text-fg">{step.title}</p>
                      <p className="mt-1 text-[0.9375rem] text-fg-muted">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            {brand.contact.email ? (
              <Reveal delay={0.12} className="mt-12 border-t border-line pt-6">
                <p className="text-sm text-fg-subtle">Prefer email?</p>
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="mt-2 inline-flex items-center gap-2 text-lg font-medium text-fg underline decoration-line-bright underline-offset-4 hover:decoration-signal-400"
                >
                  <Mail aria-hidden className="size-4 text-signal-300" />
                  {brand.contact.email}
                </a>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={0.06} className="lg:col-span-7">
            <div className="surface rounded-3xl p-6 shadow-float [--surface-bg:var(--color-ink-850)] sm:p-9">
              <ContactFormPanel turnstileSiteKey={turnstileSiteKey} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
