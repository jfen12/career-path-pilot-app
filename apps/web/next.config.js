/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  experimental: {
    serverActions: true,
  },
  // Required for Netlify
  distDir: '.next',
  // Enable static exports
  output: 'export',
}

module.exports = nextConfig 