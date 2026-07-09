import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/services/web-design",
        destination: "/services/digital/web-design",
        permanent: true,
      },
      {
        source: "/services/app-development",
        destination: "/services/digital/app-development",
        permanent: true,
      },
      {
        source: "/services/workflow-automation",
        destination: "/services/digital/automation",
        permanent: true,
      },
      {
        source: "/services/system-integration",
        destination: "/services/digital",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
