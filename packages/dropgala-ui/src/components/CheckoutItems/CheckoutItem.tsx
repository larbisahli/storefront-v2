import ImageComponent from '../common/Image'
import { ProductType } from '@dropgala/types/product.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { useRouter } from 'next/router'
import React, { memo } from 'react'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import { StoreProps, selectConfig } from '@dropgala/store'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { useProductPrice } from '@dropgala/utils/hooks/usePriceRange'
import { getThumbnail } from '@dropgala/utils/helpers'

type CheckoutItemProps = {
  item: ProductType
  useAppSelector: StoreProps['useAppSelector']
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({
  useAppSelector,
  item
}) => {
  const router = useRouter()
  const { locale = 'en-US' } = router

  const { defaultCurrency, language, tax } = useAppSelector(selectConfig)

  const { __ } = useTranslation(language, 'common')

  const {
    name,
    type,
    thumbnail,
    price,
    orderVariationOption,
    orderQuantity = 0
  } = item

  const productPrice = useProductPrice({
    selectedVariationOption: orderVariationOption,
    simplePrice: price,
    type,
    taxRate: tax?.rate
  })

  const total = usePrice({
    amount: productPrice?.finalPrice?.value * orderQuantity,
    locale,
    currencyCode: defaultCurrency?.code
  })

  const ExclTaxFinalPrice = usePrice({
    amount:
      (productPrice?.finalPriceExclTax.value ?? 0) * (item.orderQuantity ?? 1),
    locale: locale!,
    currencyCode: defaultCurrency?.code
  })

  const { image, placeholder } = !isEmpty(orderVariationOption?.thumbnail)
    ? getThumbnail(orderVariationOption?.thumbnail!)
    : getThumbnail(thumbnail!)

  return (
    <div className="w-full h-auto flex justify-start last:border-none items-start relative mt-3 pb-4 last:border-b-0 border-b border-solid border-gray-400 px-3">
      <div className="relative flex w-[75px] h-[75px] rounded flex-shrink-0">
        <div
          className="absolute text-xs bg-black rounded-full z-10
          text-white h-5 w-5 flex items-center font-semibold justify-center right-[-5px] top-[-5px] shadow-card"
        >
          <span>{orderQuantity}</span>
        </div>
        <div>
          <ImageComponent
            src={image}
            customPlaceholder={placeholder}
            width={75}
            height={75}
            quality={90}
            className="object-cover rounded"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center pl-15px w-full">
        <div className="flex flex-col w-full">
          <div className="flex items-start flex-col">
            <div
              title={name}
              className="flex-1 line-clamp-1 !text-[13px] sm:text-sm lg:text-[15px] leading-4 sm:leading-5 text-gray-900 font-medium"
            >
              {name}
            </div>
            <div className="flex w-full items-center justify-center">
              {/* Option title */}
              {!isEmpty(orderVariationOption) && (
                <div className="flex items-center text-13px flex-0">
                  <span className="border border-gray-400 px-2 py-0 rounded text-gray-900 ">
                    {orderVariationOption?.title}
                  </span>
                </div>
              )}
              {/* ---- price area ---- */}
              <div className="flex flex-col flex-1 items-end">
                <div className="flex items-end justify-end flex-shrink-0">
                  <span className="inline-block text-[16px] text-gray-900 font-semibold">
                    {total}
                  </span>
                </div>
                <span className="text-gray-800 text-xs font-medium">
                  {__('Excl. tax: %s', ExclTaxFinalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(CheckoutItem)
