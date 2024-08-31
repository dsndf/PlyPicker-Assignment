/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';
dotenv.config()

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ply-picker-assignment-zeta.vercel.app/api/:path*', // Proxy to Backend
      },
    ];
  },
  reactStrictMode: false,
  env:{
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY ,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECTID:process.env.FIREBASE_PROJECTID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGE_SENDER_ID: process.env.FIREBASE_MESSAGE_SENDER_ID,
    FIRBASE_APPID:process.env.FIRBASE_APPID 
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
};

export default nextConfig;
