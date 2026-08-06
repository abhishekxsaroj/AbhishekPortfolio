import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { memo, useEffect, useMemo } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type GradientBackgroundProps = {
  className?: string
  particleCount?: number
}

type Particle = {
  id: number
  left: string
  top: string
  size: number
  delay: string
  duration: string
  opacity: number
}

function GradientBackgroundComponent({
  className,
  particleCount = 12,
}: GradientBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()

  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(35)
  const springX = useSpring(mouseX, { stiffness: 55, damping: 22, mass: 0.45 })
  const springY = useSpring(mouseY, { stiffness: 55, damping: 22, mass: 0.45 })
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${springX}% ${springY}%, rgb(255 107 44 / 0.2), transparent 55%)`

  useEffect(() => {
    if (prefersReducedMotion) return

    const onMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100
      const y = (event.clientY / window.innerHeight) * 100
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY, prefersReducedMotion])

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: particleCount }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        top: `${(index * 53) % 100}%`,
        size: 1.5 + (index % 3) * 0.7,
        delay: `${(index % 7) * 0.4}s`,
        duration: `${10 + (index % 4) * 2.2}s`,
        opacity: 0.14 + (index % 3) * 0.05,
      })),
    [particleCount],
  )

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-0 -z-10 overflow-hidden',
        className,
      )}
    >
      <div className="absolute inset-0 bg-canvas" />

      {/* Soft base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-15%,rgb(255_107_44_/_0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_42%,rgb(255_107_44_/_0.05),transparent_34%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_68%,rgb(188_24_136_/_0.05),transparent_32%)]" />

      {/* Cursor-following spotlight (same feel as hero) */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0"
          style={{ background: spotlight }}
        />
      )}

      {/* Drifting gradient blobs */}
      {!prefersReducedMotion && (
        <>
          <div className="ambient-blob absolute -left-[18%] top-[8%] h-[52vmax] w-[52vmax] rounded-full bg-[radial-gradient(circle,rgb(255_107_44_/_0.16),transparent_65%)] blur-3xl" />
          <div className="ambient-blob ambient-blob-b absolute -right-[14%] top-[34%] h-[44vmax] w-[44vmax] rounded-full bg-[radial-gradient(circle,rgb(255_138_76_/_0.11),transparent_65%)] blur-3xl" />
          <div className="ambient-blob ambient-blob-c absolute bottom-[-12%] left-[28%] h-[38vmax] w-[38vmax] rounded-full bg-[radial-gradient(circle,rgb(188_24_136_/_0.1),transparent_70%)] blur-3xl" />
        </>
      )}

      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgb(255_255_255_/_0.55)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_0.55)_1px,transparent_1px)] [background-size:80px_80px]" />

      {!prefersReducedMotion &&
        particles.map((particle) => (
          <span
            key={particle.id}
            className="ambient-particle absolute rounded-full bg-accent-soft will-change-transform"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
    </div>
  )
}

export const GradientBackground = memo(GradientBackgroundComponent)
