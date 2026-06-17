import { Button } from '@/components/ui/button'
import { CATEGORIES, type Category } from '@/lib/types'
import { cn } from '@/lib/utils'

export type FilterValue = Category | 'all'

export function CategoryFilter({
  value, onChange,
}: { value: FilterValue; onChange: (v: FilterValue) => void }) {
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
            aria-pressed={active}
            className={cn(
              'font-medium',
              !active && 'border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground',
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
