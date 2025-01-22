/** @type {import('next').NextConfig} */
const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === 'true';

const nextConfig = {
  ...(isMobile ? {
    output: 'export',
    distDir: 'dist'
  } : {}),
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
