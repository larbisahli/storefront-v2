import { PRODUCTION_ENV } from '@dropgala/utils/utils'
import mongoose, { ConnectionStates } from 'mongoose'

declare global {
  var mongoose: any // This must be a `var` and not a `let / const`
}

const MONGODB_URI = PRODUCTION_ENV
  ? 'mongodb+srv://dropgala:EesbefcAwykAXF5Q@dropgala-cache.ormjvni.mongodb.net/store-cache?retryWrites=true&w=majority' //process.env.MONGODB_URI!
  : `mongodb://root:test@127.0.0.1/store-cache?retryWrites=true&w=majority&authSource=admin`

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  console.table({
    cached: !!cached.conn,
    state: ConnectionStates[mongoose.connection.readyState]
  })

  // const db = mongoose.connection.db;
  // const collections = await db.listCollections().toArray();
  // console.log(collections)

  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false
    }
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
