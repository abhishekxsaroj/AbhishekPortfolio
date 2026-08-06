import { useEffect, useRef, useState } from 'react'

type Options = {
  rootMargin?: string
  threshold?: number
}

/** Lightweight IntersectionObserver — prefer over continuous scroll listeners. */
export function useInViewOnce<T extends HTMLElement>(options: Options = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: options.rootMargin ?? '120px 0px',
        threshold: options.threshold ?? 0.01,
      },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [inView, options.rootMargin, options.threshold])

  return { ref, inView }
}
