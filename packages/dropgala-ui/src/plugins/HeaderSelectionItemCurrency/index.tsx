import { ConfigType } from '@dropgala/types/config.type'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { memo, useRef, useState } from 'react'
import ArrowDownIcon from '@dropgala/assets/icons/arrow-down'
import ArrowUpIcon from '@dropgala/assets/icons/arrow-up'
import cn from 'clsx'
import { selectConfig, setDefaultCurrency, StoreProps } from '@dropgala/store'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'
import { BuilderAttributes } from '@dropgala/types'

interface Props extends StoreProps {}

const HeaderSelectionItemCurrency = ({
  useAppSelector,
  useAppDispatch,
  ...props
}: Props) => {
  const { currencies, defaultCurrency } = useAppSelector(selectConfig)
  const dispatch = useAppDispatch()

  const ref = useRef(null)

  const [open, setOpen] = useState(false)

  const handleClickOutside = () => {
    setOpen(false)
  }

  const handleDefaultCurrency = (
    defaultCurrency: ConfigType['defaultCurrency']
  ) => {
    dispatch(setDefaultCurrency({ defaultCurrency }))
  }

  useOnClickOutside(ref, handleClickOutside)

  const { builderAttributes } = useIsInIframe(props, [
    BuilderAttributes.ADD_LIBRARY
  ])

  return (
    <div {...builderAttributes} ref={ref} className="relative px-3">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-sm font-manrope flex justify-center items-center"
      >
        <div>{defaultCurrency?.code}</div>
        <div className={cn('p-1', open && 'block', !open && 'hidden')}>
          <ArrowUpIcon width={16} height={16} />
        </div>
        <div className={cn('p-1', !open && 'block', open && 'hidden')}>
          <ArrowDownIcon width={16} height={16} />
        </div>
      </button>

      {open && (
        <div className="bg-white shadow absolute border border-solid border-gray-300 z-50 -right-0">
          {currencies?.map((currency) => (
            <div
              key={currency?.code}
              onClick={() => {
                setOpen(false)
                handleDefaultCurrency(currency)
              }}
              className="text-sm py-2 font-manrope px-3 border-b hover:bg-gray-200 cursor-pointer"
            >
              {currency?.code}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(HeaderSelectionItemCurrency)
