'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faMapMarkerAlt, faFolderOpen } from '@fortawesome/free-solid-svg-icons'

const projects = [
  {
    id: 1,
    title: 'Villa Moderne - Douala',
    category: 'Villa',
    location: 'Makepe, Douala',
    image: '/images/charpente1.jpeg',
    description: 'Construction d\'une villa de standing avec piscine et jardin.',
    slug: 'villa-moderne-douala'
  },
  {
    id: 2,
    title: 'Immeuble Commercial - Douala',
    category: 'Commercial',
    location: 'Bonapriso, Douala',
    image: '/images/charpente.jpeg',
    description: 'Construction d\'un immeuble de 5 étages pour bureaux.',
    slug: 'immeuble-commercial-douala'
  },
  {
    id: 3,
    title: 'Complexe Résidentiel - Yaoundé',
    category: 'Résidentiel',
    location: 'Bastos, Yaoundé',
    image: '/images/decoration-metal.jpg',
    description: 'Réalisation de 8 villas de luxe en gated community.',
    slug: 'complexe-residentiel-yaounde'
  },
]

export default function Projects() {
  return (
    <section className="section-padding bg-light-gray">
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <FontAwesomeIcon icon={faImages} />
            Nos Réalisations
          </span>
          <h2>
            Projets <span className="text-gradient">réalisés</span>
          </h2>
          <p>Découvrez quelques-uns de nos projets les plus significatifs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
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

        <div className="text-center mt-12" data-aos="fade-up">
          <Link href="/projects" className="btn-primary">
            <FontAwesomeIcon icon={faFolderOpen} className="mr-2" />
            Voir toutes nos réalisations
          </Link>
        </div>
      </div>
    </section>
  )
}