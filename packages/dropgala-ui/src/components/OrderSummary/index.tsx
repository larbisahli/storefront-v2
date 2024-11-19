import { useRouter } from 'next/router'
import Button from '../ui/Button'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import { FC, useState } from 'react'
import { StoreProps, selectCart, selectConfig } from '@dropgala/store'
import Image from '../common/Image'
import Link from '../common/Link'
import dynamic from 'next/dynamic'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { useCartTotal } from '@dropgala/utils/hooks/useCartTotal'
import Input from '../ui/Input1'
import { useMutation } from '@apollo/client'
import { APPLY_COUPON } from '@dropgala/query/graphql/client/schema/coupon.query'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import CouponIcon from '@dropgala/assets/icons/coupon-icon'
import CloseIcon from '@dropgala/assets/icons/close'
import { CouponDiscountType, CouponType } from '@dropgala/types'
import { roundTo3 } from '@dropgala/utils/utils'
import { notify } from '../ui/toast'

const LockIcon = dynamic(() => import('@dropgala/assets/icons/lock'), {
  loading: () => <></>,
  ssr: false
})

const payment = [
  {
    id: 1,
    path: '/',
    image: '/assets/images/payment/mastercard.svg',
    name: 'payment-master-card',
    width: 34,
    height: 20
  },
  {
    id: 2,
    path: '/',
    image: '/assets/images/payment/visa.svg',
    name: 'payment-visa',
    width: 50,
    height: 20
  },
  {
    id: 3,
    path: '/',
    image: '/assets/images/payment/stripe.svg',
    name: 'payment-stripe',
    width: 60,
    height: 40
  },
  {
    id: 4,
    path: '/',
    image: '/assets/images/payment/jcb.svg',
    name: 'payment-jcb',
    width: 26,
    height: 20
  }
]

interface Props extends StoreProps {}

const OrderSummary: FC<Props> = ({ useAppSelector }) => {
  const router = useRouter()
  const cart = useAppSelector!(selectCart)
  const { defaultCurrency, language, tax, csrf, storeId } =
    useAppSelector(selectConfig)
  const { __ } = useTranslation(language, 'common')
  const { locale = 'en-US' } = router

  const [couponCode, setCouponCode] = useState(null)
  const [coupon, setCoupon] = useState<CouponType | null>(null)

  const cartTotal = useCartTotal({ cart, taxRate: tax?.rate })

  const [applyCoupon, { loading }] = useMutation(APPLY_COUPON, {
    context: {
      headers: {
        'x-csrf-token': csrf?.csrfToken
      }
    },
    onCompleted: (data: any) => {
      const coupon = data.applyCoupon
      if (isEmpty(coupon.code)) {
        notify.error(`Can't apply coupon`)
        return
      }
      setCoupon(coupon)
      notify.success(`Coupon ${coupon.code} applied successfully.`)
    }
  })

  let itemsTotalPrice = cartTotal?.totalPrice?.value
  let totalPriceExclTax = cartTotal?.totalExclTax?.value
  const discountValue = coupon?.discountValue ?? 0
  let calcDiscountValue = 0

  if (coupon?.discountType === CouponDiscountType.Fixed) {
    calcDiscountValue = coupon?.discountValue ?? 0
  } else if (coupon?.discountType === CouponDiscountType.Percentage) {
    calcDiscountValue = roundTo3(
      Number(totalPriceExclTax) * (Number(coupon?.discountValue) / 100)
    )
  }
  if (coupon?.discountType === CouponDiscountType.Fixed) {
    itemsTotalPrice -= discountValue
    totalPriceExclTax -= discountValue
  } else if (coupon?.discountType === CouponDiscountType.Percentage) {
    const value = roundTo3(
      Number(totalPriceExclTax) * (Number(discountValue) / 100)
    )
    itemsTotalPrice -= value
    totalPriceExclTax -= value
  }

  const finalDiscountPrice = usePrice({
    amount: calcDiscountValue,
    locale,
    currencyCode: defaultCurrency?.code
  })

  const totalPrice = usePrice({
    amount: itemsTotalPrice,
    locale,
    currencyCode: defaultCurrency?.code
  })

  const totalExclTax = usePrice({
    amount: totalPriceExclTax,
    locale,
    currencyCode: defaultCurrency?.code
  })

  const totalTax = usePrice({
    amount: itemsTotalPrice - totalPriceExclTax,
    locale,
    currencyCode: defaultCurrency?.code
  })

  const handleCoupon = () => {
    if (isEmpty(couponCode)) return
    applyCoupon({
      variables: {
        code: couponCode,
        storeId
      }
    }).catch((err) => {
      console.log({ err })
      notify.error(err?.message ?? 'Something happened!')
      // setError(err);
    })
  }

  const renderCoupon = () => {
    return (
      <div>
        <div className="font-medium">{__('Have a discount code?')}</div>
        <div className="flex items-center">
          <Input
            className="w-full mr-3"
            inputClassName="placeholder-gray-500 border border-solid border-gray-400"
            placeholder="Discount code"
            value={couponCode}
            disabled={!isEmpty(coupon)}
            onChange={(e: { target: { value: React.SetStateAction<null> } }) =>
              setCouponCode(e.target.value)
            }
          />
          <Button
            onClick={handleCoupon}
            loading={loading}
            disabled={!isEmpty(coupon)}
            className="bg-black text-white h-10 px-5 capitalize"
          >
            {__('Apply')}
          </Button>
        </div>
        {/* COUPON */}
        {coupon?.code && (
          <div
            style={{ color: '#6d6c6c' }}
            className="flex items-center bg-gray-400 w-fit px-2 py-1 my-3 shadow-card"
          >
            <div>
              <CouponIcon width={14} height={14} />
            </div>
            <div className="p-1 lg:max-w-[200px] text-gray-800 overflow-hidden">
              {coupon?.code}
            </div>
            <button className="m-1" onClick={() => setCoupon(null)}>
              <CloseIcon width={10} height={10} />
            </button>
          </div>
        )}
      </div>
    )
  }

  const renderDiscount = () => {
    if (isEmpty(coupon)) return null
    if (coupon?.discountType === CouponDiscountType.FreeShipping) {
      return (
        <div className="flex justify-between mt-2">
          <span className="text-gray-900 text-sm">{__('Discount')}</span>
          <div className="flex flex-col items-end">
            <span className="font-semibold text-base text-gray-800">
              {__('FREE SHIPPING')}
            </span>
          </div>
        </div>
      )
    }
    return (
      <div className="mt-2 flex items-center justify-between">
        <span className="text-gray-900 text-sm">
          {coupon?.discountType === CouponDiscountType.Percentage
            ? __('Discount (%s)', `${coupon.discountValue}%`)
            : __('Discount')}
        </span>
        <div className="flex flex-col items-end">
          <span className="font-semibold text-base text-gray-900">
            {`-${finalDiscountPrice}`}
          </span>
        </div>
      </div>
    )
  }

  const renderTaxTotal = () => {
    return (
      <div className="mt-3 flex items-center justify-between">
        <span className="text-gray-800 text-sm">
          {__('Tax total (%s)', `${tax?.rate}%`)}
        </span>
        <span className="text-sm text-gray-800">{totalTax}</span>
      </div>
    )
  }

  const renderTotal = () => {
    return (
      <div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-gray-900 font-bold text-lg">
            {__('Subtotal')} &nbsp;
            <span className="font-normal text-gray-700 text-13px">
              {__('(Incl. VAT)')}
            </span>
          </span>
          <span className="font-semibold text-xl text-gray-900">
            {totalPrice}
          </span>
        </div>
        <div className="text-right w-full text-gray-800 text-xs font-medium">
          {__('Excl. tax: %s', totalExclTax)}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full mt-5 relative last:border-b-0 px-4">
      <div className="sticky top-0">
        <div className="bg-white p-2 px-5 pt-5 rounded border border-gray-300">
          <h4 className="text-lg text-black font-semibold">
            {__('Order Summary')}
          </h4>
          {renderTaxTotal()}
          {renderDiscount()}
          {renderTotal()}
          <div>
            <Link
              href={{
                pathname: '/checkout'
              }}
            >
              <div className="w-full mt-20px flex justify-center">
                <Button className="!w-full flex items-center text-white bg-black !font-bold text-xl !rounded-[2px]">
                  <div className="text-white mx-2">
                    <LockIcon width={18} height={18} />
                  </div>
                  <div className="lowercase leading-none first-letter:uppercase">
                    {__('Checkout securely now')}
                  </div>
                </Button>
              </div>
            </Link>
          </div>
          <div className="py-5">{renderCoupon()}</div>
        </div>
        <div className="mt-8">
          <span className="text-black text-lg font-semibold">
            {__('We Accept')}
          </span>
          {payment && (
            <ul className="flex flex-wrap space-s-4 sm:space-s-5 lg:space-s-7 -mb-1.5 md:mb-0 mx-auto md:mx-0 pt-3.5 md:pt-0">
              {payment?.map((item) => (
                <li
                  className="mb-2 md:mb-0 transition hover:opacity-80 inline-flex mr-3"
                  key={`payment-list--key${item.id}`}
                >
                  <a
                    href={item.path ? item.path : '/#'}
                    target="_blank"
                    className="inline-flex"
                    rel="noreferrer"
                  >
                    <Image
                      isCustomUrl
                      src={item.image}
                      alt={''}
                      height={item.height}
                      width={item.width}
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
