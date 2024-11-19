import { CountryType } from 'checkout.type'
import { Scalars } from './custom.type'

export interface ShippingAddress {
  fullName?: Scalars['String']
  marketingOptIn?: Scalars['Boolean']
  country?: CountryType
  address?: Scalars['String']
  city?: Scalars['String']
  state?: Scalars['String']
  zip?: Scalars['String']
  phone?: Scalars['String']
  email?: Scalars['String']
}
