/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'laravel4.isysedge.com',
        port: '',
        pathname: '/aifred/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
