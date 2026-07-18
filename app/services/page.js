'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faTools, faRulerCombined, faFileSignature, faHelmetSafety,
  faTree, faWater, faBolt, faWrench, faPaintRoller,
  faTh, faCalculator, faPalette, faLayerGroup, faCube
} from '@fortawesome/free-solid-svg-icons'

const allServices = [
  { icon: faRulerCombined, title: 'Études du sol', description: 'Analyses géotechniques approfondies pour garantir la stabilité et la sécurité de vos constructions.' },
  { icon: faFileSignature, title: 'Permis de bâtir', description: 'Assistance administrative complète pour l\'obtention de vos autorisations de construire.' },
  { icon: faHelmetSafety, title: 'Maçonnerie', description: 'Réalisation de structures solides et durables : fondations, murs, dalles et éléments porteurs.' },
  { icon: faTree, title: 'Charpente', description: 'Conception et pose de charpentes en bois ou métal pour toitures et structures aériennes.' },
  { icon: faWater, title: 'Réservations', description: 'Réalisation de réservoirs, bassins et citernes pour la gestion des eaux pluviales et d\'alimentation.' },
  { icon: faBolt, title: 'Électricité', description: 'Installations électriques complètes : éclairage, puissance, sécurité et domotique.' },
  { icon: faWrench, title: 'Plomberie', description: 'Installation de réseaux d\'eau, d\'assainissement et de systèmes de chauffage et de climatisation.' },
  { icon: faPaintRoller, title: 'Peinture', description: 'Peinture intérieure et extérieure avec des finitions de qualité supérieure.' },
  { icon: faTh, title: 'Carrelage', description: 'Pose de carrelage, faïence et autres revêtements de sol et de mur.' },
  { icon: faCalculator, title: 'Calcul de structure', description: 'Études structurelles détaillées pour la sécurité et la durabilité de vos bâtiments.' },
  { icon: faPalette, title: 'Décoration murale', description: 'Création de décors muraux personnalisés et artistiques pour vos espaces intérieurs.' },
  { icon: faLayerGroup, title: 'Résine époxy', description: 'Application de résine époxy pour des sols industriels et commerciaux haute résistance.' },
  { icon: faCube, title: 'Métal déployé', description: 'Création d\'éléments décoratifs et architecturaux en métal déployé.' },
]

export default function ServicesPage() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl p-6 border border-stone-200 hover:border-blue-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-2xl text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-all duration-300 mb-4">
                  <FontAwesomeIcon icon={service.icon} />
                </div>
                <h4 className="text-lg font-bold mb-2">{service.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
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