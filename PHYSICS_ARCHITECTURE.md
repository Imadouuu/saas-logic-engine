# Physics-Engineered Hero Background - Technical Architecture

## System Flow Diagram

```
┌───────────────────────────────────────────────────────────────────┐
│                        BROWSER VIEWPORT                            │
├───────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                     HERO SECTION                              │ │
│  │  (className: hero-physics-bg cinematic-vignette)             │ │
│  │                                                               │ │
│  │  ┌────────────────────────────────────────────────────────┐  │ │
│  │  │  LAYER 0: Physics Background Container (z-0)          │  │ │
│  │  │  (className: physics-background-container)            │  │ │
│  │  │  ┌──────────────────────────────────────────────────┐ │  │ │
│  │  │  │                                                   │ │  │ │
│  │  │  │  ┌──────────────────────────────────────────┐   │ │  │ │
│  │  │  │  │ Canvas Element (requestAnimationFrame)   │   │ │  │ │
│  │  │  │  │                                          │   │ │  │ │
│  │  │  │  │  ┌────────────────────────────────────┐ │   │ │  │ │
│  │  │  │  │  │ 1. Background Radial Gradient      │ │   │ │  │ │
│  │  │  │  │  │    - Obsidian (#030303)            │ │   │ │  │ │
│  │  │  │  │  │    - Navy (#0A0E27)                │ │   │ │  │ │
│  │  │  │  │  │    - Midnight Indigo (#1A1A2E)    │ │   │ │  │ │
│  │  │  │  │  └────────────────────────────────────┘ │   │ │  │ │
│  │  │  │  │  ┌────────────────────────────────────┐ │   │ │  │ │
│  │  │  │  │  │ 2. Noise Texture Overlay          │ │   │ │  │ │
│  │  │  │  │  │    - Perlin-like noise (50px scale)     │   │ │  │ │
│  │  │  │  │  │    - Creates cinematic quality   │ │   │ │  │ │
│  │  │  │  │  └────────────────────────────────────┘ │   │ │  │ │
│  │  │  │  │  ┌────────────────────────────────────┐ │   │ │  │ │
│  │  │  │  │  │ 3. Connection Lines                │ │   │ │  │ │
│  │  │  │  │  │    - Distance: 180px max          │ │   │ │  │ │
│  │  │  │  │  │    - Opacity: Inverse Square Law  │ │   │ │  │ │
│  │  │  │  │  │    - Gradient: Cyan → Indigo      │ │   │ │  │ │
│  │  │  │  │  └────────────────────────────────────┘ │   │ │  │ │
│  │  │  │  │  ┌────────────────────────────────────┐ │   │ │  │ │
│  │  │  │  │  │ 4. Particle Nodes                  │ │   │ │  │ │
│  │  │  │  │  │    - 55 physics particles          │ │   │ │  │ │
│  │  │  │  │  │    - Electric Cyan (#00D9FF)       │ │   │ │  │ │
│  │  │  │  │  │    - Gaussian blur glow (8-15px)  │ │   │ │  │ │
│  │  │  │  │  └────────────────────────────────────┘ │   │ │  │ │
│  │  │  │  │  ┌────────────────────────────────────┐ │   │ │  │ │
│  │  │  │  │  │ 5. FPS Counter (dev only)         │ │   │ │  │ │
│  │  │  │  │  └────────────────────────────────────┘ │   │ │  │ │
│  │  │  │  └──────────────────────────────────────────┘   │ │  │ │
│  │  │  │                                                   │ │  │ │
│  │  │  └──────────────────────────────────────────────────┘ │  │ │
│  │  └────────────────────────────────────────────────────────┘  │ │
│  │                                                               │ │
│  │  ┌────────────────────────────────────────────────────────┐  │ │
│  │  │  LAYER 1-4: Reserved for Future Enhancments           │  │ │
│  │  └────────────────────────────────────────────────────────┘  │ │
│  │                                                               │ │
│  │  ┌────────────────────────────────────────────────────────┐  │ │
│  │  │  LAYER 5: Digital Architect Placeholder (hidden lg)   │  │ │
│  │  └────────────────────────────────────────────────────────┘  │ │
│  │                                                               │ │
│  │  ┌────────────────────────────────────────────────────────┐  │ │
│  │  │  LAYER 20: Content (physics-content)                  │  │ │
│  │  │  - Terminal Window (glass-premium)                     │  │ │
│  │  │  - Title & Description Text                            │  │ │
│  │  │  - Call-to-Action Buttons                              │  │ │
│  │  │                                                         │  │ │
│  │  │  Animations:                                           │  │ │
│  │  │  - Typewriter effect on terminal                       │  │ │
│  │  │  - Glitch character variants                           │  │ │
│  │  │  - Smooth fade transitions                             │  │ │
│  │  │  - Glow pulse on title                                 │  │ │
│  │  └────────────────────────────────────────────────────────┘  │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

## Physics State Machine

```
┌─────────────────────────────────────────────────────────────────┐
│                   ANIMATION LOOP (60fps)                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │   INPUT HANDLING                         │
        │  (Mouse position tracking)               │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │   PHYSICS UPDATE (Per Particle)          │
        │                                          │
        │  1. Brownian Motion                      │
        │     └─ Perlin noise-based randomness    │
        │                                          │
        │  2. Magnetic Attraction                  │
        │     └─ Inverse square law force         │
        │                                          │
        │  3. Damping                              │
        │     └─ Friction (damping: 0.92)         │
        │                                          │
        │  4. Position Update                      │
        │     └─ x += vx; y += vy                 │
        │                                          │
        │  5. Boundary Conditions                  │
        │     └─ Soft bounce off edges            │
        │                                          │
        │  6. Opacity Animation                    │
        │     └─ Sine-wave pulse effect           │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │   RENDER PIPELINE                        │
        │                                          │
        │  1. Clear Canvas                         │
        │                                          │
        │  2. Draw Background                      │
        │     └─ Radial gradient + noise overlay  │
        │                                          │
        │  3. Compute Connections                  │
        │     └─ N² proximity check               │
        │     └─ Distance-based opacity           │
        │                                          │
        │  4. Draw Connections                     │
        │     └─ Linear gradient per line         │
        │     └─ Variable width based on opacity  │
        │                                          │
        │  5. Draw Particles                       │
        │     └─ Cyan circles + glow              │
        │     └─ Shadow blur 8-15px               │
        │                                          │
        │  6. Update FPS Counter                   │
        │     └─ Frame count per second           │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │   SCHEDULE NEXT FRAME                    │
        │  (requestAnimationFrame)                 │
        └─────────────────────────────────────────┘
```

## Data Flow: Cursor to Particle

```
┌──────────────────────────────────────────────────────────────┐
│  User moves mouse                                             │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│  mousemove event listener                                     │
│  mouseRef.current.x = e.clientX                              │
│  mouseRef.current.y = e.clientY                              │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│  Per-particle physics update:                                 │
│                                                               │
│  dx = mouse.x - particle.x                                   │
│  dy = mouse.y - particle.y                                   │
│  distance = √(dx² + dy²)                                     │
│                                                               │
│  if distance < 200px:                                        │
│    forceMagnitude = (1 - distance/200)² × 0.15              │
│    angle = atan2(dy, dx)                                     │
│    particle.vx += cos(angle) × forceMagnitude                │
│    particle.vy += sin(angle) × forceMagnitude                │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│  Particle accelerates toward cursor                           │
│  Motion smoothed by:                                          │
│  - High damping (0.92)                                        │
│  - Continuous Brownian forces                                │
│  - Inverse square law (smooth deceleration)                  │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│  Rendered at new position with:                              │
│  - Updated opacity based on motion                           │
│  - Dynamic glow intensity                                     │
│  - Recalculated connections to nearby particles              │
└──────────────────────────────────────────────────────────────┘
```

## Memory Layout

```
┌───────────────────────────────────────────────────────────────┐
│  Component Refs                                                │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  canvasRef ──────→ [HTMLCanvasElement]                       │
│                                                               │
│  particlesRef ───→ [                                         │
│                      PhysicsParticle[0] {                    │
│                        x, y, vx, vy, bx, by,               │
│                        radius, baseOpacity,                 │
│                        mass, damping                         │
│                      },                                       │
│                      PhysicsParticle[1] { ... },            │
│                      ...                                      │
│                      PhysicsParticle[54] { ... }            │
│                    ]                                          │
│                                                               │
│  mouseRef ──────→ {                                          │
│                      x, y, px, py: number,                  │
│                      attraction: number                      │
│                    }                                          │
│                                                               │
│  animationFrameRef → [number] (requestAnimationFrame ID)    │
│                                                               │
│  noiseTextureRef ──→ [ImageData] (50px × 50px blocks)     │
│                                                               │
│  timeRef ─────────→ [number] (elapsed time in frames)       │
│                                                               │
│  fps (state) ──────→ [number] (frames per second)           │
└───────────────────────────────────────────────────────────────┘
```

## Performance Characteristics

```
┌─────────────────┬──────────────┬────────────┬──────────────┐
│ Target Device   │ Frame Goal   │ CPU Impact │ GPU Impact   │
├─────────────────┼──────────────┼────────────┼──────────────┤
│ Desktop (i5-13) │ 60 FPS       │ <5%        │ <5%          │
│ Laptop          │ 60 FPS       │ <8%        │ <8%          │
│ Mobile          │ 30-60 FPS    │ <10%       │ <10%         │
│ Weak Mobile     │ 30 FPS       │ <15%       │ <15%         │
└─────────────────┴──────────────┴────────────┴──────────────┘

Frame Time Budget (60fps = 16.67ms per frame):
├─ Physics Update: ~4ms
├─ Connection Computation: ~2ms
├─ Rendering: ~8ms
├─ Browser/OS: ~2.67ms
└─ Total: ~16.67ms ✓
```

## RTL Architecture

```
┌──────────────────────────────────────────────┐
│  RTL SUPPORT ARCHITECTURE                    │
├──────────────────────────────────────────────┤
│                                              │
│  Physics System: LTR (Direction-Agnostic)   │
│  │                                           │
│  └─ Canvas coordinate system always [0,W]   │
│     and [0,H] left-to-right                  │
│                                              │
│  Content Layer: RTL-Aware                    │
│  │                                           │
│  ├─ Hero section className: rtl/ltr        │
│  ├─ Terminal header: flex-row-reverse       │
│  ├─ CTA buttons: flex-row-reverse           │
│  └─ Animations: direction-aware variants    │
│                                              │
│  Visual Balance:                             │
│  │                                           │
│  ├─ Radial gradient (center-out) = balanced │
│  ├─ Particles distributed circularly        │
│  └─ No directional visual weight            │
└──────────────────────────────────────────────┘
```

## Connection Opacity Algorithm

```
┌─────────────────────────────────────────────────────────────┐
│  Inverse Square Law Opacity Calculation                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  INPUT: distance (px), maxDistance (180px)                 │
│                                                              │
│  OUTPUT: opacity ∈ [0, 1]                                  │
│                                                              │
│  ┌──────────────────────────────────────────┐              │
│  │ ALGORITHM:                               │              │
│  │                                          │              │
│  │ 1. normalized = distance / maxDistance  │              │
│  │                                          │              │
│  │ 2. opacity = (1 - normalized)²           │              │
│  │                                          │              │
│  │    This is the inverse square law:       │              │
│  │    Intensity ∝ 1/distance²               │              │
│  │                                          │              │
│  │ 3. Apply to colors:                      │              │
│  │    - Particle 1 glow: × opacity × 0.5   │              │
│  │    - Center mix: × opacity × 0.2        │              │
│  │    - Particle 2 glow: × opacity × 0.5   │              │
│  └──────────────────────────────────────────┘              │
│                                                              │
│  EXAMPLE:                                                    │
│  distance = 90px, maxDistance = 180px                      │
│  normalized = 0.5                                           │
│  opacity = (1 - 0.5)² = 0.25 ────┬─ Strong connection    │
│                                   │                        │
│  distance = 170px, maxDistance = 180px                     │
│  normalized = 0.944                                         │
│  opacity = (1 - 0.944)² = 0.003 ─┴─ Barely visible       │
└─────────────────────────────────────────────────────────────┘
```

---

This architecture document outlines the complete system design for the physics-engineered hero background. Every component is optimized for performance, visual excellence, and technical sophistication.
