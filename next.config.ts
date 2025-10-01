import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://front-school.minio.ktsdev.ru/**')],
  },
};

export default nextConfig;
