import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Content images are pasted as URLs in the CMS, so allow any https host.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
