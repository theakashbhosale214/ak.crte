# Brand guidelines (working draft)

The brand name is provisional. Change it in `src/config/brand.ts`; the logo mark lives in
`src/components/brand/logo.tsx`. All tokens below are defined in `src/app/globals.css`.

## Positioning

> We build digital experiences that help businesses launch, operate, and grow.

A technology partner, not a website vendor. Every page should connect a service to the
lifecycle it serves: **Build → Manage → Grow → Scale**.

## Logo

- **Mark — "signal path":** four nodes on one continuous route (Build, Manage, Grow, Scale).
  The final node is lit in Signal.
- **Wordmark:** brand name in the display face, semibold, uppercase, `0.2em` tracking.
- Minimum size: 20px mark. Keep clear space equal to one node's diameter around the lock-up.
- On light backgrounds, the mark switches to ink (`currentColor`). The final node stays Signal.

## Colour

| Token | Value | Use |
| --- | --- | --- |
| `ink-900` | `#08090C` | Page background |
| `ink-800` / `ink-850` | `#0F1216` / `#0B0D11` | Raised surfaces, cards |
| `fg` | `#EEF0F4` | Primary text |
| `fg-muted` | `#A4AAB8` | Body copy (8.5:1 on ink-900) |
| `fg-subtle` | `#8B92A4` | Labels, captions (6.4:1) |
| `fg-faint` | `#767E91` | Indices, annotations (4.9:1 — still AA for small text) |
| `signal-400` | `#C5F04A` | The one accent: primary actions, live states |
| `aqua-400` | `#5FE3EC` | Secondary: data and light, never for buttons |

Rules: one Signal-filled action per view. Gradients only for the hero headline accent and
soft background light. Status colours (green, amber, sky) appear only inside product mock-ups.

## Typography

| Role | Face | Notes |
| --- | --- | --- |
| Display | Bricolage Grotesque | Headlines; tight negative tracking; optical sizing on |
| Sans | Instrument Sans | Body and interface |
| Mono | JetBrains Mono | Eyebrows, labels, data; uppercase with wide tracking |

Fluid scale: `text-display-2xl` (hero) → `display-xl` → `display-lg` (section titles) →
`display-md`, plus `text-lead` for intros and `eyebrow` for labels.

## Visual language

- **Engineered clarity:** hairline blueprint grids, mono annotations ("Fig. 01"), ports and
  traces connecting modules.
- Glass (backdrop blur) only on the floating navigation. Cards use solid surfaces with a
  top-lit hairline border (`surface` utility).
- Motion is purposeful: entrances settle quickly (`ease-out-expo`), loops are slow and quiet,
  and everything holds still under `prefers-reduced-motion`.

## Voice

Confident, plain-spoken and specific. We write for business owners, not engineers.

| Do | Don't |
| --- | --- |
| Lead with the outcome ("more enquiries, less admin") | Lead with the stack ("built on Next.js") |
| Use concrete nouns: bookings, leads, dashboards | Use filler: "synergy", "cutting-edge", "world-class" |
| Explain one technical term when it matters (GEO, AEO) | Stack acronyms without context |
| State what depends on scope; invite a conversation | Invent prices, statistics, clients or testimonials |
| Short sentences. Active voice. | Paragraph-long claims |
