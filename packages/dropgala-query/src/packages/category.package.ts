/**
 * This package helps us turn objects info buffer, useful for storage
 */
import protobuf from 'protobufjs'
import path from 'path'
import { Category } from '@dropgala/types/generated/category/Category'

const PROTO_DIR_PATH = path.join(process.cwd(), './proto') // this will include all *.proto files at the build time

const PROTO_PATH = path.join(PROTO_DIR_PATH, 'category.proto')

export class CategoryPackage extends protobuf.Root {
  Category: protobuf.Type
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
    this.Category = this.loadSync(PROTO_PATH).lookupType('category.Category')
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
   * @returns {Promise<{ resource: any; error?: unknown }>}
   */
  public decode = (buffer: protobuf.Buffer): Promise<Category> => {
    return new Promise((resolve, reject) => {
      try {
        const category = this.Category.toObject(
          this.Category.decode(buffer),
          this.decodeOptions
        )
        resolve(category)
      } catch (error) {
        reject({ error })
      }
    })
  }
}

const categoryPackage = new CategoryPackage()

export default categoryPackage
