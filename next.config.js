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
        // Optimiser le runtime chunk pour réduire sa taille
        runtimeChunk: {
          name: 'runtime',
        },
        minimize: true,
        minimizer: [
          ...(config.optimization.minimizer || []),
        ],
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 100000, // Réduit à 100KB pour des chunks plus petits et meilleur code splitting
          maxAsyncRequests: 30,
          maxInitialRequests: 25, // Réduit pour forcer un meilleur code splitting
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
            // Optimiser les CSS en les séparant pour réduire la chaîne de requêtes
            styles: {
              name: 'styles',
              test: /\.(css|scss|sass)$/,
              chunks: 'all',
              enforce: true,
              priority: 20,
            },
            // Séparer les grandes bibliothèques pour un meilleur caching
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              name: 'react',
              priority: 20,
              reuseExistingChunk: true,
            },
            next: {
              test: /[\\/]node_modules[\\/]next[\\/]/,
              name: 'next',
              priority: 20,
              reuseExistingChunk: true,
            },
            // Séparer les autres dépendances pour réduire la taille du vendor chunk
            common: {
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
        // Réduire la taille du runtime webpack
        usedExports: true,
        sideEffects: false,
      };
      
      // Optimiser les résolutions pour réduire la taille
      config.resolve.alias = {
        ...config.resolve.alias,
      };
      
      // Optimiser les modules pour réduire la taille
      config.optimization.concatenateModules = true;
    }
    return config;
  },
  // Optimisation des images - compression agressive pour réduire la taille
  images: {
    formats: ['image/avif', 'image/webp'], // AVIF en priorité (meilleure compression)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Réduit les tailles inutiles
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Réduit les tailles inutiles
    minimumCacheTTL: 31536000, // Cache long terme
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Compression plus agressive
    unoptimized: false,
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


