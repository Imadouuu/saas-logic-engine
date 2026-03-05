import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, Sparkles, Zap, ChevronDown, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

interface NavigationProps {
  onContactClick: () => void
}

export default function Navigation({ onContactClick }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language.startsWith('ar')

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Always show navbar when near the top
      if (currentScrollY < 50) {
        setIsVisible(true)
        setScrolled(false)
      } else {
        setScrolled(true)
        // Show navbar when scrolling up, hide when scrolling down
        if (currentScrollY < lastScrollY) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navLinks = [
    { label: t('nav.services'), href: '#services', icon: '⚡', color: 'from-cyan-400 to-blue-400' },
    { label: t('nav.work'), href: '#work', icon: '🎨', color: 'from-purple-400 to-pink-400' },
    { label: t('nav.about'), href: '#about', icon: '👨‍💻', color: 'from-green-400 to-cyan-400' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.nav
      animate={{
        y: isVisible ? 0 : -120,
        backgroundColor: scrolled 
          ? 'rgba(5, 10, 30, 0.9)' 
          : 'rgba(5, 10, 30, 0.3)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)',
        borderBottomColor: scrolled 
          ? 'rgba(0, 217, 255, 0.3)' 
          : 'rgba(0, 217, 255, 0.1)',
      }}
      transition={{
        y: { duration: 0.3, ease: 'easeOut' },
        backgroundColor: { duration: 0.3 },
        backdropFilter: { duration: 0.3 },
        borderBottomColor: { duration: 0.3 },
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
      style={{
        boxShadow: scrolled 
          ? `
            0 20px 50px rgba(0, 217, 255, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 217, 255, 0.2)
          `
          : '0 0 0 transparent',
      }}
    >
      {/* Multiple glassmorphic background layers */}
      {scrolled && (
        <>
          {/* Top gradient glow */}
          <motion.div
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-sm" />
          </motion.div>

          {/* Animated background scan line */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
          >
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-xl" 
              style={{ transform: 'translateY(-50%)' }} />
          </motion.div>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent blur-3xl pointer-events-none" />
        </>
      )}

      <div className={`relative max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        
        {/* Logo/Name - Ultra Premium */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 cursor-pointer group relative"
        >
          {/* Background glow */}
          <motion.div
            className="absolute -inset-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 pointer-events-none"
            transition={{ duration: 0.3 }}
          />

          <motion.div 
            className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400/40 to-blue-600/40 border border-cyan-400/60 flex items-center justify-center overflow-hidden shadow-lg"
            whileHover={{
              boxShadow: '0 0 30px rgba(0, 217, 255, 0.6), inset 0 0 20px rgba(0, 217, 255, 0.2)',
              borderColor: 'rgba(0, 217, 255, 1)',
            }}
          >
            {/* Multiple animated layers for depth */}
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,217,255,0.3),transparent)]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ opacity: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 border border-cyan-400/50 rounded-xl"
              animate={{ 
                boxShadow: [
                  'inset 0 0 10px rgba(0,217,255,0)',
                  'inset 0 0 20px rgba(0,217,255,0.3)',
                  'inset 0 0 10px rgba(0,217,255,0)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.span 
              className="relative font-black text-cyan-300 text-lg font-black tracking-tighter"
              animate={{ 
                textShadow: [
                  '0 0 5px rgba(0,217,255,0.5)',
                  '0 0 15px rgba(0,217,255,0.8)',
                  '0 0 5px rgba(0,217,255,0.5)',
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              IN
            </motion.span>
          </motion.div>

          <div className="hidden sm:block relative z-10">
            <motion.p 
              className="font-black text-white text-sm leading-tight tracking-tighter"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Imad Nasseri
            </motion.p>
            <motion.div
              className="flex items-center gap-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <span className="text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                💎 Digital Architect
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Desktop Nav Links - Ultra Enhanced */}
        <motion.div 
          className={`hidden md:flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {navLinks.map((link) => (
            <motion.div
              key={link.label}
              variants={itemVariants}
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative group"
            >
              {/* Background gradient bubble on hover */}
              <motion.div
                className={`absolute -inset-2 rounded-xl bg-gradient-to-r ${link.color} opacity-0 blur-lg pointer-events-none`}
                animate={{
                  opacity: hoveredLink === link.label ? 0.3 : 0,
                  scale: hoveredLink === link.label ? 1.1 : 0.95,
                }}
                transition={{ duration: 0.2 }}
              />

              <motion.a
                href={link.href}
                whileTap={{ scale: 0.92 }}
                className="relative px-4 py-2.5 text-gray-300 hover:text-white font-bold text-sm transition-colors duration-200 flex items-center gap-2"
              >
                {/* Background card effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 backdrop-blur-sm pointer-events-none"
                  transition={{ duration: 0.2 }}
                />
              

                {/* Icon with animation */}
                <motion.span 
                  className="text-base"
                  animate={hoveredLink === link.label ? { scale: 1.3, rotate: 360 } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {link.icon}
                </motion.span>

                {/* Label */}
                <span className="relative">{link.label}</span>

                {/* Bottom accent line - gradient */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: hoveredLink === link.label ? 1 : 0,
                    opacity: hoveredLink === link.label ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Top accent line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent pointer-events-none"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: hoveredLink === link.label ? 1 : 0,
                    opacity: hoveredLink === link.label ? 0.5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop Controls - Ultra Enhanced */}
        <motion.div 
          className={`hidden md:flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <motion.a
            href="https://wa.me/21367979054?text=Hello%20Imad%2C%20I%20just%20completed%20your%20ROI%20audit%20and%20I%27m%20interested%20in%20automating%20my%20business%20processes."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open WhatsApp chat"
            className="p-2.5 hover:bg-green-500/20 rounded-lg transition-all border border-green-500/40 backdrop-blur-md pointer-events-auto"
            style={{
              boxShadow: '0 0 15px rgba(34, 197, 94, 0.3)'
            }}
          >
            <MessageCircle className="w-5 h-5 text-green-400" />
          </motion.a>
          <LanguageSwitcher />
        </motion.div>

        {/* Mobile Menu Button - Enhanced */}
        <motion.div 
          className={`md:hidden flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <motion.a
            href="https://wa.me/21367979054?text=Hello%20Imad%2C%20I%20just%20completed%20your%20ROI%20audit%20and%20I%27m%20interested%20in%20automating%20my%20business%20processes."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open WhatsApp chat"
            className="p-2.5 hover:bg-green-500/20 rounded-lg transition-all border border-green-500/40 backdrop-blur-md pointer-events-auto"
            style={{
              boxShadow: '0 0 15px rgba(34, 197, 94, 0.3)'
            }}
          >
            <MessageCircle className="w-5 h-5 text-green-400" />
          </motion.a>
          <LanguageSwitcher />
          <motion.button
            type="button"
            whileTap={{ scale: 0.85 }}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMobileMenuOpen(!mobileMenuOpen) }}
            className="p-3 hover:bg-cyan-500/30 rounded-xl transition-colors border border-cyan-500/40 backdrop-blur-md pointer-events-auto"
            whileHover={{ boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' }}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-cyan-400" />
            ) : (
              <Menu className="w-6 h-6 text-cyan-400" />
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Menu - Ultra Premium */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          height: mobileMenuOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden border-t border-cyan-500/30"
      >
        <div className="relative px-4 py-8 space-y-3 bg-gradient-to-b from-black/80 via-cyan-950/20 to-black/80 backdrop-blur-2xl">
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,217,255,0.1),transparent)] pointer-events-none"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          {/* Top accent */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-lg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
          />

          <motion.div
            className="relative space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate={mobileMenuOpen ? "visible" : "hidden"}
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                variants={itemVariants}
                whileHover={{ 
                  x: isRTL ? -8 : 8,
                  backgroundColor: 'rgba(0, 217, 255, 0.2)',
                }}
                className="flex items-center gap-3 px-5 py-4 text-gray-300 hover:text-cyan-300 rounded-xl transition-all duration-200 text-sm font-bold relative group overflow-hidden"
              >
                {/* Background gradient on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-400/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 pointer-events-none"
                  transition={{ duration: 0.2 }}
                />

                <span className="text-xl relative z-10">{link.icon}</span>
                <span className="relative z-10 flex-1">{link.label}</span>

                {/* Right arrow */}
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChevronDown className="w-4 h-4 rotate-90" />
                </motion.div>
              </motion.a>
            ))}


          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  )
}
