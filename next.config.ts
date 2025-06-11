import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "f.woowoowoowoo.net",
      },
    ],
  },
};

export default nextConfig;
