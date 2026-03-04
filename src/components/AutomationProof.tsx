import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Clock, Zap } from 'lucide-react'

const proofs = [
  {
    id: 1,
    title: 'Manual Process',
    time: '40 hours/week',
    cost: '$5,000+/month',
    icon: Clock,
    color: 'text-red-500',
  },
  {
    id: 2,
    title: 'With Automation',
    time: '2 hours/week',
    cost: '$500/month',
    icon: Zap,
    color: 'text-cyan-glow',
  },
]

const metrics = [
  { label: 'Faster Processing', value: '95%' },
  { label: 'Cost Reduction', value: '90%' },
  { label: 'Error Elimination', value: '99.8%' },
  { label: 'ROI Within', value: '2 months' },
]

export default function AutomationProof() {
  return (
    <section className="relative w-full py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-glow-cyan">Automation</span> Proof
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Real-world results showing the transformation from manual workflows to intelligent automation.
          </p>
        </motion.div>

        {/* Before/After comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {proofs.map((proof, index) => {
            const IconComponent = proof.icon
            return (
              <motion.div
                key={proof.id}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-8 border border-cyan-glow/20 hover:border-cyan-glow/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${index === 0 ? 'from-red-500/20 to-pink-500/20' : 'from-cyan-glow/20 to-blue-500/20'}`}>
                    <IconComponent className={`w-6 h-6 ${proof.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold">{proof.title}</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Time Investment</p>
                    <p className={`text-3xl font-black ${proof.color}`}>{proof.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Monthly Cost</p>
                    <p className={`text-3xl font-black ${proof.color}`}>{proof.cost}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Arrow between */}
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mb-16"
        >
          <div className="hidden md:flex items-center gap-2 text-cyan-glow">
            <ArrowRight className="w-8 h-8 rotate-180" />
            <span className="font-bold">Transform with automation</span>
            <ArrowRight className="w-8 h-8" />
          </div>
        </motion.div>

        {/* Key metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-lg p-6 border border-cyan-glow/20 hover:border-cyan-glow/50 transition-all text-center cursor-pointer"
            >
              <p className="text-sm md:text-base text-gray-400 mb-2">{metric.label}</p>
              <p className="text-3xl md:text-4xl font-black text-cyan-glow">{metric.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-glow to-indigo-glow text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-glow/50 transition-all flex items-center gap-2 mx-auto">
            Schedule Automation Audit <TrendingUp className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
