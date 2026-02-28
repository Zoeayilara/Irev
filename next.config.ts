import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['@prisma/client'],
  experimental: {
    serverActions: {
      allowedOrigins: ["irevv.netlify.app", "*.netlify.app", "localhost:3000"]
    }
  }
};

export default nextConfig;
