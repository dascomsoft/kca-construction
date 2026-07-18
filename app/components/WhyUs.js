'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faShieldAlt, 
  faHandshake, 
  faClock, 
  faUsers, 
  faAward,
  faBuilding,
  faCheckCircle,
  faRulerCombined,
  faHardHat,
  faTrophy
} from '@fortawesome/free-solid-svg-icons'

const reasons = [
  {
    icon: faHardHat,
    title: 'Expertise Technique',
    description: 'Notre équipe maîtrise les techniques les plus avancées du secteur du BTP.'
  },
  {
    icon: faClock,
    title: 'Respect des Délais',
    description: 'Nous nous engageons à livrer vos projets dans les temps impartis.'
  },
  {
    icon: faHandshake,
    title: 'Transparence Totale',
    description: 'Suivi régulier et communication claire tout au long du projet.'
  },
  {
    icon: faShieldAlt,
    title: 'Qualité Certifiée',
    description: 'Des matériaux premium et des finitions d\'exception pour chaque projet.'
  },
  {
    icon: faUsers,
    title: 'Équipe Expérimentée',
    description: 'Des professionnels passionnés avec plus de 10 ans d\'expérience.'
  },
  {
    icon: faAward,
    title: 'Satisfaction Garantie',
    description: 'La satisfaction de nos clients est notre priorité absolue.'
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

export default function WhyUs() {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container">
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <FontAwesomeIcon icon={faBuilding} />
            Pourquoi KCA ?
          </span>
          <h2 className="mb-4">
            Pourquoi choisir <span className="text-gradient">KCA Construction</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Des raisons qui font la différence dans la réalisation de vos projets de construction
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Logo Section - Grande et visible */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-700/5 rounded-full blur-3xl" />
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                  {/* Effet de cercle lumineux autour du logo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-700/10 rounded-full animate-pulse-slow" />
                  <div className="absolute inset-4 bg-gradient-to-br from-blue-600/10 to-blue-700/5 rounded-full" />
                  
                  {/* Logo */}
                  <Image
                    src="/images/KCA-LOGO.png"
                    alt="KCA Construction - Logo"
                    fill
                    className="object-contain p-6 drop-shadow-2xl relative z-10"
                    priority
                  />
                </div>
              </div>
            </div>
            
            {/* Badge sous le logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-4 flex flex-wrap justify-center gap-3"
            >
              <span className="px-4 py-2 bg-blue-700 text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-700/30">
                <FontAwesomeIcon icon={faTrophy} className="mr-2" />
                Entreprise de confiance
              </span>
              <span className="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-full shadow-lg">
                <FontAwesomeIcon icon={faRulerCombined} className="mr-2" />
                Excellence BTP
              </span>
            </motion.div>
          </motion.div>

          {/* Reasons Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group bg-white p-5 rounded-xl border border-stone-200 hover:border-blue-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-all duration-300 flex-shrink-0">
                      <FontAwesomeIcon icon={reason.icon} className="text-sm" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{reason.title}</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA mini */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FontAwesomeIcon icon={faCheckCircle} className="text-blue-700" />
                <span>Plus de 12 projets réalisés</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FontAwesomeIcon icon={faCheckCircle} className="text-blue-700" />
                <span>98% de clients satisfaits</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FontAwesomeIcon icon={faCheckCircle} className="text-blue-700" />
                <span>Équipe de 15 experts</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Section des chiffres clés additionnels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-stone-200"
        >
          <div className="text-center">
            <span className="block text-2xl font-black text-blue-700">2023</span>
            <span className="text-sm text-gray-500">Année de création</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-black text-blue-700">12+</span>
            <span className="text-sm text-gray-500">Projets réalisés</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-black text-blue-700">15</span>
            <span className="text-sm text-gray-500">Experts dédiés</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-black text-blue-700">8</span>
            <span className="text-sm text-gray-500">Villes couvertes</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}