/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable modern image formats for better compression
    formats: ['image/webp', 'image/avif'],

    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // Image sizes for different use cases
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Cache optimized images for 24 hours
    minimumCacheTTL: 86400,

    // Quality levels available for optimization
    qualities: [75, 90, 100],

    // Allow images from local paths
    localPatterns: [
      {
        pathname: '/images/**',
        search: '',
      },
    ],
  },
}

module.exports = nextConfig
