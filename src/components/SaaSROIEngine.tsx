import React, { useState, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useROICalculator } from '../hooks/useROICalculator'
import { SkeletonChart } from './SkeletonLoaders'

// Lazy load the chart component (reduces main bundle by ~40-50KB)
const LazyROIChart = React.lazy(() => import('./LazyROIChart'))

// Particle for shattering effect
const Particle: React.FC<{ x: number; y: number; delay: number }> = ({
  x,
  y,
  delay,
}) => {
  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: 0,
        scale: 0,
      }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="fixed pointer-events-none w-2 h-2 bg-[#00D9FF] rounded-full"
      style={{ left: x, top: y }}
    />
  )
}

// Glitch effect for system overload
const GlitchEffect: React.FC<{ intensity: number }> = ({ intensity }) => {
  if (intensity < 0.1) return null
  
  return (
    <>
      <motion.div
        animate={{
          x: intensity > 0.3 ? [0, 3, -2, 2, -3, 0] : 0,
          y: intensity > 0.5 ? [0, 2, -2, 3, -1, 0] : 0,
        }}
        transition={{
          duration: 0.15,
          repeat: intensity > 0.3 ? Infinity : 0,
          repeatDelay: 0.2,
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `rgba(255, 0, 0, ${intensity * 0.1})`,
          mixBlendMode: 'multiply',
        }}
      />
      {intensity > 0.5 && (
        <motion.div
          animate={{
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 0.3,
          }}
          className="absolute inset-0 border-2 border-red-500/30 pointer-events-none"
        />
      )}
    </>
  )
}

const SaaSROIEngine: React.FC<{ 
  onOpenFormWithMetrics?: (metrics: ReturnType<typeof useROICalculator>) => void 
}> = ({ onOpenFormWithMetrics }) => {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  // UI State
  const [weeklyHours, setWeeklyHours] = useState(40)
  const [teamSize, setTeamSize] = useState(5)
  const [errorRate, setErrorRate] = useState(8)
  const [hourlyRate, setHourlyRate] = useState(75)
  const [technicalDebtYear, setTechnicalDebtYear] = useState(1)
  const [isAutomationApplied, setIsAutomationApplied] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [simulationStarted, setSimulationStarted] = useState(false)

  // Calculate metrics with engineering logic
  const metrics = useROICalculator({
    weeklyManualHours: weeklyHours,
    teamSize: teamSize,
    errorRate: errorRate,
    hourlyRate: hourlyRate,
    technicalDebtYear: technicalDebtYear,
  })

  // Handle automation toggle with particle effect
  const handleApplyAutomation = () => {
    if (!isAutomationApplied) {
      // Create particles at random positions
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }))
      setParticles(newParticles)
      setTimeout(() => setParticles([]), 800)
    }
    setIsAutomationApplied(!isAutomationApplied)
  }

  // Prepare chart data
  const chartData = metrics.projectionMonths.map((month, idx) => ({
    month,
    manual: Math.round(metrics.manualCosts[idx]),
    automated: Math.round(metrics.automatedCosts[idx]),
    savings: Math.round(metrics.cumulativeSavings[idx]),
  }))

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value)
  }

  // Format hours
  const formatHours = (value: number) => {
    const days = Math.floor(value / 8)
    const hours = value % 8
    return `${days}d ${hours}h`
  }

  // Get status color
  const getStatusColor = () => {
    switch (metrics.systemStatus) {
      case 'OPTIMIZED':
        return 'text-[#00D9FF]'
      case 'HEATING_UP':
        return 'text-orange-400'
      case 'CRITICAL':
        return 'text-red-500'
    }
  }

  const getStatusBgColor = () => {
    switch (metrics.systemStatus) {
      case 'OPTIMIZED':
        return 'bg-[#00D9FF]/10 border-[#00D9FF]/50'
      case 'HEATING_UP':
        return 'bg-orange-400/10 border-orange-400/50'
      case 'CRITICAL':
        return 'bg-red-500/10 border-red-500/50'
    }
  }

  return (
    <section
      className={`py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${
        isArabic ? 'rtl' : 'ltr'
      }`}
    >
      {/* Particles Container */}
      <AnimatePresence>
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            x={particle.x}
            y={particle.y}
            delay={Math.random() * 0.1}
          />
        ))}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#00D9FF] via-[#1A1A2E] to-[#00D9FF] bg-clip-text text-transparent">
          {t('saasROI.title') || 'Operational Efficiency Audit'}
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          {t('saasROI.subtitle') ||
            'Engineering-grade analysis revealing your organization\'s true operational cost structure'}
        </p>
      </motion.div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* LEFT: Input Controls with Energy Leak Visualization */}
        <motion.div
          initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={`relative backdrop-blur-xl bg-gradient-to-br from-[#1A1A2E]/80 to-[#030303]/80 border border-[#00D9FF]/20 rounded-2xl p-8 shadow-2xl hover:shadow-[#00D9FF]/10 transition-all overflow-hidden`}
        >
          <GlitchEffect intensity={metrics.overloadSeverity} />

          <h3 className="relative z-10 text-2xl font-bold text-[#00D9FF] mb-2">
            {t('saasROI.systemInputs') || 'System Parameters'}
          </h3>
          <p className="relative z-10 text-gray-400 text-sm mb-8">
            {t('saasROI.energyLeakWarning') ||
              'Measuring friction loss and circuit efficiency'}
          </p>

          {/* Slider: Weekly Manual Hours with Glow */}
          <div className="relative z-10 mb-8">
            <label className="flex justify-between items-center mb-3">
              <span className="text-gray-200 font-semibold">
                {t('saasROI.weeklyHours') || 'Weekly Manual Hours'}
              </span>
              <motion.span
                animate={{
                  textShadow: `0 0 ${10 + metrics.glowIntensity * 20}px rgba(0, 217, 255, ${metrics.glowIntensity})`,
                  color: `rgba(0, 217, 255, ${0.7 + metrics.glowIntensity * 0.3})`,
                }}
                className="text-lg font-mono"
              >
                {weeklyHours}h
              </motion.span>
            </label>
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              value={weeklyHours}
              onChange={(e) => {
                setWeeklyHours(Number(e.target.value))
                setSimulationStarted(true)
              }}
              className="w-full h-2 bg-[#030303] rounded-lg appearance-none cursor-pointer accent-[#00D9FF]"
            />
            <div className="text-xs text-gray-500 mt-1 flex justify-between">
              <span>10h</span>
              <span className="text-[#00D9FF]/60">Energy Leak: {metrics.glowIntensity.toFixed(0)}%</span>
              <span>200h</span>
            </div>
          </div>

          {/* Slider: Team Size */}
          <div className="relative z-10 mb-8">
            <label className="flex justify-between items-center mb-3">
              <span className="text-gray-200 font-semibold">
                {t('saasROI.teamSize') || 'Team Size'}
              </span>
              <span className="text-[#00D9FF] text-lg font-mono">
                {teamSize} {t('saasROI.people') || 'people'}
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full h-2 bg-[#030303] rounded-lg appearance-none cursor-pointer accent-[#00D9FF]"
            />
            <div className="text-xs text-gray-500 mt-1 flex justify-between">
              <span>1</span>
              <span className="text-[#00D9FF]/60">Coordination Friction: {metrics.frictionLoss.toFixed(1)}%</span>
              <span>50</span>
            </div>
          </div>

          {/* Slider: Error Rate */}
          <div className="relative z-10 mb-8">
            <label className="flex justify-between items-center mb-3">
              <span className="text-gray-200 font-semibold">
                {t('saasROI.errorRate') || 'Error Rate'}
              </span>
              <span className="text-[#00D9FF] text-lg font-mono">
                {errorRate}%
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={errorRate}
              onChange={(e) => setErrorRate(Number(e.target.value))}
              className="w-full h-2 bg-[#030303] rounded-lg appearance-none cursor-pointer accent-[#00D9FF]"
            />
            <div className="text-xs text-gray-500 mt-1 flex justify-between">
              <span>0%</span>
              <span className="text-[#FF6B6B]/60">Error Cascade Active</span>
              <span>30%</span>
            </div>
          </div>

          {/* Slider: Hourly Rate */}
          <div className="relative z-10 mb-8">
            <label className="flex justify-between items-center mb-3">
              <span className="text-gray-200 font-semibold">
                {t('saasROI.hourlyRate') || 'Hourly Labor Rate'}
              </span>
              <span className="text-[#00D9FF] text-lg font-mono">
                ${hourlyRate}/h
              </span>
            </label>
            <input
              type="range"
              min="25"
              max="200"
              step="5"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full h-2 bg-[#030303] rounded-lg appearance-none cursor-pointer accent-[#00D9FF]"
            />
            <div className="text-xs text-gray-500 mt-1 flex justify-between">
              <span>$25</span>
              <span>$200</span>
            </div>
          </div>

          {/* Year Selector */}
          <div className="relative z-10 mb-8">
            <label className="flex justify-between items-center mb-3">
              <span className="text-gray-200 font-semibold">
                {t('saasROI.projectionYear') || 'Tech Debt Projection'}
              </span>
              <span className="text-[#00D9FF] text-lg font-mono">
                {t('saasROI.year') || 'Year'} {technicalDebtYear}
              </span>
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setTechnicalDebtYear(year) }}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                    technicalDebtYear === year
                      ? 'bg-[#00D9FF] text-[#030303]'
                      : 'bg-[#1A1A2E] text-gray-300 hover:bg-[#00D9FF]/20'
                  } pointer-events-auto`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT: System Status & Key Metrics */}
        <motion.div
          initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* System Status Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`backdrop-blur-xl bg-gradient-to-br from-[#1A1A2E]/80 to-[#030303]/80 border rounded-xl p-6 shadow-xl transition-all ${getStatusBgColor()}`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400 text-sm font-semibold">
                {t('saasROI.systemStatus') || 'System Status'}
              </p>
              <motion.div
                animate={{
                  scale: metrics.systemStatus === 'CRITICAL' ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 0.6,
                  repeat: metrics.systemStatus === 'CRITICAL' ? Infinity : 0,
                }}
                className={`w-3 h-3 rounded-full ${
                  metrics.systemStatus === 'OPTIMIZED'
                    ? 'bg-[#00D9FF]'
                    : metrics.systemStatus === 'HEATING_UP'
                    ? 'bg-orange-400'
                    : 'bg-red-500'
                }`}
              />
            </div>
            <p className={`text-2xl font-bold ${getStatusColor()}`}>
              {metrics.systemStatus === 'OPTIMIZED'
                ? t('saasROI.optimized') || 'OPTIMIZED'
                : metrics.systemStatus === 'HEATING_UP'
                ? t('saasROI.heatingUp') || 'HEATING UP'
                : t('saasROI.critical') || 'CRITICAL'}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {t('saasROI.circuitEfficiency') || 'Circuit Efficiency'}:{' '}
              <span className="text-[#00D9FF]">{metrics.circuitEfficiency.toFixed(0)}%</span>
            </p>
          </motion.div>

          {/* Total Cost Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="backdrop-blur-xl bg-gradient-to-br from-[#1A1A2E]/80 to-[#030303]/80 border border-[#00D9FF]/20 rounded-xl p-6 shadow-xl"
          >
            <p className="text-gray-400 text-sm mb-2">
              {t('saasROI.totalManualCost') || 'Total Manual Operation Cost'}
            </p>
            <motion.p
              animate={{
                textShadow: `0 0 ${isAutomationApplied ? 0 : 10 + metrics.overloadSeverity * 10}px rgba(0, 217, 255, ${isAutomationApplied ? 0 : metrics.overloadSeverity})`,
              }}
              className="text-3xl font-bold text-[#00D9FF]"
            >
              {formatCurrency(metrics.totalAnnualManualCost)}
            </motion.p>
            <p className="text-xs text-gray-500 mt-2">
              {isAutomationApplied
                ? t('saasROI.eliminated') || 'Eliminated by automation'
                : t('saasROI.annualBurden') ||
                  'Annual operational burden on growth'}
            </p>
          </motion.div>

          {/* Latency Recovered */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="backdrop-blur-xl bg-gradient-to-br from-[#1A1A2E]/80 to-[#030303]/80 border border-[#00D9FF]/20 rounded-xl p-6 shadow-xl"
          >
            <p className="text-gray-400 text-sm mb-2">
              {t('saasROI.timeRecovered') ||
                'Temporal Capital Recovered'}
            </p>
            <p className="text-3xl font-bold text-[#4ECDC4]">
              {formatHours(metrics.latencyRecovered)}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {t('saasROI.strategicCapacity') ||
                'Freed for strategic initiatives'}
            </p>
          </motion.div>

          {/* Capital Reinvestment */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="backdrop-blur-xl bg-gradient-to-br from-[#1A1A2E]/80 to-[#030303]/80 border border-[#00D9FF]/20 rounded-xl p-6 shadow-xl"
          >
            <p className="text-gray-400 text-sm mb-2">
              {t('saasROI.capitalReinvestment') ||
                'Capital Reinvestment Potential'}
            </p>
            <p className="text-3xl font-bold text-[#90EE90]">
              {formatCurrency(metrics.capitalReinvestment)}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {isAutomationApplied
                ? t('saasROI.annuallyAvailable') ||
                  'Available for growth deployment'
                : t('saasROI.potentialAnnual') || 'Per year by optimizing'}
            </p>
          </motion.div>

          {/* Payback Period */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="backdrop-blur-xl bg-gradient-to-br from-[#1A1A2E]/80 to-[#030303]/80 border border-[#00D9FF]/20 rounded-xl p-6 shadow-xl"
          >
            <p className="text-gray-400 text-sm mb-2">
              {t('saasROI.paybackPeriod') || 'ROI Payback Timeline'}
            </p>
            <p className="text-3xl font-bold text-[#FFD700]">
              {metrics.paybackMonths < 12
                ? `${metrics.paybackMonths}m`
                : `${Math.round(metrics.paybackMonths / 12)}y`}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {t('saasROI.fullRecovery') || 'To full investment recovery'}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Cinematic Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-xl bg-gradient-to-br from-[#1A1A2E]/80 to-[#030303]/80 border border-[#00D9FF]/20 rounded-2xl p-8 shadow-2xl mb-12"
      >
        <Suspense fallback={<SkeletonChart />}>
          <LazyROIChart
            data={chartData}
            locale={i18n.language}
            translationPrefix="saasROI"
          />
        </Suspense>

        <p className="text-center text-gray-400 text-sm mt-6">
          {t('saasROI.chartCaption') ||
            'Exponential friction loss in manual scaling vs. linear optimization in automated systems'}
        </p>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.button
          onClick={handleApplyAutomation}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative px-8 py-4 font-bold rounded-lg text-lg transition-all overflow-hidden group ${
            isAutomationApplied
              ? 'bg-gradient-to-r from-[#00D9FF] to-[#4ECDC4] text-[#030303] shadow-lg shadow-[#00D9FF]/50'
              : 'bg-gradient-to-r from-[#FF6B6B] to-[#FFD700] text-[#030303] hover:shadow-lg hover:shadow-[#FF6B6B]/50'
          }`}
        >
          <span className="relative z-10">
            {isAutomationApplied
              ? t('saasROI.systemOptimized') || '✓ System Optimized'
              : t('saasROI.applyOptimization') ||
                'Apply Imad\'s Logic'}
          </span>
          {!isAutomationApplied && (
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
        <p className="text-gray-400 mt-4 text-sm">
          {t('saasROI.ctaCaption') ||
            'See the mathematical case for operational transformation'}
        </p>
      </motion.div>

      {/* Overload Warning */}
      <AnimatePresence>
        {metrics.isSystemOverloaded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-12 p-6 rounded-lg border border-red-500/50 bg-red-500/10 backdrop-blur-xl"
          >
            <div className="flex items-start gap-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-red-500 text-2xl"
              >
                ⚠
              </motion.div>
              <div>
                <p className="text-red-400 font-semibold">
                  {t('saasROI.criticalAlert') ||
                    'CRITICAL: System Overload Detected'}
                </p>
                <p className="text-red-300 text-sm mt-2">
                  {t('saasROI.overloadMessage') ||
                    'Your organization is operating beyond sustainable efficiency thresholds. Manual scaling will compound exponentially. Immediate intervention required.'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Verdict Section - High Impact Closing Message */}
      <AnimatePresence>
        {simulationStarted && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            className="mt-16 relative overflow-hidden rounded-2xl backdrop-blur-xl bg-gradient-to-br from-[#1A1A2E]/90 to-[#030303]/90 p-12 border-2"
            style={{
              borderImage: `linear-gradient(135deg, #FFD700, #00D9FF, #FFD700) 1`,
              boxShadow: `0 0 30px rgba(255, 215, 0, 0.3), inset 0 0 30px rgba(0, 217, 255, 0.1)`,
            }}
          >
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(0, 217, 255, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            <div className="relative z-10">
              {/* Verdict Title */}
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-[#00D9FF] to-amber-300 bg-clip-text text-transparent">
                {t('saasROI.verdictTitle') || 'The Verdict'}
              </h3>

              {/* Verdict Message with Dynamic Values */}
              <p className="text-lg leading-relaxed text-gray-200 mb-8 font-light">
                {(t('saasROI.verdictMessage') ||
                  'The math is clear: Inefficiency is your highest hidden tax. You are currently running a system with [FRICTION]% friction loss. My architecture doesn\'t just save money; it reclaims your company\'s future. Let\'s stabilize your digital circuit today.')
                  .replace('[FRICTION]', metrics.frictionLoss.toFixed(1))
                  .replace('[TEAM]', teamSize.toString())}
              </p>

              {/* Key Statistics Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="backdrop-blur-md bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-2">Friction Loss</p>
                  <p className="text-2xl font-bold text-[#00D9FF]">
                    {metrics.frictionLoss.toFixed(1)}%
                  </p>
                </div>
                <div className="backdrop-blur-md bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-2">Annual Burden</p>
                  <p className="text-2xl font-bold text-amber-300">
                    ${(metrics.totalAnnualManualCost / 1000).toFixed(0)}K
                  </p>
                </div>
                <div className="backdrop-blur-md bg-[#4ECDC4]/10 border border-[#4ECDC4]/30 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-2">Time Recovered</p>
                  <p className="text-2xl font-bold text-[#4ECDC4]">
                    {Math.floor(metrics.latencyRecovered / 8)}d
                  </p>
                </div>
                <div className="backdrop-blur-md bg-[#90EE90]/10 border border-[#90EE90]/30 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-2">Capital Ready</p>
                  <p className="text-2xl font-bold text-[#90EE90]">
                    ${(metrics.capitalReinvestment / 1000).toFixed(0)}K/yr
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (onOpenFormWithMetrics) {
                    onOpenFormWithMetrics(metrics)
                  }
                }}
                className="px-10 py-4 bg-gradient-to-r from-amber-400 via-[#00D9FF] to-amber-400 text-[#030303] font-bold text-lg rounded-lg shadow-lg hover:shadow-2xl transition-all"
              >
                {t('saasROI.verdictCTA') || 'Schedule Optimization Review'}
              </motion.button>

              {/* Digital Signature */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-right mt-8 pt-6 border-t border-[#00D9FF]/20 text-amber-200"
                style={{
                  fontFamily: "'Dancing Script', 'Pacifico', cursive",
                  fontSize: '1.5rem',
                  letterSpacing: '0.05em',
                }}
              >
                {t('saasROI.verdictSignature') || 'System Architect: Imad Nasseri'}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default SaaSROIEngine
