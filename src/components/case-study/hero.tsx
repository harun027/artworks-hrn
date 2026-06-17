import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { CATEGORIES, type Project } from '@/lib/types'

export function CaseStudyHero({ project }: { project: Project }) {
  const label = CATEGORIES.find((c) => c.value === project.category)?.label
  return (
    <div>
      <Link
        to="/work"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} /> Back to work
      </Link>
      <div className="mt-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">{label}</span>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">{project.tagline}</p>
      </div>
      <div className="mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-secondary">
        <img src={project.heroImage} alt={project.title} className="h-full w-full object-cover" />
      </div>
    </div>
  )
}
