/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.gamemonetize.com', 'imgs.crazygames.com', 'pixiapi.com'],
    // Otimizações para reduzir CLS
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 dias
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Configurar target moderno para evitar polyfills desnecessários
  swcMinify: true,
  poweredByHeader: false,
  // Configurações experimentais para otimização
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js'],
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
  // Configurações do compilador para produção otimizada
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  // Configurações de webpack otimizadas
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      // Configurar browserslist para navegadores modernos
      config.target = ['web', 'es2017']
      
      // Otimizações avançadas de bundle
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          maxAsyncRequests: 20,
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            // Framework separado (React/React-DOM)
            framework: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'framework',
              chunks: 'all',
              priority: 40,
              enforce: true,
            },
            // Supabase separado
            supabase: {
              test: /[\\/]node_modules[\\/]@supabase[\\/]/,
              name: 'supabase',
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            // Vendors (outras bibliotecas)
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 20,
              enforce: true,
            },
            // Código comum da aplicação
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
        // Tree shaking mais agressivo
        usedExports: true,
        sideEffects: false,
        // Minimização otimizada
        minimize: true,
      }

      // Resolver apenas o que é necessário
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          fs: false,
          net: false,
          tls: false,
        },
      }

      // Plugin para análise de bundle se necessário
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            openAnalyzer: true,
          })
        )
      }
    }

    return config
  },
  // Redirecionamentos 301
  async redirects() {
    return [
      {
        source: '/game/:path*',
        destination: '/jogar/:path*',
        permanent: true, // 301 redirect
      },
    ]
  },
  // Output otimizado
  output: 'standalone',
  // Configurações de performance
  onDemandEntries: {
    // Período para manter páginas em memória
    maxInactiveAge: 25 * 1000,
    // Número de páginas que devem ser mantidas simultaneamente
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig 