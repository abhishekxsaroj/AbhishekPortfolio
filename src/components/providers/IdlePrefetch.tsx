import { useEffect } from 'react'

/**
 * Warms likely-needed route chunks during browser idle time.
 * No UI changes — only faster subsequent navigation.
 */
export function IdlePrefetch() {
  useEffect(() => {
    const warm = () => {
      void import('@/sections/Playground')
      void import('@/sections/CreativeCorner')
      void import('@/sections/FeaturedProjects')
      void import('@/sections/Experience')
    }

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(warm, { timeout: 4000 })
      return () => window.cancelIdleCallback(id)
    }

    const timer = window.setTimeout(warm, 1800)
    return () => window.clearTimeout(timer)
  }, [])

  return null
}
