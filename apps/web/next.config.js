/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'talentprimer.netlify.app',
      'xxgrccxrwcgjixzbjair.supabase.co'
    ],
  },
  experimental: {
    serverActions: true,
  },
  // Required for Netlify
  distDir: '.next',
  // Enable static exports
  output: 'standalone'
}

module.exports = nextConfig 