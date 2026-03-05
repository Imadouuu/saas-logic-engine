/**
 * Global Radial Background Mask
 * Applies a subtle radial gradient fading from #0A0A0B (center) to transparent (edges)
 * Creates depth without visible blobs - mathematically perfect depth perception
 */
export default function BackgroundRadialMask() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-10"
      style={{
        background: `
          radial-gradient(
            ellipse 1200px 800px at 50% 50%,
            rgba(10, 10, 11, 0.1) 0%,
            rgba(10, 10, 11, 0.3) 30%,
            rgba(10, 10, 11, 0.5) 60%,
            rgba(10, 10, 11, 0.7) 85%,
            rgba(10, 10, 11, 1) 100%
          )
        `,
        mixBlendMode: 'multiply',
      }}
    />
  )
}
