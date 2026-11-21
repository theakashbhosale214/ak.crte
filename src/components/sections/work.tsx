import Image from "next/image";
import Link from "next/link";
import { Check, Info, LockKeyhole } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/content/navigation";
import { clientProjects, enterpriseExperience, workIntro, type ClientProject } from "@/content/work";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

function BrowserPreview({ project }: { project: ClientProject }) {
  return (
    <div className="surface overflow-hidden rounded-2xl shadow-float [--surface-bg:var(--color-ink-800)]">
      <div className="flex h-9 items-center gap-3 border-b border-line bg-ink-800 px-4">
        <span aria-hidden className="flex w-12 gap-1.5">
          <span className="size-2 rounded-full bg-white/[0.14]" />
          <span className="size-2 rounded-full bg-white/[0.14]" />
          <span className="size-2 rounded-full bg-white/[0.14]" />
        </span>
        <span className="mx-auto flex h-6 min-w-0 items-center gap-1.5 rounded-full bg-ink-900 px-3 text-xs text-fg-subtle ring-1 ring-line">
          <LockKeyhole aria-hidden className="size-3 shrink-0" strokeWidth={2} />
          <span className="truncate">{project.displayUrl}</span>
        </span>
        <span aria-hidden className="w-12" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1280px) 700px, (min-width: 1024px) 56vw, 100vw"
          placeholder="blur"
          className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.025]"
        />
      </div>
    </div>
  );
}

function ProjectCase({ project, reversed }: { project: ClientProject; reversed: boolean }) {
  return (
    <Reveal as="div">
      <article
        aria-labelledby={`${project.slug}-title`}
        className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
      >
        {/* The preview duplicates the "View live site" link, so it stays out of the tab order. */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden
          className={cn("block lg:col-span-7", reversed && "lg:order-2")}
        >
          <BrowserPreview project={project} />
        </a>

        <div className="lg:col-span-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center rounded-full border border-signal-400/30 bg-signal-400/10 px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-signal-300 uppercase">
              Client project
            </span>
            <span className="eyebrow text-fg-subtle">{project.category}</span>
          </div>
          <h3 id={`${project.slug}-title`} className="mt-5 text-display-md text-fg">
            {project.name}
          </h3>
          <p className="mt-4 text-fg-muted">{project.summary}</p>

          <ul className="mt-6 space-y-2.5">
            {project.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-fg">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-signal-400" strokeWidth={2.25} />
                {item}
              </li>
            ))}
          </ul>

          <dl className="mt-7 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
            <div>
              <dt className="eyebrow text-fg-subtle">Services delivered</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {project.services.map((item) => (
                  <Link
                    key={item.label}
                    href={routes.service(item.service)}
                    className="rounded-full border border-line-strong px-3 py-1 text-[0.8125rem] text-fg-muted transition-colors hover:border-signal-400/50 hover:text-fg"
                  >
                    {item.label}
                  </Link>
                ))}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-fg-subtle">Built with</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[0.6875rem] text-fg-muted ring-1 ring-line"
                  >
                    {tech}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={project.url} variant="secondary" withArrow>
              View project
              <span className="sr-only">: {project.name} (opens in a new tab)</span>
            </ButtonLink>
            <ButtonLink href={routes.contact(project.services[0]?.service)} variant="ghost">
              Discuss a similar project
            </ButtonLink>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function EnterpriseExperience() {
  const { label, title, note, cta, areas } = enterpriseExperience;
  return (
    <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-ink-850/60 p-6 sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 blueprint-grid [--grid-size:32px] [mask-image:radial-gradient(ellipse_70%_90%_at_0%_0%,#000_20%,transparent_70%)]"
      />
      <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <span className="inline-flex items-center rounded-full border border-aqua-400/30 bg-aqua-400/10 px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-aqua-300 uppercase">
            {label}
          </span>
          <h3 id="enterprise-title" className="mt-5 text-display-md text-fg">
            {title}
          </h3>
          <p className="mt-5 flex gap-3 rounded-xl border border-line bg-ink-900/70 p-4 text-sm leading-relaxed text-fg-muted">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-aqua-300" strokeWidth={2} />
            {note}
          </p>
          <ButtonLink href={routes.contact("custom-software-saas")} variant="secondary" withArrow className="mt-7">
            {cta}
          </ButtonLink>
        </div>

        <RevealStagger
          as="ul"
          stagger={0.06}
          className="grid gap-px self-start overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-7"
        >
          {areas.map(({ title: areaTitle, description, icon: Icon }) => (
            <RevealItem as="li" key={areaTitle} className="bg-ink-900 p-6">
              <span className="grid size-10 place-items-center rounded-xl border border-aqua-400/25 bg-aqua-400/[0.07] text-aqua-300">
                <Icon aria-hidden className="size-[1.1rem]" strokeWidth={1.6} />
              </span>
              <h4 className="mt-5 font-sans text-base font-semibold tracking-[-0.01em] text-fg">{areaTitle}</h4>
              <p className="mt-2 text-sm text-fg-muted">{description}</p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </Reveal>
  );
}

/** Section 08 — client case studies, then clearly separated enterprise experience. */
export function Work() {
  return (
    <Section id={sectionIds.work} labelledBy="work-title" divider>
      <Container>
        <SectionHeading
          id="work-title"
          eyebrow={workIntro.eyebrow}
          index={workIntro.index}
          title={workIntro.title}
          description={workIntro.description}
          layout="split"
        />

        <div className="mt-14 space-y-20 sm:mt-20 lg:space-y-28">
          {clientProjects.map((project, index) => (
            <ProjectCase key={project.slug} project={project} reversed={index % 2 === 1} />
          ))}
        </div>

        <div className="mt-20 lg:mt-28">
          <EnterpriseExperience />
        </div>
      </Container>
    </Section>
  );
}
