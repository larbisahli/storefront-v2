import { isEmpty } from '@dropgala/utils/lodashFunctions'
import crypto from 'crypto'
import CategorySchema from '@models/category'
import categoryPackage from '@packages/category.package'
import { CategoryType } from '@dropgala/types/category.type'
import dbConnect from 'dbConnect'

export class CategoryCacheStore {
  constructor() {}

  private getId = ({
    slug,
    languageId,
    alias
  }: {
    slug: string
    languageId: number
    alias: string
  }) =>
    crypto
      .createHash('sha256')
      .update(slug + languageId + alias)
      .digest('hex')

  public getCategory = async (
    slug: string,
    alias: string,
    languageId: number
  ) => {
    try {
      await dbConnect()
      const resource = await CategorySchema.findOne({
        key: { $eq: this.getId({ slug, languageId, alias }) }
      })

      if (isEmpty(resource && resource.data)) {
        return {} as CategoryType
      }

      /**
       * Convert the data from Buffer to object
       */
      return (await categoryPackage.decode(resource?.data!)) as CategoryType
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('getCategory >>', { error })
      throw error
    }
  }
}

const categoryCacheStore = new CategoryCacheStore()

export default categoryCacheStore
