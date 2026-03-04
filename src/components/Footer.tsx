import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type PageType = 'home' | 'privacy' | 'terms'

interface FooterProps {
  onContactClick: () => void
  onNavigateToPage?: (page: PageType) => void
}

export default function Footer({ onContactClick, onNavigateToPage }: FooterProps) {
  const { t, i18n } = useTranslation()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: t('footer.github'),
      icon: Github,
      href: 'https://github.com/Imadouuu?tab=repositories',
      label: 'View code & projects',
    },
    {
      name: t('footer.linkedin'),
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/mayor-imo-440184294/',
      label: 'Connect professionally',
    },
    {
      name: t('footer.contact'),
      icon: Mail,
      onClick: onContactClick,
      label: 'imadnasri15@gmail.com',
    },
  ]

  return (
    <footer className={`relative w-full py-16 px-4 md:px-8 border-t border-cyan-glow/10 bg-black/40 ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Primary CTA */}
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-black">
              {t('footer.description')}
            </h3>
            <p className="text-gray-400 max-w-2xl">
              Whether you need custom SaaS development, AI animation production, or intelligent automation—let's discuss how I can solve your specific technical challenges.
            </p>
            <motion.button
              whileHover={{ x: i18n.language === 'ar' ? -5 : 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContactClick}
              className="px-8 py-3 bg-cyan-glow text-black font-bold rounded-lg flex items-center gap-2 hover:bg-cyan-glow/90 transition-all"
            >
              Start Your Project
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Contact methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {socialLinks.map((link) => {
              const IconComponent = link.icon
              const isEmail = 'onClick' in link

              return (
                <motion.div
                  key={link.name}
                  whileHover={{ x: i18n.language === 'ar' ? -5 : 5 }}
                  className={isEmail ? 'cursor-pointer' : ''}
                  onClick={isEmail ? link.onClick : undefined}
                >
                  <a
                    href={!isEmail ? link.href : undefined}
                    target={!isEmail ? '_blank' : undefined}
                    rel={!isEmail ? 'noopener noreferrer' : undefined}
                    className="group flex items-start gap-4 p-4 rounded-lg border border-cyan-glow/20 hover:border-cyan-glow/50 hover:bg-cyan-glow/5 transition-all"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-lg bg-cyan-glow/10 flex items-center justify-center group-hover:bg-cyan-glow/20 transition-colors">
                        <IconComponent className="w-5 h-5 text-cyan-glow" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white mb-1">{link.name}</h4>
                      <p className="text-sm text-gray-400 truncate">{link.label}</p>
                    </div>
                  </a>
                </motion.div>
              )
            })}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-cyan-glow/0 via-cyan-glow/20 to-cyan-glow/0" />

          {/* Footer info */}
          <div className={`flex flex-col ${i18n.language === 'ar' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between gap-4 text-sm text-gray-400`}>
            <div>
              <p>© {currentYear} Imad Nasseri. {t('footer.copyright')}</p>
            </div>
            <div className={`flex gap-6 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <motion.button
                onClick={() => onNavigateToPage?.('privacy')}
                className="hover:text-cyan-glow transition-colors hover:underline"
              >
                {t('footer.privacyPolicy')}
              </motion.button>
              <motion.button
                onClick={() => onNavigateToPage?.('terms')}
                className="hover:text-cyan-glow transition-colors hover:underline"
              >
                {t('footer.termsOfService')}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle background accent */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-cyan-glow/5 rounded-full blur-3xl opacity-30 pointer-events-none" />
    </footer>
  )
}
