import { Badge } from '@/components/ui/badge'
import { CATEGORIES, type Project } from '@/lib/types'

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
