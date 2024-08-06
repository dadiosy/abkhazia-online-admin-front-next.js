/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.145.242',
      },
      {
        protocol: 'https',
        hostname: 'daisa.ru',
      },
    ],
  },
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
}
