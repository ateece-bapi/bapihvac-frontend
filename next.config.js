/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.bapihvac.com',
      },
    ],
  },
};

module.exports = nextConfig;