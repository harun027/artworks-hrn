import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { GhostLetter } from '@/components/ghost-letter'
import { CATEGORIES, type Project } from '@/lib/types'
import { cn } from '@/lib/utils'

function categoryLabel(value: Project['category']) {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value
}

export function ProjectCard({ project, asLink = true }: { project: Project; asLink?: boolean }) {
  const inner = (
    <div
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-card',
        'transition duration-300 hover:-translate-y-1 hover:shadow-2xl',
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <GhostLetter
          char={project.title}
          className="-bottom-3 right-1 text-[6.5rem] text-white/25 mix-blend-overlay"
        />
        <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          {categoryLabel(project.category)}
        </span>
        <span className="action-dot absolute right-4 top-4 h-10 w-10 bg-white text-ink shadow-md transition group-hover:scale-110">
          <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-extrabold leading-tight">{project.title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{project.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
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
      className="block h-full"
    >
      {inner}
    </Link>
  )
}
