import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    const backendUrl = process.env.API_URL_INTERNAL || 'http://nginx/api';
    const backendBase = backendUrl.replace('/api', ''); // Remove /api suffix to get base URL

    return [
      {
        source: '/api/:path*',
        destination: `${backendBase}/api/:path*`, // Proxy to Backend
      },
      {
        source: '/storage/:path*',
        destination: `${backendBase}/storage/:path*`, // Proxy Storage to Backend
      },
    ];
  },
};

export default nextConfig;
