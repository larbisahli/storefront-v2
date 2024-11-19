import { AttributeTypeTypes } from 'enums.type'
import { Nullable, Scalars } from './custom.type'

export interface AttributeValueType {
  id?: number
  attributeId?: number
  name?: Scalars['String']
  value?: Scalars['String']
}

export interface AttributeType {
  id?: number
  type?: AttributeTypeTypes
  name?: Scalars['String']
  values?: AttributeValueType[] | []
}
