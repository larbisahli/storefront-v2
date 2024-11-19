import { isEmpty } from '@dropgala/utils/lodashFunctions'
import crypto from 'crypto'
import LanguageSchema from '@models/language'
import languagePackage from '@packages/language.package'
import dbConnect from 'dbConnect'

export class LanguageCacheStore {
  constructor() {}

  private getId = (languageId: number, alias: string) => {
    return crypto
      .createHash('sha256')
      .update(languageId + alias)
      .digest('hex')
  }

  public getLanguage = async (languageId: number, alias: string) => {
    try {
      await dbConnect()
      const resource = await LanguageSchema.findOne({
        key: { $eq: this.getId(languageId, alias) }
      })

      if (isEmpty(resource && resource.data)) {
        return null
      }

      /**
       * Convert the data from Buffer to object
       */
      return (await languagePackage.decode(resource?.data!))?.resource
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('getLanguage >>', { error })
      throw error
    }
  }
}

const languageCacheStore = new LanguageCacheStore()

export default languageCacheStore
