import { ImageType } from './common.type'
import { Nullable, Scalars } from './custom.type'

export interface CategorySeo {
  categoryId: number
  metaTitle: Scalars['String']
  urlKey: Scalars['String']
  metaKeywords: Scalars['String']
  metaDescription: Scalars['String']
  metaRobots?: { value: Scalars['String'] } | string | undefined
  breadcrumbsPriority: number
  metaImage: ImageType[]
  breadcrumbs: BreadcrumbType[]
}

export interface BreadcrumbType {
  categoryLevel: number
  categoryName: string
  categoryUrl: string
}

export interface CategoryType extends CategorySeo {
  id: Scalars['Int']
  level: Scalars['Int']
  name: Scalars['String']
  parent?: Nullable<CategoryRefLevel2>
  description?: Scalars['String']
  urlKey: string
  children?: Nullable<Array<CategoryRefLevel2>>
  thumbnail: ImageType[]
}

// To prevent circular references
export interface CategoryRefLevel2 extends CategorySeo {
  id: Scalars['Int']
  level: Scalars['Int']
  parent?: Nullable<CategoryRefLevel3>
  name: Scalars['String']
  urlKey: string
  thumbnail: ImageType[]
  children: Nullable<Array<CategoryRefLevel3>>
  categorySeo: CategorySeo
}

// To prevent circular references
export interface CategoryRefLevel3 extends CategorySeo {
  id: Scalars['Int']
  level: Scalars['Int']
  name: Scalars['String']
  urlKey: string
  thumbnail: ImageType[]
  categorySeo: CategorySeo
  children?: Nullable<Array<CategoryRefLevel2>>
}
