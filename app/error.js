'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Erreur:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-[#1a2332] pt-20">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-red-600 mb-4">!</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Une erreur est survenue</h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto">
          Désolé, une erreur inattendue s'est produite.
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
  )
}