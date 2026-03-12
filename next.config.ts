import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['@prisma/client'],
  experimental: {
    serverActions: {
        allowedOrigins: ["irevv.netlify.app", "*.netlify.app", "localhost:3000"]
    }
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  }
};

export default nextConfig;
