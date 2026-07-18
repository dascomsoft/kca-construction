'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const allProjects = [
  {
    id: 1,
    title: 'Villa Moderne - Douala',
    category: 'Villa',
    location: 'Makepe, Douala',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop',
    description: 'Construction d\'une villa de standing avec piscine et jardin.',
    slug: 'villa-moderne-douala'
  },
  {
    id: 2,
    title: 'Immeuble Commercial - Douala',
    category: 'Commercial',
    location: 'Bonapriso, Douala',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
    description: 'Construction d\'un immeuble de 5 étages pour bureaux.',
    slug: 'immeuble-commercial-douala'
  },
  {
    id: 3,
    title: 'Complexe Résidentiel - Yaoundé',
    category: 'Résidentiel',
    location: 'Bastos, Yaoundé',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop',
    description: 'Réalisation de 8 villas de luxe en gated community.',
    slug: 'complexe-residentiel-yaounde'
  },
  {
    id: 4,
    title: 'Bâtiment Industriel - Kribi',
    category: 'Industriel',
    location: 'Kribi, Cameroun',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
    description: 'Construction d\'un bâtiment industriel de 2000m² avec bureaux.',
    slug: 'batiment-industriel-kribi'
  },
]

export default function ProjectsPage() {
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
              <FontAwesomeIcon icon={faFolderOpen} />
              Nos Réalisations
            </span>
            <h1>Nos <span className="text-blue-600">projets phares</span></h1>
            <p className="text-white/80 text-lg max-w-2xl mt-4">
              Découvrez l'étendue de notre savoir-faire à travers nos réalisations 
              en matière de construction et de génie civil.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-blue-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative overflow-hidden h-56">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-700">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-600" />
                    <span>{project.location}</span>
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-blue-700 font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Voir le projet
                    <span className="text-xs">→</span>
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