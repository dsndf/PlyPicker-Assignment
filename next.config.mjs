/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "nextui-docs-v2.vercel.app",
        protocol: "https",
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/nextjs-4c497.appspot.com/o/products/**',
      },
      {
        hostname: "nextui-docs-v2.vercel.app",
        protocol: "https",
      },
      {
        hostname: "",
      },
    ],
  },
};

export default nextConfig;
