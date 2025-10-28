import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    webpackMemoryOptimizations: true,
  },
  images: {
    // 启用图片优化功能
    imageSizes: [32, 64, 96, 128, 256, 384],
    deviceSizes: [640, 828, 1200, 1920, 2048, 3840],
    // 添加图片优化格式支持
    formats: ['image/avif', 'image/webp'],
    // 设置图片最小缓存TTL为60秒
    minimumCacheTTL: 60,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hlae.site',
        port: '',
        pathname: '/**',
        search: '',
      },
      // {
      //   protocol: 'https',
      //   hostname: 's3.amazonaws.com',
      //   port: '',
      //   pathname: '/my-bucket/**',
      //   search: '',
      // },
    ],
  },
}

export default nextConfig
