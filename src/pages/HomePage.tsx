import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '@/sections/Hero'

const About = lazy(() =>
  import('@/sections/About').then((module) => ({ default: module.About })),
)
const FeaturedProjects = lazy(() =>
  import('@/sections/FeaturedProjects').then((module) => ({
    default: module.FeaturedProjects,
  })),
)
const TechStack = lazy(() =>
  import('@/sections/TechStack').then((module) => ({ default: module.TechStack })),
)
const Playground = lazy(() =>
  import('@/sections/Playground').then((module) => ({ default: module.Playground })),
)
const Experience = lazy(() =>
  import('@/sections/Experience').then((module) => ({ default: module.Experience })),
)
const Process = lazy(() =>
  import('@/sections/Process').then((module) => ({ default: module.Process })),
)
const Achievements = lazy(() =>
  import('@/sections/Achievements').then((module) => ({ default: module.Achievements })),
)
const CreativeCorner = lazy(() =>
  import('@/sections/CreativeCorner').then((module) => ({
    default: module.CreativeCorner,
  })),
)
const Contact = lazy(() =>
  import('@/sections/Contact').then((module) => ({ default: module.Contact })),
)

function SectionFallback() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32"
    >
      <div className="h-40 animate-pulse rounded-[var(--radius-xl)] border border-border bg-white/[0.02]" />
    </div>
  )
}

type HomePageProps = {
  ready: boolean
}

export function HomePage({ ready }: HomePageProps) {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash

    const tryScroll = (attempts = 0) => {
      const target = document.querySelector(id)
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (attempts < 24) window.setTimeout(() => tryScroll(attempts + 1), 50)
    }

    tryScroll()
  }, [location.hash, location.pathname])

  return (
    <main id="main" className="relative">
      <Hero ready={ready} />

      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FeaturedProjects />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TechStack />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Playground />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Process />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Achievements />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CreativeCorner />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </main>
  )
}
