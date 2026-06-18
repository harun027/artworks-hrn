import { Link } from '@tanstack/react-router'
import { ArrowUpRight, BadgeCheck, Calendar, Clock } from 'lucide-react'
import { CATEGORIES, type Project } from '@/lib/types'

function categoryLabel(value: Project['category']) {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value
}

export function ProjectCard({ project, asLink = true }: { project: Project; asLink?: boolean }) {
  const inner = (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-2 card-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      {/* Cover image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-secondary">
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {categoryLabel(project.category)}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
        <div className="flex items-center gap-1.5">
          <h3 className="font-display text-lg font-bold tracking-tight">{project.title}</h3>
          <BadgeCheck className="h-5 w-5 shrink-0 text-accent" strokeWidth={2} aria-label="Verified project" />
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{project.tagline}</p>

        {/* Footer: quick stats + view pill */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {project.year && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                <span className="font-medium text-foreground">{project.year}</span>
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              <span className="font-medium text-foreground">{project.timeline}</span>
            </span>
          </div>
          <span className="inline-flex h-9 items-center gap-1 rounded-full bg-secondary px-4 text-sm font-semibold text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
            View <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
          </span>
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
      className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {inner}
    </Link>
  )
}
