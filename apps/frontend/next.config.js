/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // 启用 app router
    appDir: true,
    // 启用服务器组件
    serverComponentsExternalPackages: [],
  },
  // TypeScript 配置
  typescript: {
    // 在构建过程中检查类型错误
    ignoreBuildErrors: false,
  },
  // ESLint 配置
  eslint: {
    // 在构建过程中运行 ESLint
    ignoreDuringBuilds: false,
  },
  // 环境变量配置
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // API 路由配置
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*', // Spring Boot 后端
      },
    ];
  },
  // 图片优化配置
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  // 输出配置
  output: 'standalone',
  // 压缩配置
  compress: true,
  // 性能配置
  poweredByHeader: false,
  // Webpack 配置
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 自定义 webpack 配置
    return config;
  },
};

module.exports = nextConfig;