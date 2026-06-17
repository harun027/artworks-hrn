import { ArrowUpRight, Check } from 'lucide-react'
import type { Project } from '@/lib/types'

export function InfoPanel({ project }: { project: Project }) {
  return (
    <aside className="rounded-xl border border-border bg-card p-6 card-soft">
      <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Project details
      </h3>
      <dl className="mt-5 space-y-4 text-sm">
        {project.year && <Row label="Year" value={project.year} />}
        {project.role && <Row label="Role" value={project.role} />}
        <Row label="Timeline" value={project.timeline} />
        <Row label="Team" value={project.teamSize} />
        <Row label="Effort range" value={project.effortRange} />
        <div className="border-t border-border pt-4">
          <dt className="text-muted-foreground">Tech stack</dt>
          <dd className="mt-2 flex flex-wrap gap-1.5">
            {project.techStack.map((t) => (
              <span
                key={t}
                className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
              >
                {t}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      {project.services && project.services.length > 0 && (
        <div className="mt-5 border-t border-border pt-5">
          <p className="text-sm text-muted-foreground">Services provided</p>
          <ul className="mt-3 space-y-2">
            {project.services.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Visit live project <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </a>
      )}
    </aside>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  )
}
