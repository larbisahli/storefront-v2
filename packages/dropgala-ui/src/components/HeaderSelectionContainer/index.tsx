import React from 'react'
import { StoreProps } from '@dropgala/store'
import useGetComponentFromChildren from '@dropgala/utils/hooks/useGetComponentFromChildren'
import { ModuleGroup } from '@dropgala/types'

interface Props extends StoreProps {}

const HeaderSelectionContainer: React.FC<Props> = ({
  useAppSelector,
  children,
  ...props
}) => {
  const HeaderSelectionItemCurrency = useGetComponentFromChildren(
    children,
    ModuleGroup.HEADER_SELECTION_ITEM_CURRENCY
  )
  const HeaderSelectionItemLanguage = useGetComponentFromChildren(
    children,
    ModuleGroup.HEADER_SELECTION_ITEM_LANGUAGE
  )
  const HeaderSelectionItemStoreInfo = useGetComponentFromChildren(
    children,
    ModuleGroup.HEADER_SELECTION_ITEM_STORE_INFO
  )
  return (
    <div className="hidden desktop:flex items-center w-full justify-between pt-2 pb-1 px-2">
      {HeaderSelectionItemStoreInfo}
      <div className="flex items-center gap-2">
        {HeaderSelectionItemCurrency}
        {HeaderSelectionItemLanguage}
      </div>
    </div>
  )
}

export default HeaderSelectionContainer
