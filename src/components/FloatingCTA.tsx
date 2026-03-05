import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface FloatingCTAProps {
  onOpenForm: () => void
}

export default function FloatingCTA({ onOpenForm }: FloatingCTAProps) {
  const [scrollY, setScrollY] = useState(0)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isVisible = scrollY > 300

  return (
    <motion.button
      animate={{
        y: isVisible ? 0 : 100,
        opacity: isVisible ? 1 : 0,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onOpenForm()
      }}
      className={`fixed bottom-8 z-40 px-6 py-3 bg-cyan-glow text-black font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-cyan-glow/50 hover:shadow-cyan-glow/70 hover:bg-cyan-glow/90 transition-all cursor-pointer ${i18n.language === 'ar' ? 'left-8' : 'right-8'}`}
    >
      <Mail className="w-5 h-5" />
      <span>{t('floatingCta.button')}</span>
    </motion.button>
  )
}
