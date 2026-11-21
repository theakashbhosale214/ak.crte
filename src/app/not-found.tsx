import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { sectionIds } from "@/content/navigation";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="relative isolate flex min-h-[80dvh] items-center overflow-hidden pt-(--header-h)"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 blueprint-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_45%,#000_20%,transparent_75%)]" />
      <Container className="text-center">
        <p className="eyebrow text-signal-300">Error 404</p>
        <h1 id="not-found-title" className="mt-5 text-display-lg text-fg">
          This page isn&apos;t part of the system.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-fg-muted">
          The link may be out of date, or the page may have moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={routes.home} withArrow>
            Back to home
          </ButtonLink>
          <ButtonLink href={routes.section(sectionIds.services)} variant="secondary">
            Explore services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
