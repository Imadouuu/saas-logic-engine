import { useMemo } from 'react'

/**
 * THE IMAD FORMULA FOR VALUE RECOVERY
 * =====================================
 * 
 * Engineering-grade financial simulation for automation ROI analysis
 * Based on Silicon Valley operational audit methodology.
 * 
 * Key Physics:
 * - Friction Loss: Manual processes lose efficiency at scale (exponential degradation)
 * - Circuit Efficiency: System health degrades with team size complexity
 * - Technical Debt: Compounds at 1.2x annually (maintenance, knowledge loss, tool fragility)
 * - Error Multiplication: Each error creates cascading costs (rework, reputation, churn)
 */

export interface ROIMetrics {
  // Current State (Manual Operations)
  weeklyManualHours: number
  teamSize: number
  errorRate: number
  hourlyRate: number
  
  // Engineering Metrics
  frictionLoss: number // % of time wasted on manual inefficiency
  circuitEfficiency: number // System degradation factor (0-100%)
  
  // Calculated Annual Costs
  annualManualCost: number
  frictionCost: number // Energy leak from manual coordination
  errorCascadeCost: number // Ripple effect of quality issues
  annualTechnicalDebtCost: number
  totalAnnualManualCost: number
  
  // Automation Metrics
  automationSetupCost: number
  annualAutomationCost: number
  
  // ROI & Recovery
  annualSavings: number
  latencyRecovered: number // Hours/year freed for strategic work
  capitalReinvestment: number
  paybackMonths: number
  systemStatus: 'OPTIMIZED' | 'HEATING_UP' | 'CRITICAL'
  
  // Intensity Metrics for UI Feedback
  glowIntensity: number // 0-1, for cyan glow intensity
  overloadSeverity: number // 0-1, for glitch effect intensity
  
  // Graph Data
  projectionMonths: number[]
  manualCosts: number[]
  automatedCosts: number[]
  cumulativeSavings: number[]
  
  // System Health
  isSystemOverloaded: boolean
  overloadThreshold: number
}

interface UseROICalculatorInput {
  weeklyManualHours: number
  teamSize: number
  errorRate: number
  hourlyRate: number
  technicalDebtYear?: number // Defaults to year 1
}

export function useROICalculator(input: UseROICalculatorInput): ROIMetrics {
  return useMemo(() => {
    const {
      weeklyManualHours,
      teamSize,
      errorRate,
      hourlyRate,
      technicalDebtYear = 1,
    } = input

    // ==================== ENGINEERING METRICS ====================

    // FRICTION LOSS: Manual coordination overhead grows exponentially with team size
    // Each additional person = exponential complexity in communication and rework
    // Formula: 5% base + 3% per person + 0.1% per hour per week
    const frictionLoss = 5 + 
      teamSize * 3 + 
      (weeklyManualHours * 0.1 * teamSize / 100)
    
    // CIRCUIT EFFICIENCY: System health degrades with scale
    // Starts at 100% (ideal), decays based on team friction
    // When overloaded, efficiency plummets
    const circuitEfficiency = Math.max(
      10, // Safety floor: system never completely fails
      100 - frictionLoss - (errorRate * 2)
    )

    // ==================== MANUAL OPERATION COSTS ====================

    // Base weekly cost
    const weeklyManualCost = weeklyManualHours * teamSize * hourlyRate

    // Annual base cost
    const annualManualCost = weeklyManualCost * 52

    // FRICTION COST: Energy wasted on coordination, meetings, context switching
    // This is the "hidden" cost that most companies don't see
    const frictionCost = (annualManualCost * frictionLoss) / 100

    // ERROR CASCADE COST: Quality issues multiply:
    // - Direct rework: ~50% of error rate cost
    // - Reputation loss: ~30% (customer churn, slower sales)
    // - Operational drag: ~20% (debugging, hotfixes, documentation)
    const errorCascadeMultiplier = (errorRate / 100) * (0.5 + 0.3 + 0.2)
    const errorCascadeCost = annualManualCost * errorCascadeMultiplier

    // TECHNICAL DEBT: Costs balloon annually (1.2x multiplier per year)
    // This accounts for:
    // - Harder to find qualified staff
    // - Legacy system fragility
    // - Knowledge loss as people leave
    // - Increased maintenance burden
    const technicalDebtMultiplier = Math.pow(1.2, technicalDebtYear - 1)
    const annualTechnicalDebtCost =
      (annualManualCost + frictionCost + errorCascadeCost) * 
      (technicalDebtMultiplier - 1)

    // TOTAL ANNUAL COST OF MANUAL OPERATION
    const totalAnnualManualCost =
      annualManualCost + frictionCost + errorCascadeCost + annualTechnicalDebtCost

    // ==================== AUTOMATION COSTS ====================

    // SETUP COST: Expert engineering to build automation system
    // ~30 days @ $150/hour = $36,000 baseline
    const automationSetupCost = 30 * 8 * 150

    // MAINTENANCE COST: ~8% annually (updates, scaling, optimization)
    const annualAutomationCost = automationSetupCost * 0.08

    // ==================== ROI CALCULATIONS ====================

    // Annual savings from automation
    const annualSavings = totalAnnualManualCost - annualAutomationCost

    // System latency recovered (hours freed up per year)
    const latencyRecovered = weeklyManualHours * teamSize * 52

    // Capital reinvestment potential
    const capitalReinvestment = annualSavings

    // Payback period (when does automation pay for itself?)
    const monthlyManualCost = totalAnnualManualCost / 12
    const monthlyAutomationCost = annualAutomationCost / 12
    const monthlyGain = monthlyManualCost - monthlyAutomationCost
    const paybackMonths =
      monthlyGain > 0 ? Math.ceil(automationSetupCost / monthlyGain) : 999

    // ==================== SYSTEM STATUS & INTENSITY ====================

    // Glow intensity based on manual hours (energy leak indicator)
    // Higher hours = more friction = brighter glow (warning signal)
    const glowIntensity = Math.min(
      1,
      (weeklyManualHours * teamSize) / 200
    )

    // Overload severity for glitch effect
    // Based on total cost relative to labor rate
    const overloadThreshold = hourlyRate * 40 * 52 * 2.5 // 2.5x of single person salary
    const costRatio = totalAnnualManualCost / overloadThreshold
    const overloadSeverity = Math.max(0, Math.min(1, (costRatio - 1) / 2))

    // System status determination
    let systemStatus: 'OPTIMIZED' | 'HEATING_UP' | 'CRITICAL'
    if (circuitEfficiency > 85 && totalAnnualManualCost < overloadThreshold) {
      systemStatus = 'OPTIMIZED'
    } else if (
      circuitEfficiency > 60 ||
      totalAnnualManualCost < overloadThreshold * 1.5
    ) {
      systemStatus = 'HEATING_UP'
    } else {
      systemStatus = 'CRITICAL'
    }

    const isSystemOverloaded = systemStatus === 'CRITICAL'

    // ==================== PROJECTION DATA (24 MONTHS) ====================

    const projectionMonths: number[] = []
    const manualCosts: number[] = []
    const automatedCosts: number[] = []
    const cumulativeSavings: number[] = []

    let cumulativeSave = 0

    for (let month = 0; month <= 24; month++) {
      projectionMonths.push(month)

      // Manual costs grow exponentially with technical debt AND friction
      const monthlyTechnicalDebtFactor = Math.pow(1.2, month / 12)
      const monthlyFrictionFactor = 1 + (frictionLoss / 100) * (month / 12)
      const scaledMonthlyManualCost =
        (monthlyManualCost * monthlyTechnicalDebtFactor * monthlyFrictionFactor) / 12
      manualCosts.push(scaledMonthlyManualCost * month)

      // Automation costs are flat after setup
      const automationCostThisMonth =
        month === 0 ? automationSetupCost : monthlyAutomationCost
      automatedCosts.push(
        automatedCosts[month - 1] ? automatedCosts[month - 1] + automationCostThisMonth : automationCostThisMonth
      )

      // Cumulative savings
      cumulativeSave = manualCosts[month] - automatedCosts[month]
      cumulativeSavings.push(Math.max(0, cumulativeSave))
    }

    return {
      weeklyManualHours,
      teamSize,
      errorRate,
      hourlyRate,
      frictionLoss,
      circuitEfficiency,
      annualManualCost,
      frictionCost,
      errorCascadeCost,
      annualTechnicalDebtCost,
      totalAnnualManualCost,
      automationSetupCost,
      annualAutomationCost,
      annualSavings,
      latencyRecovered,
      capitalReinvestment,
      paybackMonths,
      systemStatus,
      glowIntensity,
      overloadSeverity,
      projectionMonths,
      manualCosts,
      automatedCosts,
      cumulativeSavings,
      isSystemOverloaded,
      overloadThreshold,
    }
  }, [
    input.weeklyManualHours,
    input.teamSize,
    input.errorRate,
    input.hourlyRate,
    input.technicalDebtYear,
  ])
}
