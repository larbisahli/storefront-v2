import {
  CartType,
  CheckoutState,
  ProductTypes,
  ShippingType
} from '@dropgala/types'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import cartCacheStore from '@store/cart.store'
import { GetServerSidePropsContext } from 'next'
import requestIp from 'request-ip'
import { fetchStoreProduct } from './product'
import checkoutCacheStore from '@store/checkout.store'
import { fetchStoreConfig } from './config'
import { fetchAvailableShippings } from './shipping'
import { calcCheckoutSummary } from '@dropgala/utils/checkout'
import { Shipping } from '@dropgala/types/generated/shipping/Shipping'

export const fetchClientCart = async ({
  alias,
  languageId,
  cuid
}: {
  alias: string
  languageId: number
  cuid?: string
}) => {
  let cart = {} as CartType
  if (!cuid) return cart

  cart = await cartCacheStore.getClientCart(cuid)

  if (!isEmpty(cart)) {
    let items: CartType['items'] = []

    for await (const { id, ...rest } of cart?.items ?? []) {
      const product = await fetchStoreProduct({
        alias,
        languageId,
        id
      })
      if (product) {
        const isConfigurable = product?.type === ProductTypes.Variable
        if (isConfigurable) {
          const selectedVariationOption = product?.variationOptions?.find(
            (option) => option.id === rest?.orderVariationOption?.id
          )
          items.push({
            ...rest,
            orderVariationOption: {
              ...selectedVariationOption
            },
            ...product
          })
        } else {
          items.push({
            ...rest,
            ...product
          })
        }
      }
    }

    cart = {
      ...cart,
      items
    }
  }
  return cart
}

export const fetchClientCheckout = async ({
  context,
  alias,
  languageId,
  cuid
}: {
  context: GetServerSidePropsContext
  alias: string
  languageId: number
  cuid: string
}) => {
  let checkout = {} as CheckoutState
  if (!cuid) return checkout

  // ****** Get Location ******
  const { req } = context
  const clientIp = requestIp.getClientIp(req)

  // ****** Get Cart ******
  const cart = await fetchClientCart({
    alias,
    languageId,
    cuid
  })

  if (!cart) return checkout

  // ****** Get Checkout ******
  checkout = await checkoutCacheStore.getClientCheckout(cuid)

  // ****** Get Config ******
  const config = await fetchStoreConfig(alias)

  // ****** Shipment ******
  let selectedShipping = {} as Shipping
  if (checkout?.shipment?.id) {
    /** Check if resource is in the cache store */
    const shippings = await fetchAvailableShippings(alias)
    selectedShipping = shippings?.find(
      (shipping) => shipping.id === checkout?.shipment?.id
    ) as Shipping
    checkout.shipment = {
      id: selectedShipping?.id,
      name: selectedShipping?.name,
      deliveryTime: selectedShipping?.deliveryTime,
      freeShipping: selectedShipping?.freeShipping,
      logo: selectedShipping?.logo,
      rateType: selectedShipping?.rateType
    }
  }

  const discount = checkout?.appliedCoupon ?? {}
  const taxRate = config?.tax?.rate!
  checkout!.cart = cart
  checkout!.summary = calcCheckoutSummary({
    shipping: selectedShipping,
    shippingAddress: checkout?.shippingAddress!,
    taxRate,
    items: cart.items,
    discount
  })

  return {
    ...checkout,
    metadata: { ip: clientIp }
  } as CheckoutState
}
