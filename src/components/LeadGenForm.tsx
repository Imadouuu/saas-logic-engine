import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ROIMetrics } from '../hooks/useROICalculator'
import { generateEmailBody } from '../utils/pdfGenerator'
import ThankYouReceipt from './ThankYouReceipt'

interface LeadGenFormProps {
  onClose: () => void
  roiMetrics?: ROIMetrics | null
}

export default function LeadGenForm({ onClose, roiMetrics }: LeadGenFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const { t, i18n } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'other',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Create dynamic email body with ROI metrics if available
      const emailBody = roiMetrics
        ? generateEmailBody(formData, roiMetrics, i18n.language === 'ar')
        : `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}`
      
      // Using mailto with encoded subject and body
      const subject = roiMetrics
        ? encodeURIComponent(`Optimization Protocol Initiated - ${formData.name}`)
        : encodeURIComponent(`New Inquiry from ${formData.name} - ${formData.projectType}`)
      
      const body = encodeURIComponent(emailBody)
      
      window.location.href = `mailto:imadnasri15@gmail.com?subject=${subject}&body=${body}`
      
      // Show receipt modal if ROI metrics available
      if (roiMetrics) {
        setShowReceipt(true)
        setSubmitted(true)
      } else {
        setSubmitted(true)
        setTimeout(() => {
          onClose()
        }, 1500)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseReceipt = () => {
    setShowReceipt(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {!submitted ? (
        <motion.div
          key="form"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={`glass rounded-lg p-8 border border-cyan-glow/30 max-w-md ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-4 ${i18n.language === 'ar' ? 'left-4' : 'right-4'} p-2 hover:bg-white/10 rounded-lg transition-colors`}
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>

          <h3 className="text-2xl font-bold mb-2 text-white">
            {t('form.title')}
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            {t('form.subtitle')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">{t('form.name')}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('form.name')}
                required
                className={`w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-600 focus:border-cyan-glow focus:outline-none text-white placeholder-gray-500 transition-colors ${i18n.language === 'ar' ? 'text-right' : ''}`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">{t('form.email')}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className={`w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-600 focus:border-cyan-glow focus:outline-none text-white placeholder-gray-500 transition-colors ${i18n.language === 'ar' ? 'text-right' : ''}`}
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">{t('form.company')}</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={t('form.company')}
                className={`w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-600 focus:border-cyan-glow focus:outline-none text-white placeholder-gray-500 transition-colors ${i18n.language === 'ar' ? 'text-right' : ''}`}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">{t('form.message')}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('form.message')}
                rows={4}
                required
                className={`w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-600 focus:border-cyan-glow focus:outline-none text-white placeholder-gray-500 transition-colors resize-none ${i18n.language === 'ar' ? 'text-right' : ''}`}
              />
            </div>

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-cyan-glow text-black font-bold rounded-lg hover:bg-cyan-glow/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {isLoading ? t('form.submitting') : t('form.submit')}
            </motion.button>

            <p className="text-xs text-gray-500 text-center">
              This will open your email client to send directly to imadnasri15@gmail.com
            </p>
          </form>
        </motion.div>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={`glass rounded-lg p-8 border border-cyan-glow/30 text-center max-w-md ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="w-14 h-14 rounded-full bg-cyan-glow/20 mx-auto mb-4 flex items-center justify-center border border-cyan-glow/50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
              className="text-2xl"
            >
              ✓
            </motion.div>
          </motion.div>
          <h3 className="text-2xl font-bold mb-2 text-white">{t('form.success')}</h3>
          <p className="text-gray-400 text-sm">
            I'll review your message and get back to you within 24 hours.
          </p>
        </motion.div>
      )}

      {/* Thank You Receipt Modal */}
      <ThankYouReceipt
        isOpen={showReceipt}
        metrics={roiMetrics || null}
        formData={formData}
        onClose={handleCloseReceipt}
      />
    </AnimatePresence>
  )
}
