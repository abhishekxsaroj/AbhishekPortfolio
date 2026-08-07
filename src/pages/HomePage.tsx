import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider'
import { About } from '@/sections/About'
import { Achievements } from '@/sections/Achievements'
import { Contact } from '@/sections/Contact'
import { CreativeCorner } from '@/sections/CreativeCorner'
import { Experience } from '@/sections/Experience'
import { FeaturedProjects } from '@/sections/FeaturedProjects'
import { Hero } from '@/sections/Hero'
import { Playground } from '@/sections/Playground'
import { Process } from '@/sections/Process'
import { TechStack } from '@/sections/TechStack'

type HomePageProps = {
  ready: boolean
}

export function HomePage({ ready }: HomePageProps) {
  const location = useLocation()
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash
      // Wait for layout/fonts so section positions are correct on mobile
      const timer = window.setTimeout(() => scrollTo(id, { offset: -88 }), 120)
      return () => window.clearTimeout(timer)
    }

    // Fresh home visits (refresh, logo, back to "/") always start at the hero
    scrollTo(0, { immediate: true })
    return undefined
  }, [location.hash, location.pathname, location.key, scrollTo])

  return (
    <main id="main" className="relative">
      <Hero ready={ready} />
      <About />
      <FeaturedProjects />
      <TechStack />
      <Playground />
      <Experience />
      <Process />
      <Achievements />
      <CreativeCorner />
      <Contact />
    </main>
  )
}
