import { usePrice } from '@dropgala/utils/hooks/usePrice'
import type { ProductType } from '@dropgala/types/product.type'
import cn from 'clsx'
import { useRouter } from 'next/router'
import React, { memo } from 'react'
import { HeartEmpty } from '@dropgala/assets/icons/heart'
import {
  BuilderAttributes,
  ProductCardLayout,
  ProductTypes
} from '@dropgala/types'
import Image from '../common/Image'
import Link from '../common/Link'
import { StoreProps, selectConfig } from '@dropgala/store'
import { usePriceRange } from '@dropgala/utils/hooks/usePriceRange'
import StarIcon from '@dropgala/assets/icons/star'
import { getIsRTL } from '@dropgala/utils/get-direction'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { getThumbnail } from '@dropgala/utils/helpers'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

interface ProductProps extends StoreProps {
  product: ProductType
  layout: ProductCardLayout
  carousel?: boolean
  className?: string
}

const ProductCard: React.FC<ProductProps> = ({
  product,
  layout,
  className,
  carousel = false,
  useAppSelector,
  ...props
}) => {
  const config = useAppSelector(selectConfig)
  const { __ } = useTranslation(config.language, 'common')
  const { locale = 'en-US' } = useRouter()
  layout = layout ?? ProductCardLayout.Grid

  const {
    name,
    ratingSummary,
    reviewCount,
    thumbnail,
    productSeo,
    slug,
    type,
    inStock,
    disableOutOfStock
  } = product ?? {}

  const isSoldOut = !disableOutOfStock && !inStock

  const isConfigurable = type === ProductTypes.Variable

  const priceRange = usePriceRange({
    product,
    taxRate: config?.tax?.rate
  })

  const priceRangeMaxFinalPrice =
    priceRange?.maximumPrice?.finalPrice?.value ?? 0
  const priceRangeMinFinalPrice =
    priceRange?.minimumPrice?.finalPrice?.value ?? 0
  const priceRangeMaxFinalPriceExclTax =
    priceRange?.maximumPrice?.finalPriceExclTax?.value ?? 0
  const priceRangeMinFinalPriceExclTax =
    priceRange?.minimumPrice?.finalPriceExclTax?.value ?? 0
  const discountAmountOff = priceRange?.maximumPrice?.discount?.amountOff ?? 0
  const discountPercentOff = priceRange?.maximumPrice?.discount?.percentOff ?? 0

  const finalPrice = usePrice({
    amount: priceRangeMaxFinalPrice,
    locale: locale!,
    currencyCode: config?.defaultCurrency?.code
  })

  const ExclTaxFinalMaxPrice = usePrice({
    amount: priceRangeMaxFinalPriceExclTax,
    locale: locale!,
    currencyCode: config?.defaultCurrency?.code
  })

  const finalMinPrice = usePrice({
    amount: priceRangeMinFinalPrice,
    locale: locale!,
    currencyCode: config?.defaultCurrency?.code
  })

  const ExclTaxFinalMinPrice = usePrice({
    amount: priceRangeMinFinalPriceExclTax,
    locale: locale!,
    currencyCode: config?.defaultCurrency?.code
  })

  const discountValue = usePrice({
    amount: discountAmountOff,
    locale: locale!,
    currencyCode: config?.defaultCurrency?.code
  })

  const { image, placeholder } = getThumbnail(thumbnail)

  const renderProductRating = () => {
    if (ratingSummary && reviewCount) {
      return (
        <div className="flex items-center mb-1">
          {Array.from({ length: 5 })?.map((_, idx) => (
            <span
              key={idx}
              className={cn(
                reviewCount >= idx + 1 ? 'text-orange-600' : 'text-gray-400'
              )}
            >
              <StarIcon width={18} height={18} />
            </span>
          ))}
          <div className="text-xs font-bold text-black">{`(${ratingSummary})`}</div>
        </div>
      )
    }

    return null
  }

  const { builderAttributes } = useIsInIframe(props, [
    BuilderAttributes.ADD_LIBRARY
  ])

  return (
    <div {...builderAttributes}>
      <Link
        href={{
          pathname: '/product/[slug]',
          query: { slug: slug ?? productSeo?.slug }
        }}
        className={cn('lg:mx-0 mx-auto')}
      >
        <div
          className={cn(
            'flex border-transparent w-fit group/card rounded-md cursor-pointer lg:hover:shadow-cardHover hover:border border-solid transition-all duration-300 relative',
            {
              'shadow-cardHover': carousel,
              'flex-row w-full max-h-[400px]':
                layout === ProductCardLayout.List,
              'flex-col h-full': layout === ProductCardLayout.Grid
            },
            className
          )}
          title={name}
        >
          <div
            className={cn(
              'relative flex-shrink-0 overflow-hidden max-w-[400px]',
              {
                'max-w-[200px] lg:max-w-[350px]':
                  layout === ProductCardLayout.List
              }
            )}
          >
            <div
              className={
                'flex px-3 py-7 rounded-ms overflow-hidden transition duration-200 ease-in-out transform group-hover/card:scale-105 relative'
              }
            >
              <Image
                src={image}
                customPlaceholder={placeholder}
                width={450}
                height={450}
                quality={100}
                objectFit="cover"
                className={cn('object-cover', {
                  'rounded-b-none': carousel
                })}
              />
              {isSoldOut && (
                <div className="absolute pt-2.5 md:pt-3.5 z-10 -mx-0.5 sm:-mx-1 inset-0 bg-gray-200 rounded opacity-75 flex items-center justify-center">
                  <span className="text-xl font-bold uppercase text-gray-800">
                    {__('Sold Out')}
                  </span>
                </div>
              )}
              <button className="absolute top-0 right-0 group-hover/card:flex hidden items-center justify-center m-3">
                <HeartEmpty width={25} height={25} />
              </button>
            </div>
          </div>

          <div
            className={cn(
              'relative flex px-3 flex-col pb-5 lg:pb-6 lg:pt-4 h-full',
              {
                'flex-1 w-full h-[200px] lg:h-[300px]':
                  layout === ProductCardLayout.List
              }
            )}
          >
            {/* Product Ratings */}
            {renderProductRating()}
            <h2
              className={cn(
                'line-clamp-3 h-[40px] lg:line-clamp-2 font-semibold !text-[14px] sm:text-sm lg:text-[15px] leading-5 sm:leading-5',
                {
                  '!text-lg sm:text-sm lg:text-[15px] !line-clamp-3 h-fit':
                    layout === ProductCardLayout.List
                }
              )}
            >
              {name}
            </h2>
            <div
              className={cn(
                'uppercase h-[15px] w-full text-xs text-red-700 font-semibold',
                { 'mt-5': layout === ProductCardLayout.List }
              )}
            >
              {!isConfigurable && discountPercentOff && !!discountAmountOff && (
                <span>{`${Math.round(discountPercentOff)}%`} off</span>
              )}
            </div>
            <div className="mb-1 lg:mb-1.5 flex items-center">
              {!isConfigurable && !!discountAmountOff && (
                <div
                  className={cn(
                    'text-base',
                    getIsRTL(locale) ? 'ml-3' : 'mr-3'
                  )}
                >
                  <del className="text-opacity-80 text-gray-700">
                    {discountValue}
                  </del>
                </div>
              )}
              {!isConfigurable && (
                <div
                  className={cn('leading-none text-[24px] font-[600]', {
                    'text-black': !!discountAmountOff
                  })}
                >
                  {finalPrice}
                </div>
              )}
              {isConfigurable && (
                <div
                  className={cn(
                    'flex items-center leading-none pt-[5px] text-[18px] font-[600]'
                  )}
                >
                  <span className="text-sm font-medium pr-2">
                    {__('As low as')}
                  </span>
                  <span className="text-black text-[24px] font-[600]">
                    {finalMinPrice}
                  </span>
                </div>
              )}
            </div>
            <span className="text-xs font-medium">
              {__(
                'Excl. tax: %s',
                isConfigurable ? ExclTaxFinalMinPrice : ExclTaxFinalMaxPrice
              )}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default memo(ProductCard)
