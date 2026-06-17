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
    <main className="mx-auto max-w-5xl space-y-4 px-4 pt-6">
      <CaseStudyHero project={p} />
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <article className="panel-light space-y-8 rounded-[1.5rem] border border-border p-8 sm:p-10">
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
      <section className="gradient-accent relative overflow-hidden rounded-[2rem] p-10 text-center sm:p-12">
        <h2 className="font-display text-3xl font-extrabold text-white">Want something like this?</h2>
        <p className="mt-2 text-white/80">Get a ballpark estimate in under a minute.</p>
        <Button asChild size="lg" className="mt-6 rounded-full bg-white px-7 font-semibold text-ink hover:bg-white/90">
          <Link to="/estimate">Start your project</Link>
        </Button>
      </section>
    </main>
  )
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h2 className="font-display text-xl font-extrabold">{title}</h2>
      <p className="mt-2 leading-relaxed text-muted-foreground">{body}</p>
    </section>
  )
}
