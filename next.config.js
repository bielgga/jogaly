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
  },
  // Configurações de compilação para melhor tree shaking
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configurações de webpack para otimizações
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Otimizações para reduzir bundle size
      config.optimization.splitChunks = {
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
      }
    }
    return config
  },
  // Configurações de produção
  swcMinify: true,
  poweredByHeader: false,
}

module.exports = nextConfig 