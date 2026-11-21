import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/content/navigation";
import { services, servicesIntro, type Service } from "@/content/services";
import { routes } from "@/lib/routes";
import { ServiceDiagram } from "./service-diagrams";
import { ServicesExplorer } from "./services-explorer";

function ServiceTrigger({ service, index }: { service: Service; index: string }) {
  const Icon = service.icon;
  return (
    <span className="flex w-full items-center gap-4 py-5 pr-1 lg:py-[1.125rem] lg:pl-5">
      <span className="eyebrow w-5 shrink-0 text-fg-faint transition-colors group-data-[state=open]:text-signal-300">
        {index}
      </span>
      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line-strong bg-white/[0.03] text-fg-muted transition-colors duration-300 group-hover:text-fg group-data-[state=open]:border-signal-400/40 group-data-[state=open]:bg-signal-400/10 group-data-[state=open]:text-signal-300">
        <Icon className="size-[1.15rem]" strokeWidth={1.6} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-lg leading-tight font-semibold tracking-[-0.02em] text-fg-muted transition-colors group-hover:text-fg group-data-[state=open]:text-fg sm:text-xl">
          {service.name}
        </span>
        <span className="mt-1 block font-mono text-[0.6875rem] tracking-[0.12em] text-fg-subtle uppercase">
          {service.stage} · {service.included.length} services
        </span>
      </span>
      <ChevronDown
        aria-hidden
        className="size-5 shrink-0 text-fg-subtle transition-transform duration-300 group-data-[state=open]:rotate-180 lg:hidden"
        strokeWidth={1.5}
      />
      <ArrowRight
        aria-hidden
        className="hidden size-5 shrink-0 -translate-x-1 text-signal-400 opacity-0 transition duration-300 group-data-[state=open]:translate-x-0 group-data-[state=open]:opacity-100 lg:block"
        strokeWidth={1.75}
      />
    </span>
  );
}

/** Panel text. The surrounding card and the diagram are composed by the explorer. */
function ServicePanel({ service }: { service: Service }) {
  return (
    <div className="px-2 pt-6 pb-3 sm:px-4 sm:pt-7 lg:px-5">
        <div className="hidden lg:block">
          <p className="eyebrow text-signal-300">{service.stage}</p>
          <p className="mt-3 font-display text-display-md font-semibold text-fg">{service.name}</p>
        </div>
        <p className="text-fg-muted lg:mt-4">{service.summary}</p>

        <p className="eyebrow mt-7 text-fg-subtle">What&apos;s included</p>
        <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {service.included.map((item) => (
            <li key={item.name} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-fg">
              <Check className="mt-0.5 size-4 shrink-0 text-signal-400" strokeWidth={2.25} aria-hidden />
              {item.name}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <ButtonLink href={routes.service(service.slug)} variant="secondary" withArrow>
            Learn more
            <span className="sr-only"> about {service.name}</span>
          </ButtonLink>
          <ButtonLink href={routes.contact(service.slug)} variant="ghost">
            Discuss your project
          </ButtonLink>
        </div>
    </div>
  );
}

/** Section 04 — the six service areas. */
export function Services() {
  const items = services.map((service, i) => {
    const index = String(i + 1).padStart(2, "0");
    return {
      id: service.slug,
      header: <ServiceTrigger service={service} index={index} />,
      diagram: <ServiceDiagram slug={service.slug} caption={`Fig. ${index} — ${service.shortName}`} />,
      panel: <ServicePanel service={service} />,
    };
  });

  const { recommendation } = servicesIntro;

  return (
    <Section id={sectionIds.services} labelledBy="services-title" divider>
      <Container>
        <SectionHeading
          id="services-title"
          eyebrow={servicesIntro.eyebrow}
          index={servicesIntro.index}
          title={servicesIntro.title}
          description={servicesIntro.description}
          layout="split"
        />

        <div className="mt-12 sm:mt-16">
          <ServicesExplorer items={items} />
        </div>

        <Reveal className="mt-12 flex flex-col gap-5 rounded-2xl border border-line bg-white/[0.02] p-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-display text-xl font-semibold tracking-[-0.02em] text-fg">{recommendation.title}</p>
            <p className="mt-1.5 text-fg-muted">{recommendation.text}</p>
          </div>
          <ButtonLink href={routes.contact()} withArrow className="self-start sm:self-auto">
            {recommendation.cta}
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
