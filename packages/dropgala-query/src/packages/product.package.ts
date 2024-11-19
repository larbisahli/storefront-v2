/**
 * This package helps us encode and decode resources to a binary blob (Uint8Array)
 */
import protobuf from 'protobufjs'
import path from 'path'

const PROTO_DIR_PATH = path.join(process.cwd(), './proto') // this will include all *.proto files at the build time

const PROTO_PATH = path.join(PROTO_DIR_PATH, 'product.proto')

export class ProductPackage extends protobuf.Root {
  _root: protobuf.Root
  Products: protobuf.Type
  Product: protobuf.Type
  decodeOptions: {
    enums: StringConstructor // enums as string names
    longs: StringConstructor // longs as strings (requires long.js)
    bytes: StringConstructor // bytes as base64 encoded strings
    defaults: boolean // includes default values
    keepCase: boolean // includes default values
    arrays: boolean // populates empty arrays (repeated fields) even if defaults=false
    objects: boolean // populates empty objects (map fields) even if defaults=false
    oneofs: boolean // includes virtual oneof fields set to the present field's name
  }

  constructor() {
    super()
    this._root = this.loadSync(PROTO_PATH)
    this.Products = this._root.lookupType('product.Products')
    this.Product = this._root.lookupType('product.Product')
    this.decodeOptions = {
      enums: String,
      longs: String,
      bytes: String,
      defaults: false,
      arrays: true,
      objects: true,
      oneofs: true,
      keepCase: true
    }
  }

  /**
   * @param {protobuf.Buffer} buffer
   * @returns {Promise<{ resource: any; error?: unknown }>}
   */
  public decodeProducts = (
    buffer: protobuf.Buffer
  ): Promise<{ resource: any; error?: unknown }> => {
    return new Promise((resolve, reject) => {
      try {
        const popularProducts = this.Products.toObject(
          this.Products.decode(buffer),
          this.decodeOptions
        )
        resolve({ resource: popularProducts })
      } catch (error) {
        reject({ error })
      }
    })
  }

  /**
   * @param {protobuf.Buffer} buffer
   * @returns {Promise<{ resource: any; error?: unknown }>}
   */
  public decodeProduct = (
    buffer: protobuf.Buffer
  ): Promise<{ resource: any; error?: unknown }> => {
    return new Promise((resolve, reject) => {
      try {
        const Product = this.Product.toObject(
          this.Product.decode(buffer),
          this.decodeOptions
        )
        resolve({ resource: Product })
      } catch (error) {
        reject({ error })
      }
    })
  }
}

const productPackage = new ProductPackage()

export default productPackage
