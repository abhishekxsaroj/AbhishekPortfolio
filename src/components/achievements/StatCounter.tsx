import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

type StatCounterProps = {
  value: number
  suffix?: string
  label: string
}

export function StatCounter({ value, suffix = '', label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 70, damping: 20, mass: 0.4 })
  const displayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!inView) return
    motionValue.set(0)
    const frame = requestAnimationFrame(() => motionValue.set(value))
    return () => cancelAnimationFrame(frame)
  }, [inView, motionValue, value])

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${Math.round(latest)}${suffix}`
      }
    })
    return unsubscribe
  }, [spring, suffix])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-[1.2rem] px-3 py-4 text-center sm:px-4 sm:py-5"
    >
      <p className="font-display text-3xl tracking-[-0.04em] text-foreground sm:text-4xl md:text-5xl">
        <span ref={displayRef}>{`0${suffix}`}</span>
      </p>
      <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-foreground-muted sm:mt-3 sm:text-xs sm:tracking-[0.18em]">
        {label}
      </p>
    </motion.div>
  )
}
