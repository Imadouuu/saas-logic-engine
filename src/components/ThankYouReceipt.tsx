import { motion, AnimatePresence } from 'framer-motion'
import { Download, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ROIMetrics } from '../hooks/useROICalculator'
import { generatePDFReport } from '../utils/pdfGenerator'

interface ThankYouReceiptProps {
  isOpen: boolean
  metrics: ROIMetrics | null
  formData: {
    name: string
    email: string
    company: string
  }
  onClose: () => void
}

export default function ThankYouReceipt({
  isOpen,
  metrics,
  formData,
  onClose,
}: ThankYouReceiptProps) {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  const handleDownloadPDF = () => {
    if (metrics) {
      generatePDFReport(metrics, formData, isArabic)
    }
  }

  if (!metrics) return null

  const frictionLossPercentage = Math.round(metrics.frictionLoss)
  const hoursRecovered = Math.round(metrics.latencyRecovered)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="receipt-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            key="receipt-card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className={`glass rounded-xl p-8 max-w-2xl w-full border border-cyan-glow/40 shadow-2xl ${isArabic ? 'rtl text-right' : 'ltr text-left'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Data Transmitting Animation */}
            <motion.div
              className="flex items-center justify-center gap-2 mb-8"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 rounded-full bg-cyan-glow" />
              <div className="w-2 h-2 rounded-full bg-cyan-glow" />
              <div className="w-2 h-2 rounded-full bg-cyan-glow" />
              <span className="text-cyan-glow text-sm font-semibold ml-3">
                {t('receipt.transmitting')}
              </span>
            </motion.div>

            {/* Header */}
            <div className="mb-8 border-b border-cyan-glow/20 pb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                {t('receipt.title')}
              </h2>
              <p className="text-gray-400 text-sm">
                {t('receipt.timestamp', { date: new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US') })}
              </p>
            </div>

            {/* Personalized Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-cyan-glow/10 to-gold-glow/10 rounded-lg p-6 mb-8 border border-cyan-glow/20"
            >
              <p className="text-white leading-relaxed mb-4">
                {t('receipt.personalMessage', {
                  name: formData.name,
                  hours: hoursRecovered,
                })}
              </p>
              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  <span className="text-cyan-glow font-semibold">
                    {t('receipt.automationBenefit')}:
                  </span>{' '}
                  {t('receipt.recoveredCapacity', { hours: hoursRecovered })}
                </p>
                <p>
                  <span className="text-gold-glow font-semibold">
                    {t('receipt.expectedOutcome')}:
                  </span>{' '}
                  {t('receipt.strategicShift')}
                </p>
              </div>
            </motion.div>

            {/* Receipt Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 rounded-lg p-4 border border-cyan-glow/20"
              >
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  {t('receipt.frictionLoss')}
                </p>
                <p className="text-2xl font-bold text-cyan-glow">
                  {frictionLossPercentage}%
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {t('receipt.currentSystemLoss')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 rounded-lg p-4 border border-cyan-glow/20"
              >
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  {t('receipt.annualCost')}
                </p>
                <p className="text-2xl font-bold text-gold-glow">
                  ${(metrics.totalAnnualManualCost / 1000).toFixed(1)}K
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {t('receipt.operationalBurden')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 rounded-lg p-4 border border-cyan-glow/20"
              >
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  {t('receipt.capitalRecovered')}
                </p>
                <p className="text-2xl font-bold text-green-400">
                  ${(metrics.annualSavings / 1000).toFixed(1)}K
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {t('receipt.yearOneRecovery')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 rounded-lg p-4 border border-cyan-glow/20"
              >
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  {t('receipt.paybackTimeline')}
                </p>
                <p className="text-2xl font-bold text-orange-400">
                  {Math.round(metrics.paybackMonths)} {t('receipt.months')}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {t('receipt.toROI')}
                </p>
              </motion.div>
            </div>

            {/* Auto-Responder Message Preview */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 rounded-lg p-6 mb-8 border border-cyan-glow/20"
            >
              <h3 className="text-sm font-semibold text-cyan-glow uppercase tracking-wider mb-4">
                {t('receipt.autoResponderPreview')}
              </h3>
              <div className="space-y-3 text-sm text-gray-300 font-mono">
                <p>
                  <span className="text-gray-500">{t('receipt.subject')}:</span>{' '}
                  <span className="text-white">
                    {t('receipt.subjectLine', { name: formData.name })}
                  </span>
                </p>
                <div className="bg-black/20 rounded p-4 border border-gray-700 text-xs leading-relaxed">
                  <p className="text-gray-300 mb-2">{t('receipt.messageGreeting')}</p>
                  <p className="text-cyan-glow mb-3">
                    {t('receipt.messageBody', { hours: hoursRecovered })}
                  </p>
                  <p className="text-gray-400">
                    {t('receipt.messageClosure')}
                  </p>
                  <p className="text-gray-500 mt-3">{t('receipt.messageSigned')}</p>
                </div>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-cyan-glow/5 to-gold-glow/5 rounded-lg p-6 mb-8 border border-cyan-glow/20"
            >
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                {t('receipt.nextSteps')}
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-glow font-bold mt-0.5">1.</span>
                  <span>{t('receipt.step1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-glow font-bold mt-0.5">2.</span>
                  <span>{t('receipt.step2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-glow font-bold mt-0.5">3.</span>
                  <span>{t('receipt.step3')}</span>
                </li>
              </ul>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex gap-4 flex-col sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownloadPDF}
                className="flex items-center justify-center gap-2 flex-1 px-6 py-3 bg-gradient-to-r from-cyan-glow to-cyan-glow/80 text-black font-bold rounded-lg hover:from-cyan-glow/90 hover:to-cyan-glow/70 transition-all"
              >
                <Download className="w-4 h-4" />
                {t('receipt.downloadPDF')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, borderColor: 'rgb(0, 217, 255)' }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex items-center justify-center gap-2 flex-1 px-6 py-3 bg-white/5 border border-cyan-glow/40 text-white font-bold rounded-lg hover:bg-white/10 transition-all"
              >
                {t('receipt.closeModal')}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Closing Message */}
            <p className="text-xs text-gray-500 text-center mt-6">
              {t('receipt.closingNote')}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
