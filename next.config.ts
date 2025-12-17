import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "scontent-atl3-2.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "scontent-atl3-1.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "scontent-lga3-3.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "scontent-lga3-2.cdninstagram.com",
      },
    ],
  },

  env: {
    SITE_NAME: "Penumbra Penned",
  },
};

export default nextConfig;
