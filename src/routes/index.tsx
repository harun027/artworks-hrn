import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/project-card'
import { featuredProjects } from '@/content/projects'
import { CATEGORIES } from '@/lib/types'

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
          here is the work, and a quick way to estimate yours.
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
