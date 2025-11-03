import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production-ready configuration for Vercel deployment

  // Image optimization settings
  images: {
    // Allow images from common domains using remotePatterns (replaces deprecated domains)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
    // Optimize image loading
    minimumCacheTTL: 86400, // 24 hours for production
  },

  // Environment-specific configuration
  ...(process.env.NODE_ENV === 'production' && {
    // Production optimizations
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
  }),

  // Enable bundle analyzer in development only (optional)
  ...(process.env.ANALYZE === 'true' && process.env.NODE_ENV === 'development' && {
    webpack: (config: any) => {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          openAnalyzer: true,
        })
      );
      return config;
    },
  }),
};

export default nextConfig;
