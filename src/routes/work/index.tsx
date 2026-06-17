import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { CategoryFilter, type FilterValue } from '@/components/category-filter'
import { ProjectCard } from '@/components/project-card'
import { GhostLetter } from '@/components/ghost-letter'
import { getProjectsByCategory } from '@/content/projects'
import { seo } from '@/lib/seo'

const searchSchema = z.object({
  category: z.enum(['all', 'website', 'mobile', 'saas', 'desktop', 'dashboard', 'other'])
    .catch('all').default('all'),
})

export const Route = createFileRoute('/work/')({
  validateSearch: searchSchema,
  head: () => ({ meta: seo({ title: 'Work — HRN', description: 'Selected case studies across web, mobile, SaaS, and more.' }) }),
  component: WorkPage,
})

function WorkPage() {
  const { category } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const items = getProjectsByCategory(category)

  function setCategory(v: FilterValue) {
    navigate({ search: { category: v } })
  }

  return (
    <main className="mx-auto max-w-6xl space-y-4 px-4 pt-6">
      <section className="panel-dark relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
        <GhostLetter char="W" className="-right-4 -top-10 text-[20rem] text-white/[0.04]" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Portfolio</p>
          <h1 className="mt-3 font-display text-5xl font-extrabold text-white">Selected Work</h1>
          <p className="mt-3 max-w-md text-white/60">
            Full case studies — the problem, the build, and the result.
          </p>
          <div className="mt-8"><CategoryFilter value={category} onChange={setCategory} tone="dark" /></div>
        </div>
      </section>

      <div className="grid gap-5 px-1 pb-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => <ProjectCard key={p.slug} project={p} />)}
      </div>
      {items.length === 0 && (
        <p className="px-2 pb-6 text-muted-foreground">No projects in this category yet.</p>
      )}
    </main>
  )
}
