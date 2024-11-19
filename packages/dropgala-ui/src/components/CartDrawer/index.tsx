import { usePrice } from '@dropgala/utils/hooks/usePrice'
import { useRouter } from 'next/router'
import React from 'react'
import Button from '../ui/Button'
import CartItem from './CartItem'
import EmptyCart from './EmptyCart'
import {
  selectCart,
  StoreProps,
  toggleCart,
  selectConfig,
  selectDrawer
} from '@dropgala/store'
import Link from '../common/Link'
import Scrollbar from '../common/Scrollbar'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import cn from 'clsx'
import dynamic from 'next/dynamic'
import { useCartTotal } from '@dropgala/utils/hooks/useCartTotal'
import CloseIcon from '@dropgala/assets/icons/close'
import Overlay from '../common/Overlay'

const LockIcon = dynamic(() => import('@dropgala/assets/icons/lock'), {
  loading: () => <></>,
  ssr: false
})

interface Props extends StoreProps {}

function CartDrawerView({ useAppDispatch, useAppSelector }: Props) {
  const router = useRouter()
  const { locale = 'en-US' } = router

  const cart = useAppSelector(selectCart)
  const { tax } = useAppSelector(selectConfig)
  const { defaultCurrency, language } = useAppSelector(selectConfig)
  const { isOpen, isCart } = useAppSelector(selectDrawer)

  const isCartOpen = isOpen && isCart

  const { __ } = useTranslation(language, 'common')

  console.log({ cart })

  const dispatch = useAppDispatch()

  const handleCloseCart = () => {
    dispatch(toggleCart())
  }

  const cartTotal = useCartTotal({ cart, taxRate: tax?.rate })

  const itemsTotalPrice = cartTotal?.totalPrice?.value
  const totalPriceExclTax = cartTotal?.totalExclTax?.value

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

  const renderContent = () => {
    if (cart?.items?.length === 0) {
      return <EmptyCart language={language} />
    }

    return (
      <>
        <div
          style={{ background: 'rgba(0,0,0,0.03)' }}
          className="w-full py-2 flex absolute justify-center top-0 z-[-1] border-b border-gray-200"
        >
          <h2 className="font-bold text-lg lg:text-xl uppercase">
            {__('My Cart')}
          </h2>
        </div>

        <Scrollbar className="cart-scrollbar flex-grow">
          {cart?.items?.map((item) => (
            <CartItem
              key={item.key}
              item={item}
              status={cart?.loadingStatus!}
              useAppSelector={useAppSelector}
              useAppDispatch={useAppDispatch}
              handleCloseCart={handleCloseCart}
            />
          ))}
        </Scrollbar>
      </>
    )
  }

  return (
    <React.Fragment>
      <Overlay isOpen={isCartOpen} onClose={handleCloseCart} />
      <div className={cn('drawer drawer-cart', { open: isCartOpen })}>
        <div>
          <button className="px-4 py-3 text-gray-800" onClick={handleCloseCart}>
            <CloseIcon width={16} height={16} />
          </button>
        </div>
        <div className="flex flex-col w-full h-full">
          <div className="flex-1 overflow-y-auto">{renderContent()}</div>
          <div className={cn('flex flex-col lg:!mb-0 !mb-12')}>
            <div
              style={{ background: 'rgba(0,0,0,0.03)' }}
              className={cn('flex flex-col p-4 lg:p-7')}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">
                  {__('Shipping')}
                </span>

                <span className="text-12px text-gray-700 uppercase">
                  {__('calculated at checkout')}
                </span>
              </div>
              <div
                style={{ background: 'rgba(0,0,0,0.05)' }}
                className="h-[1px] w-full mt-3"
              ></div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-gray-800 text-sm">
                  {__('Tax total (%s)', `${tax?.rate}%`)}:
                </span>
                <span className="text-sm text-gray-800">{totalTax}</span>
              </div>

              <div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-gray-900 font-bold text-lg">
                    {__('Subtotal')} &nbsp;
                    <span className="font-normal text-gray-700 text-13px">
                      {__('(Incl. VAT)')}
                    </span>
                  </span>
                  <span className="font-semibold text-18px text-gray-900">
                    {totalPrice}
                  </span>
                </div>
                <div className="text-right w-full text-gray-800 text-xs font-medium">
                  {__('Excl. tax: %s', totalExclTax)}
                </div>
              </div>
            </div>

            <div className="p-4 lg:p-7 !pt-0">
              {cart?.totalQuantity > 0 ? (
                <div className="w-full mb-2 mt-20px flex justify-between">
                  <Link
                    href={{
                      pathname: '/cart'
                    }}
                    passHref
                    className="w-fit"
                  >
                    <Button
                      className="whitespace-nowrap !px-3 text-[14px] !text-gray-900 hover:text-black bg-white border-2 border-gray-900 hover:border-black font-semibold rounded-sm"
                      disabled={false}
                      onClick={handleCloseCart}
                    >
                      {__('View Cart (%s)', cart?.totalQuantity)}
                    </Button>
                  </Link>
                  <Link
                    href={{
                      pathname: '/checkout'
                    }}
                    passHref
                    className="ml-3 flex-1"
                  >
                    <Button
                      className="text-white w-full flex items-center bg-gray-900 hover:bg-black font-semibold text-[14px] rounded-sm"
                      disabled={false}
                      onClick={handleCloseCart}
                    >
                      <div className="text-white mx-2 pb-[3px]">
                        <LockIcon width={16} height={16} />
                      </div>
                      <div className="leading-none">
                        {__('Secure Checkout')}
                      </div>
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button
                  className="!w-full text-white bg-black font-medium"
                  disabled={true}
                >
                  {__('View bag')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CartDrawerView
