import mongoose from 'mongoose'

export interface Language extends mongoose.Document {
  key: string
  alias: string
  domain: string
  data: Uint8Array
  size: String
  expireAt: Date
}

const LanguageSchema = new mongoose.Schema<Language>(
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
  { collection: 'languages' }
)

export default mongoose.models.Language ||
  mongoose.model<Language>('Language', LanguageSchema)
