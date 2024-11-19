// Original file: packages/dropgala-query/src/proto/category.proto

import type {
  Image as _media_Image,
  Image__Output as _media_Image__Output
} from '../media/Image'
import type {
  Menu as _category_Menu,
  Menu__Output as _category_Menu__Output
} from '../category/Menu'

export interface MenuItem {
  id?: number
  name?: string
  urlKey?: string
  thumbnail?: _media_Image[]
  children?: _category_Menu[]
}

export interface MenuItem__Output {
  id: number
  name: string
  urlKey: string
  thumbnail: _media_Image__Output[]
  children: _category_Menu__Output[]
}
