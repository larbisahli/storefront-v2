import { isEmpty } from '@dropgala/utils/lodashFunctions'
import crypto from 'crypto'
import menuPackage from '@packages/menu.package'
import MenuSchema from '@models/menu'
import dbConnect from 'dbConnect'

export class MenuCacheStore {
  constructor() {}

  private getId = ({
    languageId,
    alias
  }: {
    languageId: number
    alias: string
  }) =>
    crypto
      .createHash('sha256')
      .update(languageId + alias)
      .digest('hex')

  public getMenu = async (languageId: number, alias: string) => {
    try {
      await dbConnect()
      const resource = await MenuSchema.findOne({
        key: { $eq: this.getId({ languageId, alias }) }
      })

      if (isEmpty(resource && resource.data)) {
        return null
      }

      /**
       * Convert the data from Buffer to object
       */
      return (await menuPackage.decode(resource?.data!))?.resource
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('getMenu >>', { error })
      throw error
    }
  }
}

const menuCacheStore = new MenuCacheStore()

export default menuCacheStore
