'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'

const services = [
  { 
    icon: 'etude-sol.jpeg', 
    title: 'Études du sol', 
    description: 'Analyses géotechniques approfondies pour garantir la stabilité de vos constructions.' 
  },
  { 
    icon: 'permis-batir.jpg', 
    title: 'Permis de bâtir', 
    description: 'Assistance administrative complète pour l\'obtention de vos autorisations.' 
  },
  { 
    icon: 'maconnerie.jpg', 
    title: 'Maçonnerie', 
    description: 'Réalisation de structures solides : fondations, murs, dalles et éléments porteurs.' 
  },
  { 
    icon: 'charpente.jpeg', 
    title: 'Charpente', 
    description: 'Conception et pose de charpentes en bois ou métal pour toitures.' 
  },
  { 
    icon: 'reservation.jpg', 
    title: 'Réservations', 
    description: 'Réalisation de réservoirs, bassins et citernes pour la gestion des eaux.' 
  },
  { 
    icon: 'electricite.jpeg', 
    title: 'Électricité', 
    description: 'Installations électriques complètes : éclairage, puissance, sécurité et domotique.' 
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export default function Services() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <FontAwesomeIcon icon={faBuilding} />
            Nos Services
          </span>
          <h2>
            Nos <span className="text-gradient">expertises</span>
          </h2>
          <p>Des prestations complètes pour tous vos besoins en construction</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-blue-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={`/images/${service.icon}`}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold mb-2">{service.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-blue-700 font-semibold mt-4 text-sm hover:gap-3 transition-all"
                >
                  En savoir plus
                  <span className="text-xs">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12" data-aos="fade-up">
          <Link href="/services" className="btn-primary">
            <FontAwesomeIcon icon={faBuilding} className="mr-2" />
            Voir tous nos services
          </Link>
        </div>
      </div>
    </section>
  )
}