# Physics Hero Background - Advanced Tuning & Customization Guide

## Overview

This guide provides detailed instructions for fine-tuning the physics-engineered hero background to match specific design requirements, performance targets, or interactive behaviors.

---

## Parameter Reference

### 1. Particle Configuration

#### Particle Count
**Location**: `NeuralNetworkBackground.tsx`, line ~54
```typescript
const particleCount = 55 // Optimal coverage for automation network
```

| Count | Visual Density | Performance | Recommended For |
|-------|---|---|---|
| 30 | Sparse | Excellent (minimal GPU) | Mobile, low-end hardware |
| 40 | Light | Excellent | Target: general users |
| **55** | **Optimal** | **Great (Acer i5)** | **1080p+ displays** |
| 70 | Dense | Good | 1440p+ displays |
| 100+ | Very Dense | Fair (GPU load) | Only high-end machines |

**Tuning Tip**: Monitor FPS counter in top-right. If FPS drops below 55, decrease count by 10.

#### Particle Size
**Location**: `NeuralNetworkBackground.tsx`, line ~65
```typescript
radius: Math.random() * 1.5 + 0.8
```
- **Range**: 0.8px to 2.3px
- **Increase for**: Larger, more visible nodes
- **Decrease for**: Subtle, minimal visual weight

---

### 2. Physics Parameters

#### Damping (Friction)
**Location**: `NeuralNetworkBackground.tsx`, line ~69
```typescript
damping: 0.92 // High friction for "composed" motion
```

| Value | Behavior | Feel |
|-------|----------|------|
| 0.95+ | Very floaty | Dreamy, slow-motion |
| 0.92 | **Natural** | **Composed, precise** |
| 0.88 | Snappy | Energetic, responsive |
| 0.85 | Springy | Bouncy, playful |
| <0.80 | Jittery | Chaotic, uncontrolled |

**Effect**: Higher values = slower decay, particles drift longer.

#### Brownian Motion Force
**Location**: `NeuralNetworkBackground.tsx`, line ~110
```typescript
const brownieForceX = (brownianX - 0.5) * 0.08
const brownieForceY = (brownianY - 0.5) * 0.08
```

| Multiplier | Force Magnitude | Motion Character |
|------------|---|---|
| 0.04 | Very subtle | Minimal drift |
| **0.08** | **Moderate** | **Organic, calm** |
| 0.12 | Strong | Dynamic, energetic |
| 0.16+ | Very strong | Chaotic |

**Tuning**: Increase for more dynamic movement, decrease for calmer, more meditative feel.

#### Brownian Motion Time Scale
**Location**: `NeuralNetworkBackground.tsx`, line ~107
```typescript
generatePerlinNoise(time * 0.0005 + particle.bx, particle.bx)
```

| Time Scale | Drift Speed | Effect |
|---|---|---|
| 0.0003 | Slow | 1.67x slower, very smooth |
| **0.0005** | **Normal** | **Standard breathing** |
| 0.0008 | Fast | 1.6x faster, more active |
| 0.0010 | Very Fast | Rapid, twitchy |

**Tuning**: Adjust to match desired "heartbeat" rhythm.

#### Magnetic Attraction Radius
**Location**: `NeuralNetworkBackground.tsx`, line ~175
```typescript
const MAGNETIC_RADIUS = 200 // 200px radius as specified
```

| Radius | Interaction Zone | Feel |
|--------|---|---|
| 100px | Very tight | Only responds near cursor |
| **200px** | **Comfortable** | **Natural interaction zone** |
| 300px | Wide | Cursor feels "grabby" |
| 400px+ | Extreme | Too attractive |

**Tuning**: Increase for stronger interaction, decrease for subtler control.

#### Magnetic Force Magnitude
**Location**: `NeuralNetworkBackground.tsx`, line ~125
```typescript
const forceMagnitude = (1 - distanceToCursor / MAGNETIC_RADIUS) ** 2 * 0.15
```

| Multiplier | Max Force | Field Strength |
|---|---|---|
| 0.08 | Subtle | Barely noticeable |
| **0.15** | **Balanced** | **Professional, responsive** |
| 0.25 | Strong | Dramatic attraction |
| 0.40+ | Extreme | Aggressive, uncontrolled |

**Tuning**: Increase for more dramatic cursor interaction.

---

### 3. Visual Parameters

#### Connection Range
**Location**: `NeuralNetworkBackground.tsx`, line ~175
```typescript
const CONNECTION_RANGE = 180
```

| Range | Connection Frequency | Visual Density |
|-------|---|---|
| 100px | Few | Sparse network |
| 150px | Moderate | Balanced |
| **180px** | **Optimal** | **Professional** |
| 220px | Dense | Network-heavy |
| 250px+ | Very Dense | Overwhelming |

**Visual Effect**: Higher range = more visible connections, denser network feel.

#### Gaussian Blur Glow
**Location**: `NeuralNetworkBackground.tsx`, line ~304
```typescript
ctx.shadowBlur = 8 + particle.baseOpacity * 8 // 8-15px range
```

| Min | Max | Effect |
|-----|-----|--------|
| 4 | 10 | Subtle, minimal bloom |
| **8** | **15** | **Premium, cinematic** |
| 12 | 20 | Heavy, dramatic glow |
| 15+ | 25+ | Overwhelming, washed out |

**Tuning**: Increase for more dramatic glow effect.

#### Particle Opacity Range
**Location**: `NeuralNetworkBackground.tsx`, line ~66
```typescript
baseOpacity: Math.random() * 0.4 + 0.3 // Range: 0.3 to 0.7
```

| Min | Max | Visual Effect |
|-----|-----|---|
| 0.2 | 0.6 | Faint, ghostly |
| **0.3** | **0.7** | **Professional, visible** |
| 0.5 | 0.9 | Bright, vibrant |
| 0.7+ | 1.0+ | Very visible, high contrast |

**Tuning**: Increase range for more visual variation.

---

### 4. Rendering Parameters

#### Canvas Background Gradient
**Location**: `NeuralNetworkBackground.tsx`, line ~259
```typescript
gradient.addColorStop(0, '#030303')    // Obsidian center
gradient.addColorStop(0.5, '#0A0E27')  // Darker navy
gradient.addColorStop(1, '#1A1A2E')    // Midnight Indigo edge
```

**Customization Examples**:

**Deep & Dramatic**:
```typescript
gradient.addColorStop(0, '#000000')    // Pure black
gradient.addColorStop(0.5, '#050515')  // Very dark navy
gradient.addColorStop(1, '#0A0A2E')    // Deep indigo
```

**Lighter & Brighter**:
```typescript
gradient.addColorStop(0, '#0F0F3A')    // Medium navy
gradient.addColorStop(0.5, '#1A1A4D')  // Lighter indigo
gradient.addColorStop(1, '#2A2A5F')    // Bright indigo
```

**Cyberpunk**:
```typescript
gradient.addColorStop(0, '#1A0033')    // Deep purple
gradient.addColorStop(0.5, '#330066')  // Purple
gradient.addColorStop(1, '#1A0033')    // Deep purple
```

#### Primary Accent Color
**Location**: `NeuralNetworkBackground.tsx`, lines 306, 318, 328 (Cyan #00D9FF)

**Alternative Color Palettes**:

**Electric Purple**:
```typescript
`rgba(168, 85, 247, ${particle.baseOpacity})` // #A855F7
// Update connections: rgba(168, 85, 247, ...)
```

**Neon Green**:
```typescript
`rgba(34, 197, 94, ${particle.baseOpacity})` // #22C55E
// High energy, modern feel
```

**Cosmic Blue**:
```typescript
`rgba(59, 130, 246, ${particle.baseOpacity})` // #3B82F6
// Professional, trustworthy feel
```

**Rose Pink**:
```typescript
`rgba(236, 72, 153, ${particle.baseOpacity})` // #EC4899
// Elegant, creative feel
```

---

### 5. Performance Tuning

#### Frame Rate Target
**Location**: `NeuralNetworkBackground.tsx`, line ~381
```typescript
const deltaTime = (currentTime - lastTime) / 16.67 // 60fps normalization
```

**For 144fps Displays** (high refresh rate):
```typescript
const deltaTime = (currentTime - lastTime) / 6.94 // 144fps normalization
```

#### Connection Opacity Threshold
**Location**: `NeuralNetworkBackground.tsx`, line ~340
```typescript
if (maxNormalizedOpacity < 0.01) return // Skip invisible
```

| Threshold | Rendering Load | Visual Impact |
|-----------|---|---|
| 0.005 | Higher | More connections drawn |
| **0.01** | **Balanced** | **Optimal performance** |
| 0.02 | Lower | Fewer connections, sparser |
| 0.05+ | Much Lower | Very sparse network |

**Tuning**: Increase threshold if GPU load is high.

#### Noise Texture Scale
**Location**: `NeuralNetworkBackground.tsx`, line ~41
```typescript
noiseTextureRef.current = createNoiseTexture(canvas.width, canvas.height, 80)
// ^-- 80 is the scale parameter
```

| Scale | Noise Frequency | Visual Effect |
|-------|---|---|
| 40 | Fine grain | Detailed, intricate |
| 80 | **Optimal** | **Premium, cinematic** |
| 120 | Coarse grain | Subtle, smooth |
| 150+ | Very coarse | Barely visible |

**Tuning**: Adjust for desired texture granularity.

---

## Real-World Tuning Examples

### Example 1: More Energetic Feel

```typescript
// Brownian motion
const brownieForceX = (brownianX - 0.5) * 0.12  // Increase from 0.08
const brownieForceY = (brownianY - 0.5) * 0.12

// Time scale
generatePerlinNoise(time * 0.0008, ...)         // Increase from 0.0005

// Damping
damping: 0.88                                    // Decrease from 0.92

// Magnetic force
const forceMagnitude = ... * 0.22                // Increase from 0.15
```

**Result**: Particles move more dynamically, respond faster to cursor.

### Example 2: Calm, Meditative Feel

```typescript
// Brownian motion
const brownieForceX = (brownianX - 0.5) * 0.04  // Decrease from 0.08
const brownieForceY = (brownianY - 0.5) * 0.04

// Time scale
generatePerlinNoise(time * 0.0003, ...)         // Decrease from 0.0005

// Damping
damping: 0.94                                    // Increase from 0.92

// Magnetic force
const forceMagnitude = ... * 0.08                // Decrease from 0.15

// Particle opacity
baseOpacity: Math.random() * 0.25 + 0.15        // Decrease brightness
```

**Result**: Gentle, slow, hypnotic motion; minimalist aesthetic.

### Example 3: Dense, Network-Heavy

```typescript
// Particle count
const particleCount = 85                         // Increase from 55

// Connection range
const CONNECTION_RANGE = 250                    // Increase from 180

// Glow intensity
ctx.shadowBlur = 10 + particle.baseOpacity * 10 // Increase from 8-15

// Connection opacity base
const color1 = `rgba(0, 217, 255, ${maxNormalizedOpacity * 0.8})` // More visible
```

**Result**: Dense network of nodes, complex connections, high visual complexity.

### Example 4: High-Performance (Mobile)

```typescript
// Particle count
const particleCount = 30                         // Reduce CPU overhead

// Connection range
const CONNECTION_RANGE = 140                    // Fewer connections

// Particle size
radius: Math.random() * 1.0 + 0.5                // Smaller nodes

// Opacity threshold
if (maxNormalizedOpacity < 0.03) return         // Skip more connections

// Shadow blur
ctx.shadowBlur = 6 + particle.baseOpacity * 4   // Minimal glow
```

**Result**: Optimized for lower-end hardware, maintains 60fps.

---

## Advanced Techniques

### Custom Field Forces

Add additional force fields (not in current implementation):

```typescript
// Repulsive force from screen edges
const edgeDistance = Math.min(
  particle.x,
  particle.y,
  canvas.width - particle.x,
  canvas.height - particle.y
)
if (edgeDistance < 50) {
  // Repel particles away from edges
}

// Attract particles to screen center
const centerX = canvas.width / 2
const centerY = canvas.height / 2
const dx = centerX - particle.x
const dy = centerY - particle.y
// Optional: add centripetal force
```

### Multi-Color Particles

Replace single cyan color with variation:

```typescript
// Assign color based on position or time
const hue = (particle.x / canvas.width) * 360
ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${particle.baseOpacity})`

// Or time-based color cycling
const colorTime = (Date.now() + idx * 100) % 3000
const hue = (colorTime / 3000) * 360 + particle.bx
ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${particle.baseOpacity})`
```

### Interactive Attractors

Add objects particles are attracted to:

```typescript
// Mouse position becomes attractor
const attractorX = mouseRef.current.x
const attractorY = mouseRef.current.y

// Add attractive force (in updatePhysics)
const dx = attractorX - particle.x
const dy = attractorY - particle.y
const distance = Math.sqrt(dx * dx + dy * dy)
if (distance < 400) {
  const force = 0.02
  particle.vx += (dx / distance) * force
  particle.vy += (dy / distance) * force
}
```

### Keyboard Control

Add arrow keys to influence particles:

```typescript
// In input handling
const keys = new Set<string>()
window.addEventListener('keydown', (e) => keys.add(e.key))
window.addEventListener('keyup', (e) => keys.delete(e.key))

// In updatePhysics
if (keys.has('ArrowUp')) {
  particles.forEach(p => p.vy -= 0.1)
}
if (keys.has('ArrowDown')) {
  particles.forEach(p => p.vy += 0.1)
}
```

---

## Debugging & Monitoring

### Enable Visual Debugging

```typescript
// Draw connection range circles
if (DEBUG_MODE) {
  particles.forEach(particle => {
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.1)'
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, CONNECTION_RANGE, 0, Math.PI * 2)
    ctx.stroke()
  })
}
```

### Performance Monitoring

```typescript
// Already included in code (top-right FPS counter)
// Add more metrics:
let particleCount = 0
let connectionCount = 0

// After calculation
console.log(`Particles: ${particles.length}`)
console.log(`Connections: ${connectionCount}`)
console.log(`Memory: ${(performance.memory?.usedJSHeapSize / 1048576).toFixed(1)}MB`)
```

### Profiling in Chrome DevTools

1. Open DevTools (F12)
2. Go to Performance tab
3. Click Record
4. Interact with animation for 10-15 seconds
5. Stop recording
6. Analyze flame charts (look for long-running functions)

---

## Checklist for Custom Tuning

- [ ] Adjust `particleCount` based on target hardware
- [ ] Fine-tune `damping` for desired motion feel
- [ ] Adjust `brownieForceX/Y` multiplier for motion intensity
- [ ] Set `MAGNETIC_RADIUS` for interaction zone
- [ ] Calibrate `CONNECTION_RANGE` for network density
- [ ] Test FPS on target devices
- [ ] Verify memory usage is stable
- [ ] Validate RTL rendering
- [ ] Check cursor interaction smoothness
- [ ] Measure GPU load with DevTools

---

## Performance Targets

**Target Device**: Acer Aspire i5-13th Gen

| Metric | Target | Acceptable | Poor |
|--------|--------|---|---|
| Frame Rate | 60 FPS | 55+ FPS | <50 FPS |
| CPU Usage | <5% | <10% | >15% |
| Memory | <5MB | <8MB | >12MB |
| Connection Count | 200-400 | 100-600 | >800 |
| Particle Count | 55 | 40-70 | <30 or >100 |

---

## Troubleshooting

**Issue**: FPS drops below 55
**Solution**: Reduce `particleCount` or increase connection opacity threshold

**Issue**: Particles seem frozen
**Solution**: Increase `brownieForceX/Y` multiplier or decrease `damping`

**Issue**: Cursor interaction doesn't work
**Solution**: Verify `MAGNETIC_RADIUS` > 0 and `forceMagnitude` multiplier is > 0

**Issue**: Glow effect is too strong
**Solution**: Decrease `shadowBlur` range (change 8-15 to 5-10)

**Issue**: Background gradient looks wrong
**Solution**: Adjust gradient color stops in background rendering function

---

## Conclusion

The physics-engineered hero background provides extensive tuning options while maintaining professional quality. Start with the provided defaults and adjust parameters incrementally based on your specific design requirements and performance targets.

For advanced customization, refer to the main physics engine documentation in `PHYSICS_HERO_BACKGROUND.md`.

