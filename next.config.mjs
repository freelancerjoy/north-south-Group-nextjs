import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  agentRules: false,
  turbopack: {
    root: projectRoot,
    rules: {
      "*.{png,jpg,jpeg,gif,webp,avif}": {
        type: "asset",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|avif)$/i,
      issuer: /\.[jt]sx?$/,
      type: "asset/resource",
    });

    return config;
  },
  images: {
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "northsouthbackend.vercel.app",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://northsouthbackend.vercel.app/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
