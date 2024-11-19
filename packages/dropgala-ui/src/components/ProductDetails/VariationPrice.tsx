// import usePrice from '@framework/product/use-price';
import Badge from '../ui/Badge'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import { useRouter } from 'next/router'
import { memo } from 'react'
import { PriceType, VariationOptionsType } from '@dropgala/types/product.type'
import { StoreProps, selectConfig } from '@dropgala/store'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { useProductPrice } from '@dropgala/utils/hooks/usePriceRange'
import { ProductTypes } from '@dropgala/types'

interface Props extends StoreProps {
  selectedVariationOption?: VariationOptionsType
  simplePrice?: PriceType
  type?: ProductTypes
}

function VariationPrice({
  selectedVariationOption,
  simplePrice,
  type,
  useAppSelector
}: Props) {
  const router = useRouter()
  const { locale = 'en-US' } = router

  const config = useAppSelector(selectConfig)

  const { tax: { rate = 0 } = {} } = config

  const { __ } = useTranslation(config.language, 'common')

  const productPrice = useProductPrice({
    selectedVariationOption,
    simplePrice,
    type,
    taxRate: rate
  })

  const selectedFinalPrice = productPrice?.finalPrice?.value ?? 0
  const selectedDiscountAmountOff = productPrice?.discount?.amountOff ?? 0
  const selectedFinalPriceExclTax = productPrice?.finalPriceExclTax.value ?? 0
  const selectedDiscountPercentOff = productPrice?.discount?.percentOff

  const productPriceValue = usePrice({
    amount: selectedFinalPrice,
    locale: locale!,
    currencyCode: config?.defaultCurrency?.code
  })

  const discount = usePrice({
    amount: selectedDiscountAmountOff,
    locale: locale!,
    currencyCode: config?.defaultCurrency?.code
  })

  const finalPriceExclTax = usePrice({
    amount: selectedFinalPriceExclTax,
    locale: locale!,
    currencyCode: config?.defaultCurrency?.code
  })

  return (
    <div className="flex-1">
      <div className="flex items-center">
        <div className="text-skin-base font-bold text-xl desktop:text-2xl leading-none">
          {!!selectedFinalPrice && productPriceValue}
        </div>
        {!!selectedDiscountAmountOff && (
          <>
            <del className="pl-3 text-gray-900 text-base text-opacity-70 leading-none">
              {discount}
            </del>
            <Badge textColor="text-red-700 font-semibold">
              {`${Math.round(selectedDiscountPercentOff ?? 0)}%`} {'off'}
            </Badge>
          </>
        )}
      </div>
      <span className="text-[14px] font-medium">
        {__('Excl. tax: %s', finalPriceExclTax)}
      </span>
    </div>
  )
}

export default memo(VariationPrice)
