import { Button } from '@/components/ui/button'
import { CATEGORIES, type Category } from '@/lib/types'
import { cn } from '@/lib/utils'

export type FilterValue = Category | 'all'

export function CategoryFilter({
  value, onChange, tone = 'light',
}: { value: FilterValue; onChange: (v: FilterValue) => void; tone?: 'light' | 'dark' }) {
  const options: { value: FilterValue; label: string }[] = [
    { value: 'all', label: 'All' }, ...CATEGORIES,
  ]
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o.value
        return (
          <Button
            key={o.value}
            type="button"
            variant={active ? 'default' : 'outline'}
            size="sm"
            className={cn(
              'rounded-full font-medium',
              tone === 'dark'
                ? active
                  ? 'bg-white text-ink hover:bg-white/90'
                  : 'border-white/20 bg-transparent text-white/60 hover:bg-white/10 hover:text-white'
                : active
                  ? 'bg-ink text-ink-foreground hover:bg-ink/90'
                  : 'border-border bg-transparent text-muted-foreground hover:text-foreground',
            )}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </Button>
        )
      })}
    </div>
  )
}
