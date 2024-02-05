/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aifred.superfk.co',
        port: '',
        pathname: '/api/**',
      },
    ],
  },
};

module.exports = nextConfig;
