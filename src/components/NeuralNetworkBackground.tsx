import { useEffect, useRef, useState } from 'react'

/**
 * PHYSICS-ENGINEERED HERO BACKGROUND
 * 
 * Represents the 'Logic of Automation' and 'Fluidity of AI'
 * 
 * Core Systems:
 * 1. Constrained Brownian Motion: Particles simulate data packets in a SaaS network
 * 2. Magnetic Attraction: 200px cursor radius with inverse square law physics
 * 3. Connectivity Logic: Distance-based opacity using perceptual physics
 * 4. Cyber-Luxury Aesthetics: Obsidian depth, Electric Cyan accent, Midnight Indigo gradients
 * 5. Performance: Locked 60fps with optimized canvas rendering
 */

interface PhysicsParticle {
  // Position in space
  x: number
  y: number
  // Velocity (data packet momentum)
  vx: number
  vy: number
  // Brownian motion seed
  bx: number
  by: number
  // Visual properties
  radius: number
  baseOpacity: number
  // Physics properties
  mass: number
  damping: number
}

interface VisualConnection {
  from: number
  to: number
  distance: number
}

interface MouseState {
  x: number
  y: number
  px: number
  py: number
  // Magnetic field strength (0-1)
  attraction: number
}

/**
 * Generate Perlin-like noise for smooth Brownian motion
 * Provides smooth, organic movement rather than chaotic randomness
 */
function generatePerlinNoise(x: number, seed: number): number {
  const n = Math.sin(x * 12.9898 + seed * 78.233) * 43758.5453
  return n - Math.floor(n)
}

/**
 * Sine-based easing function for all motion transitions
 * Creates smooth, breathing-like motion that feels organic
 */
function sineWaveEase(t: number): number {
  return Math.sin(t * Math.PI * 2) * 0.5 + 0.5
}

/**
 * Inverse square law for distance-based opacity
 * Physics principle: intensity decreases with square of distance
 */
function inverseSquareLawOpacity(distance: number, maxDistance: number): number {
  if (distance >= maxDistance) return 0
  const normalized = distance / maxDistance
  return Math.pow(1 - normalized, 2) // Inverse square law curve
}

/**
 * Create Perlin-like noise texture for glassmorphism effect
 * Adds premium, cinematic quality to the background
 */
function createNoiseTexture(width: number, height: number, scale: number = 50): ImageData {
  const canvas = new OffscreenCanvas(width, height)
  const ctx = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D
  ctx.fillStyle = 'transparent'
  ctx.fillRect(0, 0, width, height)

  const imageData = ctx.createImageData(width, height)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const pixelIndex = i / 4
    const x = pixelIndex % width
    const y = Math.floor(pixelIndex / width)

    const noise = generatePerlinNoise(x / scale, generatePerlinNoise(y / scale, 123))
    const value = Math.floor(noise * 255)

    data[i] = value // R
    data[i + 1] = value // G
    data[i + 2] = value // B
    data[i + 3] = Math.floor(noise * 5) // Very subtle alpha
  }

  return imageData
}

export default function NeuralNetworkBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<PhysicsParticle[]>([])
  const mouseRef = useRef<MouseState>({
    x: 0,
    y: 0,
    px: 0,
    py: 0,
    attraction: 0,
  })
  const animationFrameRef = useRef<number>()
  const noiseTextureRef = useRef<ImageData | null>(null)
  const timeRef = useRef(0)
  const [fps, setFps] = useState(60)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // ==================== INITIALIZATION ====================

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Regenerate noise texture on resize
      noiseTextureRef.current = createNoiseTexture(canvas.width, canvas.height, 80)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles as "data packets" in the automation network
    const particleCount = 55 // Optimal coverage for automation network
    const particles: PhysicsParticle[] = []

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const radius = Math.random() * (Math.min(canvas.width, canvas.height) / 3) + 100

      particles.push({
        x: canvas.width / 2 + Math.cos(angle) * radius,
        y: canvas.height / 2 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        bx: Math.random() * 100,
        by: Math.random() * 100,
        radius: Math.random() * 1.5 + 0.8,
        baseOpacity: Math.random() * 0.4 + 0.3,
        mass: Math.random() * 0.5 + 1,
        damping: 0.92, // High friction for "composed" motion
      })
    }
    particlesRef.current = particles

    // ==================== INPUT HANDLING ====================

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.px = mouseRef.current.x
      mouseRef.current.py = mouseRef.current.y
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouseRef.current.attraction = 0
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // ==================== PHYSICS ENGINE ====================

    const MAGNETIC_RADIUS = 200 // 200px radius as specified
    const CONNECTION_RANGE = 180

    const updatePhysics = () => {
      const particles = particlesRef.current
      const mouse = mouseRef.current
      const time = timeRef.current

      particles.forEach((particle, idx) => {
        // ===== CONSTRAINED BROWNIAN MOTION =====
        // Organic, non-chaotic movement simulating data flow

        const brownianX = generatePerlinNoise(time * 0.0005 + particle.bx, particle.bx)
        const brownianY = generatePerlinNoise(time * 0.0005 + particle.by, particle.by)

        // Apply Brownian motion with sine-wave easing
        const brownieForceX = (brownianX - 0.5) * 0.08
        const brownieForceY = (brownianY - 0.5) * 0.08

        particle.vx += brownieForceX
        particle.vy += brownieForceY

        // ===== MAGNETIC ATTRACTION TO CURSOR =====
        // Represents "human control over technology"

        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distanceToCursor = Math.sqrt(dx * dx + dy * dy)

        if (distanceToCursor < MAGNETIC_RADIUS && distanceToCursor > 1) {
          // Inverse square law for magnetic force
          const forceMagnitude = (1 - distanceToCursor / MAGNETIC_RADIUS) ** 2 * 0.15
          const angle = Math.atan2(dy, dx)

          particle.vx += Math.cos(angle) * forceMagnitude
          particle.vy += Math.sin(angle) * forceMagnitude
        }

        // ===== FRICTION & DAMPING =====
        // Creates "composed" motion feel - not chaotic

        particle.vx *= particle.damping
        particle.vy *= particle.damping

        // ===== POSITION UPDATE =====

        particle.x += particle.vx
        particle.y += particle.vy

        // ===== BOUNDARY CONDITIONS =====
        // Soft boundaries for continuous field effect

        const padding = 50
        if (particle.x < -padding || particle.x > canvas.width + padding) {
          particle.vx *= -0.8
          particle.x = Math.max(-padding, Math.min(canvas.width + padding, particle.x))
        }
        if (particle.y < -padding || particle.y > canvas.height + padding) {
          particle.vy *= -0.8
          particle.y = Math.max(-padding, Math.min(canvas.height + padding, particle.y))
        }

        // ===== DYNAMIC OPACITY =====
        // Breathing effect with sine-wave easing

        const pulseAmplitude = sineWaveEase(time * 0.0008 + idx)
        const velocityGlow = Math.min(
          Math.sqrt(particle.vx ** 2 + particle.vy ** 2) * 0.5,
          0.6
        )
        particle.baseOpacity = Math.min(
          0.3 + pulseAmplitude * 0.2 + velocityGlow * 0.2,
          0.8
        )
      })
    }

    // ==================== RENDERING ====================

    const drawParticles = () => {
      const particles = particlesRef.current

      particles.forEach((particle) => {
        // ===== MAIN PARTICLE NODE =====
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 217, 255, ${particle.baseOpacity})`
        ctx.fill()

        // ===== GAUSSIAN BLUR GLOW (5-15px) =====
        // Creates premium, cinematic quality

        const glowStrength = particle.baseOpacity * 0.7
        ctx.shadowColor = `rgba(0, 217, 255, ${glowStrength})`
        ctx.shadowBlur = 8 + particle.baseOpacity * 8 // Dynamic glow intensity
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0

        // Draw outer glow layer
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 1.5, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0, 217, 255, ${glowStrength * 0.4})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      })

      // Reset shadow
      ctx.shadowBlur = 0
      ctx.shadowColor = 'transparent'
    }

    const drawConnections = () => {
      const particles = particlesRef.current
      const connections: VisualConnection[] = []

      // ===== COMPUTE CONNECTIONS WITH INVERSE SQUARE LAW =====

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < CONNECTION_RANGE) {
            connections.push({
              from: i,
              to: j,
              distance,
            })
          }
        }
      }

      // ===== DRAW CONNECTIONS =====

      connections.forEach((conn) => {
        const p1 = particles[conn.from]
        const p2 = particles[conn.to]

        // Inverse square law for opacity
        const maxNormalizedOpacity = inverseSquareLawOpacity(
          conn.distance,
          CONNECTION_RANGE
        )

        if (maxNormalizedOpacity < 0.01) return // Skip invisible connections

        const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
        const color1 = `rgba(0, 217, 255, ${maxNormalizedOpacity * 0.5})`
        const color2 = `rgba(26, 26, 46, ${maxNormalizedOpacity * 0.2})`

        gradient.addColorStop(0, color1)
        gradient.addColorStop(0.5, color2)
        gradient.addColorStop(1, color1)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 0.7 + maxNormalizedOpacity * 1.5
        ctx.lineCap = 'round'

        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      })
    }

    const drawBackground = () => {
      // ===== DEEP OBSIDIAN BASE WITH INDIGO GRADIENT =====
      // Creates infinite depth effect

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 1.5
      )

      gradient.addColorStop(0, '#030303') // Deep Obsidian
      gradient.addColorStop(0.5, '#0A0E27') // Darker navy
      gradient.addColorStop(1, '#1A1A2E') // Midnight Indigo

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // ===== NOISE TEXTURE OVERLAY (GLASSMORPHISM) =====
      // Adds premium, non-digital, cinematic feel

      if (noiseTextureRef.current) {
        ctx.putImageData(noiseTextureRef.current, 0, 0)
      }
    }

    // ==================== ANIMATION LOOP ====================

    let frameCount = 0
    let lastTime = performance.now()

    const animate = () => {
      const currentTime = performance.now()
      const deltaTime = (currentTime - lastTime) / 16.67 // Normalize to 60fps frame time

      // Update physics
      updatePhysics()
      timeRef.current += deltaTime

      // Draw scene
      drawBackground()
      drawConnections()
      drawParticles()

      // Calculate FPS
      frameCount++
      if (currentTime - lastTime >= 1000) {
        setFps(frameCount)
        frameCount = 0
        lastTime = currentTime
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // ==================== CLEANUP ====================

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          WebkitFontSmoothing: 'antialiased',
          WebkitBackfaceVisibility: 'hidden',
        }}
      />
      {/* FPS Counter (Development) */}
      <div className="absolute top-4 right-4 text-cyan-glow text-xs font-mono opacity-30 pointer-events-none">
        {fps} FPS
      </div>
    </div>
  )
}
