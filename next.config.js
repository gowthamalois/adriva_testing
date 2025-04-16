/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const nextConfig = {
  output: "export", // Enables static export
  reactStrictMode: false,
  trailingSlash: true, // Ensures static pages use a folder structure
  distDir: 'dist',          // Specifies output directory
  images: {
    unoptimized: true, // Disables Image Optimization for static export
  },

  // webpack(config, { isServer }) {
  //   if (!isServer) {
  //     const TerserPlugin = require("terser-webpack-plugin");
  //     config.optimization.minimizer.push(
  //       new TerserPlugin({
  //         terserOptions: {
  //           compress: {
  //             drop_console: true, // Remove console logs in production
  //           },
  //         },
  //       })
  //     );
  //   }
  //   return config;
  // },
};

module.exports = withBundleAnalyzer(nextConfig);
