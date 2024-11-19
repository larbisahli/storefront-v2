import ChevronRight from '@dropgala/assets/icons/chevron-right'
import cn from 'clsx'
import Link from '../common/Link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { CheckoutSteps } from '@dropgala/types'

const steps = [
  {
    name: 'Shopping Bag',
    activePath: '/cart'
  },
  {
    name: 'Information',
    activePath: `/checkout/${CheckoutSteps.INFORMATION}`
  },
  {
    name: 'Shipping',
    activePath: `/checkout/${CheckoutSteps.SHIPPING}`
  },
  {
    name: 'Payment',
    activePath: `/checkout/${CheckoutSteps.PAYMENT}`
  }
]

const CheckoutBreadcrumb = () => {
  const router = useRouter()
  const { pathname } = router

  const BreadCrumbs = (value: { name: string; activePath: string }) => {
    const pathIdxLocation = steps?.map((i) => i.activePath)?.indexOf(pathname)
    const CurrentIdxLocation = steps
      ?.map((i) => i.activePath)
      ?.indexOf(value.activePath)
    if (CurrentIdxLocation >= pathIdxLocation) {
      return (
        <div
          className={cn('text-gray-600 mb-1 font-medium', {
            '!text-black': value.activePath === pathname
          })}
        >
          {value.name}
        </div>
      )
    }

    return (
      <Link href={value.activePath!}>
        <div
          className={cn('text-gray-600 mb-1 font-medium', {
            '!text-black': value.activePath === pathname
          })}
        >
          {value.name}
        </div>
      </Link>
    )
  }

  return (
    <div className="bg-white pb-5 flex items-center md:text-base text-xs flex-wrap justify-center">
      {steps?.map((value, index) => {
        return (
          <Fragment key={value.name}>
            {BreadCrumbs(value)}
            {index + 1 !== steps.length && (
              <div className="text-gray-900 text-opacity-40 text-15px px-[9px] mb-1 mx-1">
                <ChevronRight width={13} height={14} />
              </div>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

export default CheckoutBreadcrumb
