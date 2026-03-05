import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import NeuralNetworkBackground from './NeuralNetworkBackground'
import { useAdaptiveRendering } from '../hooks/usePerformanceDetection'

interface HeroProps {
  onContactClick: () => void
}

export default function Hero({ onContactClick }: HeroProps) {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  
  // Adaptive rendering based on device capability
  const adaptiveRendering = useAdaptiveRendering()

  return (
    <section
      className={`hero-physics-bg relative min-h-[160vh] w-full flex flex-col items-center justify-start pt-32 pb-20 px-6 gap-20 overflow-hidden transition-all cinematic-vignette ${
        isArabic ? 'rtl' : 'ltr'
      }`}
      style={{
        background: `
          linear-gradient(to bottom, #0A0A0B, #0F0F12),
          repeating-linear-gradient(
            0deg,
            rgba(34, 211, 238, 0.03) 0px,
            rgba(34, 211, 238, 0.03) 1px,
            transparent 1px,
            transparent 50px
          ),
          repeating-linear-gradient(
            90deg,
            rgba(34, 211, 238, 0.03) 0px,
            rgba(34, 211, 238, 0.03) 1px,
            transparent 1px,
            transparent 50px
          )
        `,
      }}
    >
      {/* LAYER 0: Background Radial Mask (z-0) */}
      {/* LAYER 1: Physics-Engineered Background (Canvas-based, performant) z-10 */}
      {/* Conditionally render complex animations based on device capability */}
      {adaptiveRendering.showNeuralBackground ? (
        <Suspense fallback={null}>
          <div className="physics-background-container absolute inset-0 z-10 opacity-100">
            <NeuralNetworkBackground />
          </div>
        </Suspense>
      ) : (
        <div className="physics-background-container absolute inset-0 z-10">
          {/* Fallback: Static CSS gradient for low-end devices */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-cyan-900/10" />
        </div>
      )}

      {/* LAYER 2: Content (Text + CTAs) z-20 - Primary content layer */}
      <div className={`physics-content w-full max-w-4xl mx-auto relative z-30 ${isArabic ? 'lg:max-w-2xl' : ''}`}>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full space-y-16 flex flex-col items-center"
          >
            {/* Deconstructed Header - Cinematic Hierarchy */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col gap-8 text-center max-w-4xl items-center relative"
            >
              {/* Neural Grid Pulse Nodes */}
              <motion.div
                className="absolute -inset-32 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-cyan-500"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + i * 20}%`,
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 0 0px rgba(34, 211, 238, 0.4)',
                        '0 0 0 15px rgba(34, 211, 238, 0)',
                      ],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.3,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </motion.div>

              {/* System Architecture Metadata Tag - Premium Badge */}
              <motion.div
                initial={{ opacity: 0, y: -15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="relative z-10"
              >
                <div className="px-4 py-2 rounded-full border border-cyan-500/40 bg-gradient-to-r from-cyan-500/10 via-cyan-400/5 to-cyan-500/10 backdrop-blur-sm hover:border-cyan-400/60 transition-all duration-300">
                  <span className="text-[11px] md:text-xs font-mono bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300 bg-clip-text text-transparent font-semibold tracking-widest">
                    ⚡ SYSTEM_ARCHITECT_ACTIVE
                  </span>
                </div>
              </motion.div>

              {/* Main Title - Ultra Premium Gradient */}
              <motion.h1
                className="font-black leading-[1.1] relative z-10 max-w-3xl" 
                style={{ fontSize: 'clamp(2rem, 6vw, 3.8rem)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                <span className="block">
                  <motion.span
                    className="inline-block bg-gradient-to-r from-white via-cyan-200 via-50% to-cyan-400 bg-clip-text text-transparent bg-size-200 bg-pos-0"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      backgroundSize: '200% 100%',
                    }}
                  >
                    AI Animation & SaaS
                  </motion.span>
                </span>
                <span className="block mt-2">
                  <motion.span
                    className="inline-block bg-gradient-to-b from-cyan-300 to-cyan-500 bg-clip-text text-transparent"
                    animate={{
                      opacity: [0.9, 1, 0.9],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    Automation
                  </motion.span>
                </span>
              </motion.h1>

              {/* System Documentation - Premium Technical Description */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="relative z-10 max-w-2xl"
              >
                {/* Decorative top line */}
                <motion.div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent"
                  style={{ width: '120px' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
                
                <p className="text-sm md:text-base leading-relaxed text-gray-200 font-light tracking-tight space-y-4">
                  <motion.span
                    className="block text-center text-cyan-200/90"
                    animate={{
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    Architecting intelligent automation systems for enterprise-scale innovation
                  </motion.span>
                  
                  <span className="block text-center text-gray-300 text-xs md:text-sm pt-3">
                    Specializing in AI-driven workflows, real-time animation systems, and commerce infrastructure. Building the computational backbone for next-generation platforms.
                  </span>
                </p>

                {/* Decorative bottom line */}
                <motion.div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent"
                  style={{ width: '120px' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </motion.div>
            </motion.div>

            {/* CTA Node - Scanning Light Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className={`flex flex-col sm:flex-row gap-6 pt-12 justify-center relative z-10 ${isArabic ? 'flex-row-reverse' : ''}`}
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onContactClick()
                }}
                data-magnetic
                className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/50 border border-cyan-400/30 relative overflow-hidden group pointer-events-auto"
              >
                {/* Scanning Light Bar */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-40 pointer-events-none"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  {t('hero.cta')} <ArrowRight className="w-4 h-4" />
                </span>
              </motion.button>

              <motion.a
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 20px rgba(34, 211, 238, 0.6)',
                }}
                whileTap={{ scale: 0.98 }}
                href="https://github.com/Imadouuu?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="px-8 py-3 border border-cyan-500/60 text-cyan-400 font-bold rounded-lg hover:text-cyan-300 transition-all backdrop-blur-sm hover:border-cyan-400/80"
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
