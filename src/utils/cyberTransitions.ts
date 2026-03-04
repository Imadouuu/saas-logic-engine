import { Variants } from 'framer-motion'

/**
 * Cyber-Transition Animation Utilities
 * Reusable Framer Motion variants for glitch-in and smooth-fade effects
 */

// Glitch-in effect: rapid position shifts revealing content
export const glitchInVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      // Add stagger for multi-character glitch effect
    },
  },
}

// Smooth fade with digital shimmer
export const smoothFadeVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: 'brightness(0.8)',
  },
  visible: {
    opacity: 1,
    filter: 'brightness(1)',
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    filter: 'brightness(0.8)',
    transition: {
      duration: 0.4,
    },
  },
}

// Glitch character-by-character reveal
export const glitchCharacterVariants: Variants = {
  hidden: { opacity: 0, x: -10, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: [0.34, 1.56, 0.64, 1], // Custom spring curve
    },
  }),
}

// Digital shimmer effect for language transitions
export const shimmerVariants: Variants = {
  hidden: {
    backgroundPosition: '200% center',
  },
  visible: {
    backgroundPosition: '-200% center',
    transition: {
      duration: 1.5,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
}

// Pulsing glow effect for highlights
export const pulseGlowVariants: Variants = {
  hidden: {
    boxShadow: '0 0 0px rgba(0, 217, 255, 0)',
  },
  visible: {
    boxShadow: [
      '0 0 10px rgba(0, 217, 255, 0.5)',
      '0 0 20px rgba(0, 217, 255, 0.8)',
      '0 0 10px rgba(0, 217, 255, 0.5)',
    ],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}

// Fade in with scale for modal-like elements
export const fadeScaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
}

// Stagger container for multiple elements
export const staggerContainerVariants = (staggerDelay = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.2,
    },
  },
})

// Slide in from left
export const slideInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// Slide in from right
export const slideInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// Bounce entrance for attention-grabbing
export const bounceEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  },
}

// Cyber grid scan effect (vertical reveal)
export const gridScanVariants: Variants = {
  hidden: {
    clipPath: 'inset(0% 0% 100% 0%)',
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
}

// Text reveal (letter by letter with glitch)
export const textRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    textShadow: '0 0 0px rgba(0, 217, 255, 0)',
  },
  visible: {
    opacity: 1,
    textShadow: '0 0 10px rgba(0, 217, 255, 0.5)',
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
}

// Floating animation (subtle up/down movement)
export const floatVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}

/**
 * Helper function to create language-aware animation
 * Applies RTL adjustments for Arabic language
 */
export const getDirectionAwareVariants = (
  isArabic: boolean,
  baseVariants: Variants
): Variants => {
  if (!isArabic) return baseVariants

  // Mirror x translations for RTL
  return Object.entries(baseVariants).reduce(
    (acc, [key, variant]) => {
      if (typeof variant === 'object' && variant !== null) {
        const rtlVariant = { ...variant }
        if ('x' in rtlVariant && typeof rtlVariant.x === 'number') {
          rtlVariant.x = -rtlVariant.x as any
        }
        acc[key] = rtlVariant
      } else {
        acc[key] = variant
      }
      return acc
    },
    {} as Variants
  )
}
