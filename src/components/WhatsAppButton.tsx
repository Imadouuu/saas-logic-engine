import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function WhatsAppButton() {
  const { i18n } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLAnchorElement>(null)

  const whatsappNumber = '+21367979054'
  const magneticRadius = 80 // Attraction radius in pixels
  const messages = {
    en: "Hello Imad, I just completed your ROI audit and I'm interested in automating my business processes.",
    ar: 'مرحباً عماد، لقد أتممت للتو تدقيق العائد على الاستثمار وأنا مهتم بأتمتة عمليات شركتي.',
  }

  const tooltips = {
    en: 'Consult the Architect',
    ar: 'استشر مهندس النظام',
  }

  // Slide up animation with 2-second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Magnetic attraction effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current || !isHovered) return

      const buttonRect = buttonRef.current.getBoundingClientRect()
      const buttonCenterX = buttonRect.left + buttonRect.width / 2
      const buttonCenterY = buttonRect.top + buttonRect.height / 2

      const distance = Math.hypot(
        e.clientX - buttonCenterX,
        e.clientY - buttonCenterY
      )

      if (distance < magneticRadius) {
        // Calculate attraction vector
        const angle = Math.atan2(
          e.clientY - buttonCenterY,
          e.clientX - buttonCenterX
        )
        const pull = (magneticRadius - distance) / magneticRadius // 0 to 1

        setOffset({
          x: Math.cos(angle) * pull * 15,
          y: Math.sin(angle) * pull * 15,
        })
      } else {
        setOffset({ x: 0, y: 0 })
      }
    }

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isHovered])

  const currentLanguage = i18n.language.startsWith('ar') ? 'ar' : 'en'
  const message = messages[currentLanguage]
  const tooltip = tooltips[currentLanguage]
  const isRTL = i18n.language.startsWith('ar')

  // Generate WhatsApp link
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`

  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const pulseVariants = {
    rest: {
      scale: 1,
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: 'easeInOut',
      },
    },
  }

  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className={`fixed z-50 ${isRTL ? 'left-6' : 'right-6'} bottom-6 pointer-events-none`}
    >
      {/* Tooltip */}
      <motion.div
        variants={tooltipVariants}
        animate={isHovered ? 'visible' : 'hidden'}
        className={`absolute bottom-full mb-3 px-4 py-2 rounded-lg bg-black/40 backdrop-blur-md border border-cyan-500/30 whitespace-nowrap ${
          isRTL ? 'right-0' : 'left-0'
        }`}
      >
        <span className="text-xs font-medium text-cyan-400">{tooltip}</span>
      </motion.div>

      {/* Button */}
      <motion.a
        ref={buttonRef}
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        variants={pulseVariants}
        initial="rest"
        animate={isVisible ? 'pulse' : 'rest'}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setOffset({ x: 0, y: 0 })
        }}
        aria-label="Consult the Architect on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-cyan-900/30 to-black/50 border border-cyan-500/80 backdrop-blur-md hover:border-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 cursor-pointer group pointer-events-auto"
        whileHover={{
          borderColor: 'rgba(34, 211, 238, 1)',
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)',
        }}
        style={{
          x: offset.x,
          y: offset.y,
        }}
      >
        {/* WhatsApp SVG Icon - Cyan colored */}
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-cyan-400 group-hover:text-cyan-300 transition-colors relative z-10"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.51.946-2.4 2.423-2.4 4.099 0 .992.292 1.955.84 2.831L2.5 23l2.755-.897c.52.289 1.163.469 1.85.469h.006c5.211 0 9.448-4.24 9.448-9.452 0-2.529-.978-4.902-2.757-6.691-1.784-1.784-4.165-2.766-6.679-2.766" />
        </svg>
      </motion.a>
    </motion.div>
  )
}

