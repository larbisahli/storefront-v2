import cn from 'clsx'
import React, { InputHTMLAttributes } from 'react'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  inputClassName?: string
  label?: string
  placeholder: string
  name: string
  error?: any
  isRequiredLabel?: boolean
  type?: string
  shadow?: boolean
  variant?: 'normal' | 'solid' | 'outline'
}
const classes = {
  root: 'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-[13px] lg:text-sm font-body rounded-md placeholder-body min-h-12 transition duration-200 ease-in-out',
  normal:
    'bg-gray-100 border-gray-300 focus:shadow focus:bg-white focus:border-skin-primary',
  solid:
    'bg-white border-skin-base focus:outline-none h-11 md:h-12 focus:border-skin-primary focus:border-2',
  outline: 'border-gray-300 focus:text-skin-base',
  shadow: 'focus:shadow'
}
const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className = 'block',
      label,
      name,
      error,
      isRequiredLabel = false,
      placeholder = undefined,
      variant = 'normal',
      shadow = false,
      type = 'text',
      inputClassName,
      ...rest
    },
    ref
  ) => {
    const rootClassName = cn(
      classes.root,
      {
        [classes.normal]: variant === 'normal',
        [classes.solid]: variant === 'solid',
        [classes.outline]: variant === 'outline'
      },
      {
        [classes.shadow]: shadow
      },
      inputClassName
    )
    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={name}
            className={cn(
              'block text-gray-800 font-medium text-sm leading-none mb-3'
            )}
          >
            {label}
            {isRequiredLabel && (
              <span title="Required filed" className="text-red-500 m-[1px]">
                *
              </span>
            )}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          // @ts-ignore
          placeholder={placeholder}
          className={rootClassName}
          autoComplete="off"
          spellCheck="false"
          aria-invalid={error ? 'true' : 'false'}
          {...rest}
        />
        {error && <p className="my-2 text-13px text-skin-red">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
