import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, viewportOnce } from '@/lib/animations'
import { cn } from '@/lib/utils'

type GlassCardProps = {
  children: ReactNode
  className?: string
  strong?: boolean
  animate?: boolean
}

export function GlassCard({
  children,
  className,
  strong = false,
  animate = true,
}: GlassCardProps) {
  return (
    <motion.div
      variants={animate ? fadeUp : undefined}
      initial={animate ? 'hidden' : undefined}
      whileInView={animate ? 'visible' : undefined}
      viewport={animate ? viewportOnce : undefined}
      className={cn(
        'rounded-[var(--radius-xl)] p-6 md:p-8',
        strong ? 'glass-strong' : 'glass',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
