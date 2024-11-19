import cn from 'clsx'
import React, {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { mediaURL } from '@dropgala/utils/utils'
import {
  StoreProps,
  selectCart,
  selectConfig,
  selectMenu,
  setDefaultCurrency,
  toggleCart,
  toggleMenu
} from '@dropgala/store'
import Image from '../common/Image'
import Link from '../common/Link'
import { ConfigType } from '@dropgala/types/config.type'
import dynamic from 'next/dynamic'
import { BuilderAttributes, ModuleGroup } from '@dropgala/types'
import MenuIcon from '@dropgala/assets/icons/menu'
import { usePathname } from 'next/navigation'
import useGetComponentFromChildren from '@dropgala/utils/hooks/useGetComponentFromChildren'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

const MenuDropDownComponent = dynamic(
  () => import('./Header/MenuDropDownComponent2'),
  {
    loading: () => <></>,
    ssr: false
  }
)

interface Props extends StoreProps {}

export const Wrapper = ({ children }: { children: JSX.Element }) => {
  return children
}

const HeaderSatoshi: FC<Props> = ({
  useAppSelector,
  useAppDispatch,
  children,
  ...props
}) => {
  const pathname = usePathname()
  const storeConfig = useAppSelector(selectConfig)
  const { device, isMobileHeaderTransition } = storeConfig
  const { menu } = useAppSelector(selectMenu)
  const { item, totalQuantity } = useAppSelector(selectCart)

  const dispatch = useAppDispatch()

  const [height, setHeight] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if (pathname !== '/') {
      setTimeout(() => {
        // @ts-ignore
        setHeight((ref?.current?.clientHeight ?? 0) + 40)
      }, 200)
    }
  }, [pathname])

  const handleCart = useCallback(() => {
    dispatch(toggleCart())
  }, [])

  const handleMenu = useCallback(() => {
    dispatch(toggleMenu())
  }, [])

  const handleDefaultCurrency = useCallback(
    (defaultCurrency: ConfigType['defaultCurrency']) => {
      dispatch(setDefaultCurrency({ defaultCurrency }))
    },
    []
  )

  const itemsCount = totalQuantity

  const menuTimer = useRef<undefined | ReturnType<typeof setTimeout>>(undefined)

  const [selectedFirstLevelCategory, setSelectedFirstLevelCategory] = useState<
    number | null
  >(null)

  const handleFirstLevelCategoryEnter = (categoryId: number) => {
    // cancel the timeout
    clearTimeout(menuTimer.current)
    setSelectedFirstLevelCategory(categoryId)
  }

  const handleMenuDropEvent = () => {
    const menuDropNode = document.getElementById('menu-drop')
    menuDropNode?.removeEventListener('mouseleave', handleMenuDropEvent)
    setSelectedFirstLevelCategory(null)
  }

  const handleFirstLevelCategoryLeave = () => {
    const menuDropNode = document.getElementById('menu-drop')
    menuDropNode?.addEventListener('mouseenter', () => {
      // cancel the timeout
      clearTimeout(menuTimer.current)
    })
    menuDropNode?.addEventListener('mouseleave', handleMenuDropEvent)
    // wait 500ms and then run func()
    menuTimer.current = setTimeout(() => {
      handleMenuDropEvent()
    }, 500)
  }

  const storeLogo = !!storeConfig?.logo?.length
    ? `${mediaURL}/${storeConfig?.logo[0].image}`
    : '/assets/images/default_logo.webp'

  const renderPromoBanner = useGetComponentFromChildren(
    children,
    ModuleGroup.PROMO_BANNER
  )

  const { builderAttributes } = useIsInIframe(props, [
    BuilderAttributes.ADD_AFTER,
    BuilderAttributes.EDIT
  ])

  return (
    <Fragment>
      <header
        {...builderAttributes}
        ref={ref}
        className={cn('text-gray-700 body-font fixed w-full z-20')}
      >
        {/* PromoBanner */}
        {/* {renderPromoBanner()} */}
        {/* Navigation */}
        <div className="max-w-default mx-auto rounded-lg">
          {/* Nav */}
          <div
            className="flex items-center justify-between rounded-[12px] h-[50px] desktop:h-[70px] mx-4
          desktop:mx-0 relative mt-4 px-6 bg-white __bg-opacity-90 __backdrop-blur-xl border shadow-card"
          >
            {/* Mobile Menu */}
            <div className="desktop:hidden flex">
              <button className="text-black" onClick={handleMenu}>
                <MenuIcon width={28} height={28} />
              </button>
            </div>
            <div className="flex flex-1 desktop:flex-none relative justify-center overflow-hidden h-[45px] w-[45px]">
              <Link href="/">
                <Image
                  isCustomUrl
                  src={storeLogo}
                  layout="fill"
                  objectFit="contain"
                  alt="logo"
                />
              </Link>
            </div>
            {/* Menu Section */}
            <div className="hidden flex-1 desktop:flex items-center justify-center">
              {menu?.map(({ id, name, urlKey }) => {
                return (
                  <Link
                    key={id}
                    href={{
                      pathname: '/category/[slug]',
                      query: { slug: urlKey }
                    }}
                    onMouseEnter={() => handleFirstLevelCategoryEnter(id)}
                    onMouseLeave={handleFirstLevelCategoryLeave}
                    className="text-black uppercase font-semibold text-sm hover:text-red-600 p-4 pb-3 pl-0"
                  >
                    {name}
                  </Link>
                )
              })}
            </div>
            {/* Icons account actions */}
            {/* <MyAccountActions handleCart={handleCart} itemsCount={itemsCount} /> */}
          </div>
          {/* MENU DROPDOWN */}
          <MenuDropDownComponent
            menu={menu}
            selectedFirstLevelCategory={selectedFirstLevelCategory}
          />
        </div>
      </header>
      <div style={{ height: `${height}px` }} className="-z-10"></div>
    </Fragment>
  )
}

export default HeaderSatoshi
