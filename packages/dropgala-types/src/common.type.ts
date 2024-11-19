import { Scalars } from './custom.type'

export interface ImageType {
  id?: Scalars['String']
  image: Scalars['String']
  placeholder: Scalars['String']
  isThumbnail?: boolean
  height?: number
  width?: number
}

export interface DOMEvent<T extends EventTarget> extends Event {
  readonly target: T
}

export enum CookieNames {
  CUSTOMER_SESSION_NAME = '_cuid',
  XSRF_TOKEN = 'xsrf-token',
  GALA_MTM_PASS = 'gala-mtm-pass'
}

export enum StoreLayoutNames {
  HOMEPAGE = 'home-page',
  CATEGORY_PAGE = 'category',
  PRODUCT_PAGE = 'product',
  TERMS_OF_SERVICES = 'terms-of-service',
  CHECKOUT = 'checkout',
  CART_PAGE = 'cart',
  CONTACT = 'contact',
  PRIVACY_POLICY = 'privacy-policy',
  RETURN_POLICY = 'returns-policy',
  ABOUT_US = 'about-us',
  FAQ = 'faq'
}
