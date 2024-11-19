import { usePrice } from '@dropgala/utils/hooks/usePrice'
import cn from 'clsx'
import { useRouter } from 'next/router'
import React, { FC, memo, useEffect, useMemo, useState } from 'react'
import Counter from '../common/Counter'
import { ProductTypes, ThunkStatus } from '@dropgala/types'
import { StoreProps, selectCart, selectConfig } from '@dropgala/store'
import { CartItemType } from '@dropgala/types/product.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import Image from '../common/Image'
import Link from '../common/Link'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { useProductPrice } from '@dropgala/utils/hooks/usePriceRange'
import { cartChange, removeCartItem } from '@dropgala/store/Cart/thunks'
import { notify } from '../ui/toast'
import Loader from '../ui/loader'
import CloseIcon from '@dropgala/assets/icons/close'
import { getThumbnail } from '@dropgala/utils/helpers'

interface Props extends StoreProps {
  item: CartItemType
  disabled?: boolean
}

const CheckoutCartItem: FC<Props> = ({
  item,
  disabled = false,
  useAppDispatch,
  useAppSelector
}) => {
  const router = useRouter()
  const { locale = 'en-US' } = router

  const [currentLoadingItem, setCurrentLoadingItem] = useState<
    string | undefined | null
  >(null)

  const dispatch = useAppDispatch!()

  const { defaultCurrency, language, tax, locales, storeId, csrf } =
    useAppSelector(selectConfig)
  const cart = useAppSelector(selectCart)

  const { __ } = useTranslation(language, 'common')

  const {
    id,
    key,
    name,
    thumbnail,
    slug,
    type,
    quantity,
    price,
    orderVariationOption,
    orderQuantity
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

  const { image, placeholder } = !isEmpty(orderVariationOption?.thumbnail)
    ? getThumbnail(orderVariationOption?.thumbnail)
    : getThumbnail(thumbnail)

  const ItemPrice = usePrice({
    amount: productPrice?.finalPrice.value,
    locale: locale!,
    currencyCode: defaultCurrency?.code
  })

  const discount = usePrice({
    amount: productPrice.discount.amountOff,
    locale: locale!,
    currencyCode: defaultCurrency?.code
  })

  const total = usePrice({
    amount: productPrice?.finalPrice.value * item?.orderQuantity!,
    locale: locale!,
    currencyCode: defaultCurrency?.code
  })

  const ExclTaxFinalPrice = usePrice({
    amount: productPrice.finalPriceExclTax.value ?? 0,
    locale: locale!,
    currencyCode: defaultCurrency?.code
  })

  const languageId = useMemo(
    () => locales?.find((locale) => locale.isDefault)?.id!,
    [locales]
  )

  useEffect(() => {
    if (
      cart.loadingStatus === ThunkStatus.FULFILLED ||
      cart.loadingStatus === ThunkStatus.REJECTED
    ) {
      setCurrentLoadingItem(null)
    }
  }, [cart.loadingStatus])

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

  const loading =
    ThunkStatus.PENDING === cart.loadingStatus && currentLoadingItem === key

  return (
    <div className="w-full h-auto flex justify-start items-start bg-white py-6 px-30px border-b border-gray-200 relative last:border-b-0">
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
        passHref
      >
        <div className="event flex w-110px h-165px rounded-sm overflow-hidden bg-gray-100 flex-shrink-0">
          <div className="relative">
            <Image
              src={image}
              customPlaceholder={placeholder}
              width={110}
              height={165}
              className="object-contain rounded-sm"
            />
            <div
              className="absolute right-0 bottom-0 left-0 bg-black bg-opacity-70
               text-white text-xs text-center py-[3px] font-bold"
            >
              {disabled && <span>Sold Out</span>}
              {!disabled && <span>Almost sold out</span>}
              {/* <span>Only 2 Left bg-skin-red-rgba-6</span> */}
            </div>
          </div>
        </div>
      </Link>

      <div className="flex justify-between w-full px-15px">
        <div className="flex flex-col flex-1">
          <Link
            href={{
              pathname: '/product/[slug]',
              query: { slug }
            }}
          >
            <div
              className={cn(
                'line-clamp-2 !text-[15px] sm:text-sm lg:text-[15px] font-medium leading-4 sm:leading-5 mb-1 text-gray-900',
                {
                  'opacity-50 pointer-events-none': disabled
                }
              )}
            >
              <div>{name}</div>
            </div>
          </Link>

          <div
            className={cn(
              'flex items-center text-13px text-gray-900 mt-3px mb-3px',
              {
                'opacity-50': disabled
              }
            )}
          >
            <div className="flex flex-col">
              <div className="flex items-center">
                {!!ItemPrice && (
                  <span className="inline-block text-[18px] lg:text-[19px] font-semibold">
                    {ItemPrice}
                  </span>
                )}
                {!!productPrice.discount.amountOff && (
                  <div className="flex items-center">
                    <div className="bg-gray-400 h-[10px] w-[1px] mx-1"></div>
                    <del className="text-[13px] text-gray-600 text-opacity-80">
                      {discount}
                    </del>
                    {productPrice.discount.percentOff && (
                      <span className="mx-2 self-end pb-[2px] uppercase text-xs text-red-700 font-semibold">
                        {`${Math.round(productPrice.discount.percentOff)}%`} off
                      </span>
                    )}
                  </div>
                )}
              </div>
              <span className="text-gray-800 text-xs font-medium">
                {__('Excl. tax: %s', ExclTaxFinalPrice)}
              </span>
            </div>
          </div>
          {disabled && (
            <div className="mt-3 text-skin-red text-xs">{__('Reselect')}</div>
          )}
          <div className="flex items-center mt-2">
            <div
              className={cn({
                'opacity-50 pointer-events-none': disabled
              })}
            >
              <Counter
                value={orderQuantity ?? 1}
                onIncrement={handleIncrementItem}
                onDecrement={handleDecrementItem}
                disabled={(productQuantity ?? 0) - (orderQuantity ?? 0) <= 0}
                MinusDisabled={orderQuantity === 1}
              />
            </div>
            <button
              onClick={handleDeleteItem}
              className={cn(
                'flex justify-center items-center mx-4 bg-gray-300 py-1 px-4 rounded-full text-black hover:text-red-600 text-xs cursor-pointer pointer-events-auto opacity-none w-fit',
                { 'text-red-600 z-30': disabled }
              )}
            >
              <CloseIcon width={8} height={8} />
              <span className="pl-2">Delete</span>
            </button>
          </div>
        </div>
        <div
          className={cn('flex items-center', {
            'opacity-50': disabled
          })}
        >
          <span className="font-semibold text-16px text-gray-900 flex-shrink-0">
            {total}
          </span>
        </div>
      </div>
    </div>
  )
}

export default memo(CheckoutCartItem)
