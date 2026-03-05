/**
 * ROI Calculator Web Worker
 * Offloads heavy mathematical calculations to a separate thread
 * Prevents main thread blocking during complex financial simulations
 */

interface ROIInputData {
  weeklyHours: number
  teamSize: number
  errorRate: number
  hourlyRate: number
  technicalDebtYear: number
}

interface ROIOutputData {
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
 * THE IMAD FORMULA FOR VALUE RECOVERY
 * ====================================
 * Engineering-grade financial simulation for automation ROI analysis
 */
function calculateROI(input: ROIInputData): ROIOutputData {
  const {
    weeklyHours,
    teamSize,
    errorRate,
    hourlyRate,
    technicalDebtYear,
  } = input

  // === CURRENT STATE: MANUAL OPERATIONS ===
  const weeklyManualHours = weeklyHours * teamSize
  const annualManualHours = weeklyManualHours * 52

  // Friction Loss: Manual processes lose efficiency at scale
  // Formula: 8% base + 2% per team member (coordination overhead)
  const frictionLossPercent = 8 + teamSize * 2
  const frictionLoss = annualManualHours * (frictionLossPercent / 100)

  // Annual Manual Labor Cost
  const annualManualCost = annualManualHours * hourlyRate

  // Friction Cost: Energy leak from manual coordination
  const hourlyFrictionCost = hourlyRate * 1.5 // 50% overhead multiplier
  const frictionCost = frictionLoss * hourlyFrictionCost

  // Error Cascade Cost: Ripple effect of quality issues
  // Each error creates rework, reputation damage, churn
  // Formula: (error_rate / 100) * annual_hours * hourly_rate * 3.5x multiplier
  const errorCascadeCost =
    (errorRate / 100) * annualManualHours * hourlyRate * 3.5

  // Technical Debt Cost: Compounds at 1.2x annually
  const technicalDebtMultiplier = Math.pow(1.2, technicalDebtYear)
  const baseTechnicalDebt = annualManualCost * 0.25 // 25% of manual cost
  const annualTechnicalDebtCost = baseTechnicalDebt * technicalDebtMultiplier

  // Total Annual Cost (Manual)
  const totalAnnualManualCost =
    annualManualCost +
    frictionCost +
    errorCascadeCost +
    annualTechnicalDebtCost

  // === AUTOMATION METRICS ===
  // Setup cost: $15k-$50k base + $5k per team member
  const automationSetupCost = 30000 + teamSize * 5000

  // Annual automation maintenance: 15% of setup cost
  const annualAutomationCost = automationSetupCost * 0.15

  // === ROI CALCULATIONS ===
  const annualSavings =
    totalAnnualManualCost - annualAutomationCost

  // Latency Recovered: Hours freed up for strategic work
  // Formula: Total manual hours - 20% unavoidable (exception handling)
  const latencyRecovered =
    (annualManualHours - frictionLoss) *
    (1 - errorRate / 100) *
    0.8

  // Capital Reinvestment Potential: Value of freed hours
  const capitalReinvestment = latencyRecovered * hourlyRate * 1.5

  // Payback Period: Months to recoup automation investment
  const monthlyROISavings = annualSavings / 12
  const paybackMonths = monthlyROISavings > 0
    ? Math.ceil(automationSetupCost / monthlyROISavings)
    : Infinity

  // === UI FEEDBACK METRICS ===
  // Glow Intensity: Visual intensity based on savings potential
  // Formula: normalized savings over manual cost (capped at 1)
  const glowIntensity = Math.min(
    1,
    (annualSavings / totalAnnualManualCost) * 0.7
  )

  // Overload Severity: How hard the current system is working
  // Formula: (manual_hours / normal_capacity) - 1
  // Normal capacity = 2000 hours/person/year
  const normalCapacity = 2000
  const currentLoad = annualManualHours / (teamSize * normalCapacity)
  const overloadSeverity = Math.max(0, Math.min(1, currentLoad - 1))

  // === PROJECTION DATA (12 MONTHS) ===
  const projectionMonths: number[] = []
  const manualCosts: number[] = []
  const automatedCosts: number[] = []
  const cumulativeSavings: number[] = []

  for (let month = 0; month <= 12; month++) {
    projectionMonths.push(month)

    const monthlyManualCost = totalAnnualManualCost / 12
    const monthlyAutomationCost =
      (automationSetupCost + annualAutomationCost * 12) / 12

    // Manual cost increases with technical debt
    const inflationFactor = 1 + month * 0.02 // 2% monthly inflation
    manualCosts.push(monthlyManualCost * inflationFactor)

    // Automation costs are front-loaded (setup) then stable
    const setupAmortization =
      month === 0 ? automationSetupCost : 0
    automatedCosts.push(setupAmortization + monthlyAutomationCost)

    // Cumulative savings
    const monthlySavings =
      manualCosts[month] - automatedCosts[month]
    const cumulativeSavingsValue =
      (cumulativeSavings[month - 1] || 0) +
      (monthlySavings > 0 ? monthlySavings : 0)
    cumulativeSavings.push(cumulativeSavingsValue)
  }

  return {
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
    glowIntensity,
    overloadSeverity,
    manualCosts,
    automatedCosts,
    cumulativeSavings,
    projectionMonths,
  }
}

// Web Worker message handler
self.onmessage = (event: MessageEvent<ROIInputData>) => {
  const result = calculateROI(event.data)
  self.postMessage(result)
}

export {}
