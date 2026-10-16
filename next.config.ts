import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // The school's Pixieset galleries.
    remotePatterns: [
      new URL("https://images.pixieset.com/03750988/**"),
      // YouTube thumbnails, shown while background videos load.
      new URL("https://i.ytimg.com/vi/**"),
    ],
  },
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
