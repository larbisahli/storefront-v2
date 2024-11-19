import mongoose from 'mongoose'

// export interface Category extends mongoose.Document {
//   key: string
//   alias: string
//   domain: string
//   data: Uint8Array
//   slug: string
//   size: String
//   expireAt: Date
// }

const CategorySchema = new mongoose.Schema(
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
      required: true
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
  { collection: 'categories' }
)

export default mongoose.models.Category ||
  mongoose.model('Category', CategorySchema)
