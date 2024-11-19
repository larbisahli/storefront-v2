import { Scalars } from './custom.type'

export interface PromoBannerType {
  id?: Scalars['Int']
  delaySpeed: string
  backgroundColor: string
  direction: 'RTL' | 'LTR'
  published?: Scalars['Boolean']
  status?: 'draft' | 'publish'
  sliders?: {
    content: string
    position: number
  }[]
}
