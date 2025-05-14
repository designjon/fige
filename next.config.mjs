/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
    domains: ['placehold.co'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mov|mp4)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig; 