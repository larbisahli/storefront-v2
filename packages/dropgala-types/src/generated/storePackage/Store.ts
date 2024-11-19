// Original file: packages/dropgala-query/src/proto/store.proto

import type {
  Etag as _storePackage_Etag,
  Etag__Output as _storePackage_Etag__Output
} from '../storePackage/Etag'
import type {
  SystemLanguage as _storePackage_SystemLanguage,
  SystemLanguage__Output as _storePackage_SystemLanguage__Output
} from '../storePackage/SystemLanguage'

export interface Store {
  id?: string
  alias?: string
  published?: boolean
  tier?: string
  status?: string
  etag?: _storePackage_Etag | null
  systemLanguage?: _storePackage_SystemLanguage | null
}

export interface Store__Output {
  id: string
  alias: string
  published: boolean
  tier: string
  status: string
  etag: _storePackage_Etag__Output | null
  systemLanguage: _storePackage_SystemLanguage__Output | null
}
