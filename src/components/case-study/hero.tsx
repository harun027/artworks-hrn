import { GhostLetter } from '@/components/ghost-letter'
import { CATEGORIES, type Project } from '@/lib/types'

export function CaseStudyHero({ project }: { project: Project }) {
  const label = CATEGORIES.find((c) => c.value === project.category)?.label
  return (
    <div className="panel-dark relative overflow-hidden rounded-[2rem]">
      <div className="aspect-[16/9] w-full overflow-hidden sm:aspect-[2/1]">
        <img src={project.heroImage} alt={project.title} className="h-full w-full object-cover opacity-90" />
      </div>
      <GhostLetter char={project.title} className="-bottom-8 right-3 text-[13rem] text-white/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 sm:p-10">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">{label}</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-[0.95] text-white sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 max-w-lg text-white/70">{project.tagline}</p>
      </div>
    </div>
  )
}
