import { gql } from '@apollo/client'

export const UPDATE_CHECKOUT_INFORMATION = gql`
  mutation UpdateCheckoutInformation(
    $city: String
    $marketingOptIn: Boolean
    $zip: String
    $state: String
    $address: String
    $email: String
    $country: CountryInput
    $phone: String
    $fullName: String
    $cartId: String
  ) {
    updateCheckoutInformation(
      city: $city
      marketingOptIn: $marketingOptIn
      zip: $zip
      state: $state
      address: $address
      email: $email
      country: $country
      phone: $phone
      fullName: $fullName
      cartId: $cartId
    ) {
      cartId
      storeId
      email
      shippingAddress {
        city
        marketingOptIn
        zip
        state
        address
        email
        country {
          iso2
          name
        }
        phone
        fullName
      }
      shipment {
        id
      }
      paymentConfiguration {
        id
      }
      metadata {
        ip
      }
      stepsConfig {
        availableSteps
        currentStep
      }
      status
      appliedCoupon {
        code
      }
    }
  }
`

export const UPDATE_CHECKOUT_SHIPPING = gql`
  mutation UpdateCheckoutShipping($id: Int!, $cartId: String) {
    updateCheckoutShipping(id: $id, cartId: $cartId) {
      cartId
      storeId
      email
      shippingAddress {
        city
        marketingOptIn
        zip
        state
        address
        email
        country {
          iso2
          name
        }
        phone
        fullName
      }
      shipment {
        id
      }
      paymentConfiguration {
        id
      }
      metadata {
        ip
      }
      stepsConfig {
        availableSteps
        currentStep
      }
      status
      appliedCoupon {
        code
      }
    }
  }
`

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $storeId: String!
    $paymentId: String!
    $cartId: String
  ) {
    createOrder(storeId: $storeId, paymentId: $paymentId, cartId: $cartId) {
      success
      ref
    }
  }
`

export const GET_ORDER_SUMMARY = gql`
  query GetOrderSummary($storeId: String!, $orderId: String!) {
    getOrderSummary(storeId: $storeId, orderId: $orderId) {
      orderNumber
      tax {
        name
        rate
      }
      currency {
        code
      }
      payment {
        code
        data
      }
      customer {
        fullName
      }
      totalQuantity
      grandTotalInclTax
      grandTotalExclTax
      subTotalInclTax
      subTotalExclTax
      discountAmount
    }
  }
`
