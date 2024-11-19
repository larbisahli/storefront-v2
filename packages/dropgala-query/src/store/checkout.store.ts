import { isEmpty } from '@dropgala/utils/lodashFunctions'
import CheckoutSchema from '@models/checkout'
import checkoutPackage from '@packages/checkout.package'
import { CheckoutState } from '@dropgala/types'
import dbConnect from 'dbConnect'

export class CheckoutCacheStore {
  constructor() {}

  public getClientCheckout = async (cuid: string) => {
    try {
      await dbConnect()
      const resource = await CheckoutSchema.findOne({
        key: { $eq: cuid }
      })

      if (isEmpty(resource && resource.data)) {
        return {} as CheckoutState
      }

      /**
       * Convert the data from Buffer to object
       */
      return (await checkoutPackage.decode(resource?.data!)) as CheckoutState
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('getClientCheckout >>', { error })
      throw error
    }
  }
}

const checkoutCacheStore = new CheckoutCacheStore()

export default checkoutCacheStore
