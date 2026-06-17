import type { Estimate } from '@/lib/estimator'

export function EstimatePanel({ estimate }: { estimate: Estimate }) {
  return (
    <div className="glass rounded-2xl p-6" role="status" aria-live="polite">
      <p className="text-sm uppercase tracking-wide text-muted-foreground">Ballpark</p>
      <p className="mt-1 font-display text-3xl font-extrabold text-primary">{estimate.range}</p>
      <p className="mt-1 text-sm text-muted-foreground">~{estimate.weeks} weeks{estimate.rush ? ' · rush' : ''}</p>
      <p className="mt-3 text-sm">{estimate.note}</p>
      <p className="mt-4 text-xs text-muted-foreground">
        Ballpark only — final scope and price are confirmed after we talk.
      </p>
    </div>
  )
}
