import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/$')({ component: NotFound })

function NotFound() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
      <p className="font-display text-6xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">That page does not exist or has moved.</p>
      <Button asChild className="mt-6 gradient-accent text-white"><Link to="/">Back home</Link></Button>
    </main>
  )
}
