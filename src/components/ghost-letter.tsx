import { cn } from '@/lib/utils'

/**
 * A giant ghosted background letter — the editorial "watermark" treatment.
 * Purely decorative; positioned by the caller via className.
 */
export function GhostLetter({ char, className }: { char: string; className?: string }) {
  return (
    <span aria-hidden="true" className={cn('ghost-letter absolute', className)}>
      {char.charAt(0).toUpperCase()}
    </span>
  )
}
