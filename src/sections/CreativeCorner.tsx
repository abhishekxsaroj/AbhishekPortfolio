import { motion } from 'framer-motion'
import { LazyImage } from '@/components/ui/LazyImage'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { creativePreview } from '@/data/creativePreview'
import { site } from '@/data/site'
import { fadeUp } from '@/lib/animations'

export function CreativeCorner() {
  return (
    <section id="creative" aria-label="Beyond Development" className="relative content-auto py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="mx-auto mb-8 max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent-soft">
            Creative Corner
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
            Beyond Development
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted md:text-base">
            Alongside development, I enjoy exploring graphic design, social media content and video
            creation as a creative hobby.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2.5 sm:grid-cols-4 md:gap-3">
          {creativePreview.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-[1rem] border border-white/8"
            >
              <LazyImage
                src={item.src}
                alt={item.alt}
                className="aspect-square"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex justify-center"
        >
          <MagneticButton
            onClick={() =>
              window.open(site.creativePortfolio, '_blank', 'noopener,noreferrer')
            }
            className="group"
          >
            Open Creative Portfolio
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
