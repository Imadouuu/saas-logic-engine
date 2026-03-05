import { useEffect, useRef } from 'react'

/**
 * Visual Effects Component for CRT/Terminal Aesthetic
 * Includes: Scanline Effect, CRT Flicker
 * Applied as an overlay to create retro-futuristic feel
 */
export default function TerminalVisualEffects() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // CRT Flicker effect with realistic randomness
    const flickerInterval = setInterval(() => {
      if (containerRef.current) {
        // 85% chance of no flicker, 15% chance of minor glitch
        const shouldFlicker = Math.random() > 0.85
        if (shouldFlicker) {
          containerRef.current.style.opacity = String(
            0.98 + Math.random() * 0.02
          )
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.style.opacity = String(1)
            }
          }, Math.random() * 50 + 20)
        }
      }
    }, 150)

    return () => clearInterval(flickerInterval)
  }, [])

  return (
    <>
      {/* CRT Flicker & Scanlines Container */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          transition: 'opacity 0.05s ease-out',
          opacity: 1,
        }}
      >
        {/* Scanline Effect - Horizontal lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 2px,
              rgba(0, 217, 255, 0.015) 2px,
              rgba(0, 217, 255, 0.015) 4px
            )`,
            animation: 'scanlineShift 8s linear infinite',
          }}
        />

        {/* Additional subtle scanline for depth */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 1px,
              rgba(0, 217, 255, 0.008) 1px,
              rgba(0, 217, 255, 0.008) 3px
            )`,
            opacity: 0.5,
          }}
        />

        {/* Vignette effect (optional, reduces brightness at edges) */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(
              ellipse at center,
              transparent 0%,
              rgba(0, 0, 0, 0.02) 100%
            )`,
          }}
        />
      </div>

      {/* Global CRT animation styles */}
      <style>{`
        @keyframes scanlineShift {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 10px;
          }
        }

        @keyframes crtFlicker {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.99;
          }
        }

        /* Apply subtle flicker to full page on random intervals */
        @keyframes randomFlicker {
          0% {
            opacity: 1;
            filter: brightness(1) contrast(1);
          }
          5% {
            opacity: 0.98;
            filter: brightness(0.99) contrast(1.01);
          }
          10% {
            opacity: 1;
            filter: brightness(1) contrast(1);
          }
        }

        /* Text glow effect for terminal text (optional) */
        @keyframes textGlow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(0, 217, 255, 0.8);
          }
        }

        /* Apply to terminal-like elements */
        .terminal-text {
          font-family: 'Courier New', monospace;
          animation: textGlow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
