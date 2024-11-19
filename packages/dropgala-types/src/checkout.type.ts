import { ImageType } from 'common.type'
import { Nullable, Scalars } from 'custom.type'
import { ThunkStatus } from 'enums.type'
import { Cart } from 'generated/cart/Cart'
import { ShippingAddress } from 'generated/checkout/ShippingAddress'
import { PaymentConfiguration } from 'payment.type'
import { PriceType, ProductType, VariationOptionsType } from 'product.type'
import { ShippingType } from 'shipping.type'

export type CountryType = {
  name: string
  iso2: string
  region?: string
  subregion?: string
  phoneCode?: string
  currency?: string
}

export type CheckoutFormValues = {
  fullName: Nullable<string>
  email: Nullable<string>
  address: Nullable<string>
  country: CountryType
  marketingOptIn?: boolean
  city: Nullable<string>
  state?: Nullable<string>
  zip?: Nullable<string>
  phone?: Nullable<string>
}

export interface Price {
  finalPrice: FinalPrice
  finalPriceExclTax: FinalPrice
  discount: {
    amountOff: number
    percentOff: number
  }
}

export type CartItemType = ProductType & {
  id: number
  name?: string
  sku?: string
  type?: string
  thumbnail?: ImageType
  price?: PriceType
  quantity?: string
  key?: Scalars['ID']
  orderQuantity: number
  orderVariationOption?: VariationOptionsType | undefined
}

export interface FinalPrice {
  currency?: { code: string }
  value: number
}

export interface Discount {
  label: string
  amount: FinalPrice
}

export interface Summary {
  grandTotalInclTax: FinalPrice
  grandTotalExclTax: FinalPrice
  subtotalInclTax: FinalPrice
  subtotalExclTax: FinalPrice
  totalDiscount: FinalPrice
  totalShippingInclTax: FinalPrice
  totalShippingExclTax: FinalPrice
}

export interface Metadata {
  ip: string
  geo?: {
    city: string
    region: string
    latlong: string
  }
}

export interface StepsConfig {
  availableSteps: string[]
  currentStep: string
}

export interface AppliedCoupon {
  code: string
}

export interface Tax {
  label: string
  percent: number
  amount: FinalPrice
}

export interface CartType {
  id?: string | null
  items: CartItemType[]
  totalQuantity: number
  total: {
    totalPrice: {
      value: number
    }
    totalExclTax: {
      value: number
    }
  }
  loadingStatus: ThunkStatus
}

export interface CheckoutState {
  cartId: string | null
  email?: Nullable<string>
  shippingAddress?: Nullable<ShippingAddress>
  shipment?: Nullable<ShippingType>
  cart?: Nullable<Cart>
  paymentConfiguration?: Nullable<PaymentConfiguration>
  summary?: Nullable<Summary>
  metadata?: Nullable<Metadata>
  stepsConfig?: Nullable<StepsConfig>
  status?: string
  appliedCoupon?: Nullable<AppliedCoupon>
  tax?: Nullable<Tax>
  loadingStatus?: ThunkStatus
  createdAt?: Scalars['Date']
  updatedAt?: Scalars['Date']
}
