import type { Estimate } from '@/lib/estimator'

export function EstimatePanel({ estimate }: { estimate: Estimate }) {
  return (
    <div className="gradient-accent relative overflow-hidden rounded-[1.5rem] p-6 text-white" role="status" aria-live="polite">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Ballpark</p>
      <p className="mt-1 font-display text-4xl font-extrabold text-white">{estimate.range}</p>
      <p className="mt-1 text-sm text-white/80">
        ~{estimate.weeks} weeks{estimate.rush ? ' · rush' : ''}
      </p>
      <p className="mt-4 text-sm text-white/90">{estimate.note}</p>
      <p className="mt-5 text-xs text-white/60">
        Ballpark only — final scope and price are confirmed after we talk.
      </p>
    </div>
  )
}
