const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching
})

const LOCALES = [
  'af-za',
  'ar',
  'ar-ae',
  'ar-bh',
  'ar-kw',
  'ar-ma',
  'ar-om',
  'ar-qa',
  'ar-sa',
  'bg-bg',
  'ca-ad',
  'cs-cz',
  'cy-gb',
  'da-dk',
  'de-at',
  'de-ch',
  'de-de',
  'el-gr',
  'en-gb',
  'en-us',
  'es-cl',
  'es-es',
  'es-mx',
  'et-ee',
  'eu',
  'fa-ir',
  'fi-fi',
  'fr-ca',
  'fr-fr',
  'gl-es',
  'he-il',
  'hi-in',
  'hr-hr',
  'hu-hu',
  'id-id',
  'is-is',
  'it-it',
  'ja-jp',
  'km-kh',
  'ko-kr',
  'la',
  'lt-lt',
  'lv-lv',
  'mn-mn',
  'nb-no',
  'nl-nl',
  'nn-no',
  'pl-pl',
  'pt-br',
  'pt-pt',
  'ro-ro',
  'ru-ru',
  'sk-sk',
  'sl-si',
  'sr-rs',
  'sv-se',
  'th-th',
  'tr-tr',
  'uk-ua',
  'vi-vn',
  'zh-cn',
  'zh-tw'
] // max 100
const DEFAULT_LOCALE = 'en-us'

// const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // assetPrefix: isProd ? 'http://cdn1.dropgala.com/' : undefined,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  i18n: {
    // These are all the locales you want to support in your application
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE
  },
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    // iconSizes: [],
    domains: [
      '127.0.0.1',
      'localhost',
      'dropgala.com',
      'media.dropgala.com',
      'api.dropgala.com'
    ],
    path: '/_next/image',
    loader: 'default'
  }
}

module.exports = withPWA(nextConfig)