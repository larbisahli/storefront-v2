import { isEmpty } from '@dropgala/utils/lodashFunctions'
import PaymentSchema from '@models/payment'
import crypto from 'crypto'
import paymentPackage from '@packages/payment.package'
import dbConnect from 'dbConnect'

export class PaymentCacheStore {
  constructor() {}

  private getId = (alias: string) => {
    return crypto.createHash('sha256').update(alias).digest('hex')
  }

  public getPayments = async (alias: string) => {
    try {
      await dbConnect()
      const resource = await PaymentSchema.findOne({
        key: { $eq: this.getId(alias) }
      })

      if (isEmpty(resource && resource.data)) {
        return null
      }

      /**
       * Convert the data from Buffer to object
       */
      return (await paymentPackage.decode(resource?.data!))?.resource
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('getPayments >>', { error })
      throw error
    }
  }
}

const paymentCacheStore = new PaymentCacheStore()

export default paymentCacheStore
