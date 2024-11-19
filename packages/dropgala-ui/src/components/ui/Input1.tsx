import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import cn from 'clsx'

export const TextBoxCommonBase =
  'w-full h-10 px-3 placeholder-gray-500 border rounded outline-none transition duration-200 border-gray-400 focus:shadow bg-white focus:border-skin-primary'

export const TextBoxDisable =
  'text-gray-500 bg-gray-300 cursor-not-allowed hover:bg-gray-300 hover:border-transparent focus:border-transparent focus:placeholder-gray-500'

export const TextBoxEnable =
  'text-gray-900 bg-gray-f7 hover:border-gray-400 focus:border-black focus:placeholder-gray-900'

export const InputBase = 'h-10 px-3'

export const TextareaBase = 'h-120px p-4 resize-none'

export interface Props {
  value?: string
  initialValue?: string
  placeholder?: string
  inputClassName?: string
  isRequiredLabel?: boolean
  readOnly?: boolean
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  label?: string
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  [key: string]: unknown
}

export const defaultProps = {
  disabled: false,
  readOnly: false,
  isRequiredLabel: false,
  className: '',
  placeholder: '',
  initialValue: ''
}

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>

export type InputPropsType = Props & NativeAttrs

const Input = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<InputPropsType>
>(
  (
    {
      className,
      id,
      error,
      inputClassName,
      value,
      name,
      initialValue,
      isRequiredLabel,
      disabled,
      readOnly,
      placeholder,
      label,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref: React.Ref<HTMLInputElement | null>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => inputRef.current)

    const [initValue, setInitValue] = useState<string>(initialValue)

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return
      setInitValue(event.target.value)
      onChange && onChange(event)
    }

    const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      onFocus && onFocus(e)
    }
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur && onBlur(e)
    }

    useEffect(() => {
      if (value === undefined) return
      setInitValue(value)
    }, [value])

    const classNames =
      InputBase +
      ' ' +
      TextBoxCommonBase +
      ' ' +
      (disabled === true ? TextBoxDisable : TextBoxEnable) +
      ' ' +
      inputClassName

    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={name}
            className={cn(
              'block text-gray-800 font-medium text-sm leading-none mb-3',
              { 'text-gray-300': disabled }
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
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className={classNames}
          id={name}
          name={name}
          value={initValue}
          disabled={disabled}
          readOnly={readOnly}
          onChange={changeHandler}
          onFocus={focusHandler}
          onBlur={blurHandler}
          autoComplete="off"
          {...props}
        />
        {error && (
          <p className="mt-1 absolute text-13px text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Input.defaultProps = defaultProps
Input.displayName = 'Input'

export default Input
