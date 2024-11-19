import { ModuleGroup, SortOrder } from './enums.type'

export declare type Nullable<T> = T | null

export declare type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  SortOrder: SortOrder.Asc | SortOrder.Desc
  JSON: { [key: string]: string | number | boolean }
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: string | number | Date
  Mixed: string | number | Date
  Upload: string | number | Date
  /** A date string with format `Y-m-d`, e.g. `2011-05-23`. */
  Date: string | number | Date
  /** A datetime and timezone string in ISO 8601 format `Y-m-dTH:i:sO`, e.g. `2020-04-20T13:53:12+02:00`. */
  DateTimeTz: string | number | Date
}
