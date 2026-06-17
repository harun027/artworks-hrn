import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <Link to="/" className="font-display text-lg font-bold tracking-tight">
          HRN<span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-1.5">
          <Link
            to="/work"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: 'text-foreground' }}
          >
            Work
          </Link>
          <ThemeToggle />
          <Button asChild size="sm" className="ml-1 font-medium">
            <Link to="/estimate">Start a project</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
