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
        hostname: "northsoutbackends.expertitsolutionsbd.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://northsoutbackends.expertitsolutionsbd.com/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
