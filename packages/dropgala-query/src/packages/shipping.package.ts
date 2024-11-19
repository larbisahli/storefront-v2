/**
 * This package helps us turn objects info buffer, useful for storage
 */
import protobuf from 'protobufjs'
import path from 'path'

const PROTO_DIR_PATH = path.join(process.cwd(), './proto') // this will include all *.proto files at the build time

const PROTO_PATH = path.join(PROTO_DIR_PATH, 'shipping.proto')

export class ShippingPackage extends protobuf.Root {
  Shipping: protobuf.Type
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
    this.Shipping = this.loadSync(PROTO_PATH).lookupType('shipping.Shippings')
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
   * @returns {Promise<Shipping>}
   */
  public decode = (
    buffer: protobuf.Buffer
  ): Promise<{ resource: any; error?: any }> => {
    return new Promise((resolve, reject) => {
      try {
        const shippings = this.Shipping.toObject(
          this.Shipping.decode(buffer),
          this.decodeOptions
        )
        resolve({ resource: shippings })
      } catch (error) {
        reject({ error })
      }
    })
  }
}

const shippingPackage = new ShippingPackage()

export default shippingPackage
