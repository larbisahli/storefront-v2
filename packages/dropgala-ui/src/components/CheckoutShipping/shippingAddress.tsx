import { StoreProps, selectCheckout, selectConfig } from '@dropgala/store'
import { CheckoutSteps } from '@dropgala/types'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import Link from '../common/Link'

interface Props {
  useAppSelector: StoreProps['useAppSelector']
}

const ShippingAddress = ({ useAppSelector }: Props) => {
  const { language } = useAppSelector(selectConfig)
  const checkout = useAppSelector(selectCheckout)

  const shippingAddress = checkout?.shippingAddress

  const { __ } = useTranslation(language, 'common')

  if (isEmpty(shippingAddress)) return null

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-light uppercase">{__('Shipping to')}</h1>
        <Link
          href={{
            pathname: `/checkout/${CheckoutSteps.INFORMATION}`
          }}
        >
          <div className="underline text-md flex-0 text-gray-700">
            {__('Change')}
          </div>
        </Link>
      </div>
      <div className="border border-gray-400 rounded-sm">
        <div className="flex-1">
          <div className="flex items-center p-2 py-1">
            <span className="capitalized font-semibold flex-0">
              {__('Full name')}
            </span>
            <div className="flex-1 w-full flex justify-end">
              <span className="w-[250px] text-sm">
                {shippingAddress?.fullName}
              </span>
            </div>
          </div>
          <div className="flex items-center bg-gray-200 p-2 py-1">
            <span className="capitalized font-semibold flex-0">
              {__('Phone Number')}
            </span>
            <div className="flex-1 w-full flex justify-end">
              <span className="w-[250px] text-sm">
                {shippingAddress?.phone}
              </span>
            </div>
          </div>
          <div className="flex items-center p-2 py-1">
            <span className="capitalized font-semibold flex-0">
              {__('Address')}
            </span>
            <div className="flex-1 w-full flex justify-end">
              <span className="w-[250px] text-sm">
                {shippingAddress?.address}
              </span>
            </div>
          </div>
          <div className="flex items-center bg-gray-200 p-2 py-1">
            <span className="capitalized font-semibold flex-0">
              {__('Country')}
            </span>
            <div className="flex-1 w-full flex justify-end">
              <span className="w-[250px] text-sm">
                {shippingAddress?.country?.name}
              </span>
            </div>
          </div>
          <div className="flex items-center p-2 py-1">
            <span className="capitalized font-semibold flex-0">
              {__('City')}
            </span>
            <div className="flex-1 w-full flex justify-end">
              <span className="w-[250px] text-sm">{shippingAddress?.city}</span>
            </div>
          </div>
          <div className="flex items-center bg-gray-200 p-2 py-1">
            <span className="capitalized font-semibold flex-0">
              {__('State/Province/Region')}
            </span>
            <div className="flex-1 w-full flex justify-end">
              <span className="w-[250px] text-sm">
                {isEmpty(shippingAddress?.state)
                  ? 'N/A'
                  : shippingAddress?.state}
              </span>
            </div>
          </div>
          <div className="flex items-center p-2 py-1">
            <span className="capitalized font-semibold flex-0">
              {__('Zip/Postal Code')}
            </span>
            <div className="flex-1 w-full flex justify-end">
              <span className="w-[250px] text-sm">
                {isEmpty(shippingAddress?.zip) ? 'N/A' : shippingAddress?.zip}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingAddress
