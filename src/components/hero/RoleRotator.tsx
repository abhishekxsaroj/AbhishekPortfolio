import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const roles = [
  'Front-End Developer',
  'Web Developer',
  'React Developer',
  'Creative Technologist',
] as const

export function RoleRotator() {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % roles.length)
    }, 2600)
    return () => window.clearInterval(timer)
  }, [prefersReducedMotion])

  const active = roles[prefersReducedMotion ? 0 : index]

  return (
    <div
      className="relative h-7 overflow-hidden text-sm tracking-[0.04em] text-accent-soft md:h-8 md:text-base"
      aria-live="polite"
    >
      <span className="invisible whitespace-nowrap" aria-hidden>
        Creative Technologist
      </span>
      <AnimatePresence mode="wait">
        <motion.p
          key={active}
          initial={prefersReducedMotion ? false : { y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { y: -18, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 top-0"
        >
          {active}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
