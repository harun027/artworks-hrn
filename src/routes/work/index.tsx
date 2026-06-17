import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { CategoryFilter, type FilterValue } from '@/components/category-filter'
import { ProjectCard } from '@/components/project-card'
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
    <main className="mx-auto max-w-6xl px-6">
      <header className="border-b border-border py-14 sm:py-16">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Selected work</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Full case studies — the problem, the build, and the result.
        </p>
        <div className="mt-8">
          <CategoryFilter value={category} onChange={setCategory} />
        </div>
      </header>

      <div className="grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      {items.length === 0 && (
        <p className="pb-16 text-muted-foreground">No projects in this category yet.</p>
      )}
    </main>
  )
}
