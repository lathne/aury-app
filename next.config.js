const path = require("path");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: require("./runtimeCaching"),
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  output: process.env.NEXT_OUTPUT_MODE,
  outputFileTracingRoot: __dirname,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { 
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,

  // CONFIGURAÇÕES DE MINIFICAÇÃO E COMPRESSÃO
  compress: true, // Habilita compressão gzip
  
  // Configurações do Webpack para otimização
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Otimizações de produção
    if (!dev) {
      // Minificação avançada de JavaScript
      config.optimization = {
        ...config.optimization,
        minimize: true,
        minimizer: [
          // TerserPlugin para minificação de JS
          new (require('terser-webpack-plugin'))({
            terserOptions: {
              compress: {
                drop_console: true, // Remove console.logs
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug'],
              },
              mangle: true,
              format: {
                comments: false, // Remove comentários
              },
            },
            extractComments: false,
          }),
          // CSS Minimizer Plugin
          new (require('css-minimizer-webpack-plugin'))({
            minimizerOptions: {
              preset: [
                'default',
                {
                  discardComments: { removeAll: true },
                  normalizeWhitespace: true,
                  colormin: true,
                  convertValues: true,
                  discardDuplicates: true,
                  discardEmpty: true,
                  mergeRules: true,
                  minifySelectors: true,
                },
              ],
            },
          }),
        ],
        
        // Code splitting otimizado
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      };
      
      // Plugin para análise de bundle (opcional)
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
          })
        );
      }
    }
    
    return config;
  },
  
  // Configurações experimentais para otimização
  experimental: {
    optimizeCss: true, // Otimização de CSS
    optimizePackageImports: ['lodash', 'date-fns'], // Tree shaking para bibliotecas específicas
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Headers para cache e compressão
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
      // Headers específicos para arquivos estáticos
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Configurações de build otimizadas
  swcMinify: true, // Usa SWC para minificação (mais rápido que Terser)
  
  // Configurações de produção
  productionBrowserSourceMaps: false, // Remove source maps em produção
  
  // Otimizações de runtime
  poweredByHeader: false, // Remove header "X-Powered-By"
  
  // Configurações de redirecionamento e reescrita
  async rewrites() {
    return [
      {
        source: '/service-worker.js',
        destination: '/_next/static/service-worker.js',
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
