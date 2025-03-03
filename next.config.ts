import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'upload.wikimedia.org',
      'uhdtv.io',
      'mango.blender.org',
      'download.blender.org',
      'farm5.static.flickr.com',
    ],
  },
};

export default nextConfig;
