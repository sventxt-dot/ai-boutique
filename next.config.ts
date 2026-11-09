import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The AI projects moved from the portfolio page into the practice carousel on the home page
      { source: "/portfolio", destination: "/#praxis", permanent: true },
    ];
  },
};

export default nextConfig;
