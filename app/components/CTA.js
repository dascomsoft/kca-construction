'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faInfo } from '@fortawesome/free-solid-svg-icons'

export default function CTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-slate-900 to-[#1a2332] text-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-white mb-4">
            Prêt à réaliser votre projet ?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé. 
            Nos experts sont à votre écoute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary bg-white text-blue-700 hover:bg-gray-100">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              Nous contacter
            </Link>
            <Link href="/services" className="btn-secondary border-white text-white hover:bg-white hover:text-blue-700">
              <FontAwesomeIcon icon={faInfo} className="mr-2" />
              Découvrir nos services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}