import { gql } from '@apollo/client'

export const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem(
    $storeId: String!
    $key: String!
    $languageId: Int!
    $cartId: String
  ) {
    removeCartItem(
      storeId: $storeId
      key: $key
      languageId: $languageId
      cartId: $cartId
    ) {
      id
      totalQuantity
      items {
        id
        key
        name
        sku
        slug
        type
        quantity
        thumbnail {
          image
          placeholder
        }
        price {
          salePrice
          maxSalePrice
          minSalePrice
          comparePrice
          maxComparePrice
          minComparePrice
        }
        orderQuantity
        orderVariationOption {
          id
          sku
          title
          thumbnail {
            image
            placeholder
          }
          options
          salePrice
          comparePrice
          quantity
        }
      }
    }
  }
`
export const CART_CHANGE = gql`
  mutation CartChange(
    $storeId: String!
    $languageId: Int!
    $itemId: Int!
    $orderQuantity: Int!
    $orderVariationOption: OrderVariationOptionInput
    $cartId: String
  ) {
    cartChange(
      storeId: $storeId
      languageId: $languageId
      itemId: $itemId
      orderQuantity: $orderQuantity
      orderVariationOption: $orderVariationOption
      cartId: $cartId
    ) {
      id
      totalQuantity
      items {
        id
        key
        name
        sku
        type
        slug
        quantity
        thumbnail {
          image
          placeholder
        }
        price {
          salePrice
          maxSalePrice
          minSalePrice
          comparePrice
          maxComparePrice
          minComparePrice
        }
        orderQuantity
        orderVariationOption {
          id
          sku
          title
          thumbnail {
            image
            placeholder
          }
          options
          salePrice
          comparePrice
          quantity
        }
      }
    }
  }
`
