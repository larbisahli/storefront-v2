import { isEmpty } from '@dropgala/utils/lodashFunctions'
import ShippingSchema from '@models/shipping'
import crypto from 'crypto'
import shippingPackage from '@packages/shipping.package'
import dbConnect from 'dbConnect'

export class ShippingCacheStore {
  constructor() {}

  private getId = (alias: string) => {
    return crypto.createHash('sha256').update(alias).digest('hex')
  }

  public getShippings = async (alias: string) => {
    try {
      await dbConnect()
      const resource = await ShippingSchema.findOne({
        key: { $eq: this.getId(alias) }
      })

      if (isEmpty(resource && resource.data)) {
        return null
      }

      /**
       * Convert the data from Buffer to object
       */
      return (await shippingPackage.decode(resource?.data!))?.resource
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('getShippings >>', { error })
      throw error
    }
  }
}

const shippingCacheStore = new ShippingCacheStore()

export default shippingCacheStore
