import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { easeOutExpo } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type PageTransitionProps = {
  children: ReactNode
  ready?: boolean
}

export function PageTransition({ children, ready = true }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      animate={
        ready
          ? { opacity: 1, y: 0 }
          : prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 18 }
      }
      transition={{ duration: 0.75, ease: easeOutExpo, delay: ready ? 0.05 : 0 }}
    >
      {children}
    </motion.div>
  )
}
