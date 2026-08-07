import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { Navigation } from '@/components/layout/Navigation'
import { SiteWatermark } from '@/components/layout/SiteWatermark'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { AnimatedCursor } from '@/components/ui/AnimatedCursor'
import { GradientBackground } from '@/components/ui/GradientBackground'
import { PageLoader } from '@/components/ui/PageLoader'
import { PageTransition } from '@/components/ui/PageTransition'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { HomePage } from '@/pages/HomePage'
import { ProjectsPage } from '@/pages/ProjectsPage'

export default function App() {
  const [ready, setReady] = useState(false)
  const location = useLocation()
  const handleLoaderDone = useCallback(() => setReady(true), [])

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 2500)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Reset scroll on route changes. Home with a hash is handled in HomePage.
    if (location.pathname === '/projects') {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    if (location.pathname === '/' && !location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [location.pathname, location.hash, location.key])

  return (
    <SmoothScrollProvider>
      <PageLoader onDone={handleLoaderDone} />
      <ScrollProgress />

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <GradientBackground />
      <AnimatedCursor />
      <SiteWatermark />
      <Navigation />

      <PageTransition ready={ready}>
        <Routes>
          <Route path="/" element={<HomePage ready={ready} />} />
          <Route
            path="/projects"
            element={
              <main id="main" className="relative">
                <ProjectsPage />
              </main>
            }
          />
        </Routes>

        <Footer />
      </PageTransition>
    </SmoothScrollProvider>
  )
}
