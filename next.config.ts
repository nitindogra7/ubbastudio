import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: { loader: "custom", loaderFile: "./src/app/image-loader.ts" },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
