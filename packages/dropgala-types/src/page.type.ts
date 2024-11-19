import { ImageType } from './common.type'

export interface PageType {
  id: string
  slug: string
  name: string
  content: string
  published: boolean
  metaTitle: string
  metaDescription: string
  ogImage: ImageType[]
}
