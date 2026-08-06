import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

export function AnimatedCursor() {
  const prefersReducedMotion = useReducedMotion()
  const isFinePointer = useMediaQuery('(pointer: fine)')
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [suppressed, setSuppressed] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 420, damping: 28, mass: 0.35 })
  const springY = useSpring(y, { stiffness: 420, damping: 28, mass: 0.35 })

  const enabled = isFinePointer && !prefersReducedMotion

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('has-custom-cursor')
      document.documentElement.classList.remove('custom-cursor-suppressed')
      return
    }

    document.documentElement.classList.add('has-custom-cursor')

    const isSuppressedTarget = (target: EventTarget | null) => {
      const el = target as HTMLElement | null
      return Boolean(el?.closest('[data-no-custom-cursor]'))
    }

    const onMove = (event: MouseEvent) => {
      const nextSuppressed = isSuppressedTarget(event.target)
      setSuppressed(nextSuppressed)
      document.documentElement.classList.toggle('custom-cursor-suppressed', nextSuppressed)

      if (nextSuppressed) {
        setVisible(false)
        return
      }

      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
    }

    const onLeave = () => {
      setVisible(false)
      setSuppressed(false)
      document.documentElement.classList.remove('custom-cursor-suppressed')
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (isSuppressedTarget(target)) {
        setHovering(false)
        return
      }
      const interactive = target?.closest(
        'a, button, [role="button"], input, textarea, select, label',
      )
      setHovering(Boolean(interactive))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      document.documentElement.classList.remove('custom-cursor-suppressed')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{
        x: springX,
        y: springY,
      }}
    >
      <motion.div
        className={cn(
          'rounded-full border border-white/80',
          hovering ? 'bg-accent/30' : 'bg-white/10',
        )}
        animate={{
          width: hovering ? 44 : pressed ? 14 : 18,
          height: hovering ? 44 : pressed ? 14 : 18,
          opacity: visible && !suppressed ? 1 : 0,
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  )
}
