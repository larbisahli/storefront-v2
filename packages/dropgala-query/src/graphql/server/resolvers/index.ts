import { cartChange, removeCartItem } from './cart'
import {
  updateCheckoutInformation,
  updateCheckoutShipping,
  createOrder
} from './checkout'
import { GraphQLError } from 'graphql'

export const resolvers = {
  Query: {
    async viewer(_root: any, _args: any, context: any, _info: any) {
      try {
        console.log('viewer >>>', { _root, _args, context, _info })
        return { id: 1, name: 'John Smith', status: 'cached' }
      } catch (error) {
        throw new GraphQLError(
          'Authentication token is invalid, please log in',
          {
            extensions: {
              code: 'UNAUTHENTICATED'
            }
          }
        )
      }
    }
  },
  Mutation: {
    cartChange,
    removeCartItem,
    updateCheckoutInformation,
    updateCheckoutShipping,
    createOrder
  }
}
