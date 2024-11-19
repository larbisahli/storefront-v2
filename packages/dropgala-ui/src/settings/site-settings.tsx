// import { CNFlag } from '@components/icons/language/CNFlag';
// import { DEFlag } from '@components/icons/language/DEFlag';
// import { ESFlag } from '@components/icons/language/ESFlag';
// import { ILFlag } from '@components/icons/language/ILFlag';
// import { SAFlag } from '@components/icons/language/SAFlag';
// import { USFlag } from '@components/icons/language/USFlag';

export const siteSettings = {
  name: 'Dropgala',
  description: 'Fastest E-commerce shop',
  author: {
    name: 'Dropgala, Inc.',
    websiteUrl: 'https://dropgala.com',
    address: ''
  },
  logo: {
    url: '/assets/images/logo.svg',
    alt: 'Dropgala',
    href: '/',
    width: 128,
    height: 30
  },
  defaultLanguage: 'en',
  currencyCode: 'USD',
  site_header: {
    // languageMenu: [
    //   {
    //     id: 'ar',
    //     name: 'عربى - AR',
    //     value: 'ar',
    //     icon: <SAFlag />
    //   },
    //   {
    //     id: 'zh',
    //     name: '中国人 - ZH',
    //     value: 'zh',
    //     icon: <CNFlag />
    //   },
    //   {
    //     id: 'en',
    //     name: 'English - EN',
    //     value: 'en',
    //     icon: <USFlag />
    //   },
    //   {
    //     id: 'de',
    //     name: 'Deutsch - DE',
    //     value: 'de',
    //     icon: <DEFlag />
    //   },
    //   {
    //     id: 'he',
    //     name: 'rעברית - HE',
    //     value: 'he',
    //     icon: <ILFlag />
    //   },
    //   {
    //     id: 'es',
    //     name: 'Español - ES',
    //     value: 'es',
    //     icon: <ESFlag />
    //   }
    // ]
  },
  placeholders: {
    product: {
      image: 'dropgala/placeholders/image.jpg',
      placeholder: 'placeholders/image__placeholder.png'
    },
    avatar: {
      image: 'dropgala/placeholders/avatar.jpg',
      placeholder: 'placeholders/avatar__placeholder.png'
    }
  }
}
