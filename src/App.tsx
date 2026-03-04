import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ROIMetrics } from './hooks/useROICalculator'
import Hero from './components/Hero'
import ServiceMatrix from './components/ServiceMatrix'
import InnovationLab from './components/InnovationLab'
import SaaSROIEngine from './components/SaaSROIEngine'
import Footer from './components/Footer'
import LeadGenForm from './components/LeadGenForm'
import FloatingCTA from './components/FloatingCTA'
import Navigation from './components/Navigation'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'

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
      <Navigation onContactClick={() => setIsFormOpen(true)} />
      
      <FloatingCTA onOpenForm={() => setIsFormOpen(true)} />

      {/* Conditional Page Rendering */}
      {currentPage === 'home' && (
        <div className="relative z-10">
          <Hero onContactClick={() => setIsFormOpen(true)} />
          <ServiceMatrix />
          <InnovationLab />
          <SaaSROIEngine 
            onOpenFormWithMetrics={(metrics) => {
              setRoiMetrics(metrics)
              setIsFormOpen(true)
            }}
          />
          <Footer
            onContactClick={() => setIsFormOpen(true)}
            onNavigateToPage={handleNavigateToPage}
          />
        </div>
      )}

      {currentPage === 'privacy' && (
        <div className="relative z-10">
          <PrivacyPolicy onBack={() => handleNavigateToPage('home')} />
          <Footer
            onContactClick={() => setIsFormOpen(true)}
            onNavigateToPage={handleNavigateToPage}
          />
        </div>
      )}

      {currentPage === 'terms' && (
        <div className="relative z-10">
          <TermsOfService onBack={() => handleNavigateToPage('home')} />
          <Footer
            onContactClick={() => setIsFormOpen(true)}
            onNavigateToPage={handleNavigateToPage}
          />
        </div>
      )}

      {isFormOpen && (
        <motion.div
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
