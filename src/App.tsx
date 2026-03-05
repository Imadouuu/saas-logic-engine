import { useEffect, useState, Suspense, lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ROIMetrics } from './hooks/useROICalculator'
import Hero from './components/Hero'
import ServiceMatrix from './components/ServiceMatrix'
import About from './components/About'
import Footer from './components/Footer'
import LeadGenForm from './components/LeadGenForm'
import WhatsAppButton from './components/WhatsAppButton'
import Navigation from './components/Navigation'
import MagneticCursor from './components/MagneticCursor'
import { SkeletonROIEngine } from './components/SkeletonLoaders'
import SystemPulse from './components/SystemPulse'
import CircuitToCodeTransition from './components/CircuitToCodeTransition'
import TerminalVisualEffects from './components/TerminalVisualEffects'
import BackgroundRadialMask from './components/BackgroundRadialMask'
import AIAutomationShowcase from './components/AIAutomationShowcase'

// Lazy load heavy components with code splitting
const InnovationLab = lazy(() => import('./components/InnovationLab'))
const SaaSROIEngine = lazy(() => import('./components/SaaSROIEngine'))
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./components/TermsOfService'))

type PageType = 'home' | 'privacy' | 'terms'

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<PageType>('home')
  const [roiMetrics, setRoiMetrics] = useState<ROIMetrics | null>(null)
  const { i18n } = useTranslation()

  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isFormOpen])

  // Initialize and sync RTL/LTR based on current language
  useEffect(() => {
    const htmlElement = document.documentElement
    const lang = i18n.language || 'en'
    
    if (lang.startsWith('ar')) {
      htmlElement.dir = 'rtl'
      htmlElement.lang = 'ar'
    } else {
      htmlElement.dir = 'ltr'
      htmlElement.lang = 'en'
    }
    localStorage.setItem('preferredLanguage', lang)
  }, [i18n.language])

  const handleNavigateToPage = (page: PageType) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Terminal Visual Effects - CRT Scanlines & Flicker */}
      <TerminalVisualEffects />

      {/* Global Radial Background Mask - Subtle depth from center outward */}
      <BackgroundRadialMask />

      {/* Magnetic Cursor Effect */}
      <MagneticCursor />

      <Navigation onContactClick={() => setIsFormOpen(true)} />
      
      {/* System Pulse - Real-time metrics header */}
      <SystemPulse />
      
      <WhatsAppButton />

      {/* Conditional Page Rendering */}
      {currentPage === 'home' && (
        <div className="relative z-10">
          <Hero onContactClick={() => setIsFormOpen(true)} />
          <ServiceMatrix />
          <About />
          
          {/* AI Automation Showcase */}
          <AIAutomationShowcase onContactClick={() => setIsFormOpen(true)} />
          
          {/* Circuit-to-Code Transition Component */}
          <CircuitToCodeTransition />
          
          {/* Lazy-loaded Innovation Lab with Suspense boundary */}
          <Suspense fallback={null}>
            <InnovationLab />
          </Suspense>
          
          {/* Lazy-loaded ROI Engine with Skeleton loader */}
          <Suspense fallback={
            <div className="w-full px-4 py-24">
              <div className="max-w-6xl mx-auto">
                <SkeletonROIEngine />
              </div>
            </div>
          }>
            <SaaSROIEngine 
              onOpenFormWithMetrics={(metrics) => {
                setRoiMetrics(metrics)
                setIsFormOpen(true)
              }}
            />
          </Suspense>

          <Footer
            onContactClick={() => setIsFormOpen(true)}
            onNavigateToPage={handleNavigateToPage}
          />
        </div>
      )}

      {currentPage === 'privacy' && (
        <div className="relative z-10">
          <Suspense fallback={null}>
            <PrivacyPolicy onBack={() => handleNavigateToPage('home')} />
          </Suspense>
          <Footer
            onContactClick={() => setIsFormOpen(true)}
            onNavigateToPage={handleNavigateToPage}
          />
        </div>
      )}

      {currentPage === 'terms' && (
        <div className="relative z-10">
          <Suspense fallback={null}>
            <TermsOfService onBack={() => handleNavigateToPage('home')} />
          </Suspense>
          <Footer
            onContactClick={() => setIsFormOpen(true)}
            onNavigateToPage={handleNavigateToPage}
          />
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <motion.div
          data-testid="contact-form-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsFormOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <LeadGenForm 
              onClose={() => {
                setIsFormOpen(false)
                setRoiMetrics(null)
              }}
              roiMetrics={roiMetrics}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default App
