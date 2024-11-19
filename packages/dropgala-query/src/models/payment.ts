import mongoose from 'mongoose'

export interface Payment extends mongoose.Document {
  key: string
  alias: string
  domain: string
  localeId: string
  data: Uint8Array
  size: String
  expireAt: Date
}

const PaymentSchema = new mongoose.Schema<Payment>(
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
  { collection: 'payments' }
)

export default mongoose.models.Payment ||
  mongoose.model<Payment>('Payment', PaymentSchema)
