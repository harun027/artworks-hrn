import type { Estimate } from '@/lib/estimator'

export function EstimatePanel({ estimate }: { estimate: Estimate }) {
  return (
    <div className="rounded-xl border border-border bg-secondary p-6" role="status" aria-live="polite">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ballpark</p>
      <p className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground">{estimate.range}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        ~{estimate.weeks} weeks{estimate.rush ? ' · rush' : ''}
      </p>
      <p className="mt-4 border-t border-border pt-4 text-sm text-foreground/80">{estimate.note}</p>
      <p className="mt-4 text-xs text-muted-foreground">
        Ballpark only — final scope and price are confirmed after we talk.
      </p>
    </div>
  )
}
