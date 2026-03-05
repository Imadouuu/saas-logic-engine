import { motion } from 'framer-motion'

/**
 * Digital Architect Placeholder Component
 * High-fidelity video/animation asset with glassmorphism overlay
 * Acts as a container for animated character representation
 */

interface DigitalArchitectPlaceholderProps {
  isVisible?: boolean
}

export default function DigitalArchitectPlaceholder({
  isVisible = true,
}: DigitalArchitectPlaceholderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="absolute right-0 top-1/2 transform -translate-y-1/2 w-full max-w-2xl h-96 pointer-events-none"
    >
      {/* Glassmorphism Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-cyan-glow/10 via-transparent to-purple-glow/5 border border-cyan-glow/20 shadow-2xl shadow-cyan-glow/20">
        
        {/* Video/Animation Placeholder - High-Fidelity Asset Slot */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/40 via-black/20 to-black/40">
          {/* 
            ASSET SLOT: Replace this with:
            
            Option A - Video:
            <video
              src="/assets/digital-architect.mp4"
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
            
            Option B - Animated Lottie/Rive:
            <Lottie animationData={architectAnimation} />
            
            Option C - Three.js Model:
            <Character3DModel />
            
            Option D - Anime-style Illustration (Static or Animated SVG):
            <svg>...</svg>
          */}
          
          {/* Placeholder gradient + neural pattern */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 8,
              ease: 'linear',
              repeat: Infinity,
            }}
            style={{
              backgroundImage:
                'linear-gradient(45deg, #00d9ff 0%, transparent 50%, #a855f7 100%)',
              backgroundSize: '200% 200%',
            }}
          />

          {/* Pulsing Neural Nodes Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-64 h-64 rounded-full border-2 border-cyan-glow/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute w-48 h-48 rounded-full border-2 border-purple-glow/20"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: 0.5,
              }}
            />

            {/* Center focal point with glow */}
            <motion.div
              className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-cyan-glow to-purple-glow shadow-lg shadow-cyan-glow"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0, 217, 255, 0.6)',
                  '0 0 40px rgba(0, 217, 255, 0.9)',
                  '0 0 20px rgba(0, 217, 255, 0.6)',
                ],
              }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            />


          </div>
        </div>

        {/* Glassmorphism effect layers */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top gradient reflection */}
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-cyan-glow/20 to-transparent opacity-40" />
          
          {/* Bottom shadow gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
        </div>

        {/* Scan line effect (optional) */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-glow/5 to-transparent pointer-events-none"
          animate={{
            y: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            ease: 'linear',
            repeat: Infinity,
          }}
          style={{
            height: '100%',
            backgroundSize: '100% 100px',
          }}
        />
      </div>

      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-cyan-glow/30 pointer-events-none"
        animate={{
          boxShadow: [
            '0 0 20px rgba(0, 217, 255, 0.2)',
            '0 0 40px rgba(0, 217, 255, 0.4)',
            '0 0 20px rgba(0, 217, 255, 0.2)',
          ],
        }}
        transition={{
          duration: 3,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />
    </motion.div>
  )
}
