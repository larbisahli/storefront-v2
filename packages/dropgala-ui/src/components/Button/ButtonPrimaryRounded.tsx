import { ButtonSizes } from '@dropgala/types/props.type'
import cn from 'clsx'
import React, { MouseEvent } from 'react'
import { StoreProps } from '@dropgala/store'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'
import { BuilderAttributes } from '@dropgala/types'
import Link from '../../components/common/Link'

const ButtonSize = {
  big: 'h-12 px-30px',
  normal: 'h-11 px-30px',
  small: 'h-9 text-13px px-20px'
}

interface Props extends StoreProps {
  size?: ButtonSizes
  label: string
  type?: React.ButtonHTMLAttributes<any>['type']
  loading?: boolean
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
  link?: any
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof Props>

export type ButtonProps = Props & NativeAttrs

const ButtonPrimaryRounded: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  className,
  label,
  loading = false,
  size = 'normal',
  type = 'button',
  children,
  disabled = false,
  onClick,
  link,
  ...props
}) => {
  const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return
    onClick && onClick(event)
  }
  const { builderAttributes } = useIsInIframe(props, [
    BuilderAttributes.ADD_LIBRARY
  ])
  const renderButton = () => (
    <button
      onClick={onClickHandler}
      className={cn(
        'scroll-mt-320px rounded-full flex items-center justify-center flex-shrink-0 font-normal w-auto uppercase',
        'rounded outline-none transition duration-250 ease-in-out focus:outline-none',
        ButtonSize[size],
        className,
        {
          'text-gray-500 bg-gray-300 cursor-not-allowed hover:bg-gray-300':
            disabled,
          'text-white bg-gray-900 hover:bg-gray-700 shadow-upside': !disabled
        }
      )}
      disabled={disabled}
      type={type}
      aria-label={type}
    >
      {!loading && <div>{label}</div>}
      {loading && (
        <div
          className="h-5 w-5 border-3px border-gray-800 border-t-3px rounded-full animate-spin"
          style={{ borderTopColor: '#f1f1f1' }}
        />
      )}
    </button>
  )

  return (
    <div {...builderAttributes}>
      {link ? <Link {...link}>{renderButton()}</Link> : renderButton()}
    </div>
  )
}

export default ButtonPrimaryRounded
