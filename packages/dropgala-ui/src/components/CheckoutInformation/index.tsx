import { CheckoutFormValues, CheckoutSteps, ThunkStatus } from '@dropgala/types'
import Checkbox from '../ui/checkbox'
import Input from '../ui/Input'
import Label from '../ui/label'
import SelectInput from '../ui/selectInput'
import { useRouter } from 'next/router'
import { memo, useEffect, useState } from 'react'
import Link from '../common/Link'
import Button from '../ui/Button'
import Loader from '../ui/loader'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { checkoutValidationSchema } from './checkout-validation-schema'
import { StoreProps, selectCheckout, selectConfig } from '@dropgala/store'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import ChevronLeft from '@dropgala/assets/icons/chevron-left'
import ChevronRight from '@dropgala/assets/icons/chevron-right'
import { updateCheckoutInformation } from '@dropgala/store/Checkout/thunks'
import { notify } from '../ui/toast'

interface Props extends StoreProps {}

const CheckoutInformation = ({ useAppSelector, useAppDispatch }: Props) => {
  const router = useRouter()

  const { language, csrf, storeId } = useAppSelector(selectConfig)
  const checkout = useAppSelector(selectCheckout)
  const dispatch = useAppDispatch()

  const { __ } = useTranslation(language, 'common')

  const defaultValues = checkout.shippingAddress
  const isLoading = checkout.loadingStatus === ThunkStatus.PENDING

  const [error, setError] = useState()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<CheckoutFormValues>({
    defaultValues,
    resolver: yupResolver(checkoutValidationSchema)
  })

  const [countries, setCountries] = useState<any>([])

  // Get Countries
  useEffect(() => {
    async function getCountries() {
      const { Countries } = await import('@dropgala/utils/countries')
      setCountries(Countries)
    }
    getCountries()
  }, [])

  console.log('errors =====>', errors)

  const onSubmit = async (values: CheckoutFormValues) => {
    dispatch(
      updateCheckoutInformation({
        ...values,
        storeId: storeId!,
        csrfToken: csrf?.csrfToken!,
        country: {
          iso2: values.country.iso2,
          name: values.country.name,
          region: values.country.region,
          subregion: values.country.subregion,
          phoneCode: values.country.phoneCode,
          currency: values.country.currency
        }
      })
    ).then((data) => {
      console.log('updateCheckoutInformation ===>', { data })
      if (data?.meta.requestStatus === ThunkStatus.REJECTED) {
        // @ts-ignore
        const message = data?.error?.message
        console.log({ message })
        notify.error(message ?? 'There was an error!')
        return
      }
      router.push(`/checkout/${CheckoutSteps.SHIPPING}`)
    })
  }

  return (
    <form
      className="relative min-h-[400px] sm:min-w-[500px] min-w-[300px] xs:min-w-[400px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* LOADER */}
      {isLoading && (
        <div className="flex items-center justify-center absolute inset-0 z-10">
          <Loader />
        </div>
      )}
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="py-5">
          <div className="">
            <div className="text-lg font-light mb-4 uppercase">
              {__('Contact information')}
            </div>
            <div className="mb-4">
              <Input
                isRequiredLabel
                placeholder={__('Email')}
                label={__('Email')}
                {...register('email')}
                type="email"
                error={errors.email?.message!}
                variant="outline"
                className="mb-6"
              />
              <Checkbox
                {...register('marketingOptIn')}
                label={__('Email me with news and offers')}
              />
            </div>
            <div className="text-lg mb-4 mt-8 font-light uppercase">
              {__('Shipping address')}
            </div>
            <div className="flex flex-wrap items-center justify-between">
              <div className="w-full">
                <Input
                  isRequiredLabel
                  placeholder={__('Full name')}
                  label={__('Full name')}
                  {...register('fullName')}
                  variant="outline"
                  className="mb-6"
                  error={errors.fullName?.message}
                />
              </div>
            </div>

            <div className="mb-6">
              <Label isRequiredLabel>{__('Country')}</Label>
              <SelectInput
                name="country"
                control={control}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.name}
                options={countries}
              />
              {errors.country?.message! && (
                <p className="my-2 text-xs text-start text-red-500">
                  {errors.country?.message!}
                </p>
              )}
            </div>

            <div className="col-span-6">
              <Input
                isRequiredLabel
                placeholder=""
                label={__('Address')}
                {...register('address')}
                error={errors.address?.message!}
                variant="outline"
                className="mb-6"
              />
            </div>
            <div className="flex items-center flex-wrap">
              <div className="sm:flex-1 flex-0 mb-6 sm:mb-0 sm:w-fit w-full">
                <Input
                  placeholder=""
                  isRequiredLabel
                  label={__('City')}
                  {...register('city')}
                  error={errors.city?.message!}
                  variant="outline"
                />
              </div>

              <div className="sm:flex-1 flex-0 mb-6 sm:mb-0 mx-0 sm:mx-2 sm:w-fit w-full">
                <Input
                  placeholder=""
                  label={__('State / Province')}
                  {...register('state')}
                  error={errors.state?.message!}
                  variant="outline"
                />
              </div>

              <div className="sm:flex-1 flex-0 sm:w-fit w-full">
                <Input
                  placeholder=""
                  label={__('ZIP / Postal code')}
                  {...register('zip')}
                  error={errors.zip?.message}
                  variant="outline"
                />
              </div>
            </div>
            <div className="mt-5">
              <Input
                placeholder=""
                label={__('Phone')}
                {...register('phone')}
                error={errors.phone?.message!}
                variant="outline"
                className="mb-6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 flex items-center justify-between">
        <Link
          href={{
            pathname: '/cart'
          }}
        >
          <div className="text-gray-700 hover:text-gray-900 flex items-center">
            <div className="mr-2">
              <ChevronLeft width={12} height={12} />
            </div>
            <div>{__('Return to Cart')}</div>
          </div>
        </Link>
        <Button
          type="submit"
          className="bg-black text-white font-semibold place-content-end capitalize text-lg min-w-[280px]"
          disabledClass="pointer-events-none"
          loading={isLoading}
          disabled={isLoading}
        >
          <div>{__('Continue to shipping')}</div>
          <div className="ml-2">
            <ChevronRight width={12} height={12} />
          </div>
        </Button>
      </div>
    </form>
  )
}

export default memo(CheckoutInformation)
