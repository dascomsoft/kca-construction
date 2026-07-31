'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Erreur globale:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-[#1a2332]">
          <div className="text-center px-4">
            <h1 className="text-6xl md:text-8xl font-bold text-red-600 mb-4">💥</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Erreur système</h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Une erreur critique s'est produite. Veuillez réessayer plus tard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={reset} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                Réessayer
              </button>
              <Link href="/" className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors border border-white/20">
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}