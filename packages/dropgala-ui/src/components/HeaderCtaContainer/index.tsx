import React from 'react'
import { StoreProps } from '@dropgala/store'
import useGetComponentFromChildren from '@dropgala/utils/hooks/useGetComponentFromChildren'
import { ModuleGroup } from '@dropgala/types'

interface Props extends StoreProps {}

const HeaderCtaContainer: React.FC<Props> = ({
  useAppSelector,
  children,
  ...props
}) => {
  const renderCtaItemUser = useGetComponentFromChildren(
    children,
    ModuleGroup.HEADER_CTA_ITEM_USER
  )
  const renderCtaItemCart = useGetComponentFromChildren(
    children,
    ModuleGroup.HEADER_CTA_ITEM_CART
  )
  const renderCtaItemLike = useGetComponentFromChildren(
    children,
    ModuleGroup.HEADER_CTA_ITEM_LIKE
  )
  return (
    <div className="hidden desktop:flex items-center gap-x-5">
      {renderCtaItemUser}
      {renderCtaItemCart}
      {renderCtaItemLike}
    </div>
  )
}

export default HeaderCtaContainer
