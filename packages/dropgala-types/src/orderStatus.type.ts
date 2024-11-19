import { Nullable, Scalars } from './custom.type'
import { PrivacyAccessibility } from './enums.type'

export interface OrderStatusType {
  id?: Nullable<Scalars['ID']>
  name?: Nullable<Scalars['String']>
  color?: Nullable<Scalars['String']>
  privacy?: PrivacyAccessibility
}
