import cn from 'clsx'
import { memo, useEffect, useRef, useState } from 'react'

import CartIcon from '@dropgala/assets/icons/cart-icon'
import HomeSvg from '@dropgala/assets/icons/home'
import MenuSearchIcon from '@dropgala/assets/icons/menu-search'
import UserIcon from '@dropgala/assets/icons/user'

interface Props {
  handleCart: () => void
  handleMenu: () => void
  itemsCount: number
  isMobileHeaderTransition: boolean | undefined
}

const MobileHeader = ({
  handleCart,
  handleMenu,
  itemsCount,
  isMobileHeaderTransition = true
}: Props) => {
  const _lastScrollY = useRef(0)
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY < _lastScrollY.current) {
        // if scroll down hide the navbar
        setShow(false)
      } else {
        // if scroll up show the navbar
        setShow(true)
      }
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY)
    }
  }

  useEffect(() => {
    _lastScrollY.current = lastScrollY
  }, [lastScrollY])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)
      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar)
      }
    }
  }, [])

  return (
    <nav
      className={cn(
        'fixed w-full right-0 left-0 bottom-0 z-40 hidden tablet:flex mobile:flex',
        'items-center bg-gray-300 py-3 px-5 justify-between transition-transform',
        {
          'translate-y-full': show && isMobileHeaderTransition,
          'translate-y-0': !show || !isMobileHeaderTransition
        }
      )}
    >
      <div className="mx-3 flex-1 flex justify-center">
        <button className="text-gray-800 hover:text-red-500">
          <HomeSvg width={25} height={25} />
        </button>
      </div>
      <div className="mx-3 flex-1 flex justify-center">
        <button
          className="text-gray-800 hover:text-red-500"
          onClick={handleMenu}
        >
          <MenuSearchIcon width={28} height={28} />
        </button>
      </div>
      <div className="mx-3 flex-1 flex justify-center">
        <button className="text-gray-800 hover:text-red-500">
          <UserIcon width={25} height={25} />
        </button>
      </div>
      <div className="mx-3 flex-1 flex justify-center">
        <button
          className="text-gray-800 flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none hover:text-red-500"
          onClick={handleCart}
          aria-label="cart-button"
        >
          <CartIcon width={22} height={22} />
          <span
            className={cn(
              'absolute bg-red-600 rounded-full h-[16px] w-[16px] text-center text-white',
              'top-[-10px] right-[-12px] font-semibold text-xs'
            )}
          >
            {itemsCount}
          </span>
        </button>
      </div>
    </nav>
  )
}

export default memo(MobileHeader)
