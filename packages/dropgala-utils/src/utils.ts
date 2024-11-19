import { CategoryType } from '@dropgala/types/category.type'
import { cloneDeep, isEmpty, isEqual, sortBy } from './lodashFunctions'
import {
  VariationsType,
  VariationOptionsType
} from '@dropgala/types/product.type'

// Utils
export const Timer = (time = 1000) => {
  // eslint-disable-next-line no-undef
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true)
    }, time)
  )
  // Timer().then(() => setLoading(false));
}

declare global {
  interface Number {
    toCommas(): string | Number
    secondsToHm(): string | Number
  }
}

Number.prototype.toCommas = function () {
  try {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } catch (error) {
    return this
  }
}

export const PRODUCTION_ENV = process.env.NODE_ENV === 'production'

Number.prototype.toCommas = function () {
  try {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } catch (error) {
    return this
  }
}

export const mediaURL = PRODUCTION_ENV
  ? 'https://api.dropgala.com/media'
  : 'http://localhost:5002/media'

export const apiURL = PRODUCTION_ENV
  ? 'https://api.dropgala.com'
  : 'http://localhost:5002'

export const builderURL = PRODUCTION_ENV
  ? 'https://dropgala.com'
  : 'http://localhost:3001'

// eslint-disable-next-line no-unused-vars
export function noop(_: any) {}

// export const flattenArrayOfObjects = <T>(arr: T[]) => {
//   const flatObject = {};
//   for (let i = 0; i < arr?.length; i++) {
//     for (const property in arr[i]) {
//       flatObject[property as string] = arr[i][property];
//     }
//   }
//   return flatObject;
// };

export const selectedVariationOptionFun = ({
  selectedVariations,
  variationOptions = []
}: {
  selectedVariations: VariationsType[]
  variationOptions?: VariationOptionsType[]
}) => {
  const selectedAttributesOption = selectedVariations?.map(
    (selectedVariation) => {
      return selectedVariation?.value?.id
    }
  )

  return variationOptions?.find((vop) => {
    return isEqual(sortBy(vop?.options), sortBy(selectedAttributesOption))
  })
}

export const toTwoDecimalPlaces = (number: number) => {
  return typeof number !== 'undefined'
    ? number.toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    : null
}

export const daysToSeconds = (days: number) => 60 * 60 * (24 * days)

export const roundTo3 = (v: number = 0) => Math.round(v * 1000) / 1000

export const calcTaxRate = (price: number = 0, rate: number = 0) => {
  if (rate > 0) {
    return roundTo3(Number(price) + Number(price) * (Number(rate) / 100))
  }
  return roundTo3(Number(price))
}

export const calcPercentage = (
  salePrice: number = 0,
  comparePrice: number = 0
) =>
  roundTo3(
    ((Number(comparePrice) - Number(salePrice)) / Number(comparePrice)) * 100
  )

export function serializeNestedBuffers(obj: any) {
  // Clone the object to avoid modifying the original
  const newObj = { ...obj }

  // Recursive function to traverse nested objects
  function traverse(obj: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key]
        var base64regex =
          /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/
        // Detect based64
        if (base64regex.test(value)) {
          // Check for empty buffer
          if (value?.length) {
            // Convert the buffer to a base64 string
            // Decode the base64 string back to JSON
            // @ts-ignore
            const decodedValue = Buffer.from(value, 'base64').toString('utf-8')
            try {
              obj[key] = JSON.parse(decodedValue)
            } catch (error) {
              obj[key] = value
            }
          } else {
            obj[key] = {}
          }
        } else if (typeof value === 'object') {
          // Recursively traverse nested objects
          traverse(value)
        }
      }
    }
  }
  // Start traversal from the top-level object
  traverse(newObj)
  return newObj
}

export const ProductBreadcrumbs = (categories: CategoryType[]) => {
  if (isEmpty(categories)) return []
  const selectedCate = cloneDeep(categories)?.sort(
    (a, b) => (b?.breadcrumbsPriority || 0) - (a?.breadcrumbsPriority || 0) || 0
  )[0]
  return [
    ...(selectedCate?.parent
      ? [
          {
            categoryLevel: selectedCate?.parent?.level,
            categoryName: selectedCate?.parent?.name,
            categoryUrl: selectedCate?.parent?.urlKey
          }
        ]
      : []),
    ...(selectedCate?.parent?.parent
      ? [
          {
            categoryLevel: selectedCate?.parent?.parent?.level,
            categoryName: selectedCate?.parent?.parent?.name,
            categoryUrl: selectedCate?.parent?.parent?.urlKey
          }
        ]
      : []),
    {
      categoryLevel: selectedCate?.level,
      categoryName: selectedCate?.name,
      categoryUrl: selectedCate?.urlKey
    }
  ]
}
