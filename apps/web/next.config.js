/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'career-path-pilot-app.netlify.app',
      'xxgrccxrwcgjixzbjair.supabase.co'
    ],
  },
  experimental: {
    serverActions: true,
  },
  // Required for Netlify
  distDir: '.next'
}

module.exports = nextConfig 