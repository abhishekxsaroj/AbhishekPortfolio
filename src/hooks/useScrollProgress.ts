import { useEffect, useState } from 'react'

/** Boolean scroll threshold — avoids re-rendering on every pixel. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.scrollY > threshold
  })

  useEffect(() => {
    let frame = 0

    const update = () => {
      setScrolled((prev) => {
        const next = window.scrollY > threshold
        return prev === next ? prev : next
      })
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [threshold])

  return scrolled
}

/** 0–1 document scroll progress, rAF-throttled. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const next = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      setProgress((prev) => (Math.abs(prev - next) < 0.001 ? prev : next))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}
