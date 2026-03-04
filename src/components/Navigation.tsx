import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

interface NavigationProps {
  onContactClick: () => void
}

export default function Navigation({ onContactClick }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.work'), href: '#work' },
    { label: t('nav.about'), href: '#about' },
  ]

  return (
    <motion.nav
      animate={{
        backgroundColor: scrolled ? 'rgba(10, 14, 39, 0.9)' : 'rgba(10, 14, 39, 0)',
        backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
        borderBottomColor: scrolled ? 'rgba(0, 217, 255, 0.1)' : 'rgba(0, 217, 255, 0)',
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo/Name */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="font-black text-white tracking-tight">
            IN
          </div>
          <div className="hidden sm:block">
            <p className="font-black text-white text-sm leading-tight">Imad Nasseri</p>
            <p className="text-xs text-cyan-glow">Engineer | Builder</p>
          </div>
        </motion.div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ color: 'rgba(0, 217, 255, 1)' }}
              className="text-gray-300 hover:text-cyan-glow transition-colors text-sm font-medium"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Desktop Controls: Language Switcher + CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContactClick}
            className="px-6 py-2 bg-cyan-glow text-black font-bold rounded-lg hover:bg-cyan-glow/90 transition-all text-sm"
          >
            {t('nav.hireMe')}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-cyan-glow" />
            ) : (
              <Menu className="w-6 h-6 text-gray-400" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          height: mobileMenuOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden border-t border-cyan-glow/10"
      >
        <div className="px-4 py-4 space-y-3 bg-black/40 backdrop-blur">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-300 hover:text-cyan-glow hover:bg-cyan-glow/10 rounded-lg transition-colors text-sm"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setMobileMenuOpen(false)
              onContactClick()
            }}
            className="w-full py-2 bg-cyan-glow text-black font-bold rounded-lg hover:bg-cyan-glow/90 transition-all text-sm"
          >
            {t('nav.hireMe')}
          </motion.button>
        </div>
      </motion.div>
    </motion.nav>
  )
}
