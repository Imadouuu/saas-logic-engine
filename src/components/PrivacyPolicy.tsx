import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface PrivacyPolicyProps {
  onBack: () => void
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  const privacyData = t('privacyPolicy', { returnObjects: true }) as any

  return (
    <section
      className={`relative min-h-screen w-full py-20 px-4 md:px-8 transition-all ${
        isArabic ? 'rtl' : 'ltr'
      }`}
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,217,255,1)_0.5px,transparent_0.5px),linear-gradient(rgba(0,217,255,1)_0.5px,transparent_0.5px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className={`flex items-center gap-2 mb-8 px-4 py-2 border border-cyan-glow/30 rounded-lg hover:border-cyan-glow/60 hover:bg-cyan-glow/5 transition-all group ${
            isArabic ? 'flex-row-reverse' : ''
          }`}
        >
          <ArrowLeft className={`w-4 h-4 text-cyan-glow group-hover:translate-x-[-4px] transition-transform ${isArabic ? 'rotate-180' : ''}`} />
          <span className="text-cyan-glow font-semibold">{isArabic ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home'}</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 space-y-4"
        >
          <h1 className="text-5xl md:text-6xl font-black leading-tight text-white">
            {privacyData.title}
          </h1>
          <p className="text-sm text-gray-400">{privacyData.lastUpdated}</p>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            {privacyData.introduction}
          </p>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-8 mb-16"
        >
          {privacyData.sections?.map((section: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.6 }}
              className="glass rounded-xl p-6 md:p-8 border border-cyan-glow/20 hover:border-cyan-glow/40 transition-all group"
            >
              {/* Section Title with Glow */}
              <motion.h2
                className="text-2xl font-bold text-cyan-glow mb-4 group-hover:text-white transition-colors"
                animate={{
                  textShadow: [
                    '0 0 10px rgba(0, 217, 255, 0.3)',
                    '0 0 20px rgba(0, 217, 255, 0.5)',
                    '0 0 10px rgba(0, 217, 255, 0.3)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {section.title}
              </motion.h2>

              {/* Section Content */}
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                {section.content}
              </p>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/20 to-transparent rounded-full" />
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass rounded-xl p-8 border border-cyan-glow/30 bg-gradient-to-br from-cyan-glow/5 via-transparent to-purple-glow/5 text-center space-y-4"
        >
          <h3 className="text-2xl font-bold text-white">
            {isArabic ? 'لديك أسئلة؟' : 'Have Questions?'}
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {isArabic
              ? 'إذا كان لديك أي استفسارات حول خصوصيتك أو كيفية معالجة بيانات بيانات الخاص بك، فلا تتردد في الاتصال بنا.'
              : 'If you have any questions about your privacy or how your data is processed, please reach out to us.'}
          </p>
          <a
            href="mailto:imadnasri15@gmail.com"
            className="inline-block px-8 py-3 bg-cyan-glow text-black font-bold rounded-lg hover:bg-cyan-glow/90 transition-all hover:shadow-lg hover:shadow-cyan-glow/50"
          >
            imadnasri15@gmail.com
          </a>
        </motion.div>
      </div>

      {/* Subtle background accent */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-cyan-glow/5 rounded-full blur-3xl opacity-20 pointer-events-none" />
    </section>
  )
}
