import {
  CartItemType,
  CheckoutState,
  CouponDiscountsType,
  ProductTypes,
  RateTypes,
  ShippingAddress,
  Unit,
  UnitTypes
} from '@dropgala/types'
import { isEmpty } from 'lodash'
import { Shipping } from '@dropgala/types/generated/shipping/Shipping'

export const roundTo3 = (v: number = 0) => Math.round(v * 1000) / 1000

export const calcTaxRate = (price: number = 0, rate: number = 0) =>
  roundTo3(Number(price) + Number(price) * (Number(rate) / 100))

export const ConvertToGram = (weight: number | null, unit: Unit | null) => {
  if (!weight || !unit) return 0
  if (unit?.unit === UnitTypes.G) {
    return Number(weight)
  } else if (unit?.unit === UnitTypes?.KG) {
    return Number(weight) * 1000
  }
}

const getCartItemsTotalInclTaxPrice = (
  items: CartItemType[],
  rate: number,
  shippingPrice?: number
) => {
  let total = items!.reduce((total: number, item: CartItemType) => {
    const isVariableType = item!.type === ProductTypes.Variable
    const selectedPrice = isVariableType
      ? calcTaxRate(Number(item?.orderVariationOption?.salePrice ?? 0), rate)
      : calcTaxRate(Number(item?.price?.salePrice ?? 0), rate)
    return total + (Number(selectedPrice) ?? 0) * item.orderQuantity!
  }, 0)
  return roundTo3(total + (shippingPrice ?? 0))
}

const getCartItemsTotalPriceExclTax = (
  items: CartItemType[],
  shippingPriceExclTax?: number
) => {
  let total = items!.reduce((total: number, item: CartItemType) => {
    const isVariableType = item!.type === ProductTypes.Variable
    const selectedTaxPrice = isVariableType
      ? item?.orderVariationOption?.salePrice
      : item.price?.salePrice
    return total + (Number(selectedTaxPrice) ?? 0) * item.orderQuantity!
  }, 0)
  return roundTo3(total + (shippingPriceExclTax ?? 0))
}

const getTotalShippingCost = (
  items: CartItemType[],
  shipping: Shipping | null | undefined,
  shippingAddress: ShippingAddress | null | undefined
) => {
  const { iso2 = null } = shippingAddress?.country ?? {}
  if (!iso2) return 0

  const zones = shipping?.zones?.map((zone) => zone.iso2)
  let rates = shipping?.rates
  const rateType = shipping?.rateType

  // ***** Check the shipment zone *****
  if (zones?.includes(iso2)) {
    console.log('++++++++++++++++++++++++ includes(iso2)')
  }

  // ***** Convert rates to gram *****
  if (rates && rateType === RateTypes.weight) {
    rates = rates?.map((rate) => {
      rate.min = ConvertToGram(Number(rate.min ?? 0), rate.weightUnit!)
      rate.max = ConvertToGram(Number(rate.max), rate.weightUnit!)
      return rate
    })
  }

  const total = items!.reduce((total: number, item: CartItemType) => {
    const { weight = null, weightUnit = null } = item?.productShippingInfo ?? {}
    const weightInGram = ConvertToGram(weight, weightUnit)
    return total + ((Number(weightInGram) ?? 0) * item?.orderQuantity! ?? 0)
  }, 0)

  const selectedRate = rates?.find((rate) => {
    if (rateType === RateTypes.price) {
      if (rate.min === 0 && rate.max === 0) {
        return true
      }
    }
    return (
      Number(rate.min ?? 0) <= roundTo3(total) &&
      roundTo3(total) <= Number(rate.max ?? 0)
    )
  })

  if (rateType === RateTypes.price || rateType === RateTypes.weight) {
    const selectedPrice = selectedRate?.price
    return Number(selectedPrice ?? 0)
  }
  return 0
}

const calcShippingIncTaxRate = (
  items: CartItemType[],
  shipping: Shipping | null | undefined,
  shippingAddress: ShippingAddress,
  rate: number
) => {
  if (isEmpty(shipping)) return 0
  return calcTaxRate(
    getTotalShippingCost(items, shipping, shippingAddress),
    rate
  )
}

const calcShippingRateExclTax = (
  items: CartItemType[],
  shipping: Shipping | null | undefined,
  shippingAddress: ShippingAddress
) => {
  if (isEmpty(shipping)) return 0
  return getTotalShippingCost(items, shipping, shippingAddress)
}

export const calcCheckoutSummary = ({
  shipping,
  shippingAddress,
  taxRate,
  items,
  discount
}: {
  shipping: Shipping | null | undefined
  shippingAddress: ShippingAddress
  taxRate: number
  items: CartItemType[]
  discount: CheckoutState['appliedCoupon']
}) => {
  let shipmentInclTaxPrice = calcShippingIncTaxRate(
    items,
    shipping,
    shippingAddress,
    taxRate
  )
  let shippingPriceExclTax = calcShippingRateExclTax(
    items,
    shipping,
    shippingAddress
  )
  let subtotalInclTax = getCartItemsTotalInclTaxPrice(items, taxRate)
  let subtotalExclTax = getCartItemsTotalPriceExclTax(items)
  let grandTotalInclTax = subtotalInclTax + shipmentInclTaxPrice
  let grandTotalExclTax = subtotalExclTax + shippingPriceExclTax
  let totalDiscount = 0

  // *** DISCOUNT ***
  if (discount) {
    const discountValue = Number(discount?.discountValue ?? 0)
    const discountType = discount?.discountType
    if (discountType === CouponDiscountsType.Fixed) {
      totalDiscount = discountValue
      grandTotalInclTax -=
        grandTotalInclTax >= discountValue ? discountValue : grandTotalInclTax
      grandTotalExclTax -=
        grandTotalExclTax >= discountValue ? discountValue : grandTotalExclTax
    } else if (discountType === CouponDiscountsType.Percentage) {
      const value = roundTo3(
        Number(grandTotalInclTax) * (Number(discountValue) / 100)
      )
      totalDiscount = value
      grandTotalInclTax -= value
      grandTotalExclTax -= value
    } else if (discountType === CouponDiscountsType.FreeShipping) {
      grandTotalInclTax -= shipmentInclTaxPrice
      grandTotalExclTax -= shippingPriceExclTax
      shipmentInclTaxPrice = 0
      shippingPriceExclTax = 0
    }
  }

  return {
    grandTotalInclTax: {
      value: roundTo3(grandTotalInclTax)
    },
    grandTotalExclTax: {
      value: roundTo3(grandTotalExclTax)
    },
    subtotalInclTax: {
      value: subtotalInclTax
    },
    subtotalExclTax: {
      value: subtotalExclTax
    },
    totalDiscount: {
      value: totalDiscount
    },
    totalShippingInclTax: {
      value: shipmentInclTaxPrice
    },
    totalShippingExclTax: {
      value: shippingPriceExclTax
    }
  }
}
