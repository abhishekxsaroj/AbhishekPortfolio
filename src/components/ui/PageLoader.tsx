import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type PageLoaderProps = {
  onDone?: () => void
}

export function PageLoader({ onDone }: PageLoaderProps) {
  const [visible, setVisible] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const minTime = prefersReducedMotion ? 200 : 1100
    const start = performance.now()

    const finish = () => {
      const elapsed = performance.now() - start
      const wait = Math.max(0, minTime - elapsed)
      window.setTimeout(() => {
        setVisible(false)
        onDone?.()
      }, wait)
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    return () => window.removeEventListener('load', finish)
  }, [onDone, prefersReducedMotion])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          aria-busy="true"
          aria-label="Loading experience"
        >
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              className="relative h-16 w-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
            >
              <span className="absolute inset-0 rounded-full border border-white/10" />
              <motion.span
                className="absolute inset-0 rounded-full border border-transparent border-t-accent border-r-accent/40"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
              />
              <span className="absolute inset-[6px] rounded-full bg-gradient-to-br from-accent/25 to-transparent" />
            </motion.div>
            <motion.p
              className="font-display text-sm tracking-[0.28em] text-foreground-muted uppercase"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
            >
              Abhishek
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
