'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-[#1a2332] pt-20">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Page non trouvée</h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto">
          Oups ! La page que vous recherchez n'existe pas.
        </p>
        <Link href="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}