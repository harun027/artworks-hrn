import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { CaseStudyHero } from '@/components/case-study/hero'
import { ResultsRow } from '@/components/case-study/results-row'
import { InfoPanel } from '@/components/case-study/info-panel'
import { Gallery } from '@/components/case-study/gallery'
import { getProject } from '@/content/projects'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const project = getProject(params.slug)
    if (!project) throw notFound()
    return project
  },
  head: ({ loaderData }) =>
    loaderData
      ? { meta: seo({ title: `${loaderData.title} — HRN`, description: loaderData.tagline, image: loaderData.heroImage }) }
      : {},
  component: CaseStudyPage,
})

function CaseStudyPage() {
  const p = Route.useLoaderData()
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <CaseStudyHero project={p} />
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-12">
        <article className="space-y-10">
          <Section title="The problem" body={p.problem} />
          <Section title="The solution" body={p.solution} />
          <Section title="The outcome" body={p.outcome} />
          <ResultsRow results={p.results} />
          <Gallery images={p.gallery} title={p.title} />
        </article>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <InfoPanel project={p} />
        </div>
      </div>
      <section className="mt-16 rounded-2xl border border-border bg-secondary px-8 py-12 text-center">
        <h2 className="font-display text-2xl font-bold tracking-tight">Want something like this?</h2>
        <p className="mt-2 text-muted-foreground">Get a ballpark estimate in under a minute.</p>
        <Button asChild size="lg" className="mt-6">
          <Link to="/estimate">Start your project</Link>
        </Button>
      </section>
    </main>
  )
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
    </section>
  )
}
