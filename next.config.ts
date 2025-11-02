import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Next.js 16 Cache Components
  cacheComponents: true,

  // Enable Turbopack filesystem caching for faster rebuilds
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  // Allow cross-origin requests from network interfaces
  allowedDevOrigins: ['localhost', '127.0.0.1', '192.168.1.117'],

  // Image optimization settings
  images: {
    // Allow local images with proper security
    localPatterns: [
      {
        pathname: '/**',
        search: '',
      },
    ],
    // Optimize image loading
    minimumCacheTTL: 14400, // 4 hours
  },

  // Enable bundle analyzer in development (optional)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config: any) => {
      if (process.env.NODE_ENV === 'development') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            openAnalyzer: true,
          })
        );
      }
      return config;
    },
  }),
};

export default nextConfig;
