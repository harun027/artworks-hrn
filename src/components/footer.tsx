import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2">
        <div>
          <p className="font-display text-lg font-bold tracking-tight">
            HRN<span className="text-accent">.</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Websites, mobile apps, SaaS, desktop apps, and dashboards — designed and shipped fast.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm sm:items-end">
          <div className="flex gap-6">
            <Link to="/work" className="text-muted-foreground transition-colors hover:text-foreground">
              Work
            </Link>
            <Link to="/estimate" className="text-muted-foreground transition-colors hover:text-foreground">
              Estimate
            </Link>
          </div>
          <div className="flex gap-6">
            <a href="mailto:hello@example.com" className="text-muted-foreground transition-colors hover:text-foreground">
              Email
            </a>
            <a href="https://github.com" className="text-muted-foreground transition-colors hover:text-foreground">
              GitHub
            </a>
            <a href="https://linkedin.com" className="text-muted-foreground transition-colors hover:text-foreground">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-muted-foreground">
          © 2026 HRN. Built with TanStack Start.
        </p>
      </div>
    </footer>
  )
}
