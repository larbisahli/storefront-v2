import type { FC, ButtonHTMLAttributes } from 'react'
import cn from 'clsx'

export interface QuoteProps {
  text?: string
}

const Quote: FC<QuoteProps & ButtonHTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  text,
  ...props
}) => {
  // All of these tailwind classes are watched by `tailwind.config.js` in the Next.js app
  const rootClassName = cn(
    'border-l-4 pl-4',
    'font-normal leading-6 text-base',
    className
  )

  return (
    <p className={rootClassName}>
      {text}
    </p>
  )
}

export default Quote
