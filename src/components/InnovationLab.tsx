import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const caseStudies = [
  {
    id: 1,
    titleKey: 'case1_title',
    categoryKey: 'case1_category',
    challengeKey: 'case1_challenge',
    solutionKey: 'case1_solution',
    resultKey: 'case1_result',
    tech: ['PostgreSQL', 'Redis', 'Node.js', 'React Query'],
  },
  {
    id: 2,
    titleKey: 'case2_title',
    categoryKey: 'case2_category',
    challengeKey: 'case2_challenge',
    solutionKey: 'case2_solution',
    resultKey: 'case2_result',
    tech: ['Python', 'TensorFlow', 'FFmpeg', 'React'],
  },
  {
    id: 3,
    titleKey: 'case3_title',
    categoryKey: 'case3_category',
    challengeKey: 'case3_challenge',
    solutionKey: 'case3_solution',
    resultKey: 'case3_result',
    tech: ['n8n', 'REST APIs', 'Webhooks', 'Zapier'],
  },
  {
    id: 4,
    titleKey: 'case4_title',
    categoryKey: 'case4_category',
    challengeKey: 'case4_challenge',
    solutionKey: 'case4_solution',
    resultKey: 'case4_result',
    tech: ['React', 'WebSockets', 'Service Workers', 'Cloud Firestore'],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function InnovationLab() {
  const [expandedId, setExpandedId] = useState<number | null>(1)
  const { t, i18n } = useTranslation()

  return (
    <section id="work" className={`relative w-full py-20 md:py-32 px-4 md:px-8 ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            {t('innovation.title')}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl">
            {t('innovation.description')}
          </p>
        </motion.div>

        {/* Case studies list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              onClick={() => setExpandedId(expandedId === study.id ? null : study.id)}
              className="glass rounded-lg border border-cyan-glow/20 hover:border-cyan-glow/40 cursor-pointer transition-all group"
            >
              {/* Header */}
              <div className={`p-6 border-b border-cyan-glow/10 ${i18n.language === 'ar' ? 'text-right' : ''}`}>
                <div className={`flex items-start ${i18n.language === 'ar' ? 'flex-row-reverse' : ''} justify-between gap-4`}>
                  <div className="flex-1">
                    <div className={`flex items-center ${i18n.language === 'ar' ? 'flex-row-reverse gap-3' : 'gap-3'} mb-2`}>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-glow transition-colors">
                        {t(`innovation.${study.titleKey}`)}
                      </h3>
                      <span className="text-xs px-3 py-1 rounded-full bg-cyan-glow/10 text-cyan-glow whitespace-nowrap">
                        {t(`innovation.${study.categoryKey}`)}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedId === study.id ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ArrowRight className="w-5 h-5 text-cyan-glow/50" />
                  </motion.div>
                </div>
              </div>

              {/* Expandable content */}
              <motion.div
                animate={{
                  height: expandedId === study.id ? 'auto' : 0,
                  opacity: expandedId === study.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className={`p-6 space-y-6 bg-black/20 ${i18n.language === 'ar' ? 'text-right' : ''}`}>
                  {/* Challenge */}
                  <div>
                    <p className="text-sm font-semibold text-gray-400 mb-2">Challenge</p>
                    <p className="text-gray-300">{t(`innovation.${study.challengeKey}`)}</p>
                  </div>

                  {/* Solution */}
                  <div>
                    <p className="text-sm font-semibold text-gray-400 mb-2">Solution</p>
                    <p className="text-gray-300">{t(`innovation.${study.solutionKey}`)}</p>
                  </div>

                  {/* Result */}
                  <div>
                    <p className="text-sm font-semibold text-cyan-glow mb-2">Result</p>
                    <p className="text-cyan-glow/90">{t(`innovation.${study.resultKey}`)}</p>
                  </div>

                  {/* Tech stack */}
                  <div>
                    <p className="text-sm font-semibold text-gray-400 mb-3">Technology Stack</p>
                    <div className={`flex flex-wrap gap-2 ${i18n.language === 'ar' ? 'flex-row-reverse justify-end' : ''}`}>
                      {study.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs bg-cyan-glow/10 text-cyan-glow/70 border border-cyan-glow/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
