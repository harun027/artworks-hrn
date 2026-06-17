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
      {options.map((o) => (
        <Button
          key={o.value}
          type="button"
          variant={value === o.value ? 'default' : 'outline'}
          size="sm"
          className={cn('rounded-full', value === o.value && 'gradient-accent text-white')}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </Button>
      ))}
    </div>
  )
}
