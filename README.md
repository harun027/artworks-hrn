# HRN — Portfolio & Project Showcase

A portfolio site that presents completed work as **full case studies** (websites, mobile apps, SaaS, desktop apps, dashboards, and more) and converts visitors with a **single-form estimator that doubles as the contact form** — it computes an instant ballpark and emails the lead directly.

Built with **TanStack Start** (SSR + prerendering), **shadcn/ui**, and an editorial bento design (Inter Tight display type, dark/light rounded panels, giant ghost-letter typography).

## Tech stack

- **TanStack Start** (React 19 + Vite) — full-stack framework, file-based routing, server functions
- **TanStack Router** + **TanStack Query**
- **shadcn/ui** (Radix) + **Tailwind CSS v4**
- **react-hook-form** + **Zod** — shared validation, client & server
- **Resend** — transactional email for leads
- **TypeScript**, **Vitest** + Testing Library

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

> The dev/preview servers bind to `127.0.0.1` on ports `5173` / `4173` (port 3000 is reserved on some Windows machines).

### Environment variables

The estimator emails leads via Resend. Copy the example and fill it in:

```bash
cp .env.example .env
```

| Variable          | Purpose                                                |
| ----------------- | ------------------------------------------------------ |
| `RESEND_API_KEY`  | Resend API key                                         |
| `LEAD_TO_EMAIL`   | Where lead notifications are sent (your inbox)         |
| `LEAD_FROM_EMAIL` | From address — must be on a **Resend-verified domain** |

Without these the whole site still runs — only the estimator submit will show an error toast.

## Scripts

| Command                | Description                               |
| ---------------------- | ----------------------------------------- |
| `pnpm dev`             | Dev server (Vite)                         |
| `pnpm build`           | Production build + prerender static pages |
| `pnpm preview`         | Preview the production build              |
| `pnpm test`            | Run the Vitest suite                      |
| `pnpm generate-routes` | Regenerate the TanStack route tree        |

## Adding a project

Content is file-based — no database or CMS:

1. Add a typed file in `src/content/projects/` (copy an existing sample).
2. Drop images in `public/projects/`.
3. Register it in `src/content/projects.ts`.
4. Redeploy. Each project gets its own prerendered case-study page at `/work/<slug>`.

The estimator's ballpark rules live in `src/lib/estimator.ts` — tune the placeholder ranges/timelines there.

## Project structure

```
src/
  routes/            # file-based routes (home, /work, /work/$slug, /estimate, 404)
  content/projects/  # typed case-study content (static)
  components/         # ProjectCard, case-study blocks, estimator form, nav/footer, ui/ (shadcn)
  lib/               # types, estimator rules, zod schema, seo helper
  server/            # send-lead server function (Resend)
  styles.css         # editorial bento theme tokens
public/projects/     # case-study images
```

## Deploy

`pnpm build` produces a TanStack Start server build plus prerendered static
case-study pages. Deploy to any Node host, or add the deployment adapter for your
target platform (see the [TanStack Start hosting docs](https://tanstack.com/start/latest/docs/framework/react/hosting)).
Set `RESEND_API_KEY`, `LEAD_TO_EMAIL`, and `LEAD_FROM_EMAIL` as environment
variables on the host.

## Testing

```bash
pnpm test
```

Covers the estimator rules, the lead Zod schema, the content loader, and the key components + server function.

## Design & implementation notes

The full design spec and implementation plan live in [`docs/superpowers/`](docs/superpowers/).

---

> Placeholders to replace before going live: the sample projects/images in `src/content/projects/` and `public/projects/`, the `hello@example.com` / social links in the footer, and the `HRN` brand name.
