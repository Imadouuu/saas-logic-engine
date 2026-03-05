import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Command Terminal - Minimalist glassmorphic floating command interface
 * Auto-types welcome message simulating AI system startup
 */
export default function CommandTerminal() {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const welcomeMessage =
    'SYSTEM_ARCHITECT_ONLINE: How can I optimize your workflow today?'

  useEffect(() => {
    if (displayedText.length < welcomeMessage.length) {
      const timer = setTimeout(() => {
        setDisplayedText(welcomeMessage.slice(0, displayedText.length + 1))
      }, 40) // Typing speed

      return () => clearTimeout(timer)
    } else {
      setIsComplete(true)
    }
  }, [displayedText])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="fixed bottom-6 left-6 right-6 z-40 md:bottom-8 md:left-8 md:right-auto md:w-96"
    >
      {/* Glassmorphic terminal container with multi-layered precision glow */}
      <div 
        className="glass-premium rounded-lg p-4 border border-cyan-500/40 relative"
        style={{
          boxShadow: `
            0 0 1px 1px rgba(0, 217, 255, 0.8),
            0 0 4px 2px rgba(0, 217, 255, 0.5),
            0 0 8px 3px rgba(0, 217, 255, 0.3),
            0 0 16px 4px rgba(0, 217, 255, 0.15),
            0 0 24px 6px rgba(78, 205, 196, 0.1),
            0 0 32px 8px rgba(0, 217, 255, 0.05),
            inset 0 0 20px 1px rgba(0, 217, 255, 0.1),
            inset 0 0 40px 2px rgba(78, 205, 196, 0.05)
          `,
        }}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-cyan-500/20">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs font-mono text-cyan-400/70">
            ARCHITECT_TERMINAL_V1.0
          </span>
        </div>

        {/* Terminal content */}
        <div className="space-y-2">
          {/* Prompt line */}
          <div className="flex items-center gap-2 font-mono text-sm">
            <span className="text-cyan-400">$</span>
            <span className="text-gray-300">initialize</span>
          </div>

          {/* Welcome message with typewriter effect */}
          <motion.div
            className="font-mono text-xs leading-relaxed text-cyan-300/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {displayedText.split('').map((char, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.1,
                  delay: idx * 0.02,
                }}
                className={
                  char === ':' ? 'text-green-400' : 'inherit'
                }
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}

            {/* Blinking cursor */}
            {!isComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                }}
                className="inline-block w-1.5 h-4 bg-cyan-400 ml-1"
              />
            )}
          </motion.div>

          {/* Input prompt when complete */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 font-mono text-xs pt-2 border-t border-cyan-500/20 mt-2"
            >
              <span className="text-cyan-400">›</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="text-gray-400 text-[10px]"
              >
                Listening for commands...
              </motion.span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
