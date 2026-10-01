import type { NextConfig } from "next";

import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  outputFileTracingRoot: path.resolve(__dirname),
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_CORE_ADMIN_URL || "http://localhost:5001";
    return [
      {
        source: "/api/proxy/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: "/api/auth/:path*",
        destination: `${backendUrl}/api/auth/:path*`,
      },
      {
        source: "/api/admin/:path*",
        destination: `${backendUrl}/api/admin/:path*`,
      },
      {
        source: "/api/Branch/:path*",
        destination: `${backendUrl}/api/Branch/:path*`,
      },
    ];
  },
};

export default nextConfig;
