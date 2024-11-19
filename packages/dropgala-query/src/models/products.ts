import mongoose from 'mongoose'

export interface Products extends mongoose.Document {
  key: string
  alias: string
  domain: string
  localeId: string
  slug: string
  page: number
  data: Uint8Array
  size: String
  expireAt: Date
}

const ProductsSchema = new mongoose.Schema<Products>(
  {
    key: {
      type: String,
      required: true,
      index: { unique: true }
    },
    alias: {
      type: String,
      require: false,
      index: { unique: false }
    },
    domain: {
      type: String,
      require: false,
      index: { unique: false }
    },
    slug: {
      type: String,
      require: false
    },
    page: {
      type: Number
    },
    data: {
      type: Buffer,
      required: true
    },
    size: {
      type: String
    },
    expireAt: {
      type: Date,
      expires: 60 * 60 * 24 * 7, // 7 day
      default: Date.now
    }
  },
  { collection: 'product-collections' }
)

export default mongoose.models.Products ||
  mongoose.model<Products>('Products', ProductsSchema)
