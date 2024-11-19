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

export {}

// import { CONFIGURABLE } from '@scandipwa/scandipwa/src/util/Product/Types';
// import sizeof from 'object-sizeof';
// import PropTypes from 'prop-types';
// import { PureComponent } from 'react';
// import TagManager from 'react-gtm-module';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router';

// import { isSignedIn } from 'Util/Auth';
// import { roundPrice } from 'Util/Price';

// import { getActionField } from '../../eventData/actionField.data';
// import { productAddToCart as productAction, productQtyChangeData } from '../../eventData/actionProduct.data';
// import { baseProductData } from '../../eventData/baseProduct.data';
// import {
//     getGeneralEventData, getGeneralPurchaseData, getLocale,
//     getPageType, getPath, getProducts, getPurchaseProduct,
//     getPurchaseShippingData, getStoreView, getTransactionEmail, getTransactionPhone, routes
// } from '../../eventData/general.data';
// import { getImpressionsData } from '../../eventData/impression.data';
// import { setExecuted } from '../../store/GoogleTagManager/GoogleTagManager.action';
// import {
//     CHECKOUT,
//     EVENT_SEARCH, NO_RESULTS_FOUND, ONE, RESULTS_LOADED, ROOT, SEARCH, SEARCH_CATEGORY, ZERO
// } from '@dropgala/types/gtm.type';
// import {
//     EVENT_GTM_CHECKOUT,
//     EVENT_GTM_CHECKOUT_OPTION,
//     EVENT_GTM_GENERAL_INIT,
//     EVENT_GTM_IMPRESSIONS_PLP,
//     EVENT_GTM_IMPRESSIONS_SEARCH,
//     EVENT_GTM_NOT_FOUND,
//     EVENT_GTM_PRODUCT_ADD_TO_CART,
//     EVENT_GTM_PRODUCT_CLICK,
//     EVENT_GTM_PRODUCT_DETAIL,
//     EVENT_GTM_PRODUCT_REMOVE_FROM_CART, EVENT_GTM_PURCHASE, EVENT_GTM_SITE_SEARCH, EVENT_GTM_SITE_SEARCH_STARTED,
//     EVENT_GTM_USER_LOGIN,
//     EVENT_GTM_USER_REGISTER,
//     EVENT_KEY_ADD_TO_CART,
//     EVENT_KEY_CHECKOUT,
//     EVENT_KEY_CHECKOUT_OPTION,
//     EVENT_KEY_GENERAL, EVENT_KEY_NOT_FOUND,
//     EVENT_KEY_PRODUCT_CLICK,
//     EVENT_KEY_PRODUCT_DETAIL,
//     EVENT_KEY_PRODUCT_REMOVE_FROM_CART, EVENT_KEY_PURCHASE,
//     EVENT_KEY_SEARCH, EVENT_KEY_SEARCH_STARTED,
//     EVENT_KEY_USER_LOGIN,
//     EVENT_KEY_USER_REGISTER,
//     IMPRESSIONS
// } from '@dropgala/types/gtm.type';

// /** @namespace GtmNew/Component/GoogleTagManager/Container/mapStateToProps */
// export const mapStateToProps = (state) => ({
//     config: state.GoogleTagManagerReducer.config,
//     isRewriteLoading: state.UrlRewritesReducer.isLoading,
//     storeConfig: state.ConfigReducer,
//     isExecuted: state.GoogleTagManagerReducer.isExecuted,
//     event: state.GoogleTagManagerReducer.event,
//     events: state.GoogleTagManagerReducer.config.events,
//     customData: state.GoogleTagManagerReducer.custom,
//     productsOnPages: state.ProductListReducer.pages,
//     areProductsLoading: state.ProductListReducer.isLoading,
//     signedIn: state.MyAccountReducer.isSignedIn,
//     isLoading: state.ProductListInfoReducer.isLoading,
//     cart: state.CartReducer.cartTotals,
//     store: state,
//     isConfigLoading: state.ConfigReducer.isLoading
// });

// /** @namespace GtmNew/Component/GoogleTagManager/Container/mapDispatchToProps */
// export const mapDispatchToProps = (dispatch) => ({
//     executed: () => dispatch(setExecuted())
// });

// /** @namespace GtmNew/Component/GoogleTagManager/Container/GoogleTagManagerContainer */
// export class GoogleTagManagerContainer extends PureComponent {
//     static propTypes = {
//         config: PropTypes.shape({
//             enabled: PropTypes.bool,
//             gtm_id: PropTypes.string
//         }),
//         isRewriteLoading: PropTypes.bool.isRequired,
//         isExecuted: PropTypes.bool.isRequired,
//         event: PropTypes.string,
//         events: PropTypes.shape({}),
//         executed: PropTypes.func.isRequired,
//         // eslint-disable-next-line react/forbid-prop-types
//         customData: PropTypes.any,
//         // eslint-disable-next-line react/forbid-prop-types
//         location: PropTypes.any.isRequired,
//         isConfigLoading: PropTypes.bool.isRequired
//     };

//     static defaultProps = {
//         config: {
//             enabled: false,
//             gtm_id: ''
//         },
//         event: EVENT_GTM_GENERAL_INIT,
//         events: {},
//         customData: ''
//     };

//     state = {
//         isInitialized: false
//     };

//     eventMap = {
//         [EVENT_GTM_GENERAL_INIT]: {
//             getData: this.prepareGeneralData.bind(this),
//             eventKey: EVENT_KEY_GENERAL
//         },
//         [EVENT_GTM_USER_LOGIN]: {
//             getData: this.blankEvent.bind(this),
//             eventKey: EVENT_KEY_USER_LOGIN
//         },
//         [EVENT_GTM_USER_REGISTER]: {
//             getData: this.blankEvent.bind(this),
//             eventKey: EVENT_KEY_USER_REGISTER
//         },
//         [EVENT_GTM_PRODUCT_ADD_TO_CART]: {
//             getData: this.prepareAddToCartData.bind(this),
//             eventKey: EVENT_KEY_ADD_TO_CART
//         },
//         [EVENT_GTM_PRODUCT_REMOVE_FROM_CART]: {
//             getData: this.prepareRemoveFromCartData.bind(this),
//             eventKey: EVENT_KEY_PRODUCT_REMOVE_FROM_CART
//         },
//         [EVENT_GTM_PRODUCT_CLICK]: {
//             getData: this.prepareProductClickData.bind(this),
//             eventKey: EVENT_KEY_PRODUCT_CLICK
//         },
//         [EVENT_GTM_PRODUCT_DETAIL]: {
//             getData: this.prepareProductDetailsData.bind(this),
//             eventKey: EVENT_KEY_PRODUCT_DETAIL
//         },
//         [EVENT_GTM_IMPRESSIONS_PLP]: {
//             getData: this.prepareProductImpression.bind(this),
//             eventKey: IMPRESSIONS
//         },
//         [EVENT_GTM_IMPRESSIONS_SEARCH]: {
//             getData: this.prepareProductSearchImpression.bind(this),
//             eventKey: IMPRESSIONS
//         },
//         [EVENT_GTM_NOT_FOUND]: {
//             getData: this.prepareNotFound.bind(this),
//             eventKey: EVENT_KEY_NOT_FOUND
//         },
//         [EVENT_GTM_CHECKOUT_OPTION]: {
//             getData: this.prepareCheckoutOption.bind(this),
//             eventKey: EVENT_KEY_CHECKOUT_OPTION
//         },
//         [EVENT_GTM_CHECKOUT]: {
//             getData: this.prepareCheckout.bind(this),
//             eventKey: EVENT_KEY_CHECKOUT
//         },
//         [EVENT_GTM_PURCHASE]: {
//             getData: this.preparePurchase.bind(this),
//             eventKey: EVENT_KEY_PURCHASE
//         },
//         [EVENT_GTM_SITE_SEARCH]: {
//             getData: this.prepareSearch.bind(this),
//             eventKey: EVENT_KEY_SEARCH
//         },
//         [EVENT_GTM_SITE_SEARCH_STARTED]: {
//             getData: this.blankEvent.bind(this),
//             eventKey: EVENT_KEY_SEARCH_STARTED
//         }
//     };

//     componentDidMount() {
//         window.addEventListener('resize', this.resize.bind(this));
//         this.resize();
//     }

//     componentDidUpdate(prevProps) {
//         const {
//             isExecuted, isRewriteLoading,
//             config: { enabled }, store, location: { pathname }, isConfigLoading
//         } = this.props;

//         const {
//             isInitialized
//         } = this.state;

//         const { isRewriteLoading: prevRewriteLoading, location: { pathname: prevPath } } = prevProps;

//         const storeView = getStoreView(store);
//         const path = getPath(pathname, storeView);

//         const locale = getLocale(store);
//         const { pageType } = getPageType(store);
//         const variablesExist = (locale !== '' && storeView !== '' && pageType !== '');

//         // Init And General Event
//         if (!isRewriteLoading && (isSignedIn() || this.canFireGeneral()) && !isInitialized && enabled
//         && (window.google_tag_manager === undefined || window.google_tag_manager.dataLayer === undefined)
//         && !isConfigLoading && variablesExist) {
//             this.init();
//             this.fireGeneralEvent();
//         }

//         const shouldFireGeneral = ((prevRewriteLoading && !isRewriteLoading) && isInitialized && enabled);

//         // General Event
//         if (shouldFireGeneral) {
//             this.fireGeneralEvent();
//         }

//         // If user Lands on one of React routes
//         if (((pathname !== prevPath) && isInitialized && enabled) && !shouldFireGeneral) {
//             routes().find((route) => {
//                 if (path.includes(route)) {
//                     this.fireGeneralEvent();
//                     return null;
//                 }
//             });

//             if (path === ROOT) {
//                 this.fireGeneralEvent();
//             }
//         }

//         // Any event fire
//         if (!isExecuted && isInitialized) {
//             this.executeEvent();
//         }
//     }

//     init() {
//         const { config: { enabled, gtm_id } } = this.props;
//         this.setState({ isInitialized: true });

//         if (enabled) {
//             TagManager.initialize({ gtmId: gtm_id });
//             window.google_tag_manager = {};
//         }
//     }

//     executeEvent() {
//         const { events, event } = this.props;

//         // Check if event exists in Event map and backend configuration
//         if ((this.eventExist(event) && events[event])) {
//             const data = this.eventMap[event].getData();

//             if (event === EVENT_GTM_IMPRESSIONS_SEARCH || event === EVENT_GTM_IMPRESSIONS_PLP) {
//                 const { executed } = this.props;
//                 // Changes redux state and tels that event is executed
//                 executed();
//             } else {
//                 this.pushEvent(data);
//             }
//         }
//     }

//     canFireGeneral() {
//         const { cart = {} } = this.props;

//         return (!isSignedIn() && !(Object.keys(cart).length === 0));
//     }

//     fireGeneralEvent() {
//         const { location: { pathname }, config: { store_name } } = this.props;

//         if (pathname.includes('checkout') && store_name === 'Canada') {
//             return;
//         }

//         const data = this.prepareGeneralData();

//         TagManager.dataLayer(data);
//     }

//     resize() {
//         this.setState({ canFireImpression: true });
//     }

//     // Event Push
//     pushEvent(data) {
//         const { executed } = this.props;

//         TagManager.dataLayer(data);
//         // Changes redux state and tels that event is executed
//         executed();
//     }

//     // Check if event exists in a map
//     eventExist(event) {
//         return typeof this.eventMap[event] !== 'undefined';
//     }

//     prepareCheckoutOption() {
//         const { customData: { option, step } } = this.props;

//         return {
//             dataLayer: {
//                 event: this.getEventKey(),
//                 ecommerce: {
//                     checkout_option: {
//                         actionField: {
//                             option,
//                             step,
//                             action: CHECKOUT
//                         }
//                     }
//                 }
//             }
//         };
//     }

//     getItemsLength(items) {
//         return items.length;
//     }

//     prepareCheckout() {
//         const {
//             customData: {
//                 step, isPDP = false, PDPcart: { items: PDPitems = [] } = {}, message
//             },
//             cart: { items = [] }
//         } = this.props;

//         return {
//             dataLayer: {
//                 event: this.getEventKey(),
//                 ecommerce: {
//                     checkout: {
//                         actionField: {
//                             step,
//                             action: message
//                         },
//                         products: this.getItemsLength(isPDP ? PDPitems : items) ? getProducts(isPDP ? PDPitems : items, CHECKOUT) : []
//                     }
//                 }
//             }
//         };
//     }

//     prepareNotFound() {
//         return {
//             dataLayer: {
//                 event: this.getEventKey(),
//                 eventCategory: EVENT_KEY_NOT_FOUND,
//                 eventAction: window.location.href,
//                 eventLabel: '',
//                 eventNonInteraction: ONE
//             }
//         };
//     }

//     prepareUserLoginData() {
//         return {
//             dataLayer: {
//                 event: this.getEventKey()
//             }
//         };
//     }

//     prepareAddToCartData() {
//         const { customData, storeConfig: { currencyData: { current_currency_code } } } = this.props;
//         const { isCart = false } = customData;

//         return {
//             dataLayer: {
//                 event: this.getEventKey(),
//                 ecommerce: {
//                     currencyCode: current_currency_code,
//                     add: {
//                         products: [!isCart ? { ...productAction(customData) }
//                             : { ...productQtyChangeData(customData) }]
//                     }
//                 }
//             }
//         };
//     }

//     prepareRemoveFromCartData() {
//         const { customData, storeConfig: { currencyData: { current_currency_code } } } = this.props;
//         const { isCart = false, isClearCartButton = false } = customData;

//         if (isClearCartButton) {
//             const { products: items } = customData;
//             const products = [];

//             items.forEach((item) => {
//                 const { product, qty } = item;
//                 const { type_id } = product;
//                 const configurableVariantIndex = type_id === CONFIGURABLE ? 0 : false;

//                 products.push(productAction({ product, quantity: qty, configurableVariantIndex }));
//             });

//             return {
//                 dataLayer: {
//                     event: this.getEventKey(),
//                     ecommerce: {
//                         currencyCode: current_currency_code,
//                         remove: {
//                             products
//                         }
//                     }
//                 }
//             };
//         }

//         return {
//             dataLayer: {
//                 event: this.getEventKey(),
//                 ecommerce: {
//                     currencyCode: current_currency_code,
//                     remove: {
//                         products: [!isCart ? { ...productAction(customData) }
//                             : { ...productQtyChangeData(customData) }]
//                     }
//                 }
//             }
//         };
//     }

//     prepareProductClickData() {
//         const { customData: { prevCategoryId, pathname, search = false }, customData, store } = this.props;

//         return {
//             dataLayer: {
//                 event: this.getEventKey(),
//                 ecommerce: {
//                     click: {
//                         actionField: getActionField(store, prevCategoryId, pathname, search),
//                         products: [{ ...baseProductData({ product: { ...customData } }, true) }]
//                     }
//                 }
//             }
//         };
//     }

//     prepareProductDetailsData() {
//         const { customData } = this.props;

//         return {
//             dataLayer: {
//                 event: this.getEventKey(),
//                 ecommerce: {
//                     detail: {
//                         products: [{ ...baseProductData({ product: { ...customData } }, true) }]
//                     }
//                 }
//             }
//         };
//     }

//     blankEvent() {
//         return {
//             dataLayer: {
//                 event: this.getEventKey()
//             }
//         };
//     }

//     prepareGeneralData() {
//         const { store } = this.props;

//         return {
//             dataLayer: {
//                 event: EVENT_KEY_GENERAL,
//                 ...getGeneralEventData(store)
//             }
//         };
//     }

//     preparePurchase() {
//         const {
//             customData: {
//                 orderPaymentMethod,
//                 orderShippingMethod,
//                 orderID,
//                 revenue,
//                 tax,
//                 shipping,
//                 coupon,
//                 products,
//                 shippingAddress,
//                 discount_amount,
//                 additional_data
//             },
//             storeConfig: { currencyData: { current_currency_code } }, store
//         } = this.props;

//         products.map((product) => {
//             product.price = +roundPrice(product.price);
//             return product;
//         });

//         return {
//             dataLayer: {
//                 event: this.getEventKey(),
//                 orderPaymentMethod,
//                 orderShippingMethod,
//                 ...getPurchaseShippingData(shippingAddress, additional_data),
//                 discount_amount,
//                 ...getGeneralPurchaseData(store, additional_data),
//                 ecommerce: {
//                     currencyCode: current_currency_code,
//                     purchase: {
//                         actionField: {
//                             id: orderID,
//                             revenue: +roundPrice(revenue),
//                             tax_amount: +roundPrice(tax),
//                             coupon: coupon === null ? '' : coupon,
//                             coupon_discount_amount: coupon === null ? '' : discount_amount,
//                             shipping: +roundPrice(shipping)
//                         },
//                         products: getPurchaseProduct(products)
//                     }
//                 },
//                 transactionEmail: getTransactionEmail(store),
//                 transactionPhone: getTransactionPhone(store)
//             }
//         };
//     }

//     prepareProductImpression() {
//         const {
//             customData, storeConfig: { currencyData: { current_currency_code } }, store

//         } = this.props;

//         const impressions = getImpressionsData(customData, store);

//         const dataLayer = this.getImpressionsDataLayer(impressions);

//         if (sizeof(dataLayer) >= 8000) {
//             const half = Math.ceil(impressions.length / 2);
//             const firstHalf = impressions.slice(0, half);
//             const secondHalf = impressions.slice(-half);

//             for (let i = 0; i < 2; i++) {
//                 if (i === 0) {
//                     TagManager.dataLayer(this.getImpressionsDataLayer(firstHalf));
//                 }
//                 if (i === 1) {
//                     TagManager.dataLayer(this.getImpressionsDataLayer(secondHalf));
//                 }
//             }

//             return;
//         }
//         TagManager.dataLayer(dataLayer);
//     }

//     getImpressionsDataLayer(impressions) {
//         const { storeConfig: { currencyData: { current_currency_code } } } = this.props;
//         return {
//             dataLayer: {
//                 event: this.getEventKey(),
//                 ecommerce: {
//                     currencyCode: current_currency_code,
//                     impressions
//                 }
//             }
//         };
//     }

//     prepareProductSearchImpression() {
//         const { customData: { products = [], search }, overlay = false } = this.props;
//         const siteSearch = this.prepareSearch(search, products.length);
//         TagManager.dataLayer(siteSearch);

//         return this.prepareProductImpression();
//     }

//     prepareSearch(search, resultLoaded) {
//         return {
//             dataLayer: {
//                 event: EVENT_KEY_SEARCH,
//                 eventCategory: EVENT_KEY_SEARCH,
//                 eventAction: !resultLoaded ? NO_RESULTS_FOUND : RESULTS_LOADED,
//                 eventLabel: search,
//                 eventNonInteraction: ZERO
//             }
//         };
//     }

//     // gets event Key aka Event Name in dataLayer
//     getEventKey() {
//         const { event = '' } = this.props;

//         return this.eventMap[event].eventKey;
//     }

//     render() {
//         return null;
//     }
// }

// export default GoogleTagManagerContainer
