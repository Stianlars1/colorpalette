/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
