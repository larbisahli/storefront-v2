'use client'
import { type FC, type ButtonHTMLAttributes, useEffect, useMemo } from 'react'
import cn from 'clsx'
import {data} from './data'

export interface ButtonProps {
  /**
   * This is a description
   */
  secondary?: boolean
  text?: string
}

const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  secondary = false,
  text,
  ...props
}) => {
  // All of these tailwind classes are watched by `tailwind.config.js` in the Next.js app
  const rootClassName = cn(
    'relative inline-flex items-center justify-center cursor-pointer',
    'no-underline py-0 px-3.5 rounded-md border border-solid border-black',
    'text-base font-medium outline-none select-none align-middle',
    'whitespace-nowrap leading-10 shadow-md transition-colors',
    secondary ? 'bg-white text-black' : 'bg-black text-white',
    className
  )

  const find = useMemo(()=> data.find(x => x.id === '0CEPNRDV98KT3ORP'), [])
  console.log({find})

  return (
    <button className={rootClassName} {...props}>
      {text}
    </button>
  )
}

export default Button
