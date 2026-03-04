import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'

const testimonials = [
  { author: 'Alex Chen', company: 'TechVentures Inc', rating: 5, text: 'Imad transformed our entire workflow in 2 weeks. 95% faster.' },
  { author: 'Sarah Martinez', company: 'GlobalScale Solutions', rating: 5, text: 'The SaaS he built is more sophisticated than anything we expected.' },
  { author: 'James Wilson', company: 'Innovation Labs', rating: 5, text: 'Best investment in automation we\'ve ever made. Game changer.' },
]

const stats = [
  { label: 'Projects Delivered', value: '150+' },
  { label: 'Client Satisfaction', value: '98%' },
  { label: 'Hours Automated', value: '50k+' },
  { label: 'Revenue Generated', value: '$12M+' },
]

export default function SocialProof() {
  const [displayedStats, setDisplayedStats] = useState(
    stats.map(() => 0)
  )

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      const targetValue = parseInt(stat.value)
      let current = 0
      return setInterval(() => {
        current += Math.ceil(targetValue / 50)
        if (current >= targetValue) {
          current = targetValue
          clearInterval(intervals[index])
        }
        setDisplayedStats(prev => {
          const newStats = [...prev]
          newStats[index] = current
          return newStats
        })
      }, 30)
    })

    return () => intervals.forEach(clearInterval)
  }, [])

  return (
    <section className="relative w-full py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-black/20 to-black/0">
      <div className="max-w-7xl mx-auto">
        {/* Statistics section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-lg p-6 border border-cyan-glow/20 hover:border-cyan-glow/50 transition-all text-center cursor-pointer"
            >
              <p className="text-4xl md:text-5xl font-black text-cyan-glow mb-2">
                {displayedStats[index]}{stat.value.includes('+') ? '+' : ''}
                {stat.value.includes('%') ? '%' : ''}
              </p>
              <p className="text-sm md:text-base text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials marquee */}
        <div className="relative mb-20 overflow-hidden">
          <motion.div
            animate={{ x: [-100, -400] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="flex gap-6 whitespace-nowrap"
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-80 glass rounded-lg p-6 border border-cyan-glow/20 hover:border-cyan-glow/50 transition-all cursor-pointer"
              >
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-xs text-cyan-glow">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-cyber-dark to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-cyber-dark to-transparent pointer-events-none" />
        </div>

        {/* Client logos section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl font-bold mb-8">Trusted by Leading Brands</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {Array(5).fill(0).map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="glass rounded-lg p-4 border border-cyan-glow/20 flex items-center justify-center h-20 cursor-pointer group"
              >
                <div className="text-center">
                  <p className="text-xs text-gray-400 group-hover:text-cyan-glow transition-colors">Client Logo</p>
                  <p className="text-2xl font-black text-cyan-glow/50 group-hover:text-cyan-glow transition-colors">★</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
