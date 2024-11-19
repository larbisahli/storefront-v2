import { CartType } from '@dropgala/types'
import { CookieNames } from '@dropgala/types/common.type'
import Cookies from 'cookies'
import { NextApiRequest, NextApiResponse } from 'next'
import csrf from 'utils/csrf'
import { GraphQLError } from 'graphql'
import { VariationOptionsType } from '@dropgala/types/product.type'
import rateLimit from 'utils/rate-limit'
import apolloClient from '@graphql/server/apollo-client'
import { PRODUCTION_ENV } from '@dropgala/utils/utils'
import { ShippingAddress } from '@dropgala/types/generated/checkout/ShippingAddress'
import { Shipment } from '@dropgala/types/generated/checkout/Shipment'
import {
  CREATE_ORDER,
  UPDATE_CHECKOUT_INFORMATION,
  UPDATE_CHECKOUT_SHIPPING
} from '@graphql/client/schema/checkout.query'

export interface ShippingAddressProps extends ShippingAddress {
  cartId: string
}
export interface ShipmentProps extends Shipment {
  cartId: string
}
export interface OrderProps {
  paymentId: string
  storeId: string
}

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 10000 // Max 10000 users per second
})

export interface AddItemProps {
  storeId: string
  itemId: number
  key: string
  orderQuantity: number
  languageId: number
  orderVariationOption: VariationOptionsType
}

class CheckoutResolver {
  public updateCheckoutInformation = async (
    _parent: any,
    values: ShippingAddressProps,
    _context: { req: NextApiRequest; res: NextApiResponse },
    _info: any
  ): Promise<CartType> => {
    const { req, res } = _context

    // Verify csrf token
    csrf.verification(req)

    await limiter.check(res, 60, 'CACHE_TOKEN') // 60 requests per minute

    const cookies = new Cookies(req, res)
    const cartId = cookies.get(CookieNames.CUSTOMER_SESSION_NAME)

    const {
      city,
      marketingOptIn,
      zip,
      state,
      address,
      email,
      country,
      phone,
      fullName
    } = values

    try {
      const { data } = await apolloClient.mutate<any>({
        mutation: UPDATE_CHECKOUT_INFORMATION,
        variables: {
          cartId,
          city,
          marketingOptIn,
          zip,
          state,
          address,
          email,
          country,
          phone,
          fullName
        },
        fetchPolicy: 'no-cache'
      })

      const { updateCheckoutInformation, error } = data ?? {}

      if (error) {
        console.log('__________<< Cart change Error >>', error)
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_REQUEST'
          }
        })
      }

      return updateCheckoutInformation
    } catch (error) {
      throw error
    }
  }

  public updateCheckoutShipping = async (
    _parent: any,
    values: ShipmentProps,
    _context: { req: NextApiRequest; res: NextApiResponse },
    _info: any
  ): Promise<CartType> => {
    const { req, res } = _context

    // Verify csrf token
    csrf.verification(req)

    await limiter.check(res, 60, 'CACHE_TOKEN') // 60 requests per minute

    const cookies = new Cookies(req, res)
    const cartId = cookies.get(CookieNames.CUSTOMER_SESSION_NAME)

    const { id } = values

    try {
      const { data } = await apolloClient.mutate<any>({
        mutation: UPDATE_CHECKOUT_SHIPPING,
        variables: {
          id,
          cartId
        },
        fetchPolicy: 'no-cache'
      })

      const { updateCheckoutShipping, error } = data ?? {}

      if (error) {
        console.log('__________<< removeCartItem change Error >>', error)
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_REQUEST'
          }
        })
      }
      return updateCheckoutShipping
    } catch (error) {
      throw error
    }
  }

  public createOrder = async (
    _parent: any,
    values: OrderProps,
    _context: { req: NextApiRequest; res: NextApiResponse },
    _info: any
  ): Promise<CartType> => {
    const { req, res } = _context

    // Verify csrf token
    csrf.verification(req)

    await limiter.check(res, 60, 'CACHE_TOKEN') // 60 requests per minute

    const cookies = new Cookies(req, res)
    const cartId = cookies.get(CookieNames.CUSTOMER_SESSION_NAME)

    const { storeId, paymentId } = values

    try {
      const { data } = await apolloClient.mutate<any>({
        mutation: CREATE_ORDER,
        variables: {
          storeId,
          paymentId,
          cartId
        },
        fetchPolicy: 'no-cache'
      })

      const { createOrder, error } = data ?? {}

      if (error) {
        console.log('__________<< removeCartItem change Error >>', error)
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_REQUEST'
          }
        })
      }

      // CLEAR THE COOKIE
      if (createOrder?.success) {
        cookies.set(CookieNames.CUSTOMER_SESSION_NAME, '', {
          httpOnly: true,
          maxAge: 0,
          sameSite: 'strict',
          domain: PRODUCTION_ENV ? '.dropgala.shop' : 'localhost',
          overwrite: true
        })
      }

      return createOrder
    } catch (error) {
      throw error
    }
  }
}

const checkoutResolver = new CheckoutResolver()

export default checkoutResolver
