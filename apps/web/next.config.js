/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'talentprimer.netlify.app',
      'xxgrccxrwcgjixzbjair.supabase.co'
    ],
  },
  // Required for Netlify
  distDir: '.next',
  // Disable static page generation for now
  output: 'standalone'
};

module.exports = nextConfig; 