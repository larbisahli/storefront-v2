import mongoose from 'mongoose'

export interface Layout extends mongoose.Document {
  key: string
  alias: string
  domain: string
  localeId: string
  page: string
  templateId: string
  data: Uint8Array
  size: String
  expireAt: Date
}

const LayoutSchema = new mongoose.Schema<Layout>(
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
    localeId: {
      type: String,
      require: true,
      index: { unique: false }
    },
    page: {
      type: String,
      require: true,
      index: { unique: false }
    },
    templateId: {
      type: String,
      require: true
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
  { collection: 'layouts' }
)

export default mongoose.models.Layout ||
  mongoose.model<Layout>('Layout', LayoutSchema)
