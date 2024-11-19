/**
 * This package helps us turn objects info buffer, useful for storage
 */
import protobuf from 'protobufjs'
import path from 'path'
import { CartType } from '@dropgala/types'

const PROTO_DIR_PATH = path.join(process.cwd(), './proto') // this will include all *.proto files at the build time

const PROTO_PATH = path.join(PROTO_DIR_PATH, 'cart.proto')

export class CartPackage extends protobuf.Root {
  Cart: protobuf.Type
  decodeOptions: {
    enums: StringConstructor // enums as string names
    longs: StringConstructor // longs as strings (requires long.js)
    bytes: StringConstructor // bytes as base64 encoded strings
    defaults: boolean // includes default values
    arrays: boolean // populates empty arrays (repeated fields) even if defaults=false
    objects: boolean // populates empty objects (map fields) even if defaults=false
    oneofs: boolean // includes virtual oneof fields set to the present field's name
  }

  constructor() {
    super()
    this.Cart = this.loadSync(PROTO_PATH).lookupType('cart.Cart')
    this.decodeOptions = {
      enums: String,
      longs: String,
      bytes: String,
      defaults: true,
      arrays: true,
      objects: true,
      oneofs: true
    }
  }

  /**
   * @param {protobuf.Buffer} buffer
   * @returns {Promise<CartType>}
   */
  public decode = (buffer: protobuf.Buffer): Promise<CartType> => {
    return new Promise((resolve, reject) => {
      try {
        const cart = this.Cart.toObject(
          this.Cart.decode(buffer),
          this.decodeOptions
        ) as CartType
        resolve(cart)
      } catch (error) {
        reject({ error })
      }
    })
  }
}

const cartPackage = new CartPackage()

export default cartPackage
