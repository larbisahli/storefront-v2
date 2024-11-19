import { memo } from 'react'
import { selectConfig, StoreProps } from '@dropgala/store'

interface Props extends StoreProps {}

const HeaderSelectionItemStoreInfo = ({ useAppSelector, ...props }: Props) => {
  const { storeEmail, storeNumber } = useAppSelector(selectConfig)
  return (
    <div className="flex items-center text-xs text-gray-900 flex-1">
      {storeNumber && (
        <div className="pr-5 flex items-center">
          <div className="pr-3">Telephone:</div>
          <span>{storeNumber}</span>
        </div>
      )}
      {storeEmail && (
        <div className="flex items-center">
          <div className="pr-3">Mail:</div>
          <span>{storeEmail}</span>
        </div>
      )}
    </div>
  )
}

export default memo(HeaderSelectionItemStoreInfo)
