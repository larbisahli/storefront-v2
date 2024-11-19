/**
 * This package helps us encode and decode resources to a binary blob (Uint8Array)
 */
import { Menu } from '@dropgala/types/generated/category/Menu'
import protobuf from 'protobufjs'
import path from 'path'

const PROTO_DIR_PATH = path.join(process.cwd(), './proto') // this will include all *.proto files at the build time

const PROTO_PATH = path.join(PROTO_DIR_PATH, 'category.proto')

export class MenuPackage extends protobuf.Root {
  _root: protobuf.Root
  Menu: protobuf.Type
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

    this._root = this.loadSync(PROTO_PATH)
    this.Menu = this._root.lookupType('category.Menu')

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
   * @param {Menu[]} menu
   * @returns {Promise<{ buffer: Uint8Array; error?: unknown }>}
   */
  public encode = (
    menu: Menu[]
  ): Promise<{ buffer: Uint8Array; error?: unknown }> => {
    return new Promise((resolve, reject) => {
      try {
        const errMsg = this.Menu.verify(menu)
        if (errMsg) {
          reject(errMsg)
        }
        const message = this.Menu.create({ menu })
        // Encode the message to a buffer
        const buffer = this.Menu.encode(message).finish()
        resolve({ buffer })
      } catch (error) {
        reject({ error })
      }
    })
  }

  /**
   * @param {protobuf.Buffer} buffer
   * @returns {Promise<{ resource: any; error?: unknown }>}
   */
  public decode = (
    buffer: protobuf.Buffer
  ): Promise<{ resource: any; error?: unknown }> => {
    return new Promise((resolve, reject) => {
      try {
        const menu = this.Menu.toObject(
          this.Menu.decode(buffer),
          this.decodeOptions
        )
        resolve({ resource: menu })
      } catch (error) {
        reject({ error })
      }
    })
  }
}

const menuPackage = new MenuPackage()

export default menuPackage
