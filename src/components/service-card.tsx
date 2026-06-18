import { Link } from '@tanstack/react-router'
import { ArrowUpRight, type LucideIcon } from 'lucide-react'
import type { Category } from '@/lib/types'
import { cn } from '@/lib/utils'

// Per-category cover gradient used when no cover photo is supplied.
const COVERS: Record<Category, string> = {
  website: 'from-sky-500 to-indigo-600',
  mobile: 'from-violet-500 to-fuchsia-600',
  saas: 'from-emerald-500 to-teal-600',
  dashboard: 'from-amber-500 to-orange-600',
  desktop: 'from-rose-500 to-pink-600',
  other: 'from-slate-600 to-slate-900',
}

export function ServiceCard({
  category, label, tag, icon: Icon, image,
}: {
  category: Category
  label: string
  tag: string
  icon: LucideIcon
  image?: string
}) {
  return (
    <Link
      to="/work"
      search={{ category }}
      aria-label={`${label} — view related work`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-border card-soft transition-shadow duration-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {/* Cover: a photo if provided, otherwise a per-category gradient */}
      {image ? (
        <img
          src={image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className={cn('absolute inset-0 bg-linear-to-br', COVERS[category])} />
      )}

      {/* Large faint icon watermark — only over the plain gradient fallback */}
      {!image && (
        <Icon aria-hidden="true" strokeWidth={1.5} className="absolute -right-3 top-3 h-28 w-28 text-white/15" />
      )}

      {/* Legibility scrim so white text meets contrast */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />

      {/* Content over the cover */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-white">{label}</h3>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
              <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="truncate text-sm font-medium text-white/85">{tag}</span>
          </div>
          <span className="inline-flex h-9 shrink-0 items-center gap-1 rounded-full bg-white/20 px-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors group-hover:bg-white/30">
            Explore <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  )
}
