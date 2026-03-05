import { useEffect, useState } from 'react'

/**
 * System Pulse - Floating header with real-time server metrics
 * Displays: Latency, Logic Version, Uptime
 * Simulates real backend metrics for visual interest
 */
export default function SystemPulse() {
  const [metrics, setMetrics] = useState({
    latency: 15,
    logicVersion: '3.8.1',
    uptime: 99.99,
  })

  useEffect(() => {
    // Simulate realistic metric fluctuations
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        latency: Math.max(
          10,
          Math.min(50, prev.latency + (Math.random() - 0.5) * 5)
        ),
        logicVersion: prev.logicVersion, // Static
        uptime: Math.max(
          99.95,
          Math.min(99.99, prev.uptime + (Math.random() - 0.5) * 0.01)
        ),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-4 right-4 z-40 hidden md:block">
      {/* Glassmorphic pulse container */}
      <div className="glass-premium rounded-lg p-4 border border-cyan-500/30">
        <div className="flex items-center gap-6">
          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-400">
              SYSTEM_ONLINE
            </span>
          </div>

          {/* Latency */}
          <div className="text-center">
            <div className="text-xs text-gray-400">Latency</div>
            <div className="text-sm font-mono text-cyan-400">
              {metrics.latency.toFixed(1)}ms
            </div>
          </div>

          {/* Logic Version */}
          <div className="text-center">
            <div className="text-xs text-gray-400">Logic V</div>
            <div className="text-sm font-mono text-cyan-400">
              {metrics.logicVersion}
            </div>
          </div>

          {/* Uptime */}
          <div className="text-center">
            <div className="text-xs text-gray-400">Uptime</div>
            <div className="text-sm font-mono text-cyan-400">
              {metrics.uptime.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
