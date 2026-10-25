import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/amor",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;