import './globals.css'
import ClientLayout from './ClientLayout'

export const metadata = {
  metadataBase: new URL('https://kcaconstruction.vercel.app'),
  
  title: {
    default: 'KCA Construction - Leader du Bâtiment et Génie Civil au Cameroun',
    template: '%s | KCA Construction'
  },
  description: 'KCA Construction : Expert en bâtiment, génie civil et rénovation à Douala, Yaoundé et tout le Cameroun. Construction de villas, immeubles, travaux de finition. Devis gratuit 691 03 81 93.',
  
  keywords: [
    'construction Cameroun',
    'génie civil Cameroun',
    'bâtiment Douala',
    'construction villa Douala',
    'rénovation Cameroun',
    'entreprise construction Yaoundé',
    'travaux bâtiment Cameroun',
    'construction immeuble Douala',
    'KCA Construction',
    'BTP Cameroun',
    'construction résidentielle',
    'gros œuvre',
    'travaux de finition',
    'plomberie Cameroun',
    'électricité bâtiment',
    'carrelage Douala',
    'peinture professionnelle',
    'charpente métallique',
    'permis de bâtir',
    'étude de sol Cameroun'
  ].join(', '),

  authors: [{ name: 'KCA Construction', url: 'https://kcaconstruction.vercel.app' }],
  creator: 'KCA Construction',
  publisher: 'KCA Construction',
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: 'KCA Construction - Leader du Bâtiment et Génie Civil au Cameroun',
    description: 'Expert en construction, rénovation et travaux de finition au Cameroun. Réalisez vos projets avec KCA Construction.',
    url: 'https://kcaconstruction.vercel.app',
    siteName: 'KCA Construction',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KCA Construction - Bâtiment et Génie Civil',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'KCA Construction - Bâtiment et Génie Civil Cameroun',
    description: 'Expert en construction, rénovation et travaux de finition au Cameroun.',
    images: ['/images/twitter-image.jpg'],
    creator: '@kcaconstruction',
    site: '@kcaconstruction',
  },

  alternates: {
    canonical: '/',
    languages: {
      'fr': '/',
      'en': '/en',
    },
  },

  verification: {
    google: 'votre-google-verification-code',
    yandex: 'votre-yandex-verification-code',
  },

  category: 'Construction',
  classification: 'Entreprise de Bâtiment et Génie Civil',
  applicationName: 'KCA Construction',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },

  manifest: '/manifest.json',
  
  other: {
    'geo.region': 'CM-DL',
    'geo.placename': 'Douala',
    'geo.position': '4.051056;9.767869',
    'ICBM': '4.051056, 9.767869',
    'geo.location': 'Douala, Cameroun',
    'city': 'Douala',
    'country': 'Cameroun',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1d4ed8',
  colorScheme: 'light',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" type="image/png" href="/images/KCA-LOGO.png" />
        <link rel="apple-touch-icon" href="/images/KCA-LOGO.png" />
        <link rel="shortcut icon" href="/images/KCA-LOGO.png" />
        <meta name="msapplication-TileColor" content="#1d4ed8" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Google Fonts via link - Plus fiable */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        
        <link rel="manifest" href="/manifest.json" />
        
        {/* Données structurées JSON-LD - Organisation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'KCA Construction',
              description: 'Entreprise de bâtiment et génie civil au Cameroun',
              url: 'https://kcaconstruction.vercel.app',
              telephone: '+237691038193',
              email: 'kemmecarlos759@gmail.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Makepe',
                addressLocality: 'Douala',
                addressRegion: 'Littoral',
                addressCountry: 'CM',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '4.051056',
                longitude: '9.767869',
              },
              openingHours: 'Mo-Fr 08:00-17:00, Sa 08:00-13:00',
              priceRange: '$$$',
              image: 'https://kcaconstruction.vercel.app/images/og-image.jpg',
              sameAs: [
                'https://facebook.com/kcaconstruction',
                'https://instagram.com/kcaconstruction',
                'https://linkedin.com/company/kcaconstruction',
                'https://youtube.com/kcaconstruction',
              ],
              areaServed: {
                '@type': 'State',
                name: 'Cameroun',
              },
            })
          }}
        />

        {/* Données structurées JSON-LD - Services */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Services de Construction KCA',
              description: 'Liste des services proposés par KCA Construction',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Construction de villas',
                  description: 'Construction de villas sur mesure au Cameroun'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Génie civil',
                  description: 'Travaux de génie civil pour infrastructures'
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Rénovation',
                  description: 'Travaux de rénovation et de finition'
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: 'Électricité',
                  description: 'Installation électrique professionnelle'
                },
                {
                  '@type': 'ListItem',
                  position: 5,
                  name: 'Plomberie',
                  description: 'Installation sanitaire et plomberie'
                }
              ]
            })
          }}
        />

        {/* Données structurées JSON-LD - Avis clients */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AggregateRating',
              name: 'KCA Construction',
              ratingValue: '4.8',
              ratingCount: '25',
              bestRating: '5',
              worstRating: '1',
            })
          }}
        />
      </head>
      <body className="font-nunito antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}