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
import useGetComponentFromChildren from '@dropgala/utils/hooks/useGetComponentFromChildren'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

const MenuDropDownComponent = dynamic(
  () => import('./Header/MenuDropDownComponent'),
  {
    loading: () => <></>,
    ssr: false
  }
)

const MobileHeader = dynamic(() => import('./Header/MobileHeader'), {
  loading: () => <></>,
  ssr: false
})

interface Props extends StoreProps {}

export const Wrapper = ({ children }: { children: JSX.Element }) => {
  return children
}

const HeaderElegant: FC<Props> = ({
  useAppSelector,
  useAppDispatch,
  children,
  ...props
}) => {
  const storeConfig = useAppSelector(selectConfig)
  const { device, isMobileHeaderTransition } = storeConfig
  const { menu } = useAppSelector(selectMenu)
  const { item, totalQuantity } = useAppSelector(selectCart)

  const dispatch = useAppDispatch()

  const [height, setHeight] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      setHeight(ref?.current?.clientHeight ?? 0)
    }, 200)
  }, [])

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
        className={cn(
          'text-gray-700 body-font fixed w-full z-20 bg-white border-b border-gray-300'
        )}
      >
        {/* PromoBanner */}
        {renderPromoBanner}
        {/* Navigation */}
        <div className="max-w-default mx-auto">
          {/* Info section */}
          {/* <InfoSection
            storeConfig={storeConfig}
            handleDefaultCurrency={handleDefaultCurrency}
          /> */}
          {/* Nav */}
          <div className="flex items-center bg-white h-60px relative px-2">
            <div className="flex relative justify-center overflow-hidden">
              <Link href="/">
                <div className="relative">
                  <Image
                    isCustomUrl
                    src={storeLogo}
                    objectFit="cover"
                    height={device?.isDesktop ? 45 : 30}
                    width={device?.isDesktop ? 45 : 30}
                    alt="logo"
                  />
                </div>
              </Link>
            </div>
            <div className="hidden desktop:block flex-1 max-w-[500px] m-auto">
              {/* Search field */}
              {/* <SearchSection /> */}
            </div>
            {/* Icons account actions */}
            {/* <MyAccountActions handleCart={handleCart} itemsCount={itemsCount} /> */}
          </div>
          {/* Menu Section */}
          <div className="hidden desktop:flex items-center justify-center">
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
          {/* MENU DROPDOWN */}
          <MenuDropDownComponent
            menu={menu}
            selectedFirstLevelCategory={selectedFirstLevelCategory}
          />
        </div>
      </header>
      <MobileHeader
        handleCart={handleCart}
        handleMenu={handleMenu}
        itemsCount={itemsCount}
        isMobileHeaderTransition={isMobileHeaderTransition}
      />
      <div style={{ height: `${height}px` }} className="-z-10"></div>
    </Fragment>
  )
}

export default HeaderElegant
