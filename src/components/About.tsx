import { motion } from 'framer-motion'
import { Zap, Code2, Sparkles, Workflow } from 'lucide-react'

export default function About() {
  const coreAreas = [
    {
      icon: Code2,
      title: 'SaaS Engineering & Digital Architecture',
      description: 'Developing scalable, high-performance software solutions with a "Cyber-Luxury" aesthetic—merging elite design with robust back-end logic.'
    },
    {
      icon: Workflow,
      title: 'Intelligent Workflow Automation',
      description: 'Leveraging tools like n8n and Make to eliminate manual friction. I don\'t just automate tasks; I reclaim your time and maximize your ROI by building self-sustaining business systems.'
    },
    {
      icon: Sparkles,
      title: 'AI Animation & Visual Storytelling',
      description: 'Utilizing state-of-the-art generative AI to produce high-fidelity cinematic visuals that transform brand narratives into immersive digital experiences.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section id="about" className="relative w-full py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-black/20 via-cyan-950/10 to-black/20">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-transparent blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-purple-500/10 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Imad Nasseri
          </h2>
          <p className="text-xl text-cyan-300 font-bold mb-8">
            "While the world discusses the future of AI, I am busy engineering it."
          </p>
        </motion.div>

        {/* Main intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm"
        >
          <p className="text-lg text-gray-200 leading-relaxed mb-6">
            I am <span className="text-cyan-400 font-bold">Imad Nasseri</span>, a <span className="text-highlight font-bold">Digital Architect</span> operating at the intersection of Logical Precision and Cinematic Vision. I don't just build software; I design intelligent ecosystems that think, scale, and perform with surgical precision.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            My focus is on helping high-ticket clients and forward-thinking businesses bridge the gap between complex AI technology and seamless user experiences.
          </p>
        </motion.div>

        {/* Core Expertise */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-black text-cyan-400 mb-12 flex items-center gap-3">
            <Zap className="w-8 h-8" />
            Core Expertise
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {coreAreas.map((area) => {
              const Icon = area.icon
              return (
                <motion.div
                  key={area.title}
                  variants={cardVariants}
                  className="group relative bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 hover:border-cyan-500/60 rounded-xl p-8 transition-all duration-300"
                >
                  {/* Hover glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-400/10 to-blue-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur pointer-events-none" />

                  <div className="relative">
                    <div className="mb-4 p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg w-fit">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h4 className="text-lg font-bold text-cyan-300 mb-3">
                      {area.title}
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-500/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm mb-16"
        >
          <h3 className="text-2xl font-bold text-purple-400 mb-6">The Philosophy</h3>
          <p className="text-lg text-gray-200 leading-relaxed mb-4">
            I do not sell <span className="text-purple-400 italic">'features.'</span> I sell <span className="text-highlight font-bold">Time</span> and <span className="text-highlight font-bold">Competitive Advantage.</span>
          </p>
          <p className="text-gray-300 leading-relaxed">
            The time saved through hyper-efficient automation and the advantage gained through a superior, AI-driven visual identity.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg text-gray-300 mb-6">
            If you are looking for a technical partner who values authenticity, technical depth, and the pursuit of digital excellence, let's build the future together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:imadnasri15@gmail.com"
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              📩 Direct Inquiry
            </a>
            <span className="text-gray-400">imadnasri15@gmail.com</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
