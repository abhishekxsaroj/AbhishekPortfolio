import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { revealMask, staggerContainer, staggerItem, viewportOnce } from '@/lib/animations'
import { cn } from '@/lib/utils'

type AnimatedHeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  children: ReactNode
  className?: string
  gradient?: boolean
  split?: boolean
}

const headingMap = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
} as const

export function AnimatedHeading({
  as = 'h2',
  children,
  className,
  gradient = false,
  split = false,
}: AnimatedHeadingProps) {
  const Tag = headingMap[as]
  const sharedClassName = cn(
    'text-balance',
    gradient && 'text-gradient',
    className,
  )

  if (split && typeof children === 'string') {
    const words = children.split(' ')

    return (
      <Tag
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className={sharedClassName}
        aria-label={children}
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            variants={staggerItem}
            className="mr-[0.28em] inline-block last:mr-0"
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    )
  }

  return (
    <Tag
      variants={revealMask}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={sharedClassName}
    >
      {children}
    </Tag>
  )
}
