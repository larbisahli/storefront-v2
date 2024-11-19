import { CheckoutSteps, PaymentTypes } from '@dropgala/types'
import Radio from '../ui/radio'
import Loader from '../ui/loader'
import ChevronLeft from '@dropgala/assets/icons/chevron-left'
import Button from '../ui/Button'
import ChevronRight from '@dropgala/assets/icons/chevron-right'
import Link from '../common/Link'
import { StoreProps, selectConfig } from '@dropgala/store'
import { memo, useState } from 'react'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { useRouter } from 'next/router'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import ShippingAddress from './shippingAddress'
import { useMutation } from '@apollo/client'
import { CREATE_ORDER } from '@dropgala/query/graphql/client/schema/checkout.query'
import OfflinePaymentOption from './OfflinePaymentOption'
import { notify } from '../ui/toast'

interface Props extends StoreProps {
  payments: PaymentTypes[]
}

const CheckoutPayment = ({ useAppSelector, payments }: Props) => {
  const router = useRouter()

  const { language, csrf, storeId } = useAppSelector(selectConfig)
  const { __ } = useTranslation(language, 'common')

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [tncChecked, setTncChecked] = useState(false)

  const [error, setError] = useState()

  const [createOrder, { loading }] = useMutation(CREATE_ORDER, {
    context: {
      headers: {
        'x-csrf-token': csrf?.csrfToken
      }
    },
    onCompleted: (data: { createOrder: { ref: string; success: boolean } }) => {
      const order = data.createOrder
      console.log({ order })
      if (isEmpty(order)) {
        return
      }
      router.push({
        pathname: `/checkout/${CheckoutSteps.ORDER_CONFIRMATION}`,
        query: { ref: order?.ref, status: order?.success }
      })
    }
  })

  const onSubmit = async () => {
    if (isEmpty(selectedOptionId)) {
      notify.error('Please select the payment method')
      return
    }

    createOrder({
      variables: {
        storeId,
        paymentId: selectedOptionId
      }
    }).catch((err) => {
      setError(err)
    })
  }

  const handleSelectedPaymentId = (
    changeEvent: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedOptionId(changeEvent.target.value)
  }

  const isLoading = false

  const handleTNC = (changeEvent: any) => {
    setTncChecked(changeEvent?.target.checked)
  }

  return (
    <div className="mb-10 pt-4 relative flex flex-col h-full">
      {/* INFORMATION SUMMERY */}
      <ShippingAddress useAppSelector={useAppSelector} />
      {/* LOADER */}
      {isLoading && (
        <div className="flex items-center justify-center absolute inset-0 z-10">
          <Loader />
        </div>
      )}
      {!isEmpty(payments) && (
        <div className="flex-1">
          <h1 className="text-xl mt-8 mb-4 font-light uppercase">
            {__('Payment methods')}
          </h1>
          {payments.map((payment) => (
            <Radio
              key={payment.id}
              name={payment.id}
              label={() => (
                <OfflinePaymentOption
                  selectedOptionId={selectedOptionId}
                  payment={payment}
                />
              )}
              inputClassName="absolute right-0 top-0 m-2 z-10"
              onChange={handleSelectedPaymentId}
              id={payment.id}
              value={payment.id}
              checked={selectedOptionId === payment.id}
            />
          ))}
        </div>
      )}
      <div className="mt-4">
        <div>
          <div className="flex items-center">
            <input
              id="terms"
              name={'terms'}
              type="checkbox"
              className={`checkbox`}
              checked={tncChecked}
              onClick={handleTNC}
            />
            <label
              htmlFor={'terms'}
              className="text-gray-900 text-base text-sm hover:text-blue-500"
            >
              {__('Agree to Terms & Conditions')}
              <Link
                href="/terms-and-conditions"
                target="_blank"
                className="mx-1 font-semibold text-blue-600"
              >
                - {__('read more')}
              </Link>
            </label>
          </div>
        </div>
        <div className="my-5 flex items-center justify-between flex-0">
          <Link
            href={{
              pathname: `/checkout/${CheckoutSteps.SHIPPING}`
            }}
          >
            <div className="text-gray-700 hover:text-gray-900 flex items-center">
              <div className="mr-2">
                <ChevronLeft width={12} height={12} />
              </div>
              <div>{__('Return to Shipping')}</div>
            </div>
          </Link>
          <Button
            type="submit"
            className="bg-black text-white font-semibold place-content-end capitalize text-lg w-[280px]"
            disabledClass="pointer-events-none !bg-gray-700 !text-gray-500"
            loading={loading}
            disabled={loading || !tncChecked}
            onClick={onSubmit}
          >
            <div>{__('Complete order')}</div>
            <div className="ml-2">
              <ChevronRight width={12} height={12} />
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default memo(CheckoutPayment)
