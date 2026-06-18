import { Check, TrendingUp, Star } from 'lucide-react'

/**
 * Decorative hero showcase: a browser window framing a mini product dashboard,
 * with a couple of floating metric cards. Theme-aware (semantic tokens) and
 * purely presentational.
 */
export function HeroVisual() {
  const bars = [42, 68, 54, 82, 60, 95, 73]
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      {/* Soft accent glow */}
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-linear-to-br from-accent/25 via-accent/5 to-transparent blur-2xl" />

      {/* Browser window */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl card-soft">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <div className="ml-3 flex h-6 flex-1 items-center rounded-md bg-background/80 px-3 text-[11px] font-medium text-muted-foreground">
            hrn.studio/dashboard
          </div>
        </div>

        {/* App body */}
        <div className="grid grid-cols-[56px_1fr] gap-3 p-4">
          {/* Sidebar */}
          <div className="space-y-2.5">
            <div className="h-9 w-9 rounded-xl bg-foreground" />
            <div className="h-2.5 w-9 rounded-full bg-accent/70" />
            <div className="h-2.5 w-7 rounded-full bg-muted-foreground/30" />
            <div className="h-2.5 w-8 rounded-full bg-muted-foreground/30" />
            <div className="h-2.5 w-6 rounded-full bg-muted-foreground/30" />
          </div>

          {/* Main */}
          <div className="space-y-3">
            {/* Stat tiles */}
            <div className="grid grid-cols-3 gap-2">
              <Stat value="1.2s" label="Load" />
              <Stat value="98" label="Score" />
              <Stat value="+24%" label="Conv." accent />
            </div>

            {/* Chart card */}
            <div className="rounded-xl border border-border p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="h-2.5 w-20 rounded-full bg-muted-foreground/30" />
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                  <TrendingUp className="h-3 w-3" strokeWidth={2.5} /> Live
                </span>
              </div>
              <div className="flex h-24 items-end gap-1.5">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-linear-to-t from-accent/40 to-accent"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating: quality score */}
      <div className="absolute -left-6 bottom-8 flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-lg card-soft">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
          <Check className="h-5 w-5" strokeWidth={3} />
        </span>
        <div className="pr-1">
          <p className="text-sm font-bold leading-none">Lighthouse 98</p>
          <p className="mt-1 text-xs text-muted-foreground">Performance</p>
        </div>
      </div>

      {/* Floating: rating */}
      <div className="absolute -right-4 -top-5 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-lg card-soft">
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        <span className="text-sm font-bold">5.0</span>
        <span className="text-xs text-muted-foreground">client rating</span>
      </div>
    </div>
  )
}

function Stat({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="rounded-lg bg-secondary px-2 py-2 text-center">
      <p className={`font-display text-sm font-bold tracking-tight ${accent ? 'text-accent' : 'text-foreground'}`}>
        {value}
      </p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  )
}
