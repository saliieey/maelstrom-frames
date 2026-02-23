/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'cdn.prod.website-files.com', 'maelstromglobal.in'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig

