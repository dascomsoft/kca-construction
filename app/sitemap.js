// app/sitemap.js
export default function sitemap() {
  const baseUrl = 'https://kcaconstruction.cm'
  
  const pages = [
    '',
    '/about',
    '/services',
    '/projects',
    '/gallery',
    '/contact',
  ]
  
  const projects = [
    '/projects/villa-moderne-douala',
    '/projects/immeuble-commercial-douala',
    '/projects/complexe-residentiel-yaounde',
    '/projects/batiment-industriel-kribi',
  ]
  
  const allPages = [...pages, ...projects]
  
  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'daily' : 'weekly',
    priority: page === '' ? 1.0 : 0.8,
  }))
}