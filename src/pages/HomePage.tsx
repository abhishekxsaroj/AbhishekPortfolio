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
    if (!location.hash) return
    const id = location.hash
    window.setTimeout(() => scrollTo(id, { offset: -88 }), 80)
  }, [location.hash, location.pathname, scrollTo])

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
