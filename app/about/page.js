'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faBullseye, faEye, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons'
import WhyUs from '../components/WhyUs'

export default function AboutPage() {
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
              <FontAwesomeIcon icon={faInfoCircle} />
              À propos
            </span>
            <h1>Notre <span className="text-blue-600">histoire</span></h1>
            <p className="text-white/80 text-lg max-w-2xl mt-4">
              Découvrez l'engagement et la passion qui animent KCA Construction 
              depuis sa création en 2023.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6">
                Une aventure <span className="text-gradient">humaine</span> et <span className="text-gradient">professionnelle</span>
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>KCA Construction</strong> est une entreprise créée en Mai 2023 à Douala Makepe, 
                spécialisée dans les travaux de bâtiment, génie civil et rénovation.
              </p>
              <p className="text-gray-700 mb-4">
                Notre objectif est d'accompagner particuliers, entreprises et institutions 
                dans la réalisation de projets durables répondant aux normes professionnelles 
                les plus exigeantes.
              </p>
              <p className="text-gray-700 mb-6">
                Forts d'une équipe de professionnels passionnés, nous mettons notre expertise 
                au service de la construction d'un Cameroun moderne et durable.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="block text-3xl font-black text-blue-700">2023</span>
                  <span className="text-gray-600 text-sm">Création</span>
                </div>
                <div>
                  <span className="block text-3xl font-black text-blue-700">12+</span>
                  <span className="text-gray-600 text-sm">Projets</span>
                </div>
                <div>
                  <span className="block text-3xl font-black text-blue-700">15</span>
                  <span className="text-gray-600 text-sm">Experts</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop"
                  alt="Chantier KCA"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop"
                  alt="Construction moderne"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
                  alt="Immeuble commercial"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden -mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop"
                  alt="Villa moderne"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <WhyUs />
      {/* Mission & Vision */}
      <section className="section-padding bg-light-gray">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border border-stone-200 text-center hover:border-blue-600 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-700 mx-auto mb-4">
                <FontAwesomeIcon icon={faBullseye} />
              </div>
              <h4 className="text-xl font-bold mb-3">Notre Mission</h4>
              <p className="text-gray-600">
                Offrir des solutions de construction durables, innovantes et de haute qualité, 
                tout en respectant les délais et les budgets de nos clients.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border border-stone-200 text-center hover:border-blue-600 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-700 mx-auto mb-4">
                <FontAwesomeIcon icon={faEye} />
              </div>
              <h4 className="text-xl font-bold mb-3">Notre Vision</h4>
              <p className="text-gray-600">
                Devenir l'entreprise de référence en matière de construction et de génie civil 
                au Cameroun et en Afrique centrale.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border border-stone-200 text-center hover:border-blue-600 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-700 mx-auto mb-4">
                <FontAwesomeIcon icon={faHandHoldingHeart} />
              </div>
              <h4 className="text-xl font-bold mb-3">Nos Valeurs</h4>
              <p className="text-gray-600">
                Intégrité, Excellence, Innovation, Durabilité et Respect des engagements 
                sont au cœur de notre activité.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-blue-700 to-blue-800 text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-4">Travaillons ensemble</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Vous avez un projet de construction ? Contactez-nous pour un devis personnalisé.
            </p>
            <Link href="/contact" className="btn-primary bg-white text-blue-700 hover:bg-gray-100">
              Nous écrire
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}