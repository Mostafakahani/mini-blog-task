import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos"],
  },
  env: {
    NEXT_PUBLIC_BASE_URL_POSTS: "https://jsonplaceholder.typicode.com",
    // Use a conditional to set the base URL depending on environment
    NEXT_PUBLIC_BASE_URL: "http://localhost:3000",
  },
};

export default nextConfig;
