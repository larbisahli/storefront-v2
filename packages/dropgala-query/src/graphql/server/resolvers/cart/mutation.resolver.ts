import { CartType } from '@dropgala/types'
import { CookieNames } from '@dropgala/types/common.type'
import Cookies from 'cookies'
import { NextApiRequest, NextApiResponse } from 'next'
import csrf from 'utils/csrf'
import { GraphQLError } from 'graphql'
import { VariationOptionsType } from '@dropgala/types/product.type'
import rateLimit from 'utils/rate-limit'
import apolloClient from '@graphql/server/apollo-client'
import {
  CART_CHANGE,
  REMOVE_CART_ITEM
} from '@graphql/client/schema/cart.query'
import { PRODUCTION_ENV } from '@dropgala/utils/utils'

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

class CartResolver {
  public cartChange = async (
    _parent: any,
    values: AddItemProps,
    _context: { req: NextApiRequest; res: NextApiResponse },
    _info: any
  ): Promise<CartType> => {
    const { req, res } = _context

    // Verify csrf token
    csrf.verification(req)

    await limiter.check(res, 60, 'CACHE_TOKEN') // 60 requests per minute

    const cookies = new Cookies(req, res)
    const cartId = cookies.get(CookieNames.CUSTOMER_SESSION_NAME)

    const { storeId, itemId, orderQuantity, languageId, orderVariationOption } =
      values

    try {
      const { data } = await apolloClient.mutate<any>({
        mutation: CART_CHANGE,
        variables: {
          storeId,
          itemId,
          cartId,
          orderQuantity,
          languageId,
          orderVariationOption
        },
        fetchPolicy: 'no-cache'
      })

      const { cartChange: cart, error } = data ?? {}

      if (error) {
        console.log('__________<< Cart change Error >>', error)
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_REQUEST'
          }
        })
      }

      if (
        (!cartId && cart?.id) ||
        (cartId && cart?.id && cartId !== cart?.id)
      ) {
        cookies.set(CookieNames.CUSTOMER_SESSION_NAME, cart?.id, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000, // Token is valid for 30 days
          sameSite: 'strict',
          domain: PRODUCTION_ENV ? '.dropgala.shop' : 'localhost',
          overwrite: true
        })
      }
      return cart
    } catch (error) {
      throw error
    }
  }

  /**
   * @param {unknown} parent
   * @param {UserType} values
   * @param {GraphQLContextType} context
   * @returns {Promise<{success: boolean;} | undefined>}
   */
  public removeCartItem = async (
    _parent: any,
    values: AddItemProps,
    _context: { req: NextApiRequest; res: NextApiResponse },
    _info: any
  ): Promise<CartType> => {
    const { req, res } = _context

    // Verify csrf token
    csrf.verification(req)

    await limiter.check(res, 60, 'CACHE_TOKEN') // 60 requests per minute

    const cookies = new Cookies(req, res)
    const cartId = cookies.get(CookieNames.CUSTOMER_SESSION_NAME)

    const { key, storeId, languageId } = values

    try {
      const { data } = await apolloClient.mutate<any>({
        mutation: REMOVE_CART_ITEM,
        variables: {
          key,
          storeId,
          languageId,
          cartId
        },
        fetchPolicy: 'no-cache'
      })

      const { removeCartItem: cart, error } = data ?? {}

      if (error) {
        console.log('__________<< removeCartItem change Error >>', error)
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_REQUEST'
          }
        })
      }
      return cart
    } catch (error) {
      throw error
    }
  }
}

const cartResolver = new CartResolver()

export default cartResolver
