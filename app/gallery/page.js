'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faTimes, faExpand, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const categories = ['Tout', 'chantier', 'structure', 'technique', 'finition', 'villa', 'interieur']

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('Tout')
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/gallery')
      const data = await res.json()
      
      if (data.success) {
        setImages(data.data)
      } else {
        setError('Erreur lors du chargement des images')
      }
    } catch (err) {
      setError('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  const filteredImages = activeCategory === 'Tout' 
    ? images 
    : images.filter(img => img.category === activeCategory)

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          <p className="text-gray-500">Chargement de la galerie...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchImages} className="btn-primary">
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
              <FontAwesomeIcon icon={faImages} />
              Galerie
            </span>
            <h1>Nos <span className="text-blue-600">images</span></h1>
            <p className="text-white/80 text-lg max-w-2xl mt-4">
              Un aperçu de notre travail à travers des photos de chantiers, 
              de réalisations et de finitions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding">
        <div className="container">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Images Grid */}
          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucune image dans cette catégorie</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group overflow-hidden rounded-2xl cursor-pointer aspect-square bg-gray-100"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.image}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                    <div className="text-white">
                      <FontAwesomeIcon icon={faExpand} className="text-xl mb-1 block" />
                      <p className="text-sm font-medium">{image.title}</p>
                      <span className="text-xs text-white/60">{image.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-gray-100 rounded-2xl p-4">
              <span className="block text-2xl font-bold text-blue-700">{images.length}</span>
              <span className="text-sm text-gray-600">Photos totales</span>
            </div>
            <div className="bg-gray-100 rounded-2xl p-4">
              <span className="block text-2xl font-bold text-blue-700">{categories.length - 1}</span>
              <span className="text-sm text-gray-600">Catégories</span>
            </div>
            <div className="bg-gray-100 rounded-2xl p-4">
              <span className="block text-2xl font-bold text-blue-700">15+</span>
              <span className="text-sm text-gray-600">Projets documentés</span>
            </div>
            <div className="bg-gray-100 rounded-2xl p-4">
              <span className="block text-2xl font-bold text-blue-700">100%</span>
              <span className="text-sm text-gray-600">Qualité professionnelle</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl w-full h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full">
                <p className="font-medium">{selectedImage.title}</p>
                <p className="text-xs text-white/60">{selectedImage.category}</p>
              </div>
            </motion.div>

            {/* Navigation buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                const currentIndex = filteredImages.findIndex(img => img._id === selectedImage._id)
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
                setSelectedImage(filteredImages[prevIndex])
              }}
            >
              ‹
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                const currentIndex = filteredImages.findIndex(img => img._id === selectedImage._id)
                const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
                setSelectedImage(filteredImages[nextIndex])
              }}
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-slate-900 to-[#1a2332] text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-4">Vous souhaitez voir plus ?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Visitez nos chantiers ou contactez-nous pour un rendez-vous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Prendre rendez-vous
              </Link>
              <Link href="/projects" className="btn-secondary border-white text-white hover:bg-white hover:text-blue-700">
                Voir nos réalisations
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}