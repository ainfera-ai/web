/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    qualities: [75, 90],
  },
  async headers() {
    return [
      {
        source: "/deck",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, nocache" }],
      },
      {
        source: "/deck/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, nocache" }],
      },
    ];
  },
};

export default nextConfig;
