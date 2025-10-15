/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.bapihvac.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.bapihvac.com',
      },
    ],
  },
}

module.exports = nextConfig
