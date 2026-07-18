'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faPen, faEye, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export default function Hero() {
  const stats = [
    { number: '12', label: 'Projets réalisés' },
    { number: '95%', label: 'Clients satisfaits' },
    { number: '10', label: 'Experts dédiés' },
    { number: '100%', label: 'Conformité normes' },
  ]

  return (
    <section className="min-h-screen flex items-center relative bg-gradient-to-br from-slate-900 to-[#1a2332] overflow-hidden pt-16 sm:pt-20 pb-8 sm:pb-12">
      {/* Background avec overlay */}
      <div className="absolute inset-0 bg-[url('/images/technical-staff.jpeg')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Contenu texte - gauche */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <FontAwesomeIcon icon={faBuilding} className="text-blue-600" />
              Expert en construction depuis 2023
            </span>

            <h1 className="text-white mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Construisons l'avenir <br />
              <span className="text-blue-600">ensemble</span>
            </h1>

            <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-xl">
              KCA Construction est votre partenaire de confiance pour tous vos projets 
              de bâtiment, génie civil et rénovation au Cameroun.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Link href="/contact" className="btn-primary text-sm sm:text-base justify-center">
                <FontAwesomeIcon icon={faPen} className="mr-2" />
                Demander un devis
              </Link>
              <Link href="/projects" className="btn-secondary text-sm sm:text-base justify-center">
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                Voir nos projets
              </Link>
            </div>

            {/* Badges de confiance - version mobile compacte */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-1.5 sm:gap-2 text-white/70 text-xs sm:text-sm">
                <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 text-xs sm:text-sm" />
                Construction neuve
              </span>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 text-white/70 text-xs sm:text-sm">
                <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 text-xs sm:text-sm" />
                Rénovation
              </span>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 text-white/70 text-xs sm:text-sm">
                <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 text-xs sm:text-sm" />
                Génie civil
              </span>
            </div>

            {/* Stats - version mobile compacte */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center border-r border-white/10 last:border-r-0"
                >
                  <span className="block text-xl sm:text-2xl md:text-3xl font-black text-blue-600">
                    {stat.number}
                  </span>
                  <span className="text-[10px] sm:text-xs md:text-sm text-white/60">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Logo - droite avec effet de glow - version mobile réduite */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center order-1 lg:order-2 mb-4 sm:mb-6 lg:mb-0"
          >
            <div className="relative w-full max-w-[200px] sm:max-w-[280px] md:max-w-[350px] lg:max-w-md mx-auto">
              {/* Effet de glow lumineux - réduit sur mobile */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 sm:from-blue-600/30 via-blue-500/10 to-transparent rounded-full blur-2xl sm:blur-3xl animate-pulse-slow" />
              
              {/* Cercle décoratif - plus subtil sur mobile */}
              <div className="absolute inset-0 border border-blue-600/10 sm:border-2 sm:border-blue-600/20 rounded-full animate-pulse-slow" />
              <div className="absolute inset-4 sm:inset-8 border border-white/5 sm:border-white/10 rounded-full" />
              
              {/* Logo - taille adaptative */}
              <div className="relative aspect-square flex items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/KCA-LOGO.png"
                    alt="KCA Construction - Logo"
                    fill
                    className="object-contain drop-shadow-xl sm:drop-shadow-2xl"
                    priority
                    sizes="(max-width: 480px) 150px, (max-width: 768px) 200px, (max-width: 1024px) 280px, 350px"
                  />
                </div>
              </div>

              {/* Badge flottant en bas - version mobile compacte */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-3 sm:-bottom-4 lg:-bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm border border-blue-600/20 sm:border-blue-600/30 rounded-full px-3 sm:px-4 lg:px-6 py-1 sm:py-1.5 lg:py-2 shadow-lg shadow-blue-600/10 sm:shadow-xl sm:shadow-blue-600/20 whitespace-nowrap"
              >
                <span className="text-white font-medium text-[10px] sm:text-xs lg:text-sm">
                  <FontAwesomeIcon icon={faBuilding} className="text-blue-600 mr-1 sm:mr-2" />
                  BTP Excellence
                </span>
              </motion.div>

              {/* Badge flottant en haut à droite - version mobile réduite */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-2 sm:-top-3 lg:-top-4 -right-2 sm:-right-3 lg:-right-4 bg-blue-700 rounded-full w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 flex items-center justify-center shadow-lg sm:shadow-xl shadow-blue-700/20 sm:shadow-blue-700/30"
              >
                <span className="text-white text-center leading-tight">
                  <span className="block text-[10px] sm:text-xs lg:text-sm font-black">12+</span>
                  <span className="block text-[6px] sm:text-[7px] lg:text-[8px] font-medium opacity-80">Projets</span>
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Flèche de défilement en bas - cachée sur mobile */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/20 sm:text-white/30 hidden sm:block"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}