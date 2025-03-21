import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pos-nextjs-nestjs.onrender.com'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
