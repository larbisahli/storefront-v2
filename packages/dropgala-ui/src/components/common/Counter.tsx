import type { CounterSizes } from '@dropgala/types/props.type'
import cn from 'clsx'
import React from 'react'

import Minus from '@dropgala/assets/icons/minus-icon'
import Plus from '@dropgala/assets/icons/plus-icon'
import Trash from '@dropgala/assets/icons/trash'
import IconButton from '../ui/IconButton'

type CounterProps = {
  single?: boolean
  className?: string
  value: number
  size?: CounterSizes
  disabled?: boolean
  MinusDisabled?: boolean
  onDecrement: () => void
  onIncrement: () => void
}

const Counter: React.FC<CounterProps> = ({
  single = false,
  onDecrement,
  onIncrement,
  value,
  size = 'normal',
  className = 'flex',
  disabled = false,
  MinusDisabled = false
}) => {
  const btnClassName = cn(
    'text-skin-base rounded-xs bg-gray-200 transition border border-solid',
    'border-gray-400 shadow-current duration-300 hover:bg-gray-400 focus:outline-none',
    { 'w-30px h-30px': size === 'normal' },
    { 'w-35px h-35px': size === 'big' },
    { 'w-25px h-25px': size === 'small' }
  )

  return (
    <div className={cn('group flex items-center justify-between', className)}>
      <IconButton
        onClick={onDecrement}
        disabled={MinusDisabled}
        className={cn(btnClassName, {
          '!bg-gray-100 text-gray-500 border-dashed cursor-not-allowed':
            MinusDisabled
        })}
      >
        <Minus />
      </IconButton>

      <span
        className={cn(
          'font-medium text-skin-base text-lg flex items-center justify-center',
          'h-full w-35px px-2 transition-colors duration-250 ease-in-out cursor-default'
        )}
      >
        {value}
      </span>

      <IconButton
        onClick={onIncrement}
        disabled={disabled}
        className={cn(btnClassName, {
          '!bg-gray-100 text-gray-500 border-dashed cursor-not-allowed':
            disabled
        })}
      >
        <Plus />
      </IconButton>
    </div>
  )
}

export default Counter
