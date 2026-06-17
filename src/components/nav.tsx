import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function Nav() {
  return (
    <header className="sticky top-4 z-50 px-4">
      <nav
        aria-label="Main"
        className="panel-dark mx-auto flex max-w-6xl items-center justify-between rounded-full py-2.5 pl-6 pr-2.5 shadow-xl"
      >
        <Link to="/" className="font-display text-lg font-extrabold tracking-tight text-white">
          HRN<span className="text-white/40">.</span>
        </Link>
        <div className="flex items-center gap-1 text-sm font-medium">
          <Link
            to="/work"
            className="rounded-full px-4 py-2 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            Work
          </Link>
          <Button asChild size="sm" className="rounded-full bg-white px-5 font-semibold text-ink hover:bg-white/90">
            <Link to="/estimate">Start a project</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
