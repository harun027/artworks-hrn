import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { CATEGORIES, type Project } from '@/lib/types'

function categoryLabel(value: Project['category']) {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value
}

export function ProjectCard({ project, asLink = true }: { project: Project; asLink?: boolean }) {
  const meta = [project.year, project.role].filter(Boolean).join(' · ')
  const keyResult = project.results[0]
  const inner = (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card card-soft transition-all duration-200 hover:border-foreground/15 hover:shadow-md">
      <div className="aspect-[16/10] overflow-hidden border-b border-border bg-secondary">
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            {categoryLabel(project.category)}
          </span>
          {meta && <span className="text-xs font-medium text-muted-foreground">{meta}</span>}
        </div>
        <div className="mt-2.5 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold leading-snug tracking-tight">
            {project.title}
          </h3>
          <ArrowUpRight
            className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
            strokeWidth={2}
          />
        </div>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{project.tagline}</p>

        {keyResult && (
          <div className="mt-4 flex items-baseline gap-2 border-t border-border pt-4">
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              {keyResult.value}
            </span>
            <span className="text-sm text-muted-foreground">{keyResult.label}</span>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
  if (!asLink) return inner
  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      aria-label={`View case study: ${project.title}`}
      className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {inner}
    </Link>
  )
}
