import { useEffect, useState } from 'react'

interface PerformanceCapabilities {
  supportsSaveMode: boolean
  saveDataEnabled: boolean
  gpuTier: 'high-end' | 'mid-range' | 'low-end'
  canRenderComplexAnimations: boolean
  maxAnimationFrameRate: number
  isLowPowerMode: boolean
}

/**
 * Performance Detection Hook
 * Detects system capabilities and user preferences
 * Allows adaptive rendering based on device power
 */
export function usePerformanceDetection(): PerformanceCapabilities {
  const [capabilities, setCapabilities] =
    useState<PerformanceCapabilities>({
      supportsSaveMode: false,
      saveDataEnabled: false,
      gpuTier: 'mid-range',
      canRenderComplexAnimations: true,
      maxAnimationFrameRate: 60,
      isLowPowerMode: false,
    })

  useEffect(() => {
    // Detect Save Data mode (user preference for data saving)
    const connection = (navigator as any).connection
    const supportsSaveMode = !!connection?.saveData
    const saveDataEnabled = supportsSaveMode && connection.saveData === true

    // Detect GPU capabilities via WebGL
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl') as WebGLRenderingContext | null

    let gpuTier: 'high-end' | 'mid-range' | 'low-end' = 'mid-range'

    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        const renderer = gl.getParameter(
          debugInfo.UNMASKED_RENDERER_WEBGL
        ) as string

        // Classify GPU tier based on renderer info
        if (
          renderer.includes('RTX') ||
          renderer.includes('RTX 40') ||
          renderer.includes('RTX 4090') ||
          renderer.includes('A100')
        ) {
          gpuTier = 'high-end'
        } else if (
          renderer.includes('Intel Iris') ||
          renderer.includes('AMD Radeon') ||
          renderer.includes('M1') ||
          renderer.includes('M2')
        ) {
          gpuTier = 'mid-range'
        } else if (
          renderer.includes('Intel HD') ||
          renderer.includes('Mali') ||
          renderer.includes('Adreno') ||
          renderer.includes('PowerVR')
        ) {
          gpuTier = 'low-end'
        }
      }
    }

    // Detect Low Power Mode (iOS/macOS)
    const isLowPowerMode =
      (navigator as any).deviceMemory &&
      (navigator as any).deviceMemory < 4

    // Detect memory constraints
    const deviceMemory = (navigator as any).deviceMemory || 8
    const isLowMemory = deviceMemory < 2

    // Determine animation capability
    const canRenderComplexAnimations =
      gpuTier !== 'low-end' &&
      !saveDataEnabled &&
      !isLowPowerMode &&
      !isLowMemory

    // Determine max frame rate based on capabilities
    const maxAnimationFrameRate =
      gpuTier === 'high-end' ? 60 : gpuTier === 'mid-range' ? 45 : 30

    setCapabilities({
      supportsSaveMode,
      saveDataEnabled,
      gpuTier,
      canRenderComplexAnimations,
      maxAnimationFrameRate,
      isLowPowerMode,
    })
  }, [])

  return capabilities
}

/**
 * Hook to check if neural network background should be rendered
 * Returns false for low-end devices, Save Data mode
 */
export function useAdaptiveRendering() {
  const perf = usePerformanceDetection()

  return {
    showNeuralBackground: perf.canRenderComplexAnimations,
    showComplexAnimations: perf.canRenderComplexAnimations,
    animationFrameRate: perf.maxAnimationFrameRate,
    useStaticGradientFallback:
      !perf.canRenderComplexAnimations,
    useReducedMotion:
      perf.saveDataEnabled ||
      perf.isLowPowerMode ||
      perf.gpuTier === 'low-end',
  }
}

/**
 * Prefers-reduced-motion media query hook
 * Respects user's motion preferences
 */
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )
    setPrefersReduced(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}
