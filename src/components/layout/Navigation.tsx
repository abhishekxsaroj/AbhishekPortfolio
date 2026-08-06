import { motion } from 'framer-motion'
import { useState, type MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useScrolled } from '@/hooks/useScrollProgress'
import { cn } from '@/lib/utils'
import { MagneticButton } from '@/components/ui/MagneticButton'

const links = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Projects' },
  { href: '#skills', label: 'Stack' },
  { href: '#playground', label: 'Playground' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
] as const

export function Navigation() {
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const goToSection = (hash: string) => {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: hash.replace('#', '') })
      return
    }
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault()
    goToSection(href)
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-6xl px-5 pt-[max(1rem,env(safe-area-inset-top))] md:px-8">
        <nav
          aria-label="Primary"
          className={cn(
            'flex items-center justify-between rounded-full px-4 py-3 transition-all duration-500 md:px-5',
            scrolled
              ? 'glass-strong shadow-[0_10px_40px_rgb(0_0_0_/_0.35)]'
              : 'bg-transparent',
          )}
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="font-display text-sm font-semibold tracking-[-0.04em] text-foreground md:text-base"
          >
            Abhishek
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={location.pathname === '/' ? link.href : `/${link.href}`}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className="rounded-full px-3 py-2 text-sm text-foreground-muted transition-colors duration-300 hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <MagneticButton
              variant="secondary"
              className="!px-4 !py-2 text-xs"
              onClick={() => goToSection('#contact')}
            >
              Let&apos;s talk
            </MagneticButton>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-3.5 w-4">
              <span
                className={cn(
                  'absolute left-0 h-px w-full bg-foreground transition-all duration-300',
                  open ? 'top-1/2 rotate-45' : 'top-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-foreground transition-opacity duration-300',
                  open && 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 h-px w-full bg-foreground transition-all duration-300',
                  open ? 'top-1/2 -rotate-45' : 'bottom-0',
                )}
              />
            </span>
          </button>
        </nav>

        <motion.div
          id="mobile-nav"
          initial={false}
          animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden lg:hidden"
        >
          <div className="glass-strong mt-2 rounded-[var(--radius-xl)] p-4">
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={location.pathname === '/' ? link.href : `/${link.href}`}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className="block rounded-[var(--radius-md)] px-3 py-3 text-sm text-foreground-muted transition-colors hover:bg-white/[0.03] hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/projects"
                  onClick={() => setOpen(false)}
                  className="block rounded-[var(--radius-md)] px-3 py-3 text-sm text-accent-soft transition-colors hover:bg-white/[0.03]"
                >
                  See all projects
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}
