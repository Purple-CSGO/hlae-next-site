import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    webpackMemoryOptimizations: true,
  },
}

export default nextConfig
