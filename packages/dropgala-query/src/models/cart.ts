import mongoose from 'mongoose'

export interface Cart extends mongoose.Document {
  key: string
  storeId: string
  domain: string
  data: any
  size: String
  expireAt: Date
}

const CartSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      index: { unique: true }
    },
    storeId: {
      type: String,
      require: false,
      index: { unique: false }
    },
    domain: {
      type: String,
      require: false,
      index: { unique: false }
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
      expires: 60 * 60 * 24 * 30, // 30 days
      default: Date.now
    }
  },
  { collection: 'carts' }
)

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema)
