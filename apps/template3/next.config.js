/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/template3-static',
  async rewrites() {
    return {
      beforeFiles: [
        // This rewrite is necessary to support assetPrefix only in Next 14 and below.
        // It is not necessary in Next 15.
        {
          source: '/template3-static/_next/:path*',
          destination: '/_next/:path*',
        },
      ],
    }
  },
}

module.exports = nextConfig
