import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "images.unsplash.com",
    //   },
    // ],
    domains: [
      "scontent-atl3-2.cdninstagram.com",
      "scontent-atl3-1.cdninstagram.com",
      "scontent-lga3-3.cdninstagram.com",
      "scontent-lga3-2.cdninstagram.com"
    ],
  },
  env: {
    SITE_NAME: "Penumbra Penned",
  },
};

export default nextConfig;
