import cn from 'clsx'
import React, { MouseEvent } from 'react'

type Props = {
  className?: string
  children: React.ReactNode | undefined
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof Props>

export type IconButtonProps = Props & NativeAttrs

const IconButton: React.FC<IconButtonProps> = ({
  className,
  children,
  disabled = false,
  onClick
}) => {
  const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    onClick && onClick(event)
  }

  return (
    <button
      onClick={onClickHandler}
      className={cn(
        'flex items-center justify-center outline-none',
        'transition-colors duration-250 ease-in-out',
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default IconButton
