'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/about', label: 'À propos' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Réalisations' },
  { href: '/gallery', label: 'Galerie' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg py-3' : 'bg-slate-900 py-5'
        }`}
      >
        <div className="container">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/KCA-LOGO.png"
                alt="KCA Construction"
                width={45}
                height={45}
                className="h-10 md:h-12 w-auto"
                priority
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    pathname === link.href
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-slate-900 z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full p-8">
                <div className="flex justify-center mb-8">
                  <Image
                    src="/images/KCA-LOGO.png"
                    alt="KCA Construction"
                    width={60}
                    height={60}
                    className="h-14 w-auto"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                          pathname === link.href
                            ? 'bg-blue-700 text-white'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-white/10">
                  <div className="flex justify-center gap-4">
                    <a href="#" className="text-white/60 hover:text-white transition-colors">
                      <span className="sr-only">Facebook</span>
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">
                      <span className="sr-only">Instagram</span>
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">
                      <span className="sr-only">LinkedIn</span>
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">
                      <span className="sr-only">YouTube</span>
                      <FontAwesomeIcon icon={faYoutube} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}