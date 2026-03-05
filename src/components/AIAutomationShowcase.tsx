import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import {
  Zap,
  Brain,
  RotateCcw,
  TrendingUp,
  Code2,
  Cpu,
  Workflow,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

interface CapabilityCard {
  id: number
  icon: React.ReactNode
  titleKey: string
  descriptionKey: string
  techStack: string[]
}

const capabilities: CapabilityCard[] = [
  {
    id: 1,
    icon: <Brain className="w-8 h-8" />,
    titleKey: 'ai_automation.capability1_title',
    descriptionKey: 'ai_automation.capability1_desc',
    techStack: ['TensorFlow', 'PyTorch', 'OpenAI API', 'Custom ML Models'],
  },
  {
    id: 2,
    icon: <Zap className="w-8 h-8" />,
    titleKey: 'ai_automation.capability2_title',
    descriptionKey: 'ai_automation.capability2_desc',
    techStack: ['Three.js', 'Framer Motion', 'WebGL', 'GPU Acceleration'],
  },
  {
    id: 3,
    icon: <Workflow className="w-8 h-8" />,
    titleKey: 'ai_automation.capability3_title',
    descriptionKey: 'ai_automation.capability3_desc',
    techStack: ['n8n', 'Zapier', 'Make', 'Custom APIs'],
  },
  {
    id: 4,
    icon: <TrendingUp className="w-8 h-8" />,
    titleKey: 'ai_automation.capability4_title',
    descriptionKey: 'ai_automation.capability4_desc',
    techStack: ['PostgreSQL', 'Redis', 'Analytics', 'Data Science'],
  },
]

const metrics = [
  { label: 'ai_automation.metric1_label', value: '95%', subtext: 'ai_automation.metric1_subtext' },
  { label: 'ai_automation.metric2_label', value: '60%', subtext: 'ai_automation.metric2_subtext' },
  { label: 'ai_automation.metric3_label', value: '24h', subtext: 'ai_automation.metric3_subtext' },
  { label: 'ai_automation.metric4_label', value: '10x', subtext: 'ai_automation.metric4_subtext' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export default function AIAutomationShowcase({ onContactClick }: { onContactClick?: () => void }) {
  const { t, i18n } = useTranslation()
  const [selectedCapability, setSelectedCapability] = useState<number>(1)
  const [activeMetric, setActiveMetric] = useState<number>(0)
  const isArabic = i18n.language === 'ar'

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className={`relative w-full py-24 md:py-40 px-4 md:px-8 overflow-hidden ${
        isArabic ? 'rtl' : 'ltr'
      }`}
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section - Professional Cinematic Design */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20 flex flex-col items-center gap-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-300">
              {t('ai_automation.badge')}
            </span>
          </motion.div>

          {/* Deconstructed Heading with Professional Hierarchy */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8 items-center max-w-4xl"
          >
            {/* System Architecture Metadata - Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="px-4 py-2 rounded-full border border-cyan-500/40 bg-gradient-to-r from-cyan-500/10 via-cyan-400/5 to-cyan-500/10 backdrop-blur-sm hover:border-cyan-400/60 transition-all duration-300">
                <span className="text-[11px] md:text-xs font-mono bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300 bg-clip-text text-transparent font-semibold tracking-widest">
                  🔥 AI_AUTOMATION_ENGINE_ACTIVE
                </span>
              </div>
            </motion.div>

            {/* Main Title - Ultra Premium Gradient Animation */}
            <motion.h2
              className="font-black leading-[1.1]"
              style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
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
                {t('ai_automation.title')}
              </motion.span>
            </motion.h2>

            {/* Premium Technical Description */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative max-w-2xl"
            >
              {/* Decorative top line */}
              <motion.div
                className="absolute -top-6 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent"
                style={{ width: '120px' }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
              />

              <p className="text-sm md:text-base leading-relaxed text-gray-200 font-light tracking-tight space-y-4 text-center">
                <motion.span
                  className="block text-cyan-200/90"
                  animate={{
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  Transform manual chaos into seamless automation
                </motion.span>

                <span className="block text-gray-300 text-xs md:text-sm pt-2">
                  We architect next-gen SaaS with AI intelligence, real-time visuals, and enterprise reliability. Eliminate friction. Unlock exponential growth.
                </span>
              </p>

              {/* Decorative bottom line */}
              <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent"
                style={{ width: '120px' }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Key Metrics Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              onMouseEnter={() => setActiveMetric(idx)}
              className={`relative p-6 rounded-xl border backdrop-blur-sm transition-all cursor-pointer duration-300 ${
                activeMetric === idx
                  ? 'border-cyan-400/60 bg-cyan-500/10'
                  : 'border-cyan-500/20 bg-cyan-500/5'
              }`}
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: activeMetric === idx ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl md:text-4xl font-black text-gradient bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-2">
                  {metric.value}
                </div>
                <div className="text-xs md:text-sm text-gray-400 mb-1">{t(metric.label)}</div>
                <div className="text-xs text-gray-500">{t(metric.subtext)}</div>
              </motion.div>
              {activeMetric === idx && (
                <motion.div
                  layoutId="metricGlow"
                  className="absolute inset-0 rounded-xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/5 to-transparent pointer-events-none"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Capabilities Grid */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('ai_automation.capabilities_title')}
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('ai_automation.capabilities_desc')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            {capabilities.map((capability) => (
              <motion.div
                key={capability.id}
                variants={itemVariants}
                onClick={() => setSelectedCapability(capability.id)}
                className={`relative p-8 rounded-xl border backdrop-blur-sm cursor-pointer transition-all duration-300 ${
                  selectedCapability === capability.id
                    ? 'border-cyan-400/60 bg-gradient-to-br from-cyan-500/15 to-purple-500/10'
                    : 'border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10'
                }`}
              >
                {/* Animated glow effect for selected */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: selectedCapability === capability.id ? 1 : 0 }}
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-transparent blur-lg pointer-events-none"
                />

                <div className="relative z-10">
                  {/* Icon with animation */}
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: selectedCapability === capability.id ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400/30 to-blue-400/10 flex items-center justify-center mb-4 text-cyan-300"
                  >
                    {capability.icon}
                  </motion.div>

                  <h4 className="text-xl font-bold mb-3 text-white">
                    {t(capability.titleKey)}
                  </h4>

                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {t(capability.descriptionKey)}
                  </p>

                  {/* Tech Stack */}
                  <AnimatePresence>
                    {selectedCapability === capability.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-4 border-t border-cyan-500/20"
                      >
                        <div className="text-sm font-semibold text-cyan-300 mb-3">
                          {t('ai_automation.tech_stack')}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {capability.techStack.map((tech, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.1 }}
                              className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-xs text-cyan-200"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Process Flow Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20 p-8 md:p-12 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-purple-500/5"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('ai_automation.process_title')}
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('ai_automation.process_desc')}
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0 ${isArabic ? 'flex-row-reverse' : ''}`}>
            {['analyze', 'design', 'implement', 'optimize'].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: idx * 0.15, type: 'spring' }}
                  viewport={{ once: true }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center text-white font-bold mb-4 relative z-10"
                >
                  {idx + 1}
                </motion.div>

                <div className="text-center">
                  <p className="font-semibold text-white mb-1">
                    {t(`ai_automation.process_step${idx + 1}_title`)}
                  </p>
                  <p className="text-sm text-gray-400 max-w-32">
                    {t(`ai_automation.process_step${idx + 1}_desc`)}
                  </p>
                </div>

                {/* Connector Line */}
                {idx < 3 && (
                  <div className={`absolute top-6 ${isArabic ? 'right-[-50%]' : 'left-[calc(50%+24px)]'} w-[calc(100%-48px)] md:w-[calc(100%+40px)] h-1 hidden md:block`}>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: idx * 0.15 + 0.2, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-cyan-400/60 to-transparent origin-left"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Featured Achievement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mb-16 overflow-hidden rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-500/20 via-purple-500/10 to-transparent p-8 md:p-12"
        >
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: [0, 0.5, 0], x: 500 }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                }}
                className="absolute top-1/2 w-1 h-1 bg-cyan-400 rounded-full"
              />
            ))}
          </div>

          <div className={`relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${isArabic ? 'text-right' : ''}`}>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-400/10 border border-cyan-400/30 mb-4">
                <Code2 className="w-4 h-4 text-cyan-300" />
                <span className="text-sm font-semibold text-cyan-300">
                  {t('ai_automation.featured_tag')}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                {t('ai_automation.featured_title')}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {t('ai_automation.featured_desc')}
              </p>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onContactClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-400 text-black font-bold hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300"
              >
                {t('ai_automation.featured_cta')}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Stats Display */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'ai_automation.stat1_label', value: '500+', desc: 'ai_automation.stat1_desc' },
                { label: 'ai_automation.stat2_label', value: '99.9%', desc: 'ai_automation.stat2_desc' },
                { label: 'ai_automation.stat3_label', value: '$2.5M+', desc: 'ai_automation.stat3_desc' },
                { label: 'ai_automation.stat4_label', value: '48h', desc: 'ai_automation.stat4_desc' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-4 rounded-lg bg-white/5 border border-cyan-500/20"
                >
                  <div className="text-2xl font-black text-cyan-300 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-400">
                    <div className="font-semibold">{t(stat.label)}</div>
                    <div className="text-gray-500">{t(stat.desc)}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className={`text-center py-12 md:py-16 px-6 md:px-12 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-transparent ${
            isArabic ? 'text-right' : ''
          }`}
        >
          <Cpu className={`w-12 h-12 text-cyan-400 mb-6 ${isArabic ? 'ml-auto' : 'mx-auto'}`} />
          <h3 className="text-3xl md:text-4xl font-black mb-4 text-white">
            {t('ai_automation.cta_title')}
          </h3>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            {t('ai_automation.cta_subtitle')}
          </p>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContactClick}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300"
          >
            {t('ai_automation.cta_button')}
            <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
