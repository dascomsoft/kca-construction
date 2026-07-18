'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faEnvelope, faPhone, faMapMarkerAlt, faPaperPlane,
  faClock, faCheck
} from '@fortawesome/free-solid-svg-icons'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        sujet: '',
        message: ''
      })
      setTimeout(() => setIsSubmitted(false), 5000)
    }, 1500)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
              <FontAwesomeIcon icon={faEnvelope} />
              Contactez-nous
            </span>
            <h1>Parlons de <span className="text-blue-600">votre projet</span></h1>
            <p className="text-white/80 text-lg max-w-2xl mt-4">
              Une question, un devis, un projet ? N'hésitez pas à nous contacter. 
              Nos experts sont à votre écoute.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-blue-600 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl text-blue-700 mb-4">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <h4 className="font-bold mb-2">Téléphone</h4>
                <p className="text-gray-600">
                  <a href="tel:691038193" className="hover:text-blue-700 transition-colors">691 03 81 93</a><br />
                  <a href="tel:653725880" className="hover:text-blue-700 transition-colors">653 72 58 80</a>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-blue-600 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl text-blue-700 mb-4">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <h4 className="font-bold mb-2">Email</h4>
                <p className="text-gray-600">
                  <a href="mailto:kemmecarlos759@gmail.com" className="hover:text-blue-700 transition-colors">
                    kemmecarlos759@gmail.com
                  </a>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-blue-600 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl text-blue-700 mb-4">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <h4 className="font-bold mb-2">Adresse</h4>
                <p className="text-gray-600">
                  Makepe, Douala<br />
                  Cameroun
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl border border-stone-200"
              >
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl text-blue-700 mb-4">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <h4 className="font-bold mb-2">Horaires</h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span>8h00 - 17h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi</span>
                    <span>8h00 - 13h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche</span>
                    <span className="text-red-500">Fermé</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Envoyez-nous un message</h3>
                
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-3"
                  >
                    <FontAwesomeIcon icon={faCheck} className="text-green-600" />
                    <span>Votre message a été envoyé avec succès !</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-2 text-sm">Nom</label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2 text-sm">Prénom</label>
                      <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                        placeholder="Votre prénom"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-2 text-sm">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2 text-sm">Téléphone</label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                        placeholder="Votre numéro"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2 text-sm">Sujet</label>
                    <select
                      name="sujet"
                      value={formData.sujet}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                      required
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option>Demande de devis</option>
                      <option>Renseignements</option>
                      <option>Projet de construction</option>
                      <option>Rénovation</option>
                      <option>Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2 text-sm">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-y"
                      placeholder="Décrivez votre projet..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center text-center"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}