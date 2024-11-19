import { isEmpty } from '@dropgala/utils/lodashFunctions'
import crypto from 'crypto'
import LayoutSchema from '@models/layout'
import layoutPackage from '@packages/layout.package'
import dbConnect from 'dbConnect'

export class LayoutCacheStore {
  constructor() {}

  private getId = (
    alias: string,
    templateId: string,
    storeLanguageId: number,
    page?: string | null
  ) => {
    return crypto
      .createHash('sha256')
      .update(alias + templateId + storeLanguageId + page ?? '')
      .digest('hex')
  }

  public getPageLayout = async (
    alias: string,
    templateId: string,
    storeLanguageId: number,
    page: string | null
  ) => {
    try {
      await dbConnect()
      let resource
      resource = await LayoutSchema.findOne({
        key: { $eq: this.getId(alias, templateId, storeLanguageId, page) }
      })

      if (isEmpty(resource && resource.data)) {
        return null
      }

      /**
       * Convert the data from Buffer to object
       */
      return (await layoutPackage.decode(resource?.data!))?.resource
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('getPageLayout >>', { error })
      throw error
    }
  }
}

const layoutCacheStore = new LayoutCacheStore()

export default layoutCacheStore
