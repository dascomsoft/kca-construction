'use client'

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faStar, faComments } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'Jean-Pierre N.',
    role: 'Propriétaire villa - Douala',
    avatar: '/images/technical-staff.jpeg',
    content: 'KCA Construction a réalisé la construction de ma villa à Douala. Professionnalisme, respect des délais et qualité des finitions. Je recommande vivement !',
    rating: 5
  },
  {
    id: 2,
    name: 'Paul B.',
    role: 'Promoteur - Yaoundé',
    avatar: '/images/technical-staff.jpeg',
    content: 'Nous avons fait appel à KCA pour la rénovation de notre immeuble à Yaoundé. Une équipe compétente et à l\'écoute. Un travail remarquable.',
    rating: 5
  },
  {
    id: 3,
    name: 'Joseph K.',
    role: 'Entrepreneur - Kribi',
    avatar: '/images/technical-staff.jpeg',
    content: 'KCA a su comprendre notre vision pour ce projet de grande envergure. Leur expertise en génie civil est indéniable. Un partenaire fiable.',
    rating: 5
  },
]

export default function Testimonials() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <FontAwesomeIcon icon={faComments} />
            Témoignages
          </span>
          <h2>
            Ce que disent nos <span className="text-gradient">clients</span>
          </h2>
          <p>Des avis de clients satisfaits à travers le Cameroun</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-blue-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <FontAwesomeIcon icon={faQuoteLeft} className="text-blue-700 text-3xl opacity-20 mb-4" />
              
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
                ))}
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-700 flex-shrink-0 relative">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h6 className="font-semibold text-sm">{testimonial.name}</h6>
                  <span className="text-gray-500 text-xs">{testimonial.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}