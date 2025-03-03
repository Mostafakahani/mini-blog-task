import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos"],
  },
  env: {
    NEXT_PUBLIC_BASE_URL_POSTS: "https://jsonplaceholder.typicode.com",
    NEXT_PUBLIC_BASE_URL:
      // process.env.NODE_ENV === "production"
      //   ? "http://185.204.170.68:3005"
      // :
      "http://localhost:3005",
  },
};

export default nextConfig;
