import { motion } from 'framer-motion'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { site } from '@/data/site'
import { fadeUp, staggerContainer } from '@/lib/animations'

export function Contact() {
  const downloadResume = () => {
    const link = document.createElement('a')
    link.href = site.resumePath
    link.download = 'Abhishek-Saroj-Resume.pdf'
    link.click()
  }

  return (
    <section id="contact" aria-label="Contact" className="relative content-auto py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent-soft"
          >
            Contact
          </motion.p>
          <AnimatedHeading
            as="h2"
            gradient
            className="font-display text-4xl font-semibold tracking-[-0.05em] md:text-6xl lg:text-7xl"
          >
            Let&apos;s build something meaningful.
          </AnimatedHeading>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-sm leading-relaxed text-foreground-muted md:text-base"
          >
            {site.availability}. Based in {site.location}.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <MagneticButton
            onClick={() => {
              window.location.href = `mailto:${site.email}`
            }}
          >
            Email
          </MagneticButton>
          <MagneticButton
            variant="secondary"
            onClick={() => window.open(site.linkedin, '_blank', 'noopener,noreferrer')}
          >
            LinkedIn
          </MagneticButton>
          <MagneticButton
            variant="secondary"
            onClick={() => window.open(site.github, '_blank', 'noopener,noreferrer')}
          >
            Github
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={downloadResume}>
            Resume
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
