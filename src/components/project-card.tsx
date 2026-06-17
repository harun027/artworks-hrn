import { Link } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { CATEGORIES, type Project } from '@/lib/types'
import { cn } from '@/lib/utils'

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
