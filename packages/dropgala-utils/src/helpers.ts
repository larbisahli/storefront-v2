import { ImageType } from '@dropgala/types/common.type'
import { isArray, isEmpty } from 'lodash'

/**
 * Desc: get value from object/array if path/key exists
 * @param {Object} object/array in which find the path/key
 * @param {String} path/key, has to find in object/array
 * @param {any} default value if path/key not present
 * @return {any} return the value if path/key matches else default value if present else undefined
 * */
// TODO: Consider useMemo()
export const resolvePath = <T>(obj: any, path: string, defaultValue: any): T =>
  (path || '')
    .split('.')
    .reduce(
      (o, p) =>
        o && o[p] !== null && o[p] !== undefined ? o[p] : defaultValue,
      obj || {}
    )

export const getThumbnail = (thumbnail: ImageType[] | null | undefined) => {
  return !isEmpty(thumbnail) && isArray(thumbnail)
    ? thumbnail[0]
    : { image: '', placeholder: '' }
}
