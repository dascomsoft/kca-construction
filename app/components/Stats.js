'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { number: 12, label: 'Projets réalisés', suffix: '+' },
  { number: 8, label: 'Villes couvertes', suffix: '+' },
  { number: 15, label: 'Employés qualifiés', suffix: '+' },
  { number: 98, label: '% Satisfaction', suffix: '%' },
]

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    if (isInView) {
      const durations = [2000, 2000, 2000, 2000]
      const intervals = stats.map((stat, index) => {
        const steps = 60
        const increment = stat.number / steps
        let current = 0
        
        const interval = setInterval(() => {
          current += increment
          if (current >= stat.number) {
            current = stat.number
            clearInterval(interval)
          }
          setCounts(prev => {
            const newCounts = [...prev]
            newCounts[index] = Math.floor(current)
            return newCounts
          })
        }, durations[index] / steps)
        
        return interval
      })
      
      return () => intervals.forEach(interval => clearInterval(interval))
    }
  }, [isInView])

  return (
    <section ref={ref} className="py-16 bg-slate-900">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <span className="block text-4xl md:text-5xl font-black text-blue-600">
                {counts[index]}{stat.suffix}
              </span>
              <span className="text-white/70 text-sm md:text-base font-medium mt-2 block">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}