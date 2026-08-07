import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type ScrollToOptions = {
  offset?: number
  immediate?: boolean
}

type SmoothScrollContextValue = {
  scrollTo: (target: string | number | HTMLElement, options?: ScrollToOptions) => void
  stop: () => void
  start: () => void
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null)

const fallbackScroll: SmoothScrollContextValue = {
  scrollTo: (target, options) => {
    if (target === 0 || target === 'top' || target === '#top') {
      window.scrollTo({ top: 0, behavior: options?.immediate ? 'auto' : 'smooth' })
      return
    }

    const offset = options?.offset ?? -88
    const element =
      typeof target === 'string' ? document.querySelector(target) : target
    if (!(element instanceof HTMLElement)) return
    const top = element.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: options?.immediate ? 'auto' : 'smooth' })
  },
  stop: () => {},
  start: () => {},
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext) ?? fallbackScroll
}

type SmoothScrollProviderProps = {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const prefersReducedMotion = useReducedMotion()
  const lenisRef = useRef<Lenis | null>(null)

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: ScrollToOptions) => {
      const offset = options?.offset ?? -88
      const immediate = options?.immediate ?? prefersReducedMotion

      if (target === 0 || target === 'top' || target === '#top') {
        const lenis = lenisRef.current
        if (lenis) {
          lenis.start()
          lenis.scrollTo(0, { immediate, duration: immediate ? 0 : 1.15 })
        }
        window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
        return
      }

      const run = (attempts = 0) => {
        const element =
          typeof target === 'string' ? document.querySelector(target) : target

        if (!(element instanceof HTMLElement)) {
          if (attempts < 40) window.setTimeout(() => run(attempts + 1), 50)
          return
        }

        const lenis = lenisRef.current
        if (lenis) {
          lenis.start()
          lenis.scrollTo(element, {
            offset,
            immediate,
            duration: immediate ? 0 : 1.15,
          })
          return
        }

        const top = element.getBoundingClientRect().top + window.scrollY + offset
        window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' })
      }

      run()
    },
    [prefersReducedMotion],
  )

  const stop = useCallback(() => {
    lenisRef.current?.stop()
  }, [])

  const start = useCallback(() => {
    lenisRef.current?.start()
  }, [])

  useEffect(() => {
    if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      lenisRef.current = null
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    lenisRef.current = lenis

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    return () => {
      cancelAnimationFrame(frame)
      lenisRef.current = null
      lenis.destroy()
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [prefersReducedMotion])

  const value = useMemo(
    () => ({
      scrollTo,
      stop,
      start,
    }),
    [scrollTo, stop, start],
  )

  return (
    <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>
  )
}
