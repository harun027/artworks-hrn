export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>© 2026 HRN. Built with TanStack Start.</p>
        <div className="flex gap-4">
          <a href="mailto:hello@example.com" className="hover:text-primary">Email</a>
          <a href="https://github.com" className="hover:text-primary">GitHub</a>
          <a href="https://linkedin.com" className="hover:text-primary">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
