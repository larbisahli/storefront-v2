import { StoreProps, selectConfig } from '@dropgala/store'
import { Shipping } from '@dropgala/types/generated/shipping/Shipping'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import ImageComponent from '../common/Image'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import { useRouter } from 'next/router'

interface Props {
  useAppSelector: StoreProps['useAppSelector']
  shipping: Shipping
}

enum RateTypes {
  price = 'price',
  weight = 'weight'
}

const ShippingOption = ({ useAppSelector, shipping }: Props) => {
  const router = useRouter()
  const { locale = 'en-US' } = router
  const { language, defaultCurrency } = useAppSelector(selectConfig)
  const { __ } = useTranslation(language, 'common')

  const isFixedRate =
    shipping?.rates?.length === 1 && shipping?.rateType === RateTypes.price
  const price = isFixedRate ? shipping?.rates![0]?.price ?? 0 : 0

  const total = usePrice({
    amount: Number(price),
    locale,
    currencyCode: defaultCurrency?.code
  })

  const { image, placeholder } = shipping?.logo
    ? shipping?.logo[0] ?? { image: '', placeholder: '' }
    : { image: '', placeholder: '' }

  const renderRateCalc = () => {
    if (isFixedRate) {
      return (
        <div className="flex items-center">
          <span className="text-sm text-skin-base">{__('Rate')}:</span>
          <span className="text-sm font-semibold text-skin-base px-1 line-clamp-1">{`${__(
            'Fixed'
          )} - ${total}`}</span>
        </div>
      )
    }
    if (shipping?.rates && shipping?.rates?.length > 1) {
      return (
        <div className="flex items-center">
          <span className="text-sm text-skin-base">{__('Rate')}:</span>
          <span className="text-sm font-semibold text-skin-base px-1">{`${__(
            'Table Rate'
          )}`}</span>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-gray-100 w-full sm:rounded relative shadow border border-gray-300">
      <div className="p-3 flex items-start">
        {!isEmpty(shipping?.logo) && (
          <div className="w-[65px] h-[65px]">
            <ImageComponent
              src={image!}
              customPlaceholder={placeholder!}
              width={65}
              height={65}
              quality={90}
              className="rounded"
              objectFit="cover"
            />
          </div>
        )}
        <div className="px-2 h-[65px]">
          <div className="flex items-center">
            <span className="text-base font-normal text-skin-base">
              {__('Carrier method')}:
            </span>
            <span className="text-base font-semibold text-skin-base px-1 line-clamp-1">
              {shipping?.name}
            </span>
          </div>
          {renderRateCalc()}
          <div className="text-sm text-skin-base">
            {__(
              'Estimated days: %s',
              `${shipping?.deliveryTime?.min}-${shipping?.deliveryTime?.max} ${shipping?.deliveryTime?.unit?.unit}`
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingOption
