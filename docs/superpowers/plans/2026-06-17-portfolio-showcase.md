# Portfolio Showcase Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a TanStack Start portfolio that showcases full project case studies and converts visitors via a single estimator-as-contact form that emails leads.

**Architecture:** TanStack Start (React 19 + Vite) with file-based routing. Projects are typed content files prerendered into static case-study pages. The estimator computes a ballpark client-side and submits through a TanStack Query mutation to a `send-lead` server function that validates with Zod and sends two emails via Resend. UI is shadcn/ui primitives themed to a "Vibrant Modern" look.

**Tech Stack:** TanStack Start, TanStack Router, TanStack Query, shadcn/ui, Tailwind CSS, react-hook-form, Zod, Resend, TypeScript, Vitest + Testing Library.

---

## File Structure

```
src/
  routes/
    __root.tsx              # shell: Nav, Footer, default SEO meta
    index.tsx               # home
    work/index.tsx          # filterable grid
    work/$slug.tsx          # case study detail (prerendered)
    estimate.tsx            # estimator = contact form
    $.tsx                   # 404 catch-all
  content/
    projects/*.ts           # one file per project
    projects.ts             # aggregates + types all projects
  lib/
    types.ts                # Project, Category, LeadSubmission types
    estimator.ts            # pricing rules + computeEstimate()
    schema.ts               # Zod schema for lead submission
    seo.ts                  # seo() meta helper
    utils.ts                # cn() classname helper (shadcn)
  server/
    send-lead.ts            # createServerFn: validate + Resend
  components/
    ui/                     # shadcn-generated primitives
    nav.tsx
    footer.tsx
    project-card.tsx
    category-filter.tsx
    case-study/{hero,results-row,info-panel,gallery}.tsx
    estimator-form.tsx
    estimate-panel.tsx
  styles/app.css            # Tailwind + theme tokens
public/projects/            # case-study images
```

Test files live next to their unit as `*.test.ts(x)`.

---

## Task 0: Project scaffold

**Files:**
- Create: repo root files via scaffolding tool

- [ ] **Step 1: Initialize git**

Run:
```bash
git init
git add docs && git commit -m "docs: add portfolio spec and plan"
```

- [ ] **Step 2: Scaffold TanStack Start app into current directory**

Run:
```bash
npm create @tanstack/start@latest -- --template typescript .
```
If the tool refuses a non-empty dir, scaffold into `tmp-app` then move files: `npx @tanstack/create-start@latest tmp-app --template typescript` and copy `tmp-app/*` into the repo root, preserving `docs/`.

Expected: `package.json`, `vite.config.ts`, `src/routes/__root.tsx`, `app.config.ts` (or equivalent) created.

- [ ] **Step 3: Install runtime + dev dependencies**

Run:
```bash
npm install @tanstack/react-query zod react-hook-form @hookform/resolvers resend
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitejs/plugin-react
```

- [ ] **Step 4: Verify dev server boots**

Run: `npm run dev`
Expected: server starts, default route renders at the printed localhost URL. Stop it (Ctrl-C).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: scaffold TanStack Start app"
```

---

## Task 1: Tailwind, shadcn, and Vibrant Modern theme

**Files:**
- Create: `src/styles/app.css`, `components.json`, `src/lib/utils.ts`
- Modify: `vite.config.ts`, `src/routes/__root.tsx`

- [ ] **Step 1: Install Tailwind v4 and shadcn deps**

Run:
```bash
npm install tailwindcss @tailwindcss/vite class-variance-authority clsx tailwind-merge lucide-react tailwindcss-animate
```

- [ ] **Step 2: Add the Tailwind Vite plugin**

In `vite.config.ts`, import and add `tailwindcss()` to the `plugins` array (alongside the TanStack Start and React plugins already present).

```ts
import tailwindcss from '@tailwindcss/vite'
// inside defineConfig({ plugins: [ ...existing, tailwindcss() ] })
```

- [ ] **Step 3: Write theme tokens (Vibrant Modern)**

Create `src/styles/app.css`:

```css
@import "tailwindcss";
@plugin "tailwindcss-animate";

@theme {
  --font-display: "Clash Display", system-ui, sans-serif;
  --font-sans: "Inter", system-ui, sans-serif;
}

:root {
  --background: oklch(0.99 0.01 300);
  --foreground: oklch(0.18 0.02 290);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.18 0.02 290);
  --primary: oklch(0.55 0.24 300);      /* violet */
  --primary-foreground: oklch(0.99 0 0);
  --accent: oklch(0.65 0.25 350);       /* pink */
  --accent-foreground: oklch(0.99 0 0);
  --muted: oklch(0.96 0.01 300);
  --muted-foreground: oklch(0.5 0.02 290);
  --border: oklch(0.9 0.01 300);
  --input: oklch(0.9 0.01 300);
  --ring: oklch(0.55 0.24 300);
  --radius: 1rem;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-lg: var(--radius);
}

body { @apply bg-background text-foreground font-sans; }

.gradient-accent { background-image: linear-gradient(135deg, var(--primary), var(--accent)); }
.glass { @apply bg-card/70 backdrop-blur-md border border-border shadow-lg; }
```

- [ ] **Step 4: Import the stylesheet in the root route**

In `src/routes/__root.tsx`, import the CSS so it loads on every page:
```ts
import '../styles/app.css'
```

- [ ] **Step 5: Create the cn() helper**

Create `src/lib/utils.ts`:
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 6: Initialize shadcn**

Run:
```bash
npx shadcn@latest init
```
Answer prompts: style = default, base color = neutral, CSS variables = yes, CSS file = `src/styles/app.css`, components alias = `~/components` (match the project's path alias).

- [ ] **Step 7: Add the shadcn primitives we need**

Run:
```bash
npx shadcn@latest add button card input textarea label select radio-group toggle-group badge form sonner skeleton
```
Expected: files appear under `src/components/ui/`.

- [ ] **Step 8: Verify build picks up styles**

Run: `npm run dev`, open the page, confirm Tailwind classes apply (background tint visible). Stop server.

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "feat: tailwind + shadcn + vibrant modern theme"
```

---

## Task 2: Core types

**Files:**
- Create: `src/lib/types.ts`

- [ ] **Step 1: Write the types**

Create `src/lib/types.ts`:
```ts
export type Category =
  | 'website' | 'mobile' | 'saas' | 'desktop' | 'dashboard' | 'other'

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'website', label: 'Websites' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'saas', label: 'SaaS' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'dashboard', label: 'Dashboards' },
  { value: 'other', label: 'Other' },
]

export interface ProjectResult { label: string; value: string }

export interface Project {
  slug: string
  title: string
  category: Category
  tagline: string
  thumbnail: string
  heroImage: string
  gallery: string[]
  problem: string
  solution: string
  outcome: string
  results: ProjectResult[]
  techStack: string[]
  timeline: string
  teamSize: string
  effortRange: string
  liveUrl?: string
  featured?: boolean
}

export interface LeadSubmission {
  projectType: Category
  budgetBracket: string
  timelineNeed: string
  name: string
  email: string
  message: string
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: core domain types"
```

---

## Task 3: Estimator rules (TDD)

**Files:**
- Create: `src/lib/estimator.ts`, `src/lib/estimator.test.ts`
- Create: `vitest.config.ts`, `src/test/setup.ts`

- [ ] **Step 1: Configure Vitest**

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: { alias: { '~': '/src' } },
})
```

Create `src/test/setup.ts`:
```ts
import '@testing-library/jest-dom/vitest'
```

Add to `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 2: Write the failing test**

Create `src/lib/estimator.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { computeEstimate } from './estimator'

describe('computeEstimate', () => {
  it('returns base range and timeline for a website', () => {
    const e = computeEstimate({ projectType: 'website', timelineNeed: 'Flexible' })
    expect(e.range).toBe('$3k–$8k')
    expect(e.weeks).toBe('3–6')
    expect(e.rush).toBe(false)
  })

  it('flags rush when timeline is ASAP', () => {
    const e = computeEstimate({ projectType: 'saas', timelineNeed: 'ASAP' })
    expect(e.range).toBe('$20k–$60k')
    expect(e.rush).toBe(true)
    expect(e.note).toMatch(/rush/i)
  })

  it('handles "other" as a conversation', () => {
    const e = computeEstimate({ projectType: 'other', timelineNeed: 'Flexible' })
    expect(e.range).toBe("Let's talk")
    expect(e.weeks).toBe('Varies')
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/lib/estimator.test.ts`
Expected: FAIL — `computeEstimate` not found.

- [ ] **Step 4: Implement the estimator**

Create `src/lib/estimator.ts`:
```ts
import type { Category } from './types'

export interface EstimateInput { projectType: Category; timelineNeed: string }
export interface Estimate { range: string; weeks: string; rush: boolean; note: string }

// Editable placeholders — tune these to your real pricing.
const BASE: Record<Category, { range: string; weeks: string }> = {
  website:   { range: '$3k–$8k',    weeks: '3–6' },
  mobile:    { range: '$12k–$30k',  weeks: '8–16' },
  saas:      { range: '$20k–$60k',  weeks: '12–24' },
  desktop:   { range: '$15k–$40k',  weeks: '10–20' },
  dashboard: { range: '$8k–$20k',   weeks: '5–10' },
  other:     { range: "Let's talk", weeks: 'Varies' },
}

const INCLUDED: Record<Category, string> = {
  website: 'Design, build, responsive pages, and launch.',
  mobile: 'iOS + Android build, store submission, and QA.',
  saas: 'Auth, core features, billing wiring, and deploy.',
  desktop: 'Cross-platform app, packaging, and auto-update.',
  dashboard: 'Data wiring, charts, filters, and access control.',
  other: 'Scoped together based on your needs.',
}

export function computeEstimate(input: EstimateInput): Estimate {
  const base = BASE[input.projectType]
  const rush = input.timelineNeed === 'ASAP'
  const note = rush
    ? `Rush timeline — add a premium and we’ll prioritize. ${INCLUDED[input.projectType]}`
    : INCLUDED[input.projectType]
  return { range: base.range, weeks: base.weeks, rush, note }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/lib/estimator.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: estimator pricing rules with tests"
```

---

## Task 4: Lead Zod schema (TDD)

**Files:**
- Create: `src/lib/schema.ts`, `src/lib/schema.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/schema.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { leadSchema } from './schema'

const valid = {
  projectType: 'website', budgetBracket: '$5k–$15k', timelineNeed: 'Flexible',
  name: 'Ada', email: 'ada@example.com', message: 'I need a site for my shop.',
  website: '', // honeypot, must be empty
}

describe('leadSchema', () => {
  it('accepts a valid submission', () => {
    expect(leadSchema.safeParse(valid).success).toBe(true)
  })
  it('rejects a bad email', () => {
    expect(leadSchema.safeParse({ ...valid, email: 'nope' }).success).toBe(false)
  })
  it('rejects a short message', () => {
    expect(leadSchema.safeParse({ ...valid, message: 'hi' }).success).toBe(false)
  })
  it('rejects when honeypot is filled (bot)', () => {
    expect(leadSchema.safeParse({ ...valid, website: 'http://spam' }).success).toBe(false)
  })
  it('rejects an unknown project type', () => {
    expect(leadSchema.safeParse({ ...valid, projectType: 'game' }).success).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/schema.test.ts`
Expected: FAIL — `leadSchema` not found.

- [ ] **Step 3: Implement the schema**

Create `src/lib/schema.ts`:
```ts
import { z } from 'zod'

export const leadSchema = z.object({
  projectType: z.enum(['website', 'mobile', 'saas', 'desktop', 'dashboard', 'other']),
  budgetBracket: z.enum(['<$5k', '$5k–$15k', '$15k–$50k', '$50k+']),
  timelineNeed: z.enum(['ASAP', '1–3 months', 'Flexible']),
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(10, 'Tell me a bit more (10+ characters)'),
  // Honeypot: real users never fill this; bots do.
  website: z.string().max(0, 'Spam detected').optional().default(''),
})

export type LeadInput = z.infer<typeof leadSchema>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/schema.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: lead submission zod schema with tests"
```

---

## Task 5: Project content loader

**Files:**
- Create: `src/content/projects/sample-website.ts`, `src/content/projects/sample-dashboard.ts`
- Create: `src/content/projects.ts`, `src/content/projects.test.ts`

- [ ] **Step 1: Write two sample project files**

Create `src/content/projects/sample-website.ts`:
```ts
import type { Project } from '~/lib/types'

export const sampleWebsite: Project = {
  slug: 'brightcup-coffee',
  title: 'Brightcup Coffee',
  category: 'website',
  tagline: 'A warm, fast marketing site for a local roastery.',
  thumbnail: '/projects/brightcup-thumb.svg',
  heroImage: '/projects/brightcup-hero.svg',
  gallery: ['/projects/brightcup-1.svg', '/projects/brightcup-2.svg'],
  problem: 'Brightcup had no web presence and lost online orders to competitors.',
  solution: 'A responsive marketing site with menu, story, and online-order links.',
  outcome: 'Launched in 4 weeks; online orders became a real revenue channel.',
  results: [
    { label: 'Load time', value: '0.9s' },
    { label: 'Lighthouse', value: '98' },
    { label: 'Online orders', value: '+ new channel' },
  ],
  techStack: ['React', 'TanStack Start', 'Tailwind'],
  timeline: '4 weeks',
  teamSize: 'Solo',
  effortRange: '$4k–$7k',
  liveUrl: 'https://example.com',
  featured: true,
}
```

Create `src/content/projects/sample-dashboard.ts`:
```ts
import type { Project } from '~/lib/types'

export const sampleDashboard: Project = {
  slug: 'fleetwatch-dashboard',
  title: 'FleetWatch Dashboard',
  category: 'dashboard',
  tagline: 'Real-time vehicle telemetry in one operations view.',
  thumbnail: '/projects/fleetwatch-thumb.svg',
  heroImage: '/projects/fleetwatch-hero.svg',
  gallery: ['/projects/fleetwatch-1.svg'],
  problem: 'Dispatchers juggled three tools to track vehicles and jobs.',
  solution: 'A single dashboard with live map, filters, and alert thresholds.',
  outcome: 'Cut average dispatch decision time and removed tool-switching.',
  results: [
    { label: 'Tools replaced', value: '3 → 1' },
    { label: 'Refresh', value: 'Real-time' },
  ],
  techStack: ['React', 'TanStack Query', 'WebSocket', 'Recharts'],
  timeline: '9 weeks',
  teamSize: '2 people',
  effortRange: '$12k–$18k',
  featured: true,
}
```

- [ ] **Step 2: Write the failing test**

Create `src/content/projects.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { projects, getProject, getProjectsByCategory } from './projects'

describe('projects content', () => {
  it('exposes all projects with unique slugs', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(projects.length).toBeGreaterThan(0)
  })
  it('finds a project by slug', () => {
    expect(getProject('brightcup-coffee')?.title).toBe('Brightcup Coffee')
    expect(getProject('nope')).toBeUndefined()
  })
  it('filters by category', () => {
    expect(getProjectsByCategory('dashboard').every((p) => p.category === 'dashboard')).toBe(true)
    expect(getProjectsByCategory('all').length).toBe(projects.length)
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/content/projects.test.ts`
Expected: FAIL — module `./projects` not found.

- [ ] **Step 4: Implement the loader**

Create `src/content/projects.ts`:
```ts
import type { Category, Project } from '~/lib/types'
import { sampleWebsite } from './projects/sample-website'
import { sampleDashboard } from './projects/sample-dashboard'

export const projects: Project[] = [sampleWebsite, sampleDashboard]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getProjectsByCategory(category: Category | 'all'): Project[] {
  if (category === 'all') return projects
  return projects.filter((p) => p.category === category)
}

export const featuredProjects = projects.filter((p) => p.featured)
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/content/projects.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 6: Add placeholder images**

Create simple SVG placeholders at each path referenced above under `public/projects/` (solid gradient rectangles with the project title text). Each file like `public/projects/brightcup-hero.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#6d28d9"/><text x="50%" y="50%" fill="#fff" font-family="sans-serif" font-size="48" text-anchor="middle" dominant-baseline="middle">Brightcup Coffee</text></svg>
```
Repeat for: brightcup-thumb, brightcup-1, brightcup-2, fleetwatch-hero, fleetwatch-thumb, fleetwatch-1 (vary fill `#db2777` for the dashboard set, and the label text).

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: project content loader + sample case studies"
```

---

## Task 6: SEO helper

**Files:**
- Create: `src/lib/seo.ts`

- [ ] **Step 1: Write the helper**

Create `src/lib/seo.ts`:
```ts
export interface SeoArgs { title: string; description?: string; image?: string }

export function seo({ title, description, image }: SeoArgs) {
  const tags = [
    { title },
    { name: 'description', content: description },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    ...(image
      ? [
          { name: 'twitter:image', content: image },
          { property: 'og:image', content: image },
        ]
      : []),
  ]
  return tags.filter((t) => Object.values(t).every((v) => v !== undefined))
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: seo meta helper"
```

---

## Task 7: Nav and Footer

**Files:**
- Create: `src/components/nav.tsx`, `src/components/footer.tsx`
- Modify: `src/routes/__root.tsx`

- [ ] **Step 1: Write the Nav**

Create `src/components/nav.tsx`:
```tsx
import { Link } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'

export function Nav() {
  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-xl font-extrabold tracking-tight">
          HRN<span className="text-primary">.</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/work" className="hover:text-primary">Work</Link>
          <Button asChild size="sm" className="gradient-accent text-white">
            <Link to="/estimate">Start a project</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Write the Footer**

Create `src/components/footer.tsx`:
```tsx
export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} HRN. Built with TanStack Start.</p>
        <div className="flex gap-4">
          <a href="mailto:hello@example.com" className="hover:text-primary">Email</a>
          <a href="https://github.com" className="hover:text-primary">GitHub</a>
          <a href="https://linkedin.com" className="hover:text-primary">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Wire them into the root shell**

In `src/routes/__root.tsx`, render `<Nav />` above and `<Footer />` below the `<Outlet />` inside the body. Add the `<Toaster />` from `~/components/ui/sonner` near the end of the body for form toasts. Keep the existing `<HeadContent />`/`<Scripts />` wiring from the scaffold. Use `seo()` in the root `head` for site-wide defaults:
```tsx
import { Nav } from '~/components/nav'
import { Footer } from '~/components/footer'
import { Toaster } from '~/components/ui/sonner'
import { seo } from '~/lib/seo'
// in the route options:
head: () => ({ meta: seo({ title: 'HRN — Selected Work', description: 'Case studies and a quick project estimate.' }) }),
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, confirm nav + footer render on the home page. Stop server.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: nav and footer shell"
```

---

## Task 8: ProjectCard (TDD)

**Files:**
- Create: `src/components/project-card.tsx`, `src/components/project-card.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/project-card.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createRootRoute, createRouter, RouterProvider, Outlet } from '@tanstack/react-router'
import { ProjectCard } from './project-card'
import { sampleWebsite } from '~/content/projects/sample-website'

function renderWithRouter(ui: React.ReactNode) {
  const root = createRootRoute({ component: () => <Outlet /> })
  const router = createRouter({ routeTree: root, defaultComponent: () => ui })
  // Render the card directly; Link needs a router context.
  return render(<RouterProvider router={router as any} />)
}

describe('ProjectCard', () => {
  it('shows title, tagline and category badge', () => {
    render(<a><ProjectCardStatic /></a>)
    expect(screen.getByText('Brightcup Coffee')).toBeInTheDocument()
    expect(screen.getByText(/warm, fast marketing site/i)).toBeInTheDocument()
    expect(screen.getByText('Websites')).toBeInTheDocument()
  })
})

// Render the visual content without the Link wrapper for a context-free assertion.
function ProjectCardStatic() {
  return <ProjectCard project={sampleWebsite} asLink={false} />
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/project-card.test.tsx`
Expected: FAIL — `ProjectCard` not found.

- [ ] **Step 3: Implement ProjectCard**

Create `src/components/project-card.tsx`:
```tsx
import { Link } from '@tanstack/react-router'
import { Badge } from '~/components/ui/badge'
import { CATEGORIES, type Project } from '~/lib/types'
import { cn } from '~/lib/utils'

function categoryLabel(value: Project['category']) {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value
}

export function ProjectCard({ project, asLink = true }: { project: Project; asLink?: boolean }) {
  const inner = (
    <div className={cn('glass group overflow-hidden rounded-2xl transition hover:shadow-xl')}>
      <div className="aspect-[16/10] overflow-hidden">
        <img src={project.thumbnail} alt={project.title}
             className="h-full w-full object-cover transition group-hover:scale-105" />
      </div>
      <div className="space-y-2 p-5">
        <Badge className="gradient-accent text-white">{categoryLabel(project.category)}</Badge>
        <h3 className="font-display text-lg font-bold">{project.title}</h3>
        <p className="text-sm text-muted-foreground">{project.tagline}</p>
      </div>
    </div>
  )
  if (!asLink) return inner
  return <Link to="/work/$slug" params={{ slug: project.slug }}>{inner}</Link>
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/project-card.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: project card component with test"
```

---

## Task 9: CategoryFilter with URL search params (TDD)

**Files:**
- Create: `src/components/category-filter.tsx`, `src/components/category-filter.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/category-filter.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CategoryFilter } from './category-filter'

describe('CategoryFilter', () => {
  it('renders all categories plus All and calls onChange', async () => {
    const onChange = vi.fn()
    render(<CategoryFilter value="all" onChange={onChange} />)
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Dashboards' }))
    expect(onChange).toHaveBeenCalledWith('dashboard')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/category-filter.test.tsx`
Expected: FAIL — component not found.

- [ ] **Step 3: Implement CategoryFilter**

Create `src/components/category-filter.tsx`:
```tsx
import { Button } from '~/components/ui/button'
import { CATEGORIES, type Category } from '~/lib/types'
import { cn } from '~/lib/utils'

export type FilterValue = Category | 'all'

export function CategoryFilter({
  value, onChange,
}: { value: FilterValue; onChange: (v: FilterValue) => void }) {
  const options: { value: FilterValue; label: string }[] = [
    { value: 'all', label: 'All' }, ...CATEGORIES,
  ]
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <Button
          key={o.value}
          type="button"
          variant={value === o.value ? 'default' : 'outline'}
          size="sm"
          className={cn('rounded-full', value === o.value && 'gradient-accent text-white')}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </Button>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/category-filter.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: category filter component with test"
```

---

## Task 10: Work grid route

**Files:**
- Create: `src/routes/work/index.tsx`

- [ ] **Step 1: Implement the route with URL-backed filter**

Create `src/routes/work/index.tsx`:
```tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { CategoryFilter, type FilterValue } from '~/components/category-filter'
import { ProjectCard } from '~/components/project-card'
import { getProjectsByCategory } from '~/content/projects'
import { seo } from '~/lib/seo'

const searchSchema = z.object({
  category: z.enum(['all', 'website', 'mobile', 'saas', 'desktop', 'dashboard', 'other'])
    .catch('all').default('all'),
})

export const Route = createFileRoute('/work/')({
  validateSearch: searchSchema,
  head: () => ({ meta: seo({ title: 'Work — HRN', description: 'Selected case studies across web, mobile, SaaS, and more.' }) }),
  component: WorkPage,
})

function WorkPage() {
  const { category } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const items = getProjectsByCategory(category)

  function setCategory(v: FilterValue) {
    navigate({ search: { category: v } })
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="font-display text-4xl font-extrabold">Selected Work</h1>
      <p className="mt-2 text-muted-foreground">Full case studies — the problem, the build, the result.</p>
      <div className="mt-8"><CategoryFilter value={category} onChange={setCategory} /></div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => <ProjectCard key={p.slug} project={p} />)}
      </div>
      {items.length === 0 && <p className="mt-10 text-muted-foreground">No projects in this category yet.</p>}
    </main>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run dev`, visit `/work`, click filter chips, confirm the URL updates to `?category=…` and the grid filters. Stop server.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: work grid route with url-backed filter"
```

---

## Task 11: Case-study detail blocks

**Files:**
- Create: `src/components/case-study/hero.tsx`, `results-row.tsx`, `info-panel.tsx`, `gallery.tsx`

- [ ] **Step 1: Hero**

Create `src/components/case-study/hero.tsx`:
```tsx
import { Badge } from '~/components/ui/badge'
import { CATEGORIES, type Project } from '~/lib/types'

export function CaseStudyHero({ project }: { project: Project }) {
  const label = CATEGORIES.find((c) => c.value === project.category)?.label
  return (
    <div className="relative">
      <div className="aspect-[2/1] w-full overflow-hidden rounded-3xl">
        <img src={project.heroImage} alt={project.title} className="h-full w-full object-cover" />
      </div>
      <div className="mt-6">
        <Badge className="gradient-accent text-white">{label}</Badge>
        <h1 className="mt-3 font-display text-4xl font-extrabold">{project.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{project.tagline}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: ResultsRow**

Create `src/components/case-study/results-row.tsx`:
```tsx
import type { ProjectResult } from '~/lib/types'

export function ResultsRow({ results }: { results: ProjectResult[] }) {
  if (results.length === 0) return null
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {results.map((r) => (
        <div key={r.label} className="glass rounded-2xl p-5 text-center">
          <div className="font-display text-2xl font-extrabold text-primary">{r.value}</div>
          <div className="mt-1 text-sm text-muted-foreground">{r.label}</div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: InfoPanel**

Create `src/components/case-study/info-panel.tsx`:
```tsx
import { Badge } from '~/components/ui/badge'
import type { Project } from '~/lib/types'

export function InfoPanel({ project }: { project: Project }) {
  return (
    <aside className="glass rounded-2xl p-6">
      <h3 className="font-display text-lg font-bold">What it took</h3>
      <dl className="mt-4 space-y-3 text-sm">
        <div><dt className="text-muted-foreground">Timeline</dt><dd className="font-medium">{project.timeline}</dd></div>
        <div><dt className="text-muted-foreground">Team</dt><dd className="font-medium">{project.teamSize}</dd></div>
        <div><dt className="text-muted-foreground">Effort range</dt><dd className="font-medium">{project.effortRange}</dd></div>
        <div>
          <dt className="text-muted-foreground">Tech stack</dt>
          <dd className="mt-1 flex flex-wrap gap-1.5">
            {project.techStack.map((t) => <Badge key={t} variant="outline">{t}</Badge>)}
          </dd>
        </div>
      </dl>
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noreferrer"
           className="mt-5 inline-block font-medium text-primary hover:underline">
          Visit live project →
        </a>
      )}
    </aside>
  )
}
```

- [ ] **Step 4: Gallery**

Create `src/components/case-study/gallery.tsx`:
```tsx
export function Gallery({ images, title }: { images: string[]; title: string }) {
  if (images.length === 0) return null
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((src, i) => (
        <img key={src} src={src} alt={`${title} screenshot ${i + 1}`}
             className="w-full rounded-2xl border border-border" />
      ))}
    </div>
  )
}
```

- [ ] **Step 5: Typecheck and commit**

Run: `npx tsc --noEmit` (expect no errors).
```bash
git add -A && git commit -m "feat: case-study detail blocks"
```

---

## Task 12: Case-study detail route (prerendered)

**Files:**
- Create: `src/routes/work/$slug.tsx`

- [ ] **Step 1: Implement the route**

Create `src/routes/work/$slug.tsx`:
```tsx
import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
import { CaseStudyHero } from '~/components/case-study/hero'
import { ResultsRow } from '~/components/case-study/results-row'
import { InfoPanel } from '~/components/case-study/info-panel'
import { Gallery } from '~/components/case-study/gallery'
import { getProject, projects } from '~/content/projects'
import { seo } from '~/lib/seo'

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const project = getProject(params.slug)
    if (!project) throw notFound()
    return project
  },
  head: ({ loaderData }) =>
    loaderData
      ? { meta: seo({ title: `${loaderData.title} — HRN`, description: loaderData.tagline, image: loaderData.heroImage }) }
      : {},
  component: CaseStudyPage,
})

function CaseStudyPage() {
  const p = Route.useLoaderData()
  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <CaseStudyHero project={p} />
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
        <article className="space-y-8">
          <Section title="The problem" body={p.problem} />
          <Section title="The solution" body={p.solution} />
          <Section title="The outcome" body={p.outcome} />
          <ResultsRow results={p.results} />
          <Gallery images={p.gallery} title={p.title} />
        </article>
        <InfoPanel project={p} />
      </div>
      <div className="mt-16 glass rounded-3xl p-10 text-center">
        <h2 className="font-display text-2xl font-extrabold">Want something like this?</h2>
        <p className="mt-2 text-muted-foreground">Get a ballpark estimate in under a minute.</p>
        <Button asChild className="mt-5 gradient-accent text-white">
          <Link to="/estimate">Start your project</Link>
        </Button>
      </div>
    </main>
  )
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold">{title}</h2>
      <p className="mt-2 leading-relaxed text-muted-foreground">{body}</p>
    </section>
  )
}

// Prerender one static page per project at build time.
export const prerender = () => projects.map((p) => `/work/${p.slug}`)
```

> Note: if the installed TanStack Start version configures prerendering in `app.config.ts`/`vite.config.ts` instead of a route export, move the slug list there: add each `/work/<slug>` path to the prerender `routes` array. Verify against the scaffold's prerender API before finalizing.

- [ ] **Step 2: Verify**

Run: `npm run dev`, visit `/work/brightcup-coffee` and `/work/fleetwatch-dashboard`; confirm full case study renders. Visit `/work/nope`; confirm not-found behavior. Stop server.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: case-study detail route with prerender"
```

---

## Task 13: send-lead server function (TDD)

**Files:**
- Create: `src/server/send-lead.ts`, `src/server/send-lead.test.ts`
- Create: `.env.example`

- [ ] **Step 1: Document env vars**

Create `.env.example`:
```
RESEND_API_KEY=re_xxxxxxxx
LEAD_TO_EMAIL=you@example.com
LEAD_FROM_EMAIL=leads@yourdomain.com
```

- [ ] **Step 2: Write the failing test**

Create `src/server/send-lead.test.ts`:
```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'

const sendMock = vi.fn()
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({ emails: { send: sendMock } })),
}))

import { processLead } from './send-lead'

const valid = {
  projectType: 'website', budgetBracket: '$5k–$15k', timelineNeed: 'Flexible',
  name: 'Ada', email: 'ada@example.com', message: 'I need a marketing site.', website: '',
}

describe('processLead', () => {
  beforeEach(() => { sendMock.mockReset(); sendMock.mockResolvedValue({ data: { id: '1' }, error: null }) })

  it('rejects invalid input without sending email', async () => {
    await expect(processLead({ ...valid, email: 'bad' })).rejects.toThrow()
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('sends two emails on a valid submission', async () => {
    const res = await processLead(valid)
    expect(res.ok).toBe(true)
    expect(sendMock).toHaveBeenCalledTimes(2) // lead to owner + ack to visitor
  })

  it('surfaces a failure when the email provider errors', async () => {
    sendMock.mockResolvedValueOnce({ data: null, error: { message: 'boom' } })
    await expect(processLead(valid)).rejects.toThrow(/boom/)
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/server/send-lead.test.ts`
Expected: FAIL — `processLead` not found.

- [ ] **Step 4: Implement processLead + the server function**

Create `src/server/send-lead.ts`:
```ts
import { createServerFn } from '@tanstack/react-start'
import { Resend } from 'resend'
import { leadSchema, type LeadInput } from '~/lib/schema'
import { computeEstimate } from '~/lib/estimator'

export async function processLead(raw: unknown): Promise<{ ok: true }> {
  const data: LeadInput = leadSchema.parse(raw) // throws on invalid / honeypot
  const estimate = computeEstimate({ projectType: data.projectType, timelineNeed: data.timelineNeed })
  const resend = new Resend(process.env.RESEND_API_KEY)
  const from = process.env.LEAD_FROM_EMAIL!
  const to = process.env.LEAD_TO_EMAIL!

  const lead = await resend.emails.send({
    from, to,
    subject: `New lead: ${data.projectType} — ${data.name}`,
    text: [
      `Name: ${data.name}`, `Email: ${data.email}`,
      `Project: ${data.projectType}`, `Budget: ${data.budgetBracket}`,
      `Timeline: ${data.timelineNeed}`,
      `Estimate shown: ${estimate.range} / ${estimate.weeks} weeks${estimate.rush ? ' (rush)' : ''}`,
      ``, `Message:`, data.message,
    ].join('\n'),
  })
  if (lead.error) throw new Error(lead.error.message)

  const ack = await resend.emails.send({
    from, to: data.email,
    subject: 'Thanks — I’ll be in touch',
    text: `Hi ${data.name},\n\nThanks for reaching out about your ${data.projectType} project. `
      + `Your ballpark is ${estimate.range} over roughly ${estimate.weeks} weeks. `
      + `I’ll review your message and reply personally soon.\n\n— HRN`,
  })
  if (ack.error) throw new Error(ack.error.message)

  return { ok: true }
}

export const sendLead = createServerFn({ method: 'POST' })
  .validator((d: unknown) => d)
  .handler(async ({ data }) => processLead(data))
```

> Note: confirm the `createServerFn` import path and `.validator/.handler` chain against the installed `@tanstack/react-start` version; adjust the call shape if the scaffold uses a different signature. `processLead` is provider-agnostic and is what the tests cover.

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/server/send-lead.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: send-lead server function with tests"
```

---

## Task 14: EstimatorForm + EstimatePanel (TDD)

**Files:**
- Create: `src/components/estimate-panel.tsx`
- Create: `src/components/estimator-form.tsx`, `src/components/estimator-form.test.tsx`

- [ ] **Step 1: EstimatePanel**

Create `src/components/estimate-panel.tsx`:
```tsx
import type { Estimate } from '~/lib/estimator'

export function EstimatePanel({ estimate }: { estimate: Estimate }) {
  return (
    <div className="glass rounded-2xl p-6" role="status" aria-live="polite">
      <p className="text-sm uppercase tracking-wide text-muted-foreground">Ballpark</p>
      <p className="mt-1 font-display text-3xl font-extrabold text-primary">{estimate.range}</p>
      <p className="mt-1 text-sm text-muted-foreground">~{estimate.weeks} weeks{estimate.rush ? ' · rush' : ''}</p>
      <p className="mt-3 text-sm">{estimate.note}</p>
      <p className="mt-4 text-xs text-muted-foreground">
        Ballpark only — final scope and price are confirmed after we talk.
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Write the failing test**

Create `src/components/estimator-form.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EstimatorForm } from './estimator-form'

describe('EstimatorForm', () => {
  it('shows a live estimate for the chosen project type', () => {
    render(<EstimatorForm onSubmit={vi.fn()} pending={false} />)
    // default project type is website
    expect(screen.getByText('$3k–$8k')).toBeInTheDocument()
  })

  it('validates required fields before submitting', async () => {
    const onSubmit = vi.fn()
    render(<EstimatorForm onSubmit={onSubmit} pending={false} />)
    await userEvent.click(screen.getByRole('button', { name: /get my estimate/i }))
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits clean data', async () => {
    const onSubmit = vi.fn()
    render(<EstimatorForm onSubmit={onSubmit} pending={false} />)
    await userEvent.type(screen.getByLabelText(/name/i), 'Ada')
    await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com')
    await userEvent.type(screen.getByLabelText(/message/i), 'I need a marketing website soon.')
    await userEvent.click(screen.getByRole('button', { name: /get my estimate/i }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit.mock.calls[0][0].name).toBe('Ada')
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/components/estimator-form.test.tsx`
Expected: FAIL — component not found.

- [ ] **Step 4: Implement EstimatorForm**

Create `src/components/estimator-form.tsx`:
```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { leadSchema, type LeadInput } from '~/lib/schema'
import { computeEstimate } from '~/lib/estimator'
import { CATEGORIES } from '~/lib/types'
import { EstimatePanel } from './estimate-panel'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Label } from '~/components/ui/label'

const BUDGETS = ['<$5k', '$5k–$15k', '$15k–$50k', '$50k+'] as const
const TIMELINES = ['ASAP', '1–3 months', 'Flexible'] as const

export function EstimatorForm({
  onSubmit, pending,
}: { onSubmit: (data: LeadInput) => void; pending: boolean }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      projectType: 'website', budgetBracket: '$5k–$15k', timelineNeed: 'Flexible',
      name: '', email: '', message: '', website: '',
    },
  })
  const projectType = watch('projectType')
  const timelineNeed = watch('timelineNeed')
  const estimate = computeEstimate({ projectType, timelineNeed })

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <Label htmlFor="projectType">Project type</Label>
          <select id="projectType" className="mt-1 w-full rounded-md border border-input bg-card p-2"
                  {...register('projectType')}>
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <Label htmlFor="budgetBracket">Budget</Label>
          <select id="budgetBracket" className="mt-1 w-full rounded-md border border-input bg-card p-2"
                  {...register('budgetBracket')}>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <Label htmlFor="timelineNeed">Timeline</Label>
          <select id="timelineNeed" className="mt-1 w-full rounded-md border border-input bg-card p-2"
                  {...register('timelineNeed')}>
            {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register('name')} />
          {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" rows={4} {...register('message')} />
          {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
        </div>
        {/* Honeypot: visually hidden, real users leave empty */}
        <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
               className="hidden" {...register('website')} />
        <Button type="submit" disabled={pending} className="gradient-accent text-white">
          {pending ? 'Sending…' : 'Get my estimate'}
        </Button>
      </form>
      <div className="lg:sticky lg:top-24 lg:self-start"><EstimatePanel estimate={estimate} /></div>
    </div>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/estimator-form.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: estimator form + live estimate panel with tests"
```

---

## Task 15: Estimate route (wires form → server fn)

**Files:**
- Create: `src/routes/estimate.tsx`
- Modify: `src/router.tsx` (or the scaffold's router file) to provide a QueryClient

- [ ] **Step 1: Ensure a QueryClient provider exists**

If the scaffold doesn't already wrap the app in `QueryClientProvider`, add it in the router/root setup:
```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
// wrap the RouterProvider (or in __root.tsx body) with <QueryClientProvider client={queryClient}>…</QueryClientProvider>
```

- [ ] **Step 2: Implement the estimate route**

Create `src/routes/estimate.tsx`:
```tsx
import { createFileRoute } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { EstimatorForm } from '~/components/estimator-form'
import { sendLead } from '~/server/send-lead'
import type { LeadInput } from '~/lib/schema'
import { seo } from '~/lib/seo'

export const Route = createFileRoute('/estimate')({
  head: () => ({ meta: seo({ title: 'Get an estimate — HRN', description: 'Tell me about your project and get an instant ballpark.' }) }),
  component: EstimatePage,
})

function EstimatePage() {
  const mutation = useMutation({
    mutationFn: (data: LeadInput) => sendLead({ data }),
    onSuccess: () => toast.success('Thanks! Check your inbox — I’ll be in touch.'),
    onError: () => toast.error('Something went wrong. Email me directly at hello@example.com.'),
  })

  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="font-display text-4xl font-extrabold">Start your project</h1>
      <p className="mt-2 text-muted-foreground">
        Pick a few options for an instant ballpark, then send it over — it reaches me directly.
      </p>
      {mutation.isSuccess ? (
        <div className="mt-10 glass rounded-3xl p-10 text-center">
          <h2 className="font-display text-2xl font-extrabold">Message sent 🎉</h2>
          <p className="mt-2 text-muted-foreground">I’ll review it and reply personally. Check your email for a confirmation.</p>
        </div>
      ) : (
        <div className="mt-10">
          <EstimatorForm onSubmit={(d) => mutation.mutate(d)} pending={mutation.isPending} />
        </div>
      )}
    </main>
  )
}
```

- [ ] **Step 3: Verify (with a real or test Resend key)**

Run: copy `.env.example` to `.env`, fill values, `npm run dev`, visit `/estimate`, change project type and watch the ballpark update, submit a valid form, confirm success state + toast. Without a key, expect the error toast path. Stop server.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: estimate route wiring form to server function"
```

---

## Task 16: Home route

**Files:**
- Create: `src/routes/index.tsx` (replace the scaffold default)

- [ ] **Step 1: Implement the home page**

Create/replace `src/routes/index.tsx`:
```tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
import { ProjectCard } from '~/components/project-card'
import { featuredProjects } from '~/content/projects'
import { CATEGORIES } from '~/lib/types'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="font-display text-5xl font-extrabold leading-tight sm:text-6xl">
          Big ideas,<br /><span className="bg-clip-text text-transparent gradient-accent">shipped fast.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          I design and build websites, mobile apps, SaaS, desktop apps, and dashboards —
          here’s the work, and a quick way to estimate yours.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild className="gradient-accent text-white"><Link to="/estimate">Get an estimate</Link></Button>
          <Button asChild variant="outline"><Link to="/work">See the work</Link></Button>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
          {CATEGORIES.map((c) => <span key={c.value} className="rounded-full border border-border px-3 py-1">{c.label}</span>)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl font-extrabold">Featured work</h2>
          <Link to="/work" className="text-sm font-medium text-primary hover:underline">All projects →</Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="glass rounded-3xl p-12 text-center">
          <h2 className="font-display text-3xl font-extrabold">Have a project in mind?</h2>
          <p className="mt-2 text-muted-foreground">Get a ballpark cost and timeline in under a minute.</p>
          <Button asChild className="mt-6 gradient-accent text-white"><Link to="/estimate">Start your project</Link></Button>
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run dev`, confirm home renders hero, featured cards link to case studies, and CTAs route to `/estimate` and `/work`. Stop server.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: home page"
```

---

## Task 17: 404 route

**Files:**
- Create: `src/routes/$.tsx`

- [ ] **Step 1: Implement the catch-all**

Create `src/routes/$.tsx`:
```tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'

export const Route = createFileRoute('/$')({ component: NotFound })

function NotFound() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
      <p className="font-display text-6xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">That page doesn’t exist or has moved.</p>
      <Button asChild className="mt-6 gradient-accent text-white"><Link to="/">Back home</Link></Button>
    </main>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run dev`, visit `/does-not-exist`, confirm the 404 renders. Stop server.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: 404 catch-all route"
```

---

## Task 18: Full verification + build

**Files:** none (verification only)

- [ ] **Step 1: Run the whole test suite**

Run: `npm run test`
Expected: all suites pass (estimator, schema, projects, project-card, category-filter, send-lead, estimator-form).

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Production build + prerender**

Run: `npm run build`
Expected: build succeeds; case-study pages prerender for each project slug (check build output lists `/work/brightcup-coffee` and `/work/fleetwatch-dashboard`).

- [ ] **Step 4: Preview**

Run: `npm run start` (or the scaffold's preview command), click through home → work → filter → case study → estimate. Stop server.

- [ ] **Step 5: Final commit**

```bash
git add -A && git commit -m "chore: verified build, tests, and prerender"
```

---

## Self-Review Notes

- **Spec coverage:** projects/case studies (Tasks 5, 11, 12), category filter with URL state (Tasks 9, 10), per-project "what it took" (Task 11 InfoPanel), estimator logic (Task 3), estimator-as-contact form (Task 14), lead email via Resend with ack (Task 13), prerendering (Task 12), Vibrant Modern theme on shadcn (Task 1), SEO/OG (Tasks 6, 12), 404 (Task 17), testing (throughout), hosting/env (Tasks 13, 18). All spec sections map to tasks.
- **Version caveats:** TanStack Start's `createServerFn` and prerender configuration APIs vary by version; Tasks 12 and 13 include notes to verify against the installed scaffold and adjust the wiring (the provider-agnostic `processLead` and pure functions remain test-covered regardless).
- **Type consistency:** `Project`, `Category`, `LeadSubmission`/`LeadInput`, `Estimate`, `computeEstimate`, `leadSchema`, `getProject`/`getProjectsByCategory`/`featuredProjects` are used consistently across tasks.
