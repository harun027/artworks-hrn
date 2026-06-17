import type { ProjectResult } from '@/lib/types'

export function ResultsRow({ results }: { results: ProjectResult[] }) {
  if (results.length === 0) return null
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {results.map((r) => (
        <div key={r.label} className="rounded-2xl bg-secondary p-5 text-center">
          <div className="font-display text-2xl font-extrabold text-foreground">{r.value}</div>
          <div className="mt-1 text-sm text-muted-foreground">{r.label}</div>
        </div>
      ))}
    </div>
  )
}
