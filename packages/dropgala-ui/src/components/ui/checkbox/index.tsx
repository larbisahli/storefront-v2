import React, { InputHTMLAttributes } from 'react'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
  name: string
  error?: string
  inputClassName?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  (
    { className, inputClassName, style, label, id, name, error, ...rest },
    ref
  ) => {
    return (
      <div style={style} className={className}>
        <div className="flex items-center">
          <input
            id={id ?? name}
            name={name}
            type="checkbox"
            ref={ref}
            className={`checkbox ${inputClassName ?? ''}`}
            {...rest}
          />

          <label htmlFor={id ?? name} className="text-gray-900 text-base">
            {label}
          </label>
        </div>

        {error && <p className="my-2 text-xs text-end text-red-500">{error}</p>}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
