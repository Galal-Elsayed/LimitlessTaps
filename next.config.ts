import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Image optimization settings
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Enable gzip compression
  compress: true,
  // Disable source maps in production for smaller bundles
  productionBrowserSourceMaps: false,
  // Experimental optimizations for better performance
  experimental: {
    // Optimize package imports - reduces bundle size significantly
    // This performs tree-shaking at the module level for large libraries
    optimizePackageImports: [
      // UI Icons
      "lucide-react",
      "@tabler/icons-react",
      // Animation libraries
      "framer-motion",
      "motion",
      "motion/react",
      // UI Components
      "@radix-ui/react-accordion",
      "@radix-ui/react-select",
      // Heavy 3D/Graphics libraries - important for code splitting
      "three",
      "ogl",
      "lottie-react",
    ],
    // Enable webpack memory optimizations for faster builds
    webpackMemoryOptimizations: true,
  },
};

export default withNextIntl(nextConfig);
