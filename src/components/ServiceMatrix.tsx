import { motion } from 'framer-motion'
import { Code2, Sparkles, Workflow } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const icons = [Sparkles, Code2, Workflow]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function ServiceMatrix() {
  const { t, i18n } = useTranslation()
  const services = t('services.details', { returnObjects: true }) as any[]

  return (
    <section id="services" className="relative w-full py-20 md:py-32 px-4 md:px-8 bg-black/20">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Service cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services && services.map((service, index) => {
            const IconComponent = icons[index % icons.length]
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="glass rounded-lg p-8 border border-cyan-glow/20 hover:border-cyan-glow/40 transition-all group"
              >
                <div className="mb-6">
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-cyan-glow/10 p-3 text-cyan-glow group-hover:bg-cyan-glow/20 transition-colors"
                  >
                    <IconComponent className="w-6 h-6" />
                  </motion.div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-white">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Details list */}
                <ul className={`space-y-2 border-t border-cyan-glow/10 pt-6 ${i18n.language === 'ar' ? 'text-right' : ''}`}>
                  {service.items && service.items.map((detail: string, idx: number) => (
                    <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                      <span className="text-cyan-glow/70 mt-0.5">»</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
