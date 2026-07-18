'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faPhone, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white/80 pt-16 pb-0">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1" data-aos="fade-up">
            <Image
              src="/images/KCA-LOGO.png"
              alt="KCA Construction"
              width={50}
              height={50}
              className="h-12 w-auto mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              Leader dans le secteur du bâtiment et génie civil au Cameroun. 
              Des solutions durables et innovantes pour vos projets.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-700 transition-colors">
                <FontAwesomeIcon icon={faFacebookF} className="text-sm" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-700 transition-colors">
                <FontAwesomeIcon icon={faInstagram} className="text-sm" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-700 transition-colors">
                <FontAwesomeIcon icon={faLinkedinIn} className="text-sm" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-700 transition-colors">
                <FontAwesomeIcon icon={faYoutube} className="text-sm" />
              </a>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <h4 className="text-white font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              {['À propos', 'Services', 'Réalisations', 'Galerie', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-white/60 hover:text-white transition-colors hover:pl-2 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <h4 className="text-white font-semibold mb-4">Nos services</h4>
            <ul className="space-y-2">
              {['Études du sol', 'Maçonnerie', 'Électricité', 'Plomberie', 'Peinture et finitions'].map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="text-white/60 hover:text-white transition-colors hover:pl-2 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-aos="fade-up" data-aos-delay="300">
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-white/60">
                <FontAwesomeIcon icon={faPhone} className="text-blue-600 w-4" />
                <span>691 03 81 93</span>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <FontAwesomeIcon icon={faPhone} className="text-blue-600 w-4" />
                <span>653 72 58 80</span>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 w-4 mt-1" />
                <a href="mailto:kemmecarlos759@gmail.com" className="hover:text-white transition-colors">
                  kemmecarlos759@gmail.com
                </a>
              </li>
            </ul>
            <form className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-600 text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors"
                aria-label="S'abonner"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 pb-6 text-center text-white/40 text-sm">
          &copy; {currentYear} KCA Construction. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}