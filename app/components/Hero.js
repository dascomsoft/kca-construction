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
    <section className="min-h-screen flex items-center relative bg-gradient-to-br from-slate-900 to-[#1a2332] overflow-hidden pt-20 pb-12">
      {/* Background avec overlay */}
      <div className="absolute inset-0 bg-[url('/images/technical-staff.jpeg')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Contenu texte - gauche */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
              <FontAwesomeIcon icon={faBuilding} className="text-blue-600" />
              Expert en construction depuis 2023
            </span>

            <h1 className="text-white mb-6">
              Construisons l'avenir <br />
              <span className="text-blue-600">ensemble</span>
            </h1>

            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-xl">
              KCA Construction est votre partenaire de confiance pour tous vos projets 
              de bâtiment, génie civil et rénovation au Cameroun.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/contact" className="btn-primary">
                <FontAwesomeIcon icon={faPen} className="mr-2" />
                Demander un devis
              </Link>
              <Link href="/projects" className="btn-secondary">
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                Voir nos projets
              </Link>
            </div>

            {/* Badges de confiance */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 text-white/70 text-sm">
                <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600" />
                Construction neuve
              </span>
              <span className="inline-flex items-center gap-2 text-white/70 text-sm">
                <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600" />
                Rénovation
              </span>
              <span className="inline-flex items-center gap-2 text-white/70 text-sm">
                <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600" />
                Génie civil
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center border-r border-white/10 last:border-r-0"
                >
                  <span className="block text-2xl md:text-3xl font-black text-blue-600">
                    {stat.number}
                  </span>
                  <span className="text-sm text-white/60">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Logo - droite avec effet de glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Effet de glow lumineux */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
              
              {/* Cercle décoratif */}
              <div className="absolute inset-0 border-2 border-blue-600/20 rounded-full animate-pulse-slow" />
              <div className="absolute inset-8 border border-white/10 rounded-full" />
              
              {/* Logo */}
              <div className="relative aspect-square flex items-center justify-center p-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/KCA-LOGO.png"
                    alt="KCA Construction - Logo"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Badge flottant en bas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm border border-blue-600/30 rounded-full px-6 py-2 shadow-xl shadow-blue-600/20 whitespace-nowrap"
              >
                <span className="text-white font-medium text-sm">
                  <FontAwesomeIcon icon={faBuilding} className="text-blue-600 mr-2" />
                  BTP Excellence
                </span>
              </motion.div>

              {/* Badge flottant en haut à droite */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-4 -right-4 bg-blue-700 rounded-full w-16 h-16 flex items-center justify-center shadow-xl shadow-blue-700/30"
              >
                <span className="text-white text-center leading-tight">
                  <span className="block text-sm font-black">12+</span>
                  <span className="block text-[8px] font-medium opacity-80">Projets</span>
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Flèche de défilement en bas */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 hidden lg:block"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}