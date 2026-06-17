import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/project-card'
import { GhostLetter } from '@/components/ghost-letter'
import { featuredProjects } from '@/content/projects'
import { CATEGORIES } from '@/lib/types'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const hero = featuredProjects[0]
  return (
    <main className="mx-auto max-w-6xl space-y-4 px-4 pt-6">
      {/* Hero — light editorial panel with a giant ghost letter */}
      <section className="panel-light relative overflow-hidden rounded-[2rem] border border-border">
        <GhostLetter
          char="H"
          className="-right-6 top-1/2 -translate-y-1/2 text-[26rem] text-black/[0.04] sm:text-[34rem]"
        />
        <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Portfolio — HRN
            </p>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
              Big ideas,
              <br />
              <span className="bg-clip-text text-transparent gradient-accent">shipped fast.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              I design and build websites, mobile apps, SaaS, desktop apps, and dashboards.
              Here's the work — and a one-minute way to estimate yours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-ink px-6 font-semibold text-ink-foreground hover:bg-ink/90">
                <Link to="/estimate">
                  Get an estimate <ArrowUpRight className="ml-1 h-4 w-4" strokeWidth={2.5} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-border px-6 font-semibold">
                <Link to="/work">See the work</Link>
              </Button>
            </div>
          </div>
          {hero && (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-ink">
              <img src={hero.heroImage} alt={hero.title} className="h-full w-full object-cover" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-black/40 p-4 backdrop-blur-md">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">Featured</p>
                <p className="font-display text-lg font-bold text-white">{hero.title}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Category strip */}
      <div className="flex flex-wrap gap-2 px-2">
        {CATEGORIES.map((c) => (
          <span
            key={c.value}
            className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground"
          >
            {c.label}
          </span>
        ))}
      </div>

      {/* Featured work — dark bento panel */}
      <section className="panel-dark relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Selected work</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-white">Featured projects</h2>
          </div>
          <Link to="/work" className="group flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white">
            All projects
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" strokeWidth={2.5} />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* Gradient CTA panel */}
      <section className="gradient-accent relative overflow-hidden rounded-[2rem] p-10 text-center sm:p-14">
        <GhostLetter char="?" className="-bottom-10 left-4 text-[14rem] text-white/10" />
        <div className="relative">
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">Have a project in mind?</h2>
          <p className="mx-auto mt-3 max-w-md text-white/80">
            Get a ballpark cost and timeline in under a minute — it reaches me directly.
          </p>
          <Button asChild size="lg" className="mt-7 rounded-full bg-white px-7 font-semibold text-ink hover:bg-white/90">
            <Link to="/estimate">Start your project</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
