import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()
  const value = useMotionValue(0)
  const scaleX = useSpring(value, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
    restDelta: 0.001,
  })

  useEffect(() => {
    value.set(progress)
  }, [progress, value])

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] bg-transparent"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-accent via-accent-soft to-accent"
        style={{ scaleX }}
      />
    </div>
  )
}
