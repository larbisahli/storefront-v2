import mongoose from 'mongoose'

export interface Config extends mongoose.Document {
  key: string
  alias: string
  domain: string
  data: Uint8Array
  size: String
  expireAt: Date
}

const ConfigSchema = new mongoose.Schema<Config>(
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
  { collection: 'configs' }
)

export default mongoose.models.Config ||
  mongoose.model<Config>('Config', ConfigSchema)
