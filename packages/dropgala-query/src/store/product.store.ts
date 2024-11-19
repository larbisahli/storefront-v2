import productPackage from '@packages/product.package'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import crypto from 'crypto'
import ProductSchema from '@models/product'
import dbConnect from 'dbConnect'

export class ProductCacheStore {
  constructor() {}

  private getBySlug = ({
    languageId,
    slug,
    alias
  }: {
    slug: string
    alias: string
    languageId: number
  }) => {
    return crypto
      .createHash('sha256')
      .update(alias + slug + languageId)
      .digest('hex')
  }

  private getById = ({
    languageId,
    id,
    alias
  }: {
    alias: string
    id: number
    languageId: number
  }) => {
    return crypto
      .createHash('sha256')
      .update(alias + id + languageId)
      .digest('hex')
  }

  public getProductById = async ({
    languageId,
    id,
    alias
  }: {
    alias: string
    id: number
    languageId: number
  }) => {
    try {
      await dbConnect()
      const resource = await ProductSchema.findOne({
        key: { $eq: this.getById({ languageId, alias, id }) }
      })

      if (isEmpty(resource && resource.data)) {
        return null
      }

      /**
       * Convert the data from Buffer to object
       */
      return (await productPackage.decodeProduct(resource?.data!))?.resource
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('getProductById >>', { error })
      throw error
    }
  }

  public getProductBySlug = async ({
    languageId,
    slug,
    alias
  }: {
    slug: string
    alias: string
    languageId: number
  }) => {
    try {
      const resource = await ProductSchema.findOne({
        slug: { $eq: this.getBySlug({ slug, alias, languageId }) }
      })

      if (isEmpty(resource && resource.data)) {
        return null
      }

      /**
       * Convert the data from Buffer to object
       */
      return (await productPackage.decodeProduct(resource?.data!))?.resource
    } catch (error) {
      // Logger.system.error((error as Error).message);
      console.log('getProductBySlug >>', { error })
      throw error
    }
  }
}

const productCacheStore = new ProductCacheStore()

export default productCacheStore
