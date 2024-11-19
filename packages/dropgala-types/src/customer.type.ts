import { Nullable, Scalars } from './custom.type'

export interface LocationInputType {
  lat?: Nullable<Scalars['Float']>
  lng?: Nullable<Scalars['Float']>
  city?: Nullable<Scalars['String']>
  state?: Nullable<Scalars['String']>
  country?: Nullable<Scalars['String']>
  zip?: Nullable<Scalars['String']>
  formattedAddress?: Nullable<Scalars['String']>
}
