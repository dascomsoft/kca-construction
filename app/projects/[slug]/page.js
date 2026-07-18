'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faMapMarkerAlt, faCalendar, faUser, faRulerCombined } from '@fortawesome/free-solid-svg-icons'

const projectsData = {
  'villa-moderne-douala': {
    title: 'Villa Moderne - Douala',
    category: 'Villa',
    location: 'Makepe, Douala',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=600&fit=crop',
    description: 'Construction d\'une villa de standing avec piscine et jardin.',
    details: 'Cette villa moderne de 4 chambres a été construite sur un terrain de 800m². Elle dispose d\'une piscine, d\'un jardin paysager, d\'une terrasse et de finitions haut de gamme.',
    date: '2023',
    client: 'Jean-Pierre N.',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop',
    ]
  },
  'immeuble-commercial-douala': {
    title: 'Immeuble Commercial - Douala',
    category: 'Commercial',
    location: 'Bonapriso, Douala',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
    description: 'Construction d\'un immeuble de 5 étages pour bureaux.',
    details: 'Cet immeuble de 5 étages abrite des bureaux modernes avec parking souterrain. Il dispose d\'ascenseurs, d\'une climatisation centrale et de finitions premium.',
    date: '2023',
    client: 'Promoteur immobilier',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=500&fit=crop',
    ]
  },
  'complexe-residentiel-yaounde': {
    title: 'Complexe Résidentiel - Yaoundé',
    category: 'Résidentiel',
    location: 'Bastos, Yaoundé',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop',
    description: 'Réalisation de 8 villas de luxe en gated community.',
    details: 'Ce complexe résidentiel de standing comprend 8 villas de luxe, des espaces communs paysagers, une piscine collective et une sécurisation 24h/24.',
    date: '2024',
    client: 'Investisseur privé',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop',
    ]
  },
  'batiment-industriel-kribi': {
    title: 'Bâtiment Industriel - Kribi',
    category: 'Industriel',
    location: 'Kribi, Cameroun',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
    description: 'Construction d\'un bâtiment industriel de 2000m² avec bureaux.',
    details: 'Ce bâtiment industriel de 2000m² comprend des espaces de production, des bureaux administratifs, un parking et des installations techniques modernes. Conçu pour répondre aux normes industrielles internationales.',
    date: '2024',
    client: 'Industrie Camerounaise',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=500&fit=crop',
    ]
  }
}

export default function ProjectDetail() {
  const params = useParams()
  const slug = params.slug
  const project = projectsData[slug]

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-4 text-slate-900">Projet non trouvé</h1>
          <p className="text-gray-600 mb-6">
            Le projet que vous recherchez n'existe pas ou a été déplacé.
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
          src={project.image}
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
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">À propos du projet</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {project.details}
              </p>
              
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
            </div>

            {/* Sidebar */}
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

      {/* Projets similaires */}
      <section className="section-padding bg-light-gray">
        <div className="container">
          <h3 className="text-2xl font-bold mb-6 text-center">Projets similaires</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(projectsData)
              .filter(p => p.title !== project.title)
              .slice(0, 3)
              .map((similarProject, index) => (
                <motion.div
                  key={similarProject.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-blue-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={similarProject.images[0]}
                      alt={similarProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-sm">{similarProject.title}</h4>
                    <p className="text-gray-600 text-xs mt-1">{similarProject.location}</p>
                    <Link
                      href={`/projects/${Object.keys(projectsData).find(key => projectsData[key].title === similarProject.title)}`}
                      className="inline-flex items-center gap-1 text-blue-700 text-sm font-semibold mt-2 hover:gap-2 transition-all"
                    >
                      Voir le projet →
                    </Link>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}