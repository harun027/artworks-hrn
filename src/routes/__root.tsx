import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { NotFound } from '@/components/not-found'
import { Toaster } from '@/components/ui/sonner'
import { seo } from '@/lib/seo'
import appCss from '../styles.css?url'

// Single instance is fine for a prerendered/mutation-only app.
// Move inside a per-request provider if SSR with user-specific queries is added.
const queryClient = new QueryClient()

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...seo({
        title: 'HRN — Selected Work',
        description: 'Case studies and a quick project estimate.',
      }),
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
})

// Set the theme class before first paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var e=localStorage.getItem('theme')||'dark';var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=e==='dark'||(e==='system'&&m);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange storageKey="theme">
          <QueryClientProvider client={queryClient}>
            <Nav />
            {children}
            <Footer />
            <Toaster />
          </QueryClientProvider>
        </ThemeProvider>
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
