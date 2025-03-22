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
  },
  env: {
    SITE_NAME: "Penumbra Press",
  },
};

export default nextConfig;
