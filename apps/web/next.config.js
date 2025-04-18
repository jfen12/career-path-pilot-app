/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig 