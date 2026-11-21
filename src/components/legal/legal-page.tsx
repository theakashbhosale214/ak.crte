import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { routes } from "@/lib/routes";

type LegalPageProps = {
  title: string;
  updated: string;
  intro: ReactNode;
  children: ReactNode;
};

/** Shared layout for policy pages: readable measure, clear hierarchy. */
export function LegalPage({ title, updated, intro, children }: LegalPageProps) {
  return (
    <article className="relative isolate pt-[calc(var(--header-h)+2.5rem)] pb-24 sm:pt-[calc(var(--header-h)+4rem)] sm:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] blueprint-grid [mask-image:radial-gradient(ellipse_70%_80%_at_50%_0%,#000_20%,transparent_75%)]"
      />
      <Container className="max-w-3xl">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-fg-subtle">
            <li>
              <Link href={routes.home} className="transition-colors hover:text-fg">
                Home
              </Link>
            </li>
            <ChevronRight aria-hidden className="size-3.5 text-fg-faint" />
            <li aria-current="page" className="text-fg-muted">
              {title}
            </li>
          </ol>
        </nav>

        <h1 className="mt-8 text-display-lg text-fg">{title}</h1>
        <p className="eyebrow mt-5 text-fg-subtle">Last updated · {updated}</p>
        <div className="mt-8 text-lead text-fg-muted">{intro}</div>

        <div className="mt-12 space-y-10 border-t border-line pt-10 text-fg-muted [&_a]:text-fg [&_a]:underline [&_a]:decoration-line-bright [&_a]:underline-offset-4 hover:[&_a]:decoration-signal-400 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-fg [&_li]:pl-1 [&_p]:mt-3 [&_strong]:text-fg [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:marker:text-fg-faint">
          {children}
        </div>
      </Container>
    </article>
  );
}

/** "How to reach us" phrase used in policies — includes the email once configured. */
export function ContactLine({ email }: { email: string | null }) {
  return email ? (
    <>
      email us at <a href={`mailto:${email}`}>{email}</a> or use the <Link href={routes.contact()}>enquiry form</Link>
    </>
  ) : (
    <>
      use the <Link href={routes.contact()}>enquiry form</Link> on our website
    </>
  );
}
