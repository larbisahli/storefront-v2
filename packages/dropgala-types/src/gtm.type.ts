/**
 * Dropgala - Storefront
 *
 * Copyright © Dropgala, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license
 * @author larbi.sahli@dropgala.com
 * @package dropgala/gtm
 */

export enum TagManagerConfig {
  EVENT_SEARCH = 'eventSearch',
  SEARCH = 'search',
  SEARCH_CATEGORY = 'site search',
  RESULTS_LOADED = 'Results loaded',
  NO_RESULTS_FOUND = 'No Results Found',
  MY_WISHLIST = 'my-wishlist',
  WISHLIST = 'wishlist',
  GROUPED = 'grouped',
  HOMEPAGE = 'homepage',
  LOGIN = 'Logged in',
  LOGOUT = 'Logged out',
  NOT_APPLICABL = 'N/A',
  CATEGORY_PRODUCT_LIST = 'CategoryProductList',
  PRODUCT_LIST = 'ProductList',
  CATEOGRY_LIMIT = 5,
  NOT_FOUND = 'notFound',
  CHECKOUT = 'checkout',
  ZERO = 0,
  ONE = 1,
  ROOT = '/',
  BRAND_NAME = 'Monin',
  SHIPPING = 'shipping',
  DELIVERY = 'delivery',
  PAYMENT = 'payment',
  CHECKOUT_SUCCESS = '/boltpay/success',
  PURCHASE = 'purchase'
}

export enum TagManagerEvents {
  EVENT_GTM_CHECKOUT = 'gtm_checkout',
  EVENT_GTM_CHECKOUT_OPTION = 'gtm_checkout_option',
  EVENT_GTM_IMPRESSIONS = 'gtm_impressions',
  EVENT_GTM_IMPRESSIONS_PLP = 'gtm_impressions_plp',
  EVENT_GTM_IMPRESSIONS_HOME = 'gtm_impressions_home',
  EVENT_GTM_IMPRESSIONS_CROSS_SELL = 'gtm_impressions_cross_sell',
  EVENT_GTM_IMPRESSIONS_WISHLIST = 'gtm_impressions_wishlist',
  EVENT_GTM_IMPRESSIONS_SEARCH = 'gtm_impressions_search',
  EVENT_GTM_IMPRESSIONS_LINKED = 'gtm_impressions_linked',
  EVENT_GTM_GENERAL_INIT = 'gtm_general_init',
  EVENT_GTM_PRODUCT_ADD_TO_CART = 'gtm_product_add_to_cart',
  EVENT_GTM_PRODUCT_REMOVE_FROM_CART = 'gtm_product_remove_from_cart',
  EVENT_GTM_PRODUCT_CLICK = 'gtm_product_click',
  EVENT_GTM_PRODUCT_DETAIL = 'gtm_product_detail',
  EVENT_GTM_PURCHASE = 'gtm_purchase',
  EVENT_GTM_USER_LOGIN = 'gtm_user_login',
  EVENT_GTM_USER_REGISTER = 'gtm_user_register',
  EVENT_GTM_NOT_FOUND = 'gtm_not_found',
  EVENT_GTM_SITE_SEARCH = 'gtm_site_search',
  EVENT_GTM_SITE_SEARCH_STARTED = 'gtm_site_search_started',
  EVENT_KEY_GENERAL = 'general',
  EVENT_KEY_USER_LOGIN = 'userLogin',
  EVENT_KEY_USER_REGISTER = 'userRegister',
  EVENT_KEY_ADD_TO_CART = 'addToCart',
  EVENT_KEY_PRODUCT_CLICK = 'productClick',
  EVENT_KEY_PRODUCT_DETAIL = 'productDetail',
  EVENT_KEY_PRODUCT_REMOVE_FROM_CART = 'removeFromCart',
  IMPRESSIONS = 'impression',
  EVENT_KEY_NOT_FOUND = 'notFound',
  EVENT_KEY_CHECKOUT_OPTION = 'checkoutOption',
  EVENT_KEY_CHECKOUT = 'checkout',
  EVENT_KEY_PURCHASE = 'purchase',
  EVENT_KEY_SEARCH = 'siteSearch',
  EVENT_KEY_SEARCH_STARTED = 'siteSearchStarted'
}
