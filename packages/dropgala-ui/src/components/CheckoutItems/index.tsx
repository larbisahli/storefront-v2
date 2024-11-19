import ArrowDownIcon from '@dropgala/assets/icons/arrow-down'
import ArrowUpIcon from '@dropgala/assets/icons/arrow-up'
import CardIcon from '@dropgala/assets/icons/card'
// import { ProductItemLoader } from '@components/ui/loaders/product-details-loaders';
import { useMedia } from '../../hooks/useMedia'
import cn from 'clsx'
import { useRouter } from 'next/router'
import React, { memo, useEffect, useState } from 'react'
import CheckoutItem from './CheckoutItem'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import { StoreProps, selectCheckout, selectConfig } from '@dropgala/store'
import EditIcon from '@dropgala/assets/icons/edit'
import Link from '../common/Link'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { CouponDiscountType } from '@dropgala/types'

interface Props extends StoreProps {}

const CheckoutItems = ({ useAppSelector, useAppDispatch }: Props) => {
  const router = useRouter()
  const { locale = 'en-US' } = router

  const { defaultCurrency, tax, language, csrf, storeId } =
    useAppSelector(selectConfig)
  const checkout = useAppSelector(selectCheckout)

  const [open, setOpen] = useState(false)

  const { __ } = useTranslation(language, 'common')

  console.log({ checkout })

  const shipment = checkout?.shipment
  const appliedCoupon = checkout?.appliedCoupon
  const summary = checkout?.summary
  const cart = checkout?.cart
  const itemsCount = cart?.totalQuantity

  const grandTotalInclTax = usePrice({
    amount: summary?.grandTotalInclTax?.value,
    locale,
    currencyCode: defaultCurrency?.code
  })
  const grandTotalExclTax = usePrice({
    amount: summary?.grandTotalExclTax?.value,
    locale,
    currencyCode: defaultCurrency?.code
  })
  const subtotalInclTax = usePrice({
    amount: summary?.subtotalInclTax?.value,
    locale,
    currencyCode: defaultCurrency?.code
  })
  const subtotalExclTax = usePrice({
    amount: summary?.subtotalExclTax?.value,
    locale,
    currencyCode: defaultCurrency?.code
  })
  const totalDiscount = usePrice({
    amount: summary?.totalDiscount?.value,
    locale,
    currencyCode: defaultCurrency?.code
  })
  const totalShippingInclTax = usePrice({
    amount: summary?.totalShippingInclTax?.value,
    locale,
    currencyCode: defaultCurrency?.code
  })
  const totalShippingExclTax = usePrice({
    amount: summary?.totalShippingExclTax?.value,
    locale,
    currencyCode: defaultCurrency?.code
  })
  // ===== TAX =====
  const totalTax = usePrice({
    amount: summary?.subtotalInclTax?.value - summary?.subtotalExclTax?.value,
    locale,
    currencyCode: defaultCurrency?.code
  })

  const isMobile = useMedia('(max-width: 1023px)', false)

  useEffect(() => {
    if (isMobile) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [isMobile])

  const renderSubTotal = () => {
    return (
      <div className="mt-3 flex items-center justify-between mb-3">
        <span className="text-gray-900 text-sm">
          {__('Subtotal')} &nbsp;
          <span className="font-normal text-gray-700 text-13px">
            {__('(Incl. VAT)')}
          </span>
        </span>
        <div className="flex flex-col items-end">
          <span className="text-base text-gray-900">{subtotalInclTax}</span>
          <div className="text-right w-full text-gray-900 text-xs font-medium">
            {__('Excl. tax: %s', subtotalExclTax)}
          </div>
        </div>
      </div>
    )
  }

  const renderTaxTotal = () => {
    return (
      <div className="mt-3 flex items-center justify-between">
        <span className="text-gray-900 text-sm">
          {__('Tax (%s)', `${tax?.rate}%`)}
        </span>
        <span className="text-sm text-base text-black">{totalTax}</span>
      </div>
    )
  }

  const renderDiscount = () => {
    if (!appliedCoupon?.code) return null
    if (appliedCoupon?.discountType === CouponDiscountType.FreeShipping) {
      return (
        <div className="mt-3 flex items-center justify-between">
          <span className="text-gray-900 text-sm">{__('Discount')}</span>
          <div className="flex flex-col items-end">
            <span className="text-sm text-base text-gray-900">
              {__('FREE SHIPPING')}
            </span>
          </div>
        </div>
      )
    }
    return (
      <div className="mt-3 flex items-center justify-between">
        <span className="text-gray-900 text-sm">
          {appliedCoupon?.discountType === CouponDiscountType.Percentage
            ? __('Discount (%s)', `${appliedCoupon.discountValue}%`)
            : __('Discount')}
        </span>
        <div className="flex flex-col items-end">
          <span className="text-sm text-base text-black">
            {`-${totalDiscount}`}
          </span>
        </div>
      </div>
    )
  }

  const renderTotal = () => {
    return (
      <div className="flex items-center justify-between">
        <span className="text-black font-bold text-lg">{__('Total')}</span>
        <div className="flex items-end flex-col">
          <span className="text-black font-bold text-xl">
            {grandTotalInclTax}
          </span>
          <div className="text-right w-full text-gray-800 text-xs font-medium">
            {__('Excl. tax: %s', grandTotalExclTax)}
          </div>
        </div>
      </div>
    )
  }

  const renderShipment = () => {
    const name = shipment?.name
    console.log({ appliedCoupon })

    if (
      appliedCoupon?.discountType === CouponDiscountType.FreeShipping ||
      shipment?.freeShipping
    ) {
      return (
        <div className="flex justify-between">
          <span className="text-gray-900 text-sm">
            {__('Shipping (%s)', name)}
          </span>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-900">
              {appliedCoupon?.discountType ===
                CouponDiscountType.FreeShipping || shipment?.freeShipping
                ? __('FREE SHIPPING')
                : `-${totalDiscount}`}
            </span>
          </div>
        </div>
      )
    }
    return (
      <div className="flex justify-between">
        <span className="text-gray-900 text-sm">
          {name ? __('Shipping (%s)', name) : __('Shipping')}
        </span>
        <div className="flex items-end flex-col">
          {summary?.totalShippingInclTax?.value ? (
            <>
              <span className="text-black text-base">
                {totalShippingInclTax}
              </span>
              <div className="text-right w-full text-gray-800 text-xs font-medium">
                {__('Excl. tax: %s', totalShippingExclTax)}
              </div>
            </>
          ) : (
            <span className="font-thin text-black text-sm">
              {__('Calculated at next step')}
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="2xxl:max-w-[550px] mx-auto">
      <div
        className={cn('w-full text-ted-500', {
          hidden: !isMobile
        })}
      >
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-between p-3 w-full"
        >
          <div className="flex items-center">
            <CardIcon width={14} height={14} />
            <div className="p-1">{__('Show order summary')}</div>
            {open ? (
              <ArrowUpIcon width={14} height={14} />
            ) : (
              <ArrowDownIcon width={14} height={14} />
            )}
          </div>
          <div className="flex items-end flex-col">
            <span className="text-black font-bold text-lg">
              {grandTotalInclTax}
            </span>
            <div className="text-right w-full text-gray-800 text-xs font-medium">
              {__('Excl. tax: %s', grandTotalExclTax)}
            </div>
          </div>
        </button>
      </div>

      <div
        className={cn(
          'py-4 px-2 lg:rounded-r-md rounded-none border border-b-gray-400 lg:border-b-transparent border-l-transparent',
          { hidden: !open }
        )}
      >
        <div className="flex items-center justify-between mb-20px border-b  pb-1 border-b-gray-400">
          <h4 className="text-lg text-black font-semibold">
            {`Order Summary (${itemsCount})`}
          </h4>
          <div className="flex justify-center items-center">
            <div className="text-gray-700">
              <EditIcon />
            </div>
            <Link href="/cart">
              {' '}
              <span className="underline text-sm px-1 font-medium">
                {__('Edit shopping cart')}
              </span>
            </Link>
          </div>
        </div>
        <div className="relative">
          {/* Cart Items */}
          {cart?.items?.map((item) => (
            <CheckoutItem
              item={item}
              key={item.key || item.id}
              useAppSelector={useAppSelector}
            />
          ))}
        </div>
        <div className="h-[1px] w-full bg-gray-400 mb-5"></div>
        <div className="px-3">
          {renderSubTotal()}
          {renderShipment()}
          {renderDiscount()}
          {renderTaxTotal()}
        </div>
        <div className="h-[1px] w-full bg-gray-400 my-5"></div>
        <div className="px-3">{renderTotal()}</div>
      </div>
    </div>
  )
}

export default memo(CheckoutItems)
