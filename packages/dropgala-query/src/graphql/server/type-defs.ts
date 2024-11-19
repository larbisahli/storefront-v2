import { gql } from '@apollo/client'

export const typeDefs = gql`
  # ===== COMMON =====
  type Image {
    id: Int
    image: String
    placeholder: String
    width: Int
    height: Int
  }

  type Currency {
    symbol: String
    code: String
    name: String
    symbol_native: String
    decimal_digits: Int
    rounding: Int
    name_plural: String
    is_default: Boolean
  }

  type Country {
    id: Int
    zoneId: Int
    upperName: String
    name: String
    phoneCode: String
    iso2: String
    region: String
    subregion: String
    currency: String
  }

  input CountryInput {
    id: Int
    zoneId: Int
    upperName: String
    name: String
    phoneCode: String
    iso2: String
    region: String
    subregion: String
    currency: String
  }

  #   ====================

  type Cart {
    id: String
    items: [Item]
    totalQuantity: Int
  }

  type Price {
    salePrice: Float
    maxSalePrice: Float
    minSalePrice: Float
    comparePrice: Float
    maxComparePrice: Float
    minComparePrice: Float
  }

  type OrderVariationOption {
    id: Int
    sku: String
    title: String
    thumbnail: [Image]
    options: [Int]
    salePrice: Float
    comparePrice: Float
    quantity: Int
  }

  input OrderVariationOptionInput {
    id: Int
  }

  type Item {
    id: Int
    key: String
    name: String
    sku: String
    type: String
    slug: String
    thumbnail: [Image]
    price: Price
    quantity: Int
    orderQuantity: Int
    orderVariationOption: OrderVariationOption
  }

  type User {
    id: ID!
  }

  type Query {
    viewer: User
  }

  # CHECKOUT

  type Checkout {
    cartId: String!
    storeId: String!
    email: String
    shippingAddress: ShippingAddress
    shipment: Shipment
    paymentConfiguration: PaymentConfiguration
    metadata: Metadata
    stepsConfig: StepsConfig
    status: String
    appliedCoupon: AppliedCoupon
  }

  type Shipment {
    id: Int
  }

  type PaymentConfiguration {
    id: String
  }

  type FinalPrice {
    currency: Currency
    value: Float
  }

  type Geo {
    city: String
    region: String
    latlong: String
  }

  type Metadata {
    ip: String
    geo: Geo
  }

  type StepsConfig {
    availableSteps: [String]
    currentStep: String
  }

  type AppliedCoupon {
    code: String
  }

  type SummaryDiscount {
    label: String
    amount: FinalPrice
  }

  type ShippingAddress {
    city: String
    marketingOptIn: Boolean
    zip: String
    state: String
    address: String
    email: String
    country: Country
    phone: String
    fullName: String
  }

  type createOrder {
    ref: String!
    success: Boolean!
  }

  type Mutation {
    removeCartItem(
      cartId: String
      languageId: Int!
      storeId: String!
      key: String!
    ): Cart
    cartChange(
      storeId: String!
      itemId: Int!
      languageId: Int!
      orderQuantity: Int!
      orderVariationOption: OrderVariationOptionInput
      cartId: String
    ): Cart
    updateCheckoutInformation(
      city: String
      marketingOptIn: Boolean
      zip: String
      state: String
      address: String
      email: String
      country: CountryInput
      phone: String
      fullName: String
      cartId: String
    ): Checkout
    updateCheckoutShipping(id: Int!, cartId: String): Checkout
    createOrder(
      storeId: String!
      paymentId: String!
      cartId: String
    ): createOrder
  }
`
