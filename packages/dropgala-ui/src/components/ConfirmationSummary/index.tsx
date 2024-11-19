import React from 'react'
import { StoreProps, selectConfig } from '@dropgala/store'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_ORDER_SUMMARY } from '@dropgala/query/graphql/client/schema/checkout.query'
import ReactHtmlParser from 'html-react-parser'
import Loader from '../ui/loader'
import Link from 'next/link'

interface Props extends StoreProps {}

const ConfirmationSummary = ({ useAppSelector }: Props) => {
  const { query } = useRouter()
  const { language, storeId } = useAppSelector(selectConfig)
  const { __ } = useTranslation(language, 'common')
  const { ref } = query

  const { data, loading, error } = useQuery(GET_ORDER_SUMMARY, {
    variables: {
      storeId,
      orderId: ref
    },
    fetchPolicy: 'network-only'
  })

  const { getOrderSummary } = data ?? {}

  console.log({ getOrderSummary })

  const customer = getOrderSummary?.customer
  const payment = getOrderSummary?.payment

  if (loading) {
    return (
      <div className="flex items-center justify-center absolute inset-0 z-10">
        <Loader />
      </div>
    )
  }

  return (
    <div className="mb-44 mx-2 relative">
      <section className="flex w-full desktop:flex-row flex-col-reverse border border-gray-300 rounded-md">
        <div className="flex-1">
          <div className="px-5 py-3 sm:mt-0 flex justify-center h-full items-start">
            <div className="max-w-[650px] w-full h-full">
              <div className="h-full">
                <div className="flex justify-center">
                  <div className="mt-6 mb-24 flex flex-col">
                    <div className="text-4xl text-black font-semibold">
                      {__('Thank you %s!', customer?.fullName)}
                    </div>
                    <div className="max-w-[800px]">
                      <div className="text-black mt-6">
                        <span>{__('Your order number:')}</span>
                        <span className="font-semibold mx-1">
                          {getOrderSummary?.orderNumber}
                        </span>
                      </div>
                      <div className="text-sm text-black mt-6">
                        {__(
                          `Your order was sent to us but is currently awaiting payment. Once we receive the payment for your order, it will be completed. If you've already provided payment details then we will process your order manually and send you an email when it's completed.`
                        )}
                      </div>
                      <div className="text-black mt-6 border-t border-gray-400 pt-6">
                        {ReactHtmlParser(payment?.data?.description ?? '')}
                      </div>
                      <div className="mt-10 w-fit">
                        <Link href={'/'}>
                          <div className="text-blue-500 underline">
                            Back to store
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Checkout items */}
        <div
          style={{ background: 'rgba(0,0,0,0.05)' }}
          className="desktop:w-[40%] xl:w-[45%] "
        >
          {/* <CheckoutItems /> */}
        </div>
      </section>
    </div>
  )
}

export default ConfirmationSummary
