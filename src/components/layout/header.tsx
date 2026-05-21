import { useEffect, useState } from 'react'

const links = [
  { label: 'Inicio', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 transition-all duration-500`}
    >
      <div
        className={`mx-auto flex h-11 w-full items-center rounded-2xl border px-5 transition-all duration-500 ${
          scrolled
            ? 'border-card-border/50 bg-background/70 shadow-lg shadow-black/20 backdrop-blur-2xl'
            : 'border-card-border/20 bg-background/40 shadow-sm shadow-black/10 backdrop-blur-sm'
        }`}
      >
        <a
          href="/"
          className="font-geist-mono text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          DevInspector<span className="text-primary">AI</span>
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-1 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm text-muted transition-all duration-200 hover:bg-primary/10 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="/dashboard"
          className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-medium text-primary-foreground shadow-sm shadow-primary/30 transition-all duration-200 hover:opacity-90 hover:shadow-md hover:shadow-primary/40"
        >
          Auditar ahora
          <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </header>
  )
}
