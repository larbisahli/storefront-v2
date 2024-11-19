import { AttributeType, AttributeValueType } from './attribute.type'
import { CategoryType } from './category.type'
import { ImageType } from './common.type'
import { Nullable, Scalars } from './custom.type'
import { ProductTypes } from './enums.type'
import { TagType } from './tag.type'

export interface VariationOptionsType {
  id: number
  productId?: number
  title: Scalars['String']
  isDisable: Scalars['Boolean']
  active: boolean
  thumbnail: ImageType[]
  options: number[]
  quantity: Scalars['Int']
  sku: Scalars['String']
  key?: string
  salePrice?: number
  comparePrice?: number
}

export interface StorePriceType {
  finalPrice: {
    currency: {
      code: string
    }
    value: number
  }
  finalPriceExclTax: {
    currency: {
      code: string
    }
    value: number
  }
  discount?: {
    amountOff?: number
    percentOff?: number
  }
}

export interface PriceRangeType {
  maximumPrice: StorePriceType
  minimumPrice: StorePriceType
}

export interface PriceType {
  maxComparePrice?: number
  minComparePrice?: number
  maxSalePrice?: number
  minSalePrice?: number
  salePrice?: number
  comparePrice?: number
}

export interface ProductType {
  id?: number
  slug?: Scalars['String']
  name?: Scalars['String']
  sku?: Nullable<Scalars['String']>
  quantity?: Scalars['Int']
  type?: ProductTypes
  inStock?: Scalars['Boolean']
  shortDescription?: Nullable<Scalars['String']>
  description?: Scalars['String']
  published?: Scalars['Boolean']
  status?: 'draft' | 'publish'
  disableOutOfStock?: Scalars['Boolean']
  note?: Nullable<Scalars['String']>
  thumbnail?: ImageType[]
  gallery?: ImageType[]
  categories?: Array<CategoryType>
  tags?: Nullable<Array<Nullable<TagType>>>
  variationOptions?: VariationOptionsType[]
  variations?: VariationsType[]
  relatedProducts?: Nullable<Array<ProductRef>>
  upsellProducts?: Nullable<Array<ProductRef>>
  crossSellProducts?: Nullable<Array<ProductRef>>
  productSeo?: ProductSeoType
  // Order properties for the cart functionality
  orderQuantity?: number
  orderVariationOption?: VariationOptionsType | undefined
  ratingSummary?: number
  reviewCount?: number
  price?: PriceType
}

export interface ProductSeoType {
  productId: number
  slug: string
  metaTitle?: string
  metaKeywords?: string
  metaDescription?: string
  metaImage?: ImageType[]
}

export interface ProductRef {
  id?: Scalars['Int']
  slug?: Scalars['String']
  name?: Scalars['String']
  sku?: Nullable<Scalars['String']>
  buyingPrice?: Scalars['Float']
  quantity?: Scalars['Int']
  price?: PriceType
}

export interface VariationsType extends AttributeType {
  attribute: AttributeType
  value?: Nullable<AttributeValueType>
}
