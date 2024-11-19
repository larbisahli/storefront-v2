import { ImageType } from './common.type'

export interface ShippingType {
  id: number
  name: string
  deliveryTime: any
  freeShipping: boolean
  logo: ImageType[]
  rateType: string
  price: number
  zones?: any[]
  rates?: any[]
}
