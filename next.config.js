/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimisation du JavaScript - cibler des navigateurs modernes
  // SWC est configuré via .swcrc pour cibler ES2022 avec minification optimisée
  swcMinify: true,
  // Compiler pour des navigateurs modernes uniquement (évite les polyfills inutiles)
  compiler: {
    // Désactiver les polyfills pour les fonctionnalités Baseline déjà supportées
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Optimisations de production
  productionBrowserSourceMaps: false, // Désactiver les source maps en production pour réduire la taille
  // Optimisation des chunks et minification
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimisations supplémentaires pour la production
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              reuseExistingChunk: true,
              minChunks: 1,
            },
            // Séparer le runtime webpack dans un chunk plus petit
            runtime: {
              name: 'runtime',
              minChunks: 1,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      };
      
      // Exclure regenerator-runtime si possible (pour navigateurs modernes)
      // Note: Certaines dépendances peuvent encore en avoir besoin
      config.resolve.alias = {
        ...config.resolve.alias,
        // Ne pas forcer l'exclusion car certaines dépendances peuvent en avoir besoin
      };
    }
    return config;
  },
  // Optimisation des images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'c.animaapp.com',
        pathname: '/**',
      },
    ],
  },
  // Compression et optimisation
  compress: true,
  // Optimisation des performances
  poweredByHeader: false, // Retirer le header X-Powered-By
  // Autoriser les origines cross-origin en développement
  allowedDevOrigins: ['192.168.100.90', 'localhost'],
  // Headers de performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
      {
        source: '/imglanding/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/logos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/accueil',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;


