/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type {
  VariationOptionsType,
  VariationsType
} from '@dropgala/types/product.type'
import { clone, isEmpty } from '@dropgala/utils/lodashFunctions'
import cn from 'clsx'
import { memo, useMemo } from 'react'

import ArrowDownIcon from '@dropgala/assets/icons/arrow-down'
import { AttributeTypeTypes } from '@dropgala/types'

interface Props {
  isConfigurable: boolean
  variations: VariationsType[]
  variation: VariationsType
  orderVariationOption?: VariationOptionsType
  onClick?: () => void
}

function AttributeDisplay({
  isConfigurable,
  orderVariationOption,
  variation,
  variations,
  onClick
}: Props) {
  const { attribute, values } = variation

  const selectedVariation = useMemo(() => {
    const options = orderVariationOption?.options
    let selected = clone(
      variations?.find((sv) => sv?.attribute?.id === attribute?.id)
    )

    if (selected) {
      selected.value = (selected?.values?.filter((v) =>
        options?.includes(v?.id!)
      ) ?? [])[0]
    }

    return selected
  }, [variations, orderVariationOption, attribute])

  const isColor =
    selectedVariation?.attribute?.type === AttributeTypeTypes.COLOR
  const value = selectedVariation?.value?.value
  const name = selectedVariation?.value?.name

  const isOnClick = onClick instanceof Function

  if (!isConfigurable) {
    const simpleProductAttValue = isEmpty(values) ? '' : values![0]?.value
    const simpleProductAttIsColor = attribute?.type === AttributeTypeTypes.COLOR
    return (
      <div
        className={cn(
          'rounded border shadow-badge flex justify-center items-center font-medium',
          'text-sm text-gray-700 transition duration-200 ease-in-out py-1 mx-2 px-2 border-gray-300',
          {
            '!rounded-full': simpleProductAttIsColor,
            '!w-5': simpleProductAttIsColor,
            '!h-5': simpleProductAttIsColor
          }
        )}
        style={{
          background: simpleProductAttIsColor ? simpleProductAttValue : ''
        }}
        title={name}
      >
        <span>{simpleProductAttIsColor ? '' : simpleProductAttValue}</span>
      </div>
    )
  }

  return (
    <div
      className={cn('ml-1', {
        'p-[2px] flex items-center justify-between cursor-pointer border-gray-400 border rounded-full bg-gray-300 min-w-12':
          isOnClick
      })}
      onClick={onClick}
      role={isOnClick ? 'button' : 'none'}
    >
      <div
        className={cn(
          'rounded border shadow-badge flex justify-center items-center font-medium',
          'text-sm text-gray-700 !w-5 !h-5 transition duration-200 ease-in-out py-1 px-2 border-gray-300',
          {
            '!rounded-full': isColor,
            '!p-1 h-0': !isColor,
            'border-none': isOnClick
          }
        )}
        style={{
          background: isColor ? value : ''
        }}
        title={name}
      >
        <span>{isColor ? '' : value}</span>
      </div>
      {isOnClick && (
        <div className="text-black px-2">
          <ArrowDownIcon width={12} height={12} />
        </div>
      )}
    </div>
  )
}

export default memo(AttributeDisplay)
