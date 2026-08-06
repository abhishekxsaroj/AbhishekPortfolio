import type { Transition, Variants } from 'framer-motion'

export const easeOutExpo: Transition['ease'] = [0.16, 1, 0.3, 1]
export const easeInOutSoft: Transition['ease'] = [0.4, 0, 0.2, 1]

/** Keep durations short and avoid heavy filters for 60fps. */
export const transitionSoft: Transition = {
  duration: 0.6,
  ease: easeOutExpo,
}

export const transitionGentle: Transition = {
  duration: 0.75,
  ease: easeOutExpo,
}

export const transitionQuick: Transition = {
  duration: 0.3,
  ease: easeOutExpo,
}

export const viewportOnce = {
  once: true,
  amount: 0.22,
  margin: '0px 0px -6% 0px',
} as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSoft,
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitionSoft,
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitionSoft,
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSoft,
  },
}

export const revealMask: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionGentle,
  },
}
