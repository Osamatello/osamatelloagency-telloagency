/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  swcMinify: false,
  // /consult was retired; /contact is now the single destination for both
  // general enquiries and consultation requests. Keep old links working.
  async redirects() {
    return [{ source: '/consult', destination: '/contact', permanent: true }];
  },
};

module.exports = nextConfig;