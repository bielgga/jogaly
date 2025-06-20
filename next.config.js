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
  // Otimizações para reduzir JavaScript não utilizado
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js'],
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
  // Configurações de compilação para melhor tree shaking
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    // Remover imports não utilizados
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  // Configurações de webpack para otimizações
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      // Otimizações para reduzir bundle size em produção
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          maxAsyncRequests: 20,
          cacheGroups: {
            // Separar vendors principais
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
              enforce: true,
            },
            // Separar React/React-DOM
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 20,
              enforce: true,
            },
            // Separar Supabase
            supabase: {
              test: /[\\/]node_modules[\\/]@supabase[\\/]/,
              name: 'supabase',
              chunks: 'all',
              priority: 15,
              enforce: true,
            },
            // Código comum da aplicação
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
        // Otimizações adicionais
        usedExports: true,
        sideEffects: false,
      }

      // Adicionar plugin para analisar bundle
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

    // Otimizações de resolução de módulos
    config.resolve.alias = {
      ...config.resolve.alias,
      // Remover alias problemáticos - deixar o Next.js gerenciar
    }

    return config
  },
  // Configurações de produção
  swcMinify: true,
  poweredByHeader: false,
  // Otimizações de output
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