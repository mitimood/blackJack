/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['cdn.discordapp.com', 'upload.wikimedia.org'],
  },
}

module.exports = nextConfig
