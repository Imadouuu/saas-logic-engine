import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Circuit-to-Code Transition - High-End Cinematic Experience
 * Transforms energy circuit into compiled code with dramatic visual effects
 * Features: Animated SVG circuits, data streams, syntax highlighting, laser scanning
 */
export default function CircuitToCodeTransition() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [displayedCode, setDisplayedCode] = useState('')

  const fullCode = `const architecture = {
  design: 'neural-optimized',
  performance: 'quantum-scale',
  innovation: 'boundless'
}`

  // Typewriter effect for code
  useEffect(() => {
    if (!isVisible) return

    let index = 0
    const timer = setInterval(() => {
      if (index <= fullCode.length) {
        setDisplayedCode(fullCode.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 30)

    return () => clearInterval(timer)
  }, [isVisible])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Data stream particles (binary bits)
  const dataStreamParticles = Array.from({ length: 12 }, (_, i) => i)

  return (
    <div
      ref={containerRef}
      className="relative w-full py-24 px-6 flex items-center justify-center overflow-hidden bg-gradient-to-b from-black/30 via-black/10 to-black/30 mt-56"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(0,217,255,.05)_25%,rgba(0,217,255,.05)_26%,transparent_27%,transparent_74%,rgba(0,217,255,.05)_75%,rgba(0,217,255,.05)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
      </div>

      {/* Main container with max width */}
      <div className="relative w-full max-w-3xl">
        {/* Energy-to-Logic Converter Label */}
        <motion.div
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: -10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-xs font-mono text-cyan-400/60 bg-black/50 px-3 py-1 rounded-full border border-cyan-500/30">
            ⚡ ENERGY-TO-LOGIC CONVERTER
          </span>
        </motion.div>

        {/* Two-Box Container with increased spacing */}
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* ===== CIRCUIT BOX ===== */}
          <motion.div
            className="relative h-40 rounded-xl border border-cyan-500/40 overflow-hidden backdrop-blur-xl"
            style={{
              background: 'radial-gradient(circle at 30% 50%, rgba(0, 217, 255, 0.08) 0%, rgba(0, 217, 255, 0.02) 40%, transparent 100%)',
              boxShadow: '0 0 30px rgba(0, 217, 255, 0.15), inset 0 0 30px rgba(0, 217, 255, 0.05)',
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Circuit Label */}
            <div className="absolute top-3 left-4 text-xs font-mono text-cyan-400/70">
              &gt; CIRCUIT_NETWORK
            </div>

            {/* Animated SVG Circuit */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 800 300"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* Glow filter */}
                <filter id="pathGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Animated gradient for flowing light */}
                <linearGradient id="energyFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(0, 217, 255, 0.1)" />
                  <stop offset="30%" stopColor="rgba(0, 217, 255, 0.8)" />
                  <stop offset="70%" stopColor="rgba(0, 217, 255, 0.8)" />
                  <stop offset="100%" stopColor="rgba(0, 217, 255, 0.1)" />
                </linearGradient>

                {/* Pulse animation for nodes */}
                <radialGradient id="nodePulse">
                  <stop offset="0%" stopColor="rgba(0, 217, 255, 0.9)" />
                  <stop offset="100%" stopColor="rgba(0, 217, 255, 0.2)" />
                </radialGradient>
              </defs>

              {/* Multiple animated circuit paths */}
              {[0, 1, 2].map((row) => (
                <g key={`circuit-row-${row}`}>
                  {/* Horizontal flowing paths */}
                  <motion.path
                    d={`M 50 ${80 + row * 60} Q 200 ${70 + row * 60} 350 ${80 + row * 60} T 700 ${80 + row * 60}`}
                    stroke="url(#energyFlow)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#pathGlow)"
                    initial={{ strokeDashoffset: 650 }}
                    animate={isVisible ? { strokeDashoffset: 0 } : { strokeDashoffset: 650 }}
                    transition={{
                      duration: 2.5,
                      delay: 0.4 + row * 0.15,
                      ease: 'easeInOut',
                    }}
                    strokeDasharray="650"
                  />

                  {/* Vertical connectors */}
                  <motion.path
                    d={`M 200 ${60 + row * 60} L 200 ${100 + row * 60}`}
                    stroke="rgba(0, 217, 255, 0.4)"
                    strokeWidth="1"
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5 + row * 0.2 }}
                  />
                  <motion.path
                    d={`M 500 ${60 + row * 60} L 500 ${100 + row * 60}`}
                    stroke="rgba(0, 217, 255, 0.4)"
                    strokeWidth="1"
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5 + row * 0.2 }}
                  />
                </g>
              ))}

              {/* Pulsing circuit nodes */}
              {[50, 200, 350, 500, 700].map((x, idx) => (
                <motion.g key={`node-group-${idx}`}>
                  {/* Outer glow circle */}
                  <motion.circle
                    cx={x}
                    cy="150"
                    r="8"
                    fill="none"
                    stroke="rgba(0, 217, 255, 0.3)"
                    initial={{ r: 8 }}
                    animate={isVisible ? { r: 12 } : { r: 8 }}
                    transition={{
                      duration: 1.5,
                      delay: 0.6 + idx * 0.1,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                  {/* Core node */}
                  <motion.circle
                    cx={x}
                    cy="150"
                    r="4"
                    fill="url(#nodePulse)"
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                  />
                </motion.g>
              ))}
            </svg>
          </motion.div>

          {/* ===== DATA STREAM SECTION ===== */}
          <motion.div
            className="relative h-12 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.5 }}
          >
            {/* Glowing connector line */}
            <div className="absolute inset-x-1/3 top-0 h-full flex items-center justify-center">
              <motion.div
                className="w-px h-full"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0, 217, 255, 0.8), rgba(0, 217, 255, 0.2))',
                  boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)',
                }}
                initial={{ scaleY: 0 }}
                animate={isVisible ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1.5, delay: 1.5 }}
              />
            </div>

            {/* Data stream particles - binary bits flowing down */}
            <div className="absolute inset-0 flex items-start justify-center pt-2">
              {dataStreamParticles.map((i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute text-xs font-mono text-cyan-400/80"
                  initial={{ y: -30, opacity: 0 }}
                  animate={
                    isVisible
                      ? {
                          y: [0, 50],
                          opacity: [1, 0],
                        }
                      : { y: -30, opacity: 0 }
                  }
                  transition={{
                    duration: 1.5,
                    delay: 1.8 + i * 0.08,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  style={{
                    left: `calc(50% + ${(i - 5.5) * 15}px)`,
                  }}
                >
                  {i % 2 === 0 ? '1' : '0'}
                </motion.div>
              ))}
            </div>

            {/* Status text */}
            <motion.div className="absolute left-0 text-xs font-mono text-cyan-400/60">
              &gt; streaming
            </motion.div>
            <motion.div className="absolute right-0 text-xs font-mono text-cyan-400/60">
              compiling &lt;
            </motion.div>
          </motion.div>

          {/* ===== CODE BOX ===== */}
          <motion.div
            className="relative h-48 rounded-xl border border-cyan-500/40 overflow-hidden backdrop-blur-xl font-mono text-sm leading-relaxed"
            style={{
              background: '#282a36',
              boxShadow: '0 0 30px rgba(0, 217, 255, 0.15), inset 0 0 30px rgba(0, 217, 255, 0.03)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Code label */}
            <div className="absolute top-3 left-4 text-xs text-cyan-400/70">
              &gt; OUTPUT.js
            </div>

            {/* Scanning laser effect */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.8), transparent)',
                boxShadow: '0 0 10px rgba(0, 217, 255, 0.6)',
              }}
              initial={{ y: 30 }}
              animate={
                isVisible
                  ? {
                      y: [30, 190],
                    }
                  : { y: 30 }
              }
              transition={{
                duration: 3,
                delay: 2,
                repeat: Infinity,
                repeatDelay: 2,
                ease: 'linear',
              }}
            />

            {/* Code content with Dracula syntax highlighting */}
            <div className="p-6 pt-12 h-full overflow-hidden">
              <pre className="text-xs h-full whitespace-pre-wrap break-words max-w-full overflow-hidden" style={{ color: '#f8f8f2' }}>
                {displayedCode}
                {displayedCode.length < fullCode.length && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-cyan-400"
                  >
                    │
                  </motion.span>
                )}
              </pre>
            </div>

            {/* Compilation status indicator - positioned absolutely without overlap */}
            <motion.div
              className="absolute bottom-6 right-6 text-xs font-mono text-cyan-400/70 flex items-center gap-2 z-20"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 2.5 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span>Compiled</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Glassmorphism enhancement orbs */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute left-0 top-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-20" />
          <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl opacity-10" />
        </div>
      </div>
    </div>
  )
}
