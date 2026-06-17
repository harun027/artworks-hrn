import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function Nav() {
  return (
    <header className="sticky top-0 z-50 glass">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-xl font-extrabold tracking-tight">
          HRN<span className="text-primary">.</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/work" className="hover:text-primary">Work</Link>
          <Button asChild size="sm" className="gradient-accent text-white">
            <Link to="/estimate">Start a project</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
