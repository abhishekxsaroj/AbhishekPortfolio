import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { useScrolled } from '@/hooks/useScrollProgress'
import { cn } from '@/lib/utils'

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
  const [portalReady, setPortalReady] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollTo, stop, start } = useSmoothScroll()

  useEffect(() => {
    setPortalReady(true)
  }, [])

  // Never leave the mobile drawer open on desktop widths
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (media.matches) setOpen(false)
    }
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) {
      start()
      return
    }

    stop()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      start()
    }
  }, [open, start, stop])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const goToSection = (hash: string) => {
    setOpen(false)

    const runScroll = () => {
      scrollTo(hash, { offset: -88 })
    }

    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: hash.replace('#', '') })
      window.setTimeout(runScroll, 120)
      return
    }

    window.setTimeout(runScroll, 60)
  }

  const mobileMenu =
    portalReady &&
    createPortal(
      <AnimatePresence mode="sync">
        {open ? (
          <motion.div
            key="mobile-nav-overlay"
            className="fixed inset-0 z-[200] lg:hidden"
            data-no-custom-cursor
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-0 px-4 pt-[max(4.75rem,calc(env(safe-area-inset-top)+3.75rem))]"
            >
              {/* Higher opacity only while the drawer is open */}
              <div className="rounded-[1.25rem] border border-white/20 bg-[rgb(10_10_12_/_0.82)] p-3 shadow-[0_20px_50px_rgb(0_0_0_/_0.45)] backdrop-blur-2xl backdrop-saturate-150">
                <ul className="flex flex-col gap-0.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <button
                        type="button"
                        onClick={() => goToSection(link.href)}
                        className="flex w-full items-center rounded-[0.9rem] px-4 py-3.5 text-left text-[0.95rem] font-medium text-foreground transition-colors hover:bg-white/[0.08] active:bg-white/[0.12]"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                  <li>
                    <Link
                      to="/projects"
                      onClick={() => setOpen(false)}
                      className="flex w-full items-center rounded-[0.9rem] px-4 py-3.5 text-[0.95rem] font-medium text-accent-soft transition-colors hover:bg-white/[0.08] active:bg-white/[0.12]"
                    >
                      See all projects
                    </Link>
                  </li>
                </ul>

                <div className="mt-2 border-t border-white/12 pt-3">
                  <button
                    type="button"
                    onClick={() => goToSection('#contact')}
                    className="flex w-full items-center justify-center rounded-full bg-accent px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-soft active:bg-accent-dim"
                  >
                    Let&apos;s talk
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    )

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn('fixed inset-x-0 top-0', open ? 'z-[210]' : 'z-[100]')}
      >
        <div className="mx-auto max-w-6xl px-5 pt-[max(1rem,env(safe-area-inset-top))] md:px-8">
          <nav
            aria-label="Primary"
            className={cn(
              'flex items-center justify-between rounded-full px-4 py-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 md:px-5',
              // Light transparent glass — never a solid black bar
              scrolled
                ? 'border border-white/12 bg-white/[0.045] shadow-[0_8px_28px_rgb(0_0_0_/_0.18)] backdrop-blur-xl backdrop-saturate-150'
                : 'border border-transparent bg-transparent',
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
                    onClick={(event) => {
                      event.preventDefault()
                      goToSection(link.href)
                    }}
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md lg:hidden"
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
        </div>
      </motion.header>

      {mobileMenu}
    </>
  )
}
