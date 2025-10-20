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
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.bapihvac.com',
        },
      ],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.bapihvac.com',
          },
          {
            protocol: 'https',
            hostname: 'placehold.co',
          },
        ],
    },
};

module.exports = nextConfig;