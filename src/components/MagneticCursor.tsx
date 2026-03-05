import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePerformanceDetection'

/**
 * Magnetic Cursor Effect
 * Subtly attracts cursor to interactive elements
 * Creates a high-end agency feel with minimal performance impact
 */
export default function MagneticCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isOverTarget, setIsOverTarget] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const magneticElements = document.querySelectorAll(
      '[data-magnetic]'
    )

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY

      setMousePos({ x, y })

      // Find if cursor is over a magnetic element
      let isOverAny = false

      magneticElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const distance = Math.hypot(
          x - centerX,
          y - centerY
        )

        // Magnetic pull radius: 80px
        const magneticRadius = 80

        if (distance < magneticRadius) {
          isOverAny = true
        }
      })

      setIsOverTarget(isOverAny)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return null
  }

  return (
    <>
      {/* Magnetic cursor circle */}
      <div
        className="pointer-events-none fixed z-[9999] transition-opacity duration-300"
        style={{
          width: '32px',
          height: '32px',
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: isOverTarget ? 0.8 : 0,
        }}
      >
        {/* Outer ring */}
        <div
          className="absolute inset-0 border border-cyan-400/60 rounded-full transition-all duration-200"
          style={{
            transform: isOverTarget
              ? 'scale(1)'
              : 'scale(0.5)',
          }}
        />

        {/* Inner dot */}
        <div
          className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full"
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Glow effect */}
        <div
          className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"
          style={{
            opacity: isOverTarget ? 0.5 : 0,
            transition: 'opacity 0.3s ease-out',
          }}
        />
      </div>

      {/* Magnetic attraction indicator (subtle) */}
      <svg
        className="pointer-events-none fixed z-[9998] w-full h-full top-0 left-0"
        style={{
          opacity: 0.3,
          maskImage:
            'radial-gradient(circle at var(--cursor-x) var(--cursor-y), black 50px, transparent 150px)',
          WebkitMaskImage:
            'radial-gradient(circle at var(--cursor-x) var(--cursor-y), black 50px, transparent 150px)',
        } as any}
      >
        {/* Optional: Connection lines to nearby buttons could go here */}
      </svg>

      <style>{`
        :root {
          --cursor-x: ${mousePos.x}px;
          --cursor-y: ${mousePos.y}px;
        }

        /* Hide default cursor on interactive elements */
        [data-magnetic] {
          cursor: none;
        }
      `}</style>
    </>
  )
}
