import { DraggableFloat } from '@/components/hero/DraggableFloat'
import { HeroSkillLogos } from '@/components/hero/HeroSkillLogos'
import { RoleRotator } from '@/components/hero/RoleRotator'
import { ScrollIndicator } from '@/components/layout/ScrollIndicator'
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { site } from '@/data/site'

const headline = 'I build fast, modern and memorable web experiences.'

type HeroProps = {
  ready?: boolean
}

export function Hero({ ready = true }: HeroProps) {
  const { scrollTo } = useSmoothScroll()
  let letterIndex = 0

  return (
    <section
      id="top"
      aria-label="Hero"
      className="relative flex min-h-[75dvh] items-center overflow-x-clip pb-16 pt-24 md:min-h-dvh md:pb-24 md:pt-28"
    >
      <HeroSkillLogos active={ready} />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <div className="mb-6">
            <DraggableFloat
              label="role"
              active={ready}
              dropIn
              dropDelay={0.08}
              dropDistance={64}
            >
              <RoleRotator />
            </DraggableFloat>
          </div>

          <h1 className="font-display text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.05em] text-balance sm:text-5xl md:text-6xl lg:text-[4.35rem]">
            {headline.split(' ').map((word, wordIndex) => {
              const isGradient =
                word === 'memorable' || word === 'experiences.'

              return (
                <span
                  key={`${word}-${wordIndex}`}
                  className="mr-[0.22em] inline-block last:mr-0 sm:mr-[0.28em]"
                >
                  {word.split('').map((letter) => {
                    const delay = 0.14 + letterIndex * 0.028
                    letterIndex += 1

                    return (
                      <DraggableFloat
                        key={`${wordIndex}-${letterIndex}`}
                        label={letter}
                        active={ready}
                        dropIn
                        dropDelay={delay}
                        dropDistance={80 + (letterIndex % 4) * 8}
                      >
                        <span
                          className={`inline-block ${isGradient ? 'text-gradient' : ''}`}
                        >
                          {letter}
                        </span>
                      </DraggableFloat>
                    )
                  })}
                </span>
              )
            })}
          </h1>

          <div className="mt-7 max-w-xl">
            <DraggableFloat
              label="description"
              className="block w-full"
              active={ready}
              dropIn
              dropDelay={0.55}
              dropDistance={70}
            >
              <p className="text-base leading-relaxed text-foreground-muted md:text-lg">
                I combine modern web technologies with thoughtful design to build responsive,
                high-performance digital experiences — products that feel fast, clear, and intentional.
              </p>
            </DraggableFloat>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <DraggableFloat
              label="View My Work"
              active={ready}
              dropIn
              dropDelay={0.68}
              dropDistance={60}
            >
              <MagneticButton onClick={() => scrollTo('#work')}>View My Work</MagneticButton>
            </DraggableFloat>
            <DraggableFloat
              label="Download Resume"
              active={ready}
              dropIn
              dropDelay={0.76}
              dropDistance={60}
            >
              <MagneticButton
                variant="secondary"
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = site.resumePath
                  link.download = 'Abhishek-Saroj-Resume.pdf'
                  link.click()
                }}
              >
                Download Resume
              </MagneticButton>
            </DraggableFloat>
          </div>

          <div className="mt-7">
            <DraggableFloat
              label="Explore creative side"
              active={ready}
              dropIn
              dropDelay={0.86}
              dropDistance={50}
            >
              <button
                type="button"
                onClick={() => scrollTo('#creative')}
                className="group inline-flex items-center gap-2 text-sm text-foreground-subtle transition-colors hover:text-foreground"
              >
                Explore My Creative Side
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </DraggableFloat>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center md:bottom-8">
        <DraggableFloat
          label="Scroll indicator"
          active={ready}
          dropIn
          dropDelay={0.95}
          dropDistance={40}
        >
          <ScrollIndicator href="#about" label="Scroll" />
        </DraggableFloat>
      </div>
    </section>
  )
}
