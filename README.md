# Brand website

Marketing site for **ak.crte**, a digital solutions brand. It covers websites, custom
software and SaaS, SEO/GEO/AEO, analytics, AI automation, and cloud and maintenance services.

## Stack

- **Next.js 16** (App Router, Turbopack, server actions) · **React 19** · **TypeScript**
- **Tailwind CSS v4**: design tokens live in `src/app/globals.css` (`@theme`)
- **Motion** (`motion/react`, lazy-loaded) for interaction; CSS keyframes for entrances and loops
- **Lucide** icons · fonts self-hosted via `next/font`
- Every page is statically generated; the enquiry form posts to a server action

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint
npm run typecheck
```

### Node version

Requires Node ≥ 20.9. **Node 22 or 24 LTS is recommended** (Node 20 reached end-of-life in
April 2026). Tailwind is pinned to `4.3.3` because `4.3.4+` needs Node ≥ 20.19. After
upgrading Node, run `npm i -D tailwindcss@latest @tailwindcss/postcss@latest` to move to the
latest release.

## Before launch — checklist

1. **Site URL** — set `NEXT_PUBLIC_SITE_URL` (canonical links, sitemap, robots, social images).
2. **Email delivery** — choose a provider and set the variables in `.env.example`
   (`RESEND_API_KEY` or `POSTMARK_SERVER_TOKEN`, plus `CONTACT_TO_EMAIL` and a verified
   `CONTACT_FROM_EMAIL`). Without them, production shows an error instead of faking success.
3. **Contact details** — add `contact.email` and `social.linkedin` / `social.github` in
   `src/config/brand.ts`. Unset values are hidden everywhere.
4. **Spam protection (optional)** — set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and
   `TURNSTILE_SECRET_KEY` to add a Cloudflare Turnstile challenge.
5. **Legal review** — `/privacy` and `/terms` describe what the site does today; have them
   reviewed, and update them if you add analytics or cookies.
6. **Budget ranges** — the enquiry form's budget options are in INR (`content/contact.ts`).

## Where things live

```
src/
  config/brand.ts        Brand name, tagline, URL, contact & social (change the name here)
  content/               All copy & data: navigation, services, solutions, work, FAQ, contact…
  app/                   Routes, layout & metadata, sitemap/robots/manifest, OG images, actions
  app/actions/contact.ts Enquiry form server action (validation, spam traps, rate limit, email)
  components/
    brand/               Logo mark + wordmark, social icons
    layout/              Header, desktop nav, mobile menu, footer
    sections/            Page sections (hero/deck/ holds the live 3D command deck)
    legal/               Shared layout for policy pages
    ui/                  Button, Container, Section, Eyebrow, SectionHeading, JsonLd, Spotlight
    motion/              MotionProvider, Reveal helpers
  hooks/                 Scroll state, scroll-spy, media queries
  lib/
    email/               Provider-agnostic email layer (Resend, Postmark, console)
    contact/             Shared validation, notification template, rate limit, Turnstile
    seo.ts, og-image.tsx Metadata helper, structured data, social image renderer
docs/brand.md            Brand guidelines: colour, type, logo, voice
```

### Renaming the brand

Edit `name` / `legalName` in `src/config/brand.ts`. To change the logo, replace `BrandMark` in
`src/components/brand/logo.tsx`, `src/app/icon.svg` and `src/app/apple-icon.png`.

### Content model

- `content/services.ts` drives the homepage explorer **and** the six `/services/[slug]` pages
  (statically generated with metadata, canonical URLs, Service + Breadcrumb JSON-LD and their own
  social images). Add a service there and its page, links and structured data follow.
- `content/solutions.ts` links each business type to the services it typically needs; service
  pages derive their "Often chosen by" list from it.
- `content/work.ts` keeps **client projects** (live links, screenshots in `src/assets/work/`)
  separate from **enterprise experience** (platforms built in previous roles, which belong to
  those companies). Client technologies were verified against the live sites.
- Links built with `routes.contact(slug)` (`/?service=<slug>#contact`) pre-select the service in
  the enquiry form.

### Email integration

`src/lib/email/` exposes one function, `getEmailSetup()`, which picks a provider from environment
variables. To add another provider (SES, an SMTP relay…), implement the `EmailProvider` interface
in `providers.ts` and select it in `index.ts`. API keys are read server-side only; `server-only`
imports make the build fail if this code is ever pulled into the browser.

Spam protection: a hidden honeypot field, a minimum fill time measured in the browser, a per-IP
rate limit (in memory — use a shared store such as Redis/Vercel KV for multi-instance hosting) and
optional Turnstile. Suspected bots receive a normal success response and nothing is sent.

## Build phases

| Phase | Scope | Status |
| --- | --- | --- |
| 1 | Brand system, tokens, navigation, hero, capabilities band, responsive layout | Done |
| 2 | Services explorer + `/services/[slug]` pages, approach timeline, solutions, technology | Done |
| 3 | Case studies (client + enterprise), why choose us, engagement models, FAQ | Done |
| 4 | Final CTA, enquiry form + email layer, footer, legal pages, SEO, performance | Done |

### Working inside OneDrive

OneDrive can lock or convert files inside `.next/` into placeholders, causing `EPERM` errors on
build. If that happens, delete `.next` (PowerShell: `Remove-Item -Recurse -Force .next`) and
rebuild, or move the project outside OneDrive.
