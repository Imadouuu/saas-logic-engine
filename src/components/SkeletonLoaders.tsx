import { motion } from 'framer-motion'

/**
 * Skeleton Loader - Cyber Luxury Theme
 * Ghost loading states that match the design aesthetic
 * Uses pulsing obsidian/cyan for a "feeling instant" perception
 */

export function SkeletonText({
  lines = 3,
  width = 'w-full',
}: {
  lines?: number
  width?: string
}) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className={`h-3 ${width} rounded bg-gradient-to-r from-cyan-900/30 to-cyan-900/10`}
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <motion.div
      className="rounded-lg border border-cyan-500/10 p-6 space-y-4"
      animate={{
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    >
      {/* Header skeleton */}
      <motion.div
        className="h-6 w-3/4 rounded bg-gradient-to-r from-cyan-500/20 to-cyan-500/5"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* Content skeleton */}
      <div className="space-y-2">
        <motion.div
          className="h-3 w-full rounded bg-gradient-to-r from-cyan-500/15 to-cyan-500/5"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.1,
          }}
        />
        <motion.div
          className="h-3 w-5/6 rounded bg-gradient-to-r from-cyan-500/15 to-cyan-500/5"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.2,
          }}
        />
      </div>
    </motion.div>
  )
}

export function SkeletonChart() {
  return (
    <motion.div
      className="w-full h-64 rounded-lg border border-cyan-500/10 p-6 flex flex-col justify-between"
      animate={{
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    >
      {/* Chart bars skeleton */}
      <div className="flex items-end justify-around gap-4 flex-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-gradient-to-t from-cyan-500/30 to-cyan-500/10 rounded-sm"
            style={{
              height: `${Math.random() * 100 + 20}%`,
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.05,
            }}
          />
        ))}
      </div>

      {/* Axis labels skeleton */}
      <div className="flex justify-between gap-2 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-2 w-8 rounded bg-gradient-to-r from-cyan-500/20 to-cyan-500/5"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.08,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export function SkeletonButton() {
  return (
    <motion.div
      className="h-12 w-full rounded-lg bg-gradient-to-r from-cyan-500/20 to-cyan-500/5"
      animate={{
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
    />
  )
}

export function SkeletonGrid({
  columns = 3,
  count = 6,
}: {
  columns?: number
  count?: number
}) {
  return (
    <div
      className={`grid gap-6 grid-cols-1 md:grid-cols-${columns}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

/**
 * Enhanced Skeleton Loader with shimmer effect
 * Mimics liquid interface movement
 */
export function SkeletonShimmer() {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <div className="relative bg-cyan-900/20 backdrop-blur-sm">
        <div className="aspect-video" />
      </div>
    </div>
  )
}

/**
 * ROI Engine Skeleton - Tailored shape
 */
export function SkeletonROIEngine() {
  return (
    <div className="space-y-6">
      {/* Input controls skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-10 rounded-lg bg-gradient-to-r from-cyan-500/15 to-cyan-500/5"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.08,
            }}
          />
        ))}
      </div>

      {/* Chart skeleton */}
      <SkeletonChart />

      {/* Metrics skeleton */}
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-20 rounded-lg border border-cyan-500/10 p-4"
            animate={{
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.12,
            }}
          >
            <div className="h-3 w-20 rounded bg-cyan-500/20 mb-2" />
            <div className="h-4 w-16 rounded bg-cyan-500/15" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/**
 * Video/Hero Skeleton
 */
export function SkeletonHero() {
  return (
    <motion.div
      className="w-full aspect-video rounded-lg border border-cyan-500/10 overflow-hidden bg-gradient-to-br from-cyan-900/20 to-black/40"
      animate={{
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    >
      {/* Diagonal lines animation */}
      <div className="relative w-full h-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            style={{
              width: '200%',
              height: '4px',
              top: `${(i / 8) * 100}%`,
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
