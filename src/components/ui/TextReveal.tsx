import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { easeOutExpo, viewportOnce } from '@/lib/animations'
import { cn } from '@/lib/utils'

type TextRevealProps = {
  children: string
  as?: 'p' | 'h2' | 'h3' | 'span'
  className?: string
  delay?: number
}

export function TextReveal({
  children,
  as = 'p',
  className,
  delay = 0,
}: TextRevealProps) {
  const Tag = motion[as]
  const words = children.split(' ')

  return (
    <Tag
      className={cn('text-balance', className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.035, delayChildren: delay },
        },
      }}
      aria-label={children}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.12em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: {
                y: '0%',
                opacity: 1,
                transition: { duration: 0.55, ease: easeOutExpo },
              },
            }}
          >
            {word}
            {index < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

type FadeRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function FadeReveal({ children, className, delay = 0 }: FadeRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.65, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  )
}
