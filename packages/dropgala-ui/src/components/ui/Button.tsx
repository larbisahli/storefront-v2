import { ButtonSizes, ButtonVariants } from '@dropgala/types/props.type'
import cn from 'clsx'
import React, { MouseEvent } from 'react'

const ButtonVariant = {
  primary: 'text-white bg-gray-900 hover:bg-gray-700',
  border: 'border border-solid border-gray-500',
  secondary: 'text-white bg-gray-900 hover:bg-gray-900',
  elevation: 'text-white bg-gray-900 hover:bg-gray-900 shadow-upside'
}

const ButtonSize = {
  big: 'h-12 px-30px',
  normal: 'h-11 px-30px',
  small: 'h-9 text-13px px-20px'
}

interface Props {
  variant?: ButtonVariants
  size?: ButtonSizes
  type?: React.ButtonHTMLAttributes<any>['type']
  children: React.ReactNode | undefined
  loading?: boolean
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
  disabledClass?: string
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof Props>

export type ButtonProps = Props & NativeAttrs

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  className,
  loading = false,
  variant = 'primary',
  size = 'normal',
  type = 'button',
  children,
  disabled = false,
  disabledClass = 'text-gray-500 bg-gray-300 cursor-not-allowed hover:bg-gray-300',
  onClick,
  ...props
}) => {
  const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return
    onClick && onClick(event)
  }

  return (
    <button
      onClick={onClickHandler}
      className={cn(
        'flex items-center justify-center flex-shrink-0 font-normal w-auto uppercase',
        'rounded outline-none transition duration-250 ease-in-out focus:outline-none',
        ButtonSize[size],
        className,
        {
          [disabledClass]: disabled,
          [ButtonVariant[variant]]: !disabled
        }
      )}
      disabled={disabled}
      type={type}
      aria-label={type}
    >
      {!loading && children}
      {loading && (
        <div
          className="h-5 w-5 border-3px border-gray-800 border-t-3px rounded-full animate-spin"
          style={{ borderTopColor: '#f1f1f1' }}
        />
      )}
    </button>
  )
}

export default Button
