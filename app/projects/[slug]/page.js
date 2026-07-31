'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faMapMarkerAlt, faCalendar, faUser, faRulerCombined, faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function ProjectDetail() {
  const params = useParams()
  const slug = params.slug
  
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (slug) {
      fetchProject()
    }
  }, [slug])

  const fetchProject = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔍 Récupération du projet avec slug:', slug)
      
      const res = await fetch(`/api/projects/${slug}`)
      const data = await res.json()
      
      console.log('📦 Données reçues:', data)
      
      if (data.success) {
        setProject(data.data)
      } else {
        setError(data.message || 'Projet non trouvé')
      }
    } catch (err) {
      console.error('❌ Erreur:', err)
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
          <p className="text-gray-500">Chargement du projet...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-4 text-slate-900">Projet non trouvé</h1>
          <p className="text-gray-600 mb-2">
            Le projet que vous recherchez n'existe pas ou a été déplacé.
          </p>
          <p className="text-sm text-gray-400 mb-6">
            Slug recherché: <strong>{slug}</strong>
          </p>
          <Link href="/projects" className="btn-primary inline-flex">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Retour aux projets
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src={project.image || '/images/placeholder.jpg'}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Retour aux projets
              </Link>
              <h1 className="text-white text-3xl md:text-5xl font-bold mb-2">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-3 mb-2">
                <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  {project.category}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                  <FontAwesomeIcon icon={faRulerCombined} className="mr-1" />
                  {project.date}
                </span>
              </div>
              <p className="text-white/80 text-lg max-w-2xl">
                {project.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Details */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">À propos du projet</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {project.details}
              </p>
              
              {project.images && project.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                  {project.images.map((img, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative h-48 rounded-xl overflow-hidden group cursor-pointer"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} - Image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Voir</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="bg-gray-100 rounded-2xl p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-4">Informations</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-500 block">Catégorie</span>
                    <span className="font-semibold">{project.category}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block">Lieu</span>
                    <span className="font-semibold flex items-center gap-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-600 text-sm" />
                      {project.location}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block">Date</span>
                    <span className="font-semibold flex items-center gap-2">
                      <FontAwesomeIcon icon={faCalendar} className="text-blue-600 text-sm" />
                      {project.date}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block">Client</span>
                    <span className="font-semibold flex items-center gap-2">
                      <FontAwesomeIcon icon={faUser} className="text-blue-600 text-sm" />
                      {project.client}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-stone-300">
                  <Link href="/contact" className="btn-primary w-full text-center justify-center">
                    Demander un devis similaire
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}