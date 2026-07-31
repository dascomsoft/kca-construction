/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      'img.youtube.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  // Ignorer les erreurs ESLint pendant le build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignorer les erreurs TypeScript pendant le build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configuration webpack pour éviter les erreurs de modules Node.js
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      };
    }
    return config;
  },
  // Désactiver le pré-rendu des pages d'erreur
  output: 'standalone',
}

module.exports = nextConfig