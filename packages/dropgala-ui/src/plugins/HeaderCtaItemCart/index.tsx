import React, { useCallback } from 'react'
import { selectCart, StoreProps, toggleCart } from '@dropgala/store'
import IconPlaceholder from '../../placeholders/icon'
import dynamic from 'next/dynamic'
import cn from 'clsx'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'
import { BuilderAttributes } from '@dropgala/types'

const CartIcon = dynamic(() => import('@dropgala/assets/icons/cart-icon'), {
  loading: () => <IconPlaceholder />,
  ssr: false
})

interface Props extends StoreProps {}

const HeaderCtaItemCart: React.FC<Props> = ({
  useAppSelector,
  useAppDispatch,
  ...props
}) => {
  const { totalQuantity } = useAppSelector(selectCart)
  const dispatch = useAppDispatch()

  const handleCart = useCallback(() => {
    dispatch(toggleCart())
  }, [])
  const { builderAttributes } = useIsInIframe(props, [
    BuilderAttributes.ADD_LIBRARY
  ])
  return (
    <div
      {...builderAttributes}
      className="h-full flex justify-center items-center"
    >
      <button
        className="flex group/cart items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
        onClick={handleCart}
        aria-label="cart-button"
      >
        <CartIcon width={25} height={25} />
        <div
          className={cn(
            'absolute bg-[color:var(--primary-color)] group-hover/cart:bg-[color:var(--primary-hover-color)] rounded-full h-[19px] w-[19px] text-center text-white',
            'top-[-10px] right-[-12px] font-semibold text-xs flex items-center justify-center'
          )}
        >
          <span>{totalQuantity}</span>
        </div>
      </button>
    </div>
  )
}

export default HeaderCtaItemCart
