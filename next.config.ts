import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  cacheComponents: true,
  experimental: {
    webpackMemoryOptimizations: true,
  },
  images: {
    // 启用图片优化功能
    imageSizes: [32, 64, 96, 128, 256, 384],
    deviceSizes: [640, 828, 1200, 1920, 2048, 3840],
    // 添加图片优化格式支持
    formats: ['image/avif', 'image/webp'],
    // 增加图片缓存TTL到1小时，静态资源可以缓存更久
    minimumCacheTTL: 600,
    // 启用内容分发网络优化
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

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
