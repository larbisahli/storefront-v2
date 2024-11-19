import React, { InputHTMLAttributes, ReactNode } from 'react'
import cn from 'clsx'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  inputClassName?: string
  label?: () => ReactNode
  name: string
  id: string
  error?: string
}

const Radio = React.forwardRef<HTMLInputElement, Props>(
  (
    { style, className, label, name, id, error, inputClassName, ...rest },
    ref
  ) => {
    return (
      <div style={style} className="w-full">
        <div className="flex items-center relative">
          <input
            id={id}
            name={name}
            type="radio"
            ref={ref}
            className={cn('radio_input', inputClassName)}
            {...rest}
          />
          <label htmlFor={id} className={cn('w-full', className)}>
            {label && label()}
          </label>
        </div>

        {error && <p className="my-2 text-xs text-end text-red-500">{error}</p>}
      </div>
    )
  }
)

Radio.displayName = 'Radio'

export default Radio
