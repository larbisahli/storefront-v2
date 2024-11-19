/**
 * This package helps us encode and decode resources to a binary blob (Uint8Array)
 */
import protobuf from 'protobufjs'
import path from 'path'

const PROTO_DIR_PATH = path.join(process.cwd(), './proto') // this will include all *.proto files at the build time

const PROTO_PATH = path.join(PROTO_DIR_PATH, 'settings.proto')

export class ConfigPackage extends protobuf.Root {
  _root: protobuf.Root
  Config: protobuf.Type
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
    this.Config = this._root.lookupType('settings.Config')
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
  public decode = (
    buffer: protobuf.Buffer
  ): Promise<{ resource: any; error?: unknown }> => {
    return new Promise((resolve, reject) => {
      try {
        const config = this.Config.toObject(
          this.Config.decode(buffer),
          this.decodeOptions
        )
        resolve({ resource: config })
      } catch (error) {
        reject({ error })
      }
    })
  }
}

const configPackage = new ConfigPackage()

export default configPackage
