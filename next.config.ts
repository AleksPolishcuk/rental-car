import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ac.goit.global"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ac.goit.global",
        port: "",
        pathname: "/car-rental-task/**",
      },
    ],
  },
};

export default nextConfig;
