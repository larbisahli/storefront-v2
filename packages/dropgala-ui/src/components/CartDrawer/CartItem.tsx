import { ProductTypes, ThunkStatus } from '@dropgala/types'
import type {
  CartItemType,
  VariationOptionsType
} from '@dropgala/types/product.type'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import { useRouter } from 'next/router'
import React, { memo, useEffect, useMemo, useState } from 'react'
import cn from 'clsx'
import { AttributeDisplay, Counter, Image } from '../common'
import type { ImageType } from '@dropgala/types/common.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import Link from '../common/Link'
import { StoreProps, selectConfig } from '@dropgala/store'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { cartChange, removeCartItem } from '@dropgala/store/Cart/thunks'
import Loader from '../ui/loader'
import CloseIcon from '@dropgala/assets/icons/close'
import { useProductPrice } from '@dropgala/utils/hooks/usePriceRange'
import { notify } from '../ui/toast'

interface CartItemProps extends StoreProps {
  item: CartItemType
  status: ThunkStatus
  handleCloseCart: () => void
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  status,
  handleCloseCart,
  useAppSelector,
  useAppDispatch
}) => {
  const router = useRouter()
  const { language, locales, defaultCurrency, csrf, tax, storeId } =
    useAppSelector(selectConfig)
  const dispatch = useAppDispatch()

  const { __ } = useTranslation(language, 'common')

  const [currentLoadingItem, setCurrentLoadingItem] = useState<
    string | undefined | null
  >(null)

  const { locale = 'en-US' } = router

  const {
    id,
    key,
    name,
    thumbnail,
    slug,
    type,
    quantity,
    price,
    orderQuantity,
    orderVariationOption = {} as VariationOptionsType
  } = item

  const isConfigurable = type === ProductTypes.Variable

  const productPrice = useProductPrice({
    selectedVariationOption: orderVariationOption,
    simplePrice: price,
    type,
    taxRate: tax?.rate
  })

  const productQuantity = isConfigurable
    ? orderVariationOption?.quantity
    : quantity

  const selectedItemThumbnail = isEmpty(orderVariationOption?.thumbnail)
    ? thumbnail
    : orderVariationOption?.thumbnail

  const imageThumbnail = !isEmpty(selectedItemThumbnail)
    ? selectedItemThumbnail![0]
    : ({} as ImageType)

  const itemPrice = usePrice({
    amount: productPrice?.finalPrice.value,
    locale,
    currencyCode: defaultCurrency?.code
  })

  const discountValue = usePrice({
    amount: productPrice?.discount.amountOff,
    locale,
    currencyCode: defaultCurrency?.code
  })

  const ExclTaxFinalPrice = usePrice({
    amount: (productPrice?.finalPriceExclTax.value ?? 0) * (orderQuantity ?? 1),
    locale: locale!,
    currencyCode: defaultCurrency?.code
  })

  const total = usePrice({
    amount: (productPrice?.finalPrice.value ?? 0) * (orderQuantity ?? 1),
    locale,
    currencyCode: defaultCurrency?.code
  })

  const { image = '', placeholder = '' } = imageThumbnail

  const languageId = useMemo(
    () => locales?.find((locale) => locale.isDefault)?.id!,
    [locales]
  )

  useEffect(() => {
    if (status === ThunkStatus.FULFILLED || status === ThunkStatus.REJECTED) {
      setCurrentLoadingItem(null)
    }
  }, [status])

  const handleIncrementItem = () => {
    setCurrentLoadingItem(key)
    dispatch(
      cartChange({
        languageId,
        itemId: id!,
        storeId: storeId!,
        orderQuantity: 1,
        csrfToken: csrf?.csrfToken!,
        orderVariationOption: isEmpty(orderVariationOption)
          ? null
          : { id: orderVariationOption?.id }
      })
    ).then((data) => {
      if (data?.meta.requestStatus === ThunkStatus.REJECTED) {
        // @ts-ignore
        const message = data?.error?.message
        notify.error(message ?? 'There was an error!')
      }
    })
  }

  const handleDecrementItem = () => {
    setCurrentLoadingItem(key)
    dispatch(
      cartChange({
        languageId,
        itemId: id!,
        storeId: storeId!,
        orderQuantity: -1,
        csrfToken: csrf?.csrfToken!,
        orderVariationOption: isEmpty(orderVariationOption)
          ? null
          : { id: orderVariationOption?.id }
      })
    ).then((data) => {
      if (data?.meta.requestStatus === ThunkStatus.REJECTED) {
        // @ts-ignore
        const message = data?.error?.message
        notify.error(message ?? 'There was an error!')
      }
    })
  }

  const handleDeleteItem = () => {
    setCurrentLoadingItem(key)
    dispatch(
      removeCartItem({
        key: key!,
        storeId: storeId!,
        languageId,
        csrfToken: csrf?.csrfToken!
      })
    ).then((data) => {
      if (data?.meta.requestStatus === ThunkStatus.REJECTED) {
        // @ts-ignore
        const message = data?.error?.message
        notify.error(message ?? 'There was an error!')
      }
    })
  }

  const loading = ThunkStatus.PENDING === status && currentLoadingItem === key

  return (
    <div
      className="w-full h-auto flex justify-start items-start bg-white py-6 p-3 lg:p-70 border-b
                    border-gray-200 relative last:border-b-0"
    >
      {loading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/10 z-40 flex justify-center items-center">
          <Loader />
        </div>
      )}
      <Link
        href={{
          pathname: '/product/[slug]',
          query: { slug }
        }}
      >
        <div
          className="flex w-105px h-105px rounded-sm overflow-hidden bg-gray-200 flex-shrink-0"
          onClick={handleCloseCart}
        >
          <Image
            src={image}
            customPlaceholder={placeholder}
            width={105}
            height={105}
            className="object-cover rounded-sm"
            alt=""
          />
        </div>
      </Link>

      <div className="flex flex-col w-full pl-15px">
        <div className="flex justify-between items-center">
          <Link
            href={{
              pathname: '/product/[slug]',
              query: { slug }
            }}
          >
            <div className="line-clamp-2 text-sm lg:text-base leading-4 sm:leading-5 mb-1 text-gray-800">
              <div onClick={handleCloseCart}>{name}</div>
            </div>
          </Link>
          <div
            onClick={handleDeleteItem}
            className="px-3 text-black hover:text-red-600 self-start cursor-pointer"
          >
            <CloseIcon width={12} height={18} />
          </div>
        </div>

        <div className="flex items-center text-13px mt-3px mb-3px">
          <div>
            <span className="inline-block text-base lg:text-[19px] text-gray-900 font-semibold">
              {itemPrice}
            </span>
          </div>

          {productPrice?.discount?.amountOff && (
            <div className="flex items-center">
              <div className="bg-gray-600 h-[17px] w-[1px] mx-1"></div>
              <del className="text-base text-gray-600 text-opacity-80">
                {discountValue}
              </del>
              {productPrice?.discount?.percentOff && (
                <span className="mx-2 self-end pb-[2px] uppercase text-xs text-red-700 font-semibold">
                  {`${Math.round(productPrice?.discount?.percentOff)}%`} off
                </span>
              )}
            </div>
          )}
        </div>

        {!!orderVariationOption?.title && (
          <div className="flex items-center text-13px text-gray-700 mb-1 flex-wrap">
            <div
              className={cn(
                'rounded border shadow-badge flex justify-center items-center font-medium',
                'text-sm text-gray-800 transition duration-200 ease-in-out py-[2px] px-2 border-gray-300'
              )}
            >
              {orderVariationOption?.title}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <Counter
            value={orderQuantity ?? 1}
            onIncrement={handleIncrementItem}
            onDecrement={handleDecrementItem}
            disabled={(productQuantity ?? 0) - (orderQuantity ?? 0) <= 0}
            MinusDisabled={orderQuantity === 1}
          />
          <div className="flex flex-col items-end">
            <span className="font-semibold text-lg text-gray-900 flex-shrink-0">
              {total}
            </span>
            <span className="text-gray-800 text-xs font-medium">
              {__('Excl. tax: %s', ExclTaxFinalPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(CartItem)
