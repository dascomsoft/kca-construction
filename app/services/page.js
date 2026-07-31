'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools, faSpinner } from '@fortawesome/free-solid-svg-icons'

// Mapping des icônes FontAwesome
import { 
  faRulerCombined, faFileSignature, faHelmetSafety,
  faTree, faWater, faBolt, faWrench, faPaintRoller,
  faTh, faCalculator, faPalette, faLayerGroup, faCube
} from '@fortawesome/free-solid-svg-icons'

const iconMap = {
  faRulerCombined,
  faFileSignature,
  faHelmetSafety,
  faTree,
  faWater,
  faBolt,
  faWrench,
  faPaintRoller,
  faTh,
  faCalculator,
  faPalette,
  faLayerGroup,
  faCube,
}

export default function ServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services')
      const data = await res.json()
      
      if (data.success) {
        setServices(data.data)
      } else {
        setError('Erreur lors du chargement des services')
      }
    } catch (err) {
      setError('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          <p className="text-gray-500">Chargement des services...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchServices} className="btn-primary">
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-[#1a2332] text-white py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-4">
              <FontAwesomeIcon icon={faTools} />
              Nos Services
            </span>
            <h1>Des solutions <span className="text-blue-600">complètes</span></h1>
            <p className="text-white/80 text-lg max-w-2xl mt-4">
              Du diagnostic initial à la livraison finale, nous vous accompagnons 
              à chaque étape de votre projet de construction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container">
          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun service pour le moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const IconComponent = iconMap[service.icon] || faTools
                return (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="group bg-white rounded-2xl p-6 border border-stone-200 hover:border-blue-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-2xl text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-all duration-300 mb-4">
                      <FontAwesomeIcon icon={IconComponent} />
                    </div>
                    <h4 className="text-lg font-bold mb-2">{service.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-slate-900 to-[#1a2332] text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-4">Un projet en tête ?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Discutons-en ensemble. Nos experts vous conseilleront sur la meilleure solution pour concrétiser votre projet.
            </p>
            <Link href="/contact" className="btn-primary">
              Contactez-nous
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}