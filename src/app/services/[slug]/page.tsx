import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/reveal";
import { ServiceDiagram } from "@/components/sections/services/service-diagrams";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { JsonLd } from "@/components/ui/json-ld";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { brand } from "@/config/brand";
import { approachSteps } from "@/content/approach";
import { sectionIds } from "@/content/navigation";
import { getService, services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.name,
    description: service.summary,
    path: routes.service(service.slug),
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const index = String(services.indexOf(service) + 1).padStart(2, "0");
  const related = service.related
    .map((relatedSlug) => getService(relatedSlug))
    .filter((item) => item !== undefined);
  const idealFor = solutions.filter((solution) =>
    solution.typical.some((item) => item.service === service.slug),
  );
  const url = `${brand.url}${routes.service(service.slug)}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      description: service.intro,
      url,
      provider: { "@type": "Organization", name: brand.legalName, url: brand.url },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${service.name} services`,
        itemListElement: service.included.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item.name, description: item.description },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: brand.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${brand.url}/#${sectionIds.services}` },
        { "@type": "ListItem", position: 3, name: service.name, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />

      {/* Hero */}
      <section
        aria-labelledby="service-title"
        className="relative isolate overflow-hidden pt-[calc(var(--header-h)+2.5rem)] pb-16 sm:pt-[calc(var(--header-h)+4rem)] sm:pb-24"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 blueprint-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_25%,transparent_75%)]" />
          <div className="absolute -top-[20rem] left-1/2 h-[40rem] w-[min(72rem,150vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(197_240_74/0.08),rgb(95_227_236/0.04)_45%,transparent_75%)]" />
        </div>

        <Container>
          <nav aria-label="Breadcrumb" className="animate-rise">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-fg-subtle">
              <li>
                <Link href={routes.home} className="transition-colors hover:text-fg">
                  Home
                </Link>
              </li>
              <ChevronRight aria-hidden className="size-3.5 text-fg-faint" />
              <li>
                <Link href={routes.section(sectionIds.services)} className="transition-colors hover:text-fg">
                  Services
                </Link>
              </li>
              <ChevronRight aria-hidden className="size-3.5 text-fg-faint" />
              <li aria-current="page" className="text-fg-muted">
                {service.name}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
            <div>
              <div className="flex animate-rise items-center gap-3 [animation-delay:60ms]">
                <span className="grid size-10 place-items-center rounded-xl border border-signal-400/40 bg-signal-400/10 text-signal-300">
                  <Icon className="size-[1.15rem]" strokeWidth={1.6} aria-hidden />
                </span>
                <Eyebrow index={index}>{service.stage}</Eyebrow>
              </div>
              <h1
                id="service-title"
                className="mt-6 animate-rise text-display-xl text-fg [--rise-from:0.2] [animation-delay:60ms]"
              >
                {service.name}
              </h1>
              <p className="mt-6 max-w-xl animate-rise text-lead text-fg-muted [animation-delay:180ms]">
                {service.intro}
              </p>
              <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:240ms] sm:flex-row">
                <ButtonLink href={routes.contact(service.slug)} size="lg" withArrow>
                  Discuss your project
                </ButtonLink>
                <ButtonLink href={routes.section(sectionIds.services)} size="lg" variant="secondary">
                  All services
                </ButtonLink>
              </div>
            </div>

            <div className="animate-rise [--rise-y:32px] [animation-delay:300ms]">
              <ServiceDiagram slug={service.slug} caption={`Fig. ${index} — ${service.shortName}`} className="shadow-float" />
            </div>
          </div>
        </Container>
      </section>

      {/* What's included */}
      <Section labelledBy="included-title" divider compact>
        <Container>
          <SectionHeading
            id="included-title"
            eyebrow="What's included"
            title="Choose the pieces your business needs."
            description="Every engagement is scoped around your goals — combine as many of these as you need, now or as you grow."
            layout="split"
            size="md"
          />
          <RevealStagger as="ul" stagger={0.04} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.included.map((item) => (
              <RevealItem
                as="li"
                key={item.name}
                className="rounded-2xl border border-line bg-ink-850/60 p-6 transition-colors duration-300 hover:border-line-strong"
              >
                <Check className="size-5 text-signal-400" strokeWidth={2} aria-hidden />
                <h3 className="mt-4 font-sans text-base font-semibold tracking-[-0.01em] text-fg">{item.name}</h3>
                <p className="mt-2 text-[0.9375rem] text-fg-muted">{item.description}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* Outcomes & audiences */}
      <Section labelledBy="outcomes-title" divider compact>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <Eyebrow>Outcomes</Eyebrow>
              <h2 id="outcomes-title" className="mt-4 text-display-md text-fg">
                What you can expect
              </h2>
              <ul className="mt-8 space-y-4">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3.5 text-lg text-fg">
                    <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-signal-400/12 text-signal-300">
                      <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
                    </span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </Reveal>

            {idealFor.length > 0 ? (
              <Reveal delay={0.08} className="lg:col-span-5">
                <div className="rounded-2xl border border-line bg-ink-850/60 p-6 sm:p-7">
                  <h3 className="eyebrow text-fg-subtle">Often chosen by</h3>
                  <ul className="mt-4 divide-y divide-line">
                    {idealFor.map((solution) => {
                      const SolutionIcon = solution.icon;
                      return (
                        <li key={solution.id}>
                          <Link
                            href={routes.section(solution.id)}
                            className="group flex items-center gap-3.5 py-3.5 text-fg-muted transition-colors hover:text-fg"
                          >
                            <SolutionIcon className="size-[1.1rem] text-fg-subtle group-hover:text-signal-300" strokeWidth={1.6} aria-hidden />
                            <span className="flex-1">{solution.title}</span>
                            <ArrowUpRight className="size-4 text-fg-faint transition group-hover:text-signal-400" aria-hidden />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section labelledBy="process-title" divider compact>
        <Container>
          <SectionHeading
            id="process-title"
            eyebrow="How we deliver"
            title="A clear process, from first call to launch."
            layout="split"
            size="md"
          />
          <RevealStagger as="ol" stagger={0.06} className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {approachSteps.map((step, i) => (
              <RevealItem
                as="li"
                key={step.number}
                className={`bg-ink-900 p-6 ${i === approachSteps.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <span className="font-mono text-xs text-signal-300">{step.number}</span>
                <h3 className="mt-4 font-sans text-base font-semibold text-fg">{step.title}</h3>
                <p className="mt-2 text-sm text-fg-muted">{step.description}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* Related */}
      {related.length > 0 ? (
        <Section labelledBy="related-title" divider compact>
          <Container>
            <SectionHeading id="related-title" eyebrow="Related services" title="Works well alongside" size="md" />
            <RevealStagger as="ul" className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => {
                const RelatedIcon = item.icon;
                return (
                  <RevealItem as="li" key={item.slug}>
                    <Link
                      href={routes.service(item.slug)}
                      className="group flex h-full flex-col rounded-2xl border border-line bg-ink-850/60 p-6 transition-colors duration-300 hover:border-line-strong"
                    >
                      <div className="flex items-center justify-between">
                        <RelatedIcon className="size-5 text-fg-muted group-hover:text-signal-300" strokeWidth={1.6} aria-hidden />
                        <ArrowUpRight className="size-4 text-fg-faint transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal-400" aria-hidden />
                      </div>
                      <span className="mt-6 font-display text-lg font-semibold tracking-[-0.02em] text-fg">{item.name}</span>
                      <span className="mt-2 text-[0.9375rem] text-fg-muted">{item.summary}</span>
                    </Link>
                  </RevealItem>
                );
              })}
            </RevealStagger>
          </Container>
        </Section>
      ) : null}

      {/* Call to action */}
      <section aria-labelledby="service-cta-title" className="pb-24 sm:pb-32">
        <Container>
          <Reveal className="relative overflow-hidden rounded-3xl border border-line-strong bg-ink-850 px-6 py-12 text-center sm:px-12 sm:py-16">
            <div aria-hidden className="pointer-events-none absolute inset-0 blueprint-grid [--grid-size:40px] [mask-image:radial-gradient(ellipse_70%_80%_at_50%_100%,#000,transparent_75%)]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(197_240_74/0.14),transparent)]" />
            <h2 id="service-cta-title" className="relative text-display-md text-fg">
              Let&apos;s talk about your project.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-fg-muted">
              Tell us where you are today and where you want to be, and we&apos;ll recommend the right approach.
              Scope and pricing are shaped around your requirements.
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={routes.contact(service.slug)} size="lg" withArrow>
                Start your project
              </ButtonLink>
              <ButtonLink href={routes.section(sectionIds.services)} size="lg" variant="secondary">
                Explore other services
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
