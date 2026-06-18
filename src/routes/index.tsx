import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight, Globe, Smartphone, Server, Monitor, LayoutDashboard, Boxes,
  ClipboardList, Hammer, Rocket, type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/project-card'
import { ServiceCard } from '@/components/service-card'
import { HeroVisual } from '@/components/hero-visual'
import { featuredProjects } from '@/content/projects'
import type { Category } from '@/lib/types'

export const Route = createFileRoute('/')({ component: Home })

const SERVICES: { category: Category; label: string; tag: string; icon: LucideIcon; image: string }[] = [
  { category: 'website', label: 'Websites', tag: 'Web', icon: Globe, image: '/covers/website.svg' },
  { category: 'mobile', label: 'Mobile apps', tag: 'iOS & Android', icon: Smartphone, image: '/covers/mobile.svg' },
  { category: 'saas', label: 'SaaS products', tag: 'Product', icon: Server, image: '/covers/saas.svg' },
  { category: 'dashboard', label: 'Dashboards', tag: 'Realtime', icon: LayoutDashboard, image: '/covers/dashboard.svg' },
  { category: 'desktop', label: 'Desktop apps', tag: 'Cross-platform', icon: Monitor, image: '/covers/desktop.svg' },
  { category: 'other', label: 'Something else', tag: 'Custom', icon: Boxes, image: '/covers/other.svg' },
]

const STEPS = [
  { icon: ClipboardList, title: 'Estimate', desc: 'Tell me about your project and get an instant ballpark — no commitment.' },
  { icon: Hammer, title: 'Design & build', desc: 'I design, build, and keep you in the loop with regular check-ins.' },
  { icon: Rocket, title: 'Ship & support', desc: 'We launch, then I hand off cleanly with docs and follow-up support.' },
]

function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6">
      {/* Hero */}
      <section className="border-b border-border py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-sm font-medium text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              Available for new projects
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              I design and build digital products that ship.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Websites, mobile apps, SaaS, desktop apps, and dashboards — presented as full case
              studies, with a one-minute way to estimate your own project.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/estimate">
                  Get an estimate <ArrowRight className="ml-1.5 h-5 w-5" strokeWidth={2} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/work">View work</Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* What I build */}
      <section className="py-16 sm:py-20">
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">What I build</h2>
        <p className="mt-2 max-w-xl text-muted-foreground">
          End-to-end design and development across the products teams need most.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.category}
              category={s.category}
              label={s.label}
              tag={s.tag}
              icon={s.icon}
              image={s.image}
            />
          ))}
        </div>
      </section>

      {/* Featured work */}
      <section className="border-t border-border py-16 sm:py-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Selected work</h2>
            <p className="mt-2 text-muted-foreground">A few recent case studies.</p>
          </div>
          <Link
            to="/work"
            className="hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex"
          >
            All projects <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border py-16 sm:py-20">
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">How it works</h2>
        <p className="mt-2 max-w-xl text-muted-foreground">A simple, transparent path from idea to launch.</p>
        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="rounded-xl border border-border bg-card p-6 card-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-accent">
                  <step.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <span className="font-display text-sm font-semibold text-muted-foreground">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">{step.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="rounded-2xl border border-border bg-secondary px-8 py-14 text-center sm:px-12 sm:py-16">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Get a ballpark cost and timeline in under a minute — it reaches me directly.
          </p>
          <Button asChild size="lg" className="mt-7">
            <Link to="/estimate">Start your project</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
