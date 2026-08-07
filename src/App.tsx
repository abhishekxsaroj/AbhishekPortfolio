import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { Navigation } from '@/components/layout/Navigation'
import { SiteWatermark } from '@/components/layout/SiteWatermark'
import { IdlePrefetch } from '@/components/providers/IdlePrefetch'
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
    // Safety net so content never stays invisible if the loader stalls
    const timer = window.setTimeout(() => setReady(true), 2500)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (location.pathname === '/projects') {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [location.pathname])

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
      <IdlePrefetch />
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
