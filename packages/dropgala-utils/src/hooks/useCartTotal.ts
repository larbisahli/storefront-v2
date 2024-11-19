import {
  CartItemType,
  CartType,
  ProductTypes,
  ShippingType
} from '@dropgala/types'
import { useMemo } from 'react'
import { calcTaxRate } from 'utils'

const getCartItemsTotalPrice = (
  items: CartItemType[],
  rate: number,
  shippingPrice?: number
) => {
  let total = items!?.reduce((total: number, item: CartItemType) => {
    const isVariableType = item!.type === ProductTypes.Variable
    const selectedPrice = isVariableType
      ? calcTaxRate(item?.orderVariationOption?.salePrice, rate)
      : calcTaxRate(item?.price?.salePrice, rate)
    return total + (Number(selectedPrice) ?? 0) * item.orderQuantity!
  }, 0)
  return total + (shippingPrice ?? 0)
}

const getCartItemsTotalPriceExclTax = (
  items: CartItemType[],
  shippingPrice?: number
) => {
  let total = items!?.reduce((total: number, item: CartItemType) => {
    const isVariableType = item!.type === ProductTypes.Variable
    const selectedTaxPrice = isVariableType
      ? item?.orderVariationOption?.salePrice
      : item.price?.salePrice
    return total + (Number(selectedTaxPrice) ?? 0) * item.orderQuantity!
  }, 0)
  return total + (shippingPrice ?? 0)
}

export function useCartTotal({
  cart,
  taxRate = 0,
  shipment
}: {
  cart: CartType
  taxRate?: number
  shipment?: ShippingType
}) {
  const priceRange = useMemo(() => {
    return {
      shipmentPrice: {
        value: calcTaxRate(shipment?.price, taxRate)
      },
      shipmentPriceExclTax: {
        value: shipment?.price
      },
      subTotalPrice: {
        value: getCartItemsTotalPrice(cart.items, taxRate)
      },
      subTotalExclTax: {
        value: getCartItemsTotalPriceExclTax(cart.items)
      },
      totalPrice: {
        value: getCartItemsTotalPrice(cart.items, taxRate, shipment?.price)
      },
      totalExclTax: {
        value: getCartItemsTotalPriceExclTax(cart.items, shipment?.price)
      }
    }
  }, [cart, taxRate])
  return priceRange
}
