import { isEmpty } from '@dropgala/utils/lodashFunctions'
import crypto from 'crypto'
import ProductsSchema from '@models/products'
import { productPackage } from '@packages/index'
import dbConnect from 'dbConnect'

export class ProductsCacheStore {
  constructor() {}

  private getId = ({
    languageId,
    slug,
    alias,
    page = null
  }: {
    languageId: number
    slug: string
    alias: string
    page?: number | null
  }) => {
    if (page) {
      return crypto
        .createHash('sha256')
        .update(languageId + slug + alias + page)
        .digest('hex')
    } else {
      return crypto
        .createHash('sha256')
        .update(languageId + slug + alias)
        .digest('hex')
    }
  }

  public getProducts = async ({
    languageId,
    slug,
    alias,
    page
  }: {
    languageId: number
    slug: string
    alias: string
    page?: number | null
  }) => {
    try {
      await dbConnect()
      const resource = await ProductsSchema.findOne({
        key: { $eq: this.getId({ languageId, slug, alias, page }) }
      })

      if (isEmpty(resource && resource.data)) {
        return null
      }

      /**
       * Convert the data from Buffer to object
       */
      return (await productPackage.decodeProducts(resource?.data!))?.resource
    } catch (error) {
      console.log('getProducts >>', { error })
      throw error
    }
  }
}

const productsCacheStore = new ProductsCacheStore()

export default productsCacheStore
