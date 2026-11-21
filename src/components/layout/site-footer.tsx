import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import { Logo, Wordmark } from "@/components/brand/logo";
import { GitHubIcon, LinkedInIcon } from "@/components/brand/social-icons";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { brand } from "@/config/brand";
import { mainNav, sectionIds } from "@/content/navigation";
import { services } from "@/content/services";
import { routes } from "@/lib/routes";

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

function FooterHeading({ children }: { children: string }) {
  return <h2 className="eyebrow text-fg-subtle">{children}</h2>;
}

const linkClass = "text-[0.9375rem] text-fg-muted transition-colors hover:text-fg";

export function SiteFooter() {
  const socials = [
    brand.social.linkedin ? { label: "LinkedIn", href: brand.social.linkedin, Icon: LinkedInIcon } : null,
    brand.social.github ? { label: "GitHub", href: brand.social.github, Icon: GitHubIcon } : null,
  ].filter((item) => item !== null);
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate defer-render overflow-hidden border-t border-line bg-ink-950">
      {/* Decorative: grid, a signal sweeping the top edge, and an oversized wordmark. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 blueprint-grid [--grid-size:56px] [mask-image:linear-gradient(to_top,#000,transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
          <div className="h-full w-1/3 animate-sweep bg-gradient-to-r from-transparent via-signal-400/70 to-transparent" />
        </div>
        <Wordmark
          className="absolute -bottom-[0.22em] left-1/2 -translate-x-1/2 font-display text-[clamp(7rem,26vw,24rem)] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.07)]"
          dotClassName="text-transparent [-webkit-text-stroke:1px_rgb(197_240_74/0.3)]"
        />
      </div>

      <Container className="pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-[0.9375rem] text-fg-muted">{brand.positioning}</p>
            <p className="eyebrow mt-6 text-fg-subtle">{brand.lifecycle.join(" · ")}</p>

            {brand.contact.email || socials.length ? (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {brand.contact.email ? (
                  <a
                    href={`mailto:${brand.contact.email}`}
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-fg transition-colors hover:border-line-bright"
                  >
                    <Mail aria-hidden className="size-4 text-signal-300" />
                    {brand.contact.email}
                  </a>
                ) : null}
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${brand.name} on ${label} (opens in a new tab)`}
                    className="grid size-10 place-items-center rounded-full border border-line-strong text-fg-muted transition-colors hover:border-line-bright hover:text-fg"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-[1fr_1.4fr_1.2fr]">
            <div>
              <FooterHeading>Navigate</FooterHeading>
              <ul className="mt-5 space-y-3">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <FooterHeading>Services</FooterHeading>
              <ul className="mt-5 space-y-3">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={routes.service(service.slug)} className={linkClass}>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <FooterHeading>Start a project</FooterHeading>
              <p className="mt-5 text-[0.9375rem] text-fg-muted">
                From your first website to your next digital platform — tell us what you&apos;re planning.
              </p>
              <ButtonLink href={routes.contact()} size="sm" withArrow className="mt-6">
                Let&apos;s talk
              </ButtonLink>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-line pt-6 text-sm text-fg-subtle sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-fg">
                {link.label}
              </Link>
            ))}
            <Link
              href={routes.section(sectionIds.top)}
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-fg"
            >
              Back to top
              <ArrowUp aria-hidden className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
