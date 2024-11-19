import { StoreProps, selectConfig } from '@dropgala/store'
import BrowserDatabase, {
  ONE_MONTH_IN_SECONDS
} from '@dropgala/utils/BrowserDatabase'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import Link from '../common/Link'
import { useEffect, useState } from 'react'
import cn from 'clsx'
import { localStorageKeyNames } from '@dropgala/types'

const CookiePopup = ({ useAppSelector, data }: StoreProps) => {
  const { cookieLink = '', cookieText = '' } = data
  const { language, alias, device } = useAppSelector(selectConfig)

  const { __ } = useTranslation(language, 'common')

  const [isAccepted, setIsAccepted] = useState(true)

  useEffect(() => {
    setIsAccepted(getAcceptCookieValue())
  }, [])

  const getAcceptCookieValue = () => {
    const param = `${localStorageKeyNames.COOKIE_POPUP}_${alias}`
    return !!BrowserDatabase.getItem(param)
  }

  const acceptCookies = () => {
    const param =
      `${localStorageKeyNames.COOKIE_POPUP}_${alias}` as unknown as localStorageKeyNames
    BrowserDatabase.setItem(true, param, ONE_MONTH_IN_SECONDS)
    setIsAccepted(true)
  }

  const renderCookieLink = () => {
    if (!cookieLink) {
      return null
    }
    return (
      <Link href={cookieLink} className=" pl-1 underline">
        {__('Cookies page')}
      </Link>
    )
  }

  const renderCookieText = () => {
    return (
      <p className="text-black text-center text-base mr-2">
        {__(cookieText)}
        {renderCookieLink()}
        {'.'}
      </p>
    )
  }

  const renderCTA = () => {
    return (
      <div
        onClick={acceptCookies}
        onKeyDown={acceptCookies}
        role="button"
        tabIndex={0}
        className="text-white bg-black py-3 px-6 text-base font-bold uppercase"
      >
        {__('ACCEPT COOKIES')}
      </div>
    )
  }

  if (!cookieText || isAccepted) {
    return null
  }

  return (
    <div
      className={cn(
        'flex flex-col shadow-cart items-center p-4 rounded-sm w-[90%] desktop:w-[400px] justify-center fixed bottom-8 desktop:bottom-0 bg-gray-200 z-50 m-7 right-0',
        device.isMobile &&
          'mx-auto left-1/2 mb-10 transform desktop:transform-none -translate-x-1/2 '
      )}
    >
      {renderCookieText()}
      <p className="text-xs text-gray-900 mt-1 mb-2">
        {__('I opt-in to a better browsing experience')}
      </p>
      {renderCTA()}
    </div>
  )
}

export default CookiePopup
