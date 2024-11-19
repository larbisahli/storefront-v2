import { StoreLayoutType } from 'cms.type'
import { ImageType } from './common.type'

export interface ConfigType {
  logo?: ImageType[]
  favicon?: ImageType[]
  storeName?: string
  storeEmail?: string
  storeNumber?: string
  layout: StoreLayoutType | null
  alias?: string
  storeId?: string
  maintenanceMode?: boolean
  maintenancePassword?: number | string
  locales?: {
    id: number
    name: string
    isDefault: boolean
    localeId: string
  }[]
  currencies?: {
    symbol: string
    name: string
    symbol_native: string
    decimal_digits: number
    rounding: number
    code: string
    name_plural: string
  }[]
  defaultCurrency?: {
    symbol: string
    name: string
    symbol_native: string
    decimal_digits: number
    rounding: number
    code: string
    name_plural: string
  }
  socials?: {
    url: string
    icon: {
      value: string
      label: string
    }
  }[]
  maxCheckoutQuantity?: number
  seo?: {
    metaTitle: string
    metaDescription: string
    ogTitle: string
    ogDescription: string
    ogImage: ImageType[]
    twitterHandle: string
    twitterCardType: string
    metaTags: string
    canonicalUrl: string
  }
  google?: {
    isEnable: boolean
    tagManagerId: string
  }
  facebook?: {
    isEnable: boolean
    appId: string
    pageId: string
  }
  language?: LanguageType
  isMobileHeaderTransition?: boolean
  device: {
    userAgent: string | null
    isMobile: boolean
    isSafari: boolean
    isDesktop: boolean
    isAndroid: boolean
    isIos: boolean
    isSSR: boolean
  }
  tax?: {
    name: string
    rate: number
  }
}

export interface LanguageType {
  id: number
  name: string
  localeId: string
  direction: 'LTR' | 'RTL'
  iso2: string
  isDefault: boolean
  translation: any
}
