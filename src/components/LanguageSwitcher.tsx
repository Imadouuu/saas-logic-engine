import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [currentLang, setCurrentLang] = useState<string>(i18n.language)

  // Sync component state with i18n language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLang(i18n.language)
    }

    // Listen to i18n language change events
    i18n.on('languageChanged', handleLanguageChange)
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n])

  // Ensure DOM attributes sync with language state
  useEffect(() => {
    const htmlElement = document.documentElement
    if (currentLang === 'ar') {
      htmlElement.dir = 'rtl'
      htmlElement.lang = 'ar'
    } else {
      htmlElement.dir = 'ltr'
      htmlElement.lang = 'en'
    }
    localStorage.setItem('preferredLanguage', currentLang)
  }, [currentLang])

  const handleLanguageChange = (lang: string) => {
    // Direct language change without toggle logic
    i18n.changeLanguage(lang)
  }

  return (
    <div className="flex items-center gap-2">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2">
          <Globe className="w-5 h-5 text-gray-400 group-hover:text-cyan-glow transition-colors" />
          <span className="text-xs font-medium text-gray-400 group-hover:text-cyan-glow transition-colors hidden sm:inline">
            {currentLang === 'ar' ? 'عربي' : 'EN'}
          </span>
        </button>

        {/* Dropdown Menu */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute right-0 mt-2 w-32 bg-black/90 backdrop-blur-md rounded-lg border border-cyan-glow/20 py-2 hidden group-hover:block z-40"
        >
          <motion.button
            whileHover={{ backgroundColor: 'rgba(0, 217, 255, 0.1)' }}
            onClick={() => handleLanguageChange('en')}
            className={`w-full px-4 py-2 text-left text-sm font-medium transition-colors ${
              currentLang === 'en'
                ? 'text-cyan-glow bg-cyan-glow/10'
                : 'text-gray-300 hover:text-cyan-glow'
            }`}
          >
            English
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: 'rgba(0, 217, 255, 0.1)' }}
            onClick={() => handleLanguageChange('ar')}
            className={`w-full px-4 py-2 text-left text-sm font-medium transition-colors ${
              currentLang === 'ar'
                ? 'text-cyan-glow bg-cyan-glow/10'
                : 'text-gray-300 hover:text-cyan-glow'
            }`}
          >
            عربي
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
