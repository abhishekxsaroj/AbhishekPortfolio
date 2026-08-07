import { useNavigate } from 'react-router-dom'
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider'
import { site } from '@/data/site'

const links = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Projects' },
  { href: '#skills', label: 'Stack' },
  { href: '#playground', label: 'Playground' },
  { href: '#experience', label: 'Experience' },
  { href: '#creative', label: 'Creative' },
  { href: '#contact', label: 'Contact' },
] as const

export function Footer() {
  const year = new Date().getFullYear()
  const navigate = useNavigate()
  const { scrollTo } = useSmoothScroll()

  const goToSection = (hash: string) => {
    if (window.location.pathname !== '/') {
      navigate({ pathname: '/', hash: hash.replace('#', '') })
      window.setTimeout(() => scrollTo(hash, { offset: -88 }), 120)
      return
    }

    // Scroll without leaving a sticky hash that hijacks the next refresh
    window.history.replaceState(null, '', window.location.pathname)
    scrollTo(hash, { offset: -88 })
  }

  return (
    <footer className="relative border-t border-border/70 pt-12 pb-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-t from-canvas to-transparent"
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 md:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="font-display text-2xl tracking-[-0.04em] text-foreground">
              {site.name}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-foreground-muted">
              Front-end developer building fast, modern web experiences.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground-muted">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault()
                      goToSection(link.href)
                    }}
                    className="transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-border/60 pt-6 text-sm text-foreground-subtle md:flex-row md:items-center">
          <p>
            © {year} {site.fullName}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Github
            </a>
            <a
              href={`mailto:${site.email}`}
              className="transition-colors hover:text-foreground"
            >
              Email
            </a>
            <span className="text-[11px] tracking-[0.14em] uppercase">
              Designed &amp; developed by{' '}
              <span className="text-accent-soft">ABHISHEK</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
