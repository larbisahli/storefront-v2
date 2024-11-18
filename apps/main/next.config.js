const { TEMPLATE_1_URL, TEMPLATE_2_URL, TEMPLATE_3_URL } = process.env

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      /**
       * Rewrites for Multi-Zones
       */
      // {
      //   source: '/theme',
      //   destination: `${DOCS_URL}/`,
      // },
      // {
      //   source: '/theme/:path*',
      //   destination: `${DOCS_URL}/:path*`,
      // },
      {
        source: '/template1-static/:path*',
        destination: `${TEMPLATE_1_URL}/template1-static/:path*`,
      },
      {
        source: '/template2-static/:path*',
        destination: `${TEMPLATE_2_URL}/template2-static/:path*`,
      },
      {
        source: '/template3-static/:path*',
        destination: `${TEMPLATE_3_URL}/template3-static/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
