import { ProductTypes } from '@dropgala/types'
import {
  PriceType,
  ProductType,
  VariationOptionsType
} from '@dropgala/types/product.type'
import { useMemo } from 'react'
import { calcPercentage, calcTaxRate } from 'utils'

export const calcPriceRange = (product: ProductType, rate: number) => {
  const { type, price } = product
  const isConfigurable = type === ProductTypes.Variable
  if (isConfigurable) {
    return {
      maximumPrice: {
        finalPrice: {
          value: calcTaxRate(price?.maxSalePrice, rate)
        },
        finalPriceExclTax: {
          value: price?.maxSalePrice
        },
        discount: {
          amountOff: calcTaxRate(price?.maxComparePrice, rate),
          percentOff: calcPercentage(
            calcTaxRate(price?.maxSalePrice, rate),
            calcTaxRate(price?.maxComparePrice, rate)
          )
        }
      },
      minimumPrice: {
        finalPrice: {
          value: calcTaxRate(price?.minSalePrice, rate)
        },
        finalPriceExclTax: {
          value: price?.minSalePrice
        },
        discount: {
          amountOff: calcTaxRate(price?.minComparePrice, rate),
          percentOff: calcPercentage(
            calcTaxRate(price?.minSalePrice, rate),
            calcTaxRate(price?.minComparePrice, rate)
          )
        }
      }
    }
  }
  return {
    maximumPrice: {
      finalPrice: {
        value: calcTaxRate(price?.salePrice, rate)
      },
      finalPriceExclTax: {
        value: price?.salePrice
      },
      discount: {
        amountOff: calcTaxRate(price?.comparePrice ?? 0, rate),
        percentOff: calcPercentage(
          calcTaxRate(price?.salePrice, rate),
          calcTaxRate(price?.comparePrice ?? 0, rate)
        )
      }
    }
  }
}

export const calcProductPrice = (price?: PriceType, rate?: number) => {
  return {
    finalPrice: {
      value: calcTaxRate(price?.salePrice, rate)
    },
    finalPriceExclTax: {
      value: price?.salePrice
    },
    discount: {
      amountOff: calcTaxRate(price?.comparePrice, rate),
      percentOff: calcPercentage(
        calcTaxRate(price?.salePrice, rate),
        calcTaxRate(price?.comparePrice, rate)
      )
    }
  }
}

export function usePriceRange({
  product,
  taxRate = 0
}: {
  product: ProductType
  taxRate?: number
}) {
  const priceRange = useMemo(() => {
    return calcPriceRange(product, taxRate)
  }, [product, taxRate])
  return priceRange
}

export function useProductPrice({
  selectedVariationOption,
  simplePrice,
  type,
  taxRate = 0
}: {
  selectedVariationOption?: VariationOptionsType
  simplePrice?: PriceType
  type?: ProductTypes
  taxRate?: number
}) {
  const priceRange = useMemo(() => {
    const price =
      type === ProductTypes.Variable ? selectedVariationOption : simplePrice
    return calcProductPrice(price, taxRate)
  }, [type, simplePrice, selectedVariationOption, taxRate])
  return priceRange
}
