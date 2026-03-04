import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface TermsOfServiceProps {
  onBack: () => void
}

export default function TermsOfService({ onBack }: TermsOfServiceProps) {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  const termsData = t('termsOfService', { returnObjects: true }) as any

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
            {termsData.title}
          </h1>
          <p className="text-sm text-gray-400">{termsData.lastUpdated}</p>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            {termsData.introduction}
          </p>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-8 mb-16"
        >
          {termsData.sections?.map((section: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.6 }}
              className="glass rounded-xl p-6 md:p-8 border border-cyan-glow/20 hover:border-cyan-glow/40 transition-all group relative"
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

        {/* Acceptance Legal Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass rounded-xl p-8 border-2 border-cyan-glow/40 bg-gradient-to-br from-cyan-glow/10 via-black/40 to-purple-glow/5 space-y-6"
        >
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-glow flex-shrink-0 mt-2" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                {isArabic ? 'قبول الشروط' : 'Acceptance of Terms'}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {isArabic
                  ? 'بالمتابعة في استخدام خدماتنا، فإنك تقبل بصراحة شروط الخدمة هذه. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدماتنا.'
                  : 'By continuing to use our services, you explicitly accept these Terms of Service. If you do not agree with any part of these terms, please do not use our services.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-glow flex-shrink-0 mt-2" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                {isArabic ? 'التواصل القانوني' : 'Legal Contact'}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {isArabic
                  ? 'لأي استفسارات أو مخاوف قانونية بخصوص هذه الشروط:'
                  : 'For any legal inquiries or concerns regarding these terms:'}
              </p>
              <a
                href="mailto:imadnasri15@gmail.com"
                className="inline-block mt-3 px-6 py-2 bg-cyan-glow/20 hover:bg-cyan-glow/40 text-cyan-glow font-semibold rounded-lg transition-all border border-cyan-glow/50"
              >
                imadnasri15@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle background accent */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-cyan-glow/5 rounded-full blur-3xl opacity-20 pointer-events-none" />
    </section>
  )
}
