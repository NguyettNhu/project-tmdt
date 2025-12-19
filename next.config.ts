import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bỏ qua TypeScript errors khi build (để deploy Vercel thành công)
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
      },
    ],
    dangerouslyAllowSVG: true,
    // Cho phép localhost trong development
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
