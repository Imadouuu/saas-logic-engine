import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import NeuralNetworkBackground from './NeuralNetworkBackground'
import DigitalArchitectPlaceholder from './DigitalArchitectPlaceholder'
import {
  glitchCharacterVariants,
  smoothFadeVariants,
  slideInLeftVariants,
  getDirectionAwareVariants,
} from '../utils/cyberTransitions'

interface HeroProps {
  onContactClick: () => void
}

export default function Hero({ onContactClick }: HeroProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [showArchitect, setShowArchitect] = useState(false)
  const { t, i18n } = useTranslation()
  const terminalText = `> imad-nasseri.dev --expertise ${t('hero.title').toLowerCase()}`
  const isArabic = i18n.language === 'ar'

  // Terminal text typewriter effect
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < terminalText.length) {
        setDisplayedText(terminalText.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        // Show Digital Architect after terminal text completes
        setTimeout(() => setShowArchitect(true), 500)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [terminalText])

  // Direction-aware slide animation
  const slideVariants = getDirectionAwareVariants(isArabic, slideInLeftVariants)

  return (
    <section
      className={`hero-physics-bg relative min-h-screen w-full flex items-center justify-center pt-20 pb-20 px-4 overflow-hidden transition-all cinematic-vignette ${
        isArabic ? 'rtl' : 'ltr'
      }`}
    >
      {/* LAYER 1: Physics-Engineered Background (Canvas-based, performant) */}
      <Suspense fallback={null}>
        <div className="physics-background-container">
          <NeuralNetworkBackground />
        </div>
      </Suspense>

      {/* LAYER 2: Digital Architect Placeholder (positioned right) */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 z-5 hidden lg:block">
          <DigitalArchitectPlaceholder isVisible={showArchitect} />
        </div>
      </Suspense>

      {/* LAYER 3: Content (Terminal + Text + CTAs) */}
      <div className={`physics-content max-w-4xl mx-auto ${isArabic ? 'lg:max-w-2xl' : ''}`}>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Terminal Window - Enhanced glassmorphism */}
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              className="glass-premium rounded-lg p-6 font-mono text-sm"
            >
              {/* Terminal Header */}
              <div
                className={`flex items-center gap-2 mb-4 pb-4 border-b border-cyan-glow/20 ${
                  isArabic ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-gray-500 text-xs">imad-nasseri.dev</span>
              </div>

              {/* Terminal Content with character-by-character glitch effect */}
              <div className="space-y-4 text-cyan-glow">
                <motion.div className="flex items-center gap-2">
                  <div className="flex-1 overflow-hidden">
                    {displayedText.split('').map((char, idx) => (
                      <motion.span
                        key={idx}
                        custom={idx}
                        variants={glitchCharacterVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-block"
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </div>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="inline-block w-2 h-5 bg-cyan-glow/50 flex-shrink-0"
                  />
                </motion.div>

                {/* Description with fade effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="mt-8 text-gray-400 space-y-2 text-xs"
                >
                  <motion.div
                    animate={{
                      color: [
                        'rgba(156, 163, 175, 1)',
                        'rgba(0, 217, 255, 0.4)',
                        'rgba(156, 163, 175, 1)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    » {t('hero.description')}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Core Expertise Statement with Shimmer */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-4"
            >
              <motion.h1
                className="text-4xl md:text-5xl font-black leading-tight"
                animate={{
                  textShadow: [
                    '0 0 10px rgba(0, 217, 255, 0.3)',
                    '0 0 20px rgba(0, 217, 255, 0.6)',
                    '0 0 10px rgba(0, 217, 255, 0.3)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {t('hero.title')}
                <br />
                <motion.span
                  className="text-cyan-glow inline-block"
                  animate={{
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {t('hero.subtitle')}
                </motion.span>
              </motion.h1>

              <motion.p
                variants={smoothFadeVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-400 max-w-2xl leading-relaxed"
              >
                {t('hero.description')}
              </motion.p>
            </motion.div>

            {/* CTA Buttons with Gradient Pulse */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className={`flex flex-col sm:flex-row gap-4 pt-4 ${isArabic ? 'flex-row-reverse' : ''}`}
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 20px rgba(0, 217, 255, 0.6)',
                }}
                whileTap={{ scale: 0.98 }}
                onClick={onContactClick}
                className="px-8 py-3 bg-cyan-glow text-black font-bold rounded-lg flex items-center gap-2 hover:bg-cyan-glow/90 transition-all shadow-lg"
              >
                {t('hero.cta')} <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.a
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgba(0, 217, 255, 1)',
                  backgroundColor: 'rgba(0, 217, 255, 0.05)',
                }}
                whileTap={{ scale: 0.98 }}
                href="https://github.com/Imadouuu?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-cyan-glow/50 text-cyan-glow font-bold rounded-lg hover:border-cyan-glow transition-all"
              >
                View GitHub
              </motion.a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
