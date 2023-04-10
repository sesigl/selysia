/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  images: {
    domains: [
      "social-media-post-scheduler-static-assets-1928374.s3.eu-central-1.amazonaws.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
    ],
  },
  eslint: {
    dirs: ["./src/app", "./src/lib", "./src/pages"],
  },
};

module.exports = nextConfig;
