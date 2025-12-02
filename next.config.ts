import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/stats.js",
        destination: "https://cloud.umami.is/script.js",
      },
      {
        source: "/stats/api/:path*",
        destination: "https://cloud.umami.is/api/:path*",
      },
    ];
  },
};

export default nextConfig;
