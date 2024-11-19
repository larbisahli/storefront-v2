/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { AttributeTypeTypes } from '@dropgala/types'
import { AttributeValueType } from '@dropgala/types/attribute.type'
import cn from 'clsx'
import { memo } from 'react'

interface Props {
  close?: () => void
  className?: string
  selectedAttributeValueId: number
  handleSelectedAttributeValue: (key: AttributeValueType) => void
  type: AttributeTypeTypes | undefined
  value: AttributeValueType
}

const AttributeValueLabel = ({
  close,
  className,
  selectedAttributeValueId,
  handleSelectedAttributeValue,
  type,
  value
}: Props) => {
  const { id, name } = value
  const isColor = type === AttributeTypeTypes.COLOR
  return (
    <li
      title={name}
      className={cn(
        `cursor-pointer rounded-[2px] border px-4 min-w-[66px] h-[32px]
         shadow-badge mb-2 md:mb-3 mr-2 flex justify-center items-center
         font-medium text-sm md:text-15px text-gray-800 transition
         duration-200 ease-in-out hover:text-gray-900 hover:border-1
         hover:border-gray-900 border-gray-700`,
        {
          'border-gray-900 text-gray-900 border-2':
            selectedAttributeValueId === id,
          '!rounded-full !p-0 !min-w-0': isColor,
          '!h-9 !w-9': isColor,
          'shadow-badge': isColor
        },
        className
      )}
      style={{
        background: isColor ? value?.value : ''
      }}
      onClick={() => {
        handleSelectedAttributeValue(value)
        if (close instanceof Function) {
          close()
        }
      }}
    >
      {isColor
        ? selectedAttributeValueId === id && (
            <div
              style={{ background: value?.value }}
              className="h-8 w-8 rounded-full flex items-center justify-center border-2"
            ></div>
          )
        : value?.value}
    </li>
  )
}

export default memo(AttributeValueLabel)
