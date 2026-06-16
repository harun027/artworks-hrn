# Portfolio Showcase Platform — Design Spec

**Date:** 2026-06-17
**Status:** Approved (design)

## Overview

A personal portfolio/showcase platform that presents full case studies of completed
projects across categories (websites, mobile apps, SaaS, desktop apps, dashboards, other),
shows what each project took to build, and lets visitors get an instant ballpark estimate
for their own project via a single form that doubles as the contact/lead form.

Built with **TanStack Start** (TanStack Router + server functions), **shadcn/ui** components,
**Tailwind CSS**, **Resend** for email. No database, no admin/CMS, no auth. Project content
is file-based; editing means changing a content file and redeploying.

## Goals

- Showcase completed work as detailed, informative case studies (one detail page each).
- Per project, communicate "what it took": tech stack, timeline, team size, effort range.
- Give visitors an instant ballpark cost + timeline estimate for a project they want.
- Capture leads: the estimator form emails the owner and auto-acknowledges the visitor.
- Look distinctive ("Vibrant Modern" direction), shareable (rich link previews), and fast.

## Non-Goals (YAGNI)

- Database, admin panel, or CMS.
- Authentication / user accounts.
- About and Services pages (may add later).
- Multi-step estimator wizard.
- Analytics, blog, i18n.

## Tech Stack

- **TanStack Start** (React 19 + Vite) — full-stack framework
- **TanStack Router** — type-safe file-based routing (bundled with Start)
- **TanStack Query** — estimator submission mutation state (loading/success/error)
- **shadcn/ui** — component primitives (Radix + Tailwind), themed to Vibrant Modern
- **Tailwind CSS** — styling
- **react-hook-form + Zod** — form state/validation client-side; same Zod schema reused server-side
- **Resend** — transactional email
- **TypeScript** throughout
- **Vitest + Testing Library** — tests

## Rendering Strategy

- Home and case-study detail pages → **prerendered (SSG)** at build time. Fast, cheap,
  good Open Graph/SEO link previews.
- Estimator submission → **server function** (runs on request): validates + sends email.

## Project Structure

```
src/
  routes/
    __root.tsx              # shell: nav, footer, default SEO meta
    index.tsx               # home: hero + featured work + estimator CTA
    work/
      index.tsx             # filterable case-study grid (?category=… search param)
      $slug.tsx             # individual case study (prerendered per project)
    estimate.tsx            # estimator = contact form
  content/
    projects/               # one typed file per project (the static content)
    projects.ts             # loads + exports all projects, typed
  server/
    send-lead.ts            # server function: Zod validate + Resend email
  components/               # ProjectCard, CaseStudy blocks, EstimatorForm, etc.
  lib/                      # estimator pricing rules, zod schemas, utils
  styles/
public/
  projects/                # case-study images
```

## Data Model

### Project (case study)

One typed content file per project:

```ts
type Category = 'website' | 'mobile' | 'saas' | 'desktop' | 'dashboard' | 'other';

interface Project {
  slug: string;              // url id, e.g. "acme-dashboard"
  title: string;
  category: Category;
  tagline: string;           // one-line summary for the card
  thumbnail: string;         // grid image
  heroImage: string;         // detail-page header
  gallery: string[];         // additional screenshots

  // Case-study narrative
  problem: string;
  solution: string;
  outcome: string;
  results: { label: string; value: string }[];  // e.g. "Load time" → "1.2s"

  // "What it took" info
  techStack: string[];
  timeline: string;          // e.g. "8 weeks"
  teamSize: string;          // e.g. "Solo" / "3 people"
  effortRange: string;       // e.g. "$8k–$15k"

  liveUrl?: string;          // optional
  featured?: boolean;        // show on home page
}
```

### Lead submission (estimator = contact)

```ts
interface LeadSubmission {
  // estimator inputs
  projectType: Category;
  budgetBracket: string;     // "<$5k" | "$5k–$15k" | "$15k–$50k" | "$50k+"
  timelineNeed: string;      // "ASAP" | "1–3 months" | "Flexible"
  // contact
  name: string;
  email: string;
  message: string;
}
```

## Estimator Logic

Client-side instant estimate from an editable rules table; values are placeholders to be
tuned by the owner and clearly marked as such.

```ts
// lib/estimator.ts — editable constants
const BASE = {
  website:   { range: '$3k–$8k',   weeks: '3–6' },
  mobile:    { range: '$12k–$30k', weeks: '8–16' },
  saas:      { range: '$20k–$60k', weeks: '12–24' },
  desktop:   { range: '$15k–$40k', weeks: '10–20' },
  dashboard: { range: '$8k–$20k',  weeks: '5–10' },
  other:     { range: "Let's talk", weeks: 'Varies' },
};
// "ASAP" appends a rush note; budget bracket frames expectation vs. base.
```

Result panel shows: estimated range, rough timeline, a short "what's typically included"
line, and a ballpark disclaimer.

## Lead Flow

1. Client form (`/estimate`) validated by react-hook-form + Zod.
2. Submit → TanStack Query `useMutation` → `send-lead` server function.
3. Server: Zod-validate (same schema). On success, send **two emails via Resend**:
   - Lead to owner inbox (all fields + computed estimate).
   - Auto-acknowledgement to the visitor ("thanks, I'll be in touch").
4. Honeypot field + basic rate limiting reject bots quietly.
5. UI shows success / error states from the mutation.

Env vars: `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`.

## Pages & UX

- `/` **Home** — gradient hero, 3–4 featured case studies, category strip, estimator CTA band.
- `/work` **Work** — full grid with category filter (All · Websites · Mobile · SaaS · Desktop ·
  Dashboards · Other). Filter state in URL search params (shareable).
- `/work/$slug` **Case study** — hero image, problem → solution → outcome, results stat row,
  tech/timeline/team/effort info panel, gallery, optional live link, "Start your project" CTA.
- `/estimate` **Estimator + contact** — single form, live estimate panel, success state.

### Components

Built on shadcn/ui primitives (`Button`, `Card`, `Input`, `Textarea`, `Select`/`RadioGroup`,
`ToggleGroup`, `Badge`, `Form`, `Sonner`, `Skeleton`), themed to Vibrant Modern:

- `ProjectCard` — glassy rounded card, thumbnail, title, category badge, tagline.
- `CategoryFilter` — `ToggleGroup` bound to URL search param.
- `CaseStudyHero`, `ResultsRow`, `InfoPanel`, `Gallery` — detail-page blocks.
- `EstimatorForm` + `EstimatePanel` — form + live ballpark output.
- `Nav` / `Footer` in `__root.tsx`; footer carries email + socials.
- `SeoMeta` helper — per-page title/description + Open Graph image (project hero).

### Visual System — "Vibrant Modern"

Violet→pink gradient accents, glassmorphic rounded cards with soft shadows, generous spacing,
strong display font for headings + clean sans body, subtle hover/scroll motion. Achieved by
overriding shadcn CSS variables (`--primary`, `--accent`, radius). Mobile-first, responsive.

### Accessibility

Keyboard-navigable filters and form, visible focus states, alt text on all images, form
labels + inline validation, reduced-motion support.

## Error Handling

- **Form/server:** Zod validation server-side; invalid input → structured inline field errors.
  Network/Resend failure → friendly error with fallback ("email me directly at …"). Honeypot +
  rate limiting for bots.
- **Routing:** 404 route for unknown paths/slugs. Case-study slugs validated at prerender time.
- **Images:** alt text + sensible loading; missing optional fields degrade gracefully.

## Testing

- **Unit (Vitest):** `lib/estimator.ts` rules (each category → expected range/timeline +
  modifiers); Zod schema accept/reject cases.
- **Component (Vitest + Testing Library):** `EstimatorForm` validation states, `CategoryFilter`
  URL sync, `ProjectCard` rendering.
- **Server fn:** `send-lead` with Resend mocked — validation gate, both emails dispatched on
  success, error path on failure.
- TDD for estimator rules and validation; lighter touch on purely visual pieces.

## Hosting & Config

- Deploy to a Node/edge host (Netlify or Vercel recommended). Case studies prerendered;
  `send-lead` runs as a serverless function.
- Content workflow: add/edit a file in `src/content/projects/`, add images to
  `public/projects/`, redeploy.
- Env vars: `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`.
