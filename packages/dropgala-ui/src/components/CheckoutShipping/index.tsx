import { useRouter } from 'next/router'
import Scrollbar from '../common/Scrollbar'
import Radio from '../ui/radio'
import { StoreProps, selectCheckout, selectConfig } from '@dropgala/store'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { memo, useState } from 'react'
import ChevronLeft from '@dropgala/assets/icons/chevron-left'
import Link from '../common/Link'
import Button from '../ui/Button'
import ChevronRight from '@dropgala/assets/icons/chevron-right'
import Loader from '../ui/loader'
import ShippingOption from './shippingOption'
import { CheckoutSteps, ThunkStatus } from '@dropgala/types'
import type { Shipping } from '@dropgala/types/generated/shipping/Shipping'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import ShippingAddress from './shippingAddress'
import { notify } from '../ui/toast'
import { updateCheckoutShipping } from '@dropgala/store/Checkout/thunks'

interface Props extends StoreProps {
  shippings: Shipping[]
}

const CheckoutShipping = ({
  useAppSelector,
  useAppDispatch,
  shippings
}: Props) => {
  const router = useRouter()

  const { language, csrf } = useAppSelector(selectConfig)
  const checkout = useAppSelector(selectCheckout)
  const dispatch = useAppDispatch()

  const shipment = checkout?.shipment

  const { __ } = useTranslation(language, 'common')

  const [selectedOption, setSelectedOption] = useState(shipment?.id ?? '')
  const [error, setError] = useState()

  const isLoading = checkout.loadingStatus === ThunkStatus.PENDING

  const onSubmit = async () => {
    if (!selectedOption) {
      notify.warn('Please select a shipping method!')
      return
    }

    dispatch(
      updateCheckoutShipping({
        id: Number(selectedOption),
        csrfToken: csrf?.csrfToken!
      })
    ).then((data) => {
      if (data?.meta.requestStatus === ThunkStatus.REJECTED) {
        // @ts-ignore
        const message = data?.error?.message
        console.log({ message })
        notify.error(message ?? 'There was an error!')
        return
      }
      router.push(`/checkout/${CheckoutSteps.PAYMENT}`)
    })
  }

  const handleOptionChange = (
    changeEvent: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedOption(changeEvent.target.value)
  }

  if (isEmpty(checkout?.cartId)) {
    return null
  }

  return (
    <div className="mb-10 pt-4 relative flex flex-col h-full w-full">
      {/* INFORMATION SUMMERY */}
      <ShippingAddress useAppSelector={useAppSelector} />
      {/* LOADER */}
      {isLoading && (
        <div className="flex items-center justify-center absolute inset-0 z-10">
          <Loader />
        </div>
      )}
      <div className="flex-1">
        <h1 className="my-8 text-xl mb-4 mt-8 font-light uppercase">
          {__('Delivery options')}
        </h1>
        <Scrollbar className="cart-scrollbar flex-grow w-full">
          {shippings?.map((shipping) => {
            const id = shipping?.id?.toString()!
            return (
              <Radio
                id={id}
                key={id}
                name={id}
                value={id}
                checked={selectedOption?.toString() === id}
                onChange={handleOptionChange}
                label={() => (
                  <ShippingOption
                    useAppSelector={useAppSelector}
                    shipping={shipping}
                  />
                )}
                inputClassName="absolute right-0 top-0 m-2 z-10"
                className="mt-3"
              />
            )
          })}
        </Scrollbar>
      </div>
      <div className="my-5 flex items-center justify-between">
        <Link
          href={{
            pathname: `/checkout/${CheckoutSteps.INFORMATION}`
          }}
        >
          <div className="text-gray-700 hover:text-gray-900 flex items-center">
            <div className="mr-2">
              <ChevronLeft width={12} height={12} />
            </div>
            <div>{__('Return to Information')}</div>
          </div>
        </Link>
        <Button
          type="submit"
          className="bg-black text-white font-semibold place-content-end capitalize text-lg w-[280px]"
          disabledClass="pointer-events-none"
          loading={isLoading}
          disabled={isLoading}
          onClick={onSubmit}
        >
          <div>{__('Continue to Payment')}</div>
          <div className="ml-2">
            <ChevronRight width={12} height={12} />
          </div>
        </Button>
      </div>
    </div>
  )
}

export default memo(CheckoutShipping)
