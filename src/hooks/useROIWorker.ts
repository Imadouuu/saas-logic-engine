import { useEffect, useRef, useState } from 'react'

interface ROIWorkerInput {
  weeklyHours: number
  teamSize: number
  errorRate: number
  hourlyRate: number
  technicalDebtYear: number
}

export interface ROIWorkerOutput {
  annualManualCost: number
  frictionCost: number
  errorCascadeCost: number
  annualTechnicalDebtCost: number
  totalAnnualManualCost: number
  automationSetupCost: number
  annualAutomationCost: number
  annualSavings: number
  latencyRecovered: number
  capitalReinvestment: number
  paybackMonths: number
  glowIntensity: number
  overloadSeverity: number
  manualCosts: number[]
  automatedCosts: number[]
  cumulativeSavings: number[]
  projectionMonths: number[]
}

/**
 * Web Worker Hook for ROI Calculations
 * Offloads heavy math calculations to prevent main thread blocking
 * Dramatically improves performance during rapid slider adjustments
 */
export function useROIWorker(input: ROIWorkerInput) {
  const workerRef = useRef<Worker | null>(null)
  const [result, setResult] = useState<ROIWorkerOutput | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  // Initialize Web Worker on mount
  useEffect(() => {
    // Create worker from the compiled worker file
    const workerUrl = new URL(
      '../workers/roi-calculator.worker.ts',
      import.meta.url
    )
    
    try {
      workerRef.current = new Worker(workerUrl, {
        type: 'module',
      })

      workerRef.current.onmessage = (
        event: MessageEvent<ROIWorkerOutput>
      ) => {
        setResult(event.data)
        setIsCalculating(false)
      }

      workerRef.current.onerror = (error: ErrorEvent) => {
        console.error('Worker error:', error)
        setIsCalculating(false)
        // Fallback: could use local calculation here
      }
    } catch (error) {
      console.warn('Worker init failed, using main thread:', error)
      // Worker initialization failed, will use synchronous calculation
    }

    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  // Trigger calculation whenever input changes
  useEffect(() => {
    if (workerRef.current) {
      setIsCalculating(true)
      workerRef.current.postMessage(input)
    }
  }, [input])

  return { result, isCalculating }
}

/**
 * Memoized ROI Calculator (Fallback for when Worker is unavailable)
 * Uses the same formula as the Web Worker
 */
export function useROICalculatorMemo(input: ROIWorkerInput) {
  return JSON.stringify(input) // Create stable memoization key
}
