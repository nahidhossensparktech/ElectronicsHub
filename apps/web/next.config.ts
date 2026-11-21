import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui', '@repo/utils', '@repo/types'],
  images: { dangerouslyAllowSVG: true, contentDispositionType: 'attachment' },
}

export default nextConfig
