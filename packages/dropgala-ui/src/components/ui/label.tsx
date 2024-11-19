import cn from 'clsx'
import { LabelHTMLAttributes } from 'react'

export interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string
  isRequiredLabel?: boolean
}

const Label: React.FC<Props> = ({
  className,
  isRequiredLabel = false,
  children,
  ...rest
}) => {
  return (
    <label
      className={cn(
        'block text-gray-800 font-medium text-sm leading-none mb-2',
        className
      )}
      {...rest}
    >
      {children}
      {isRequiredLabel && (
        <span title="Required filed" className="text-red-500 m-[1px]">
          *
        </span>
      )}
    </label>
  )
}

export default Label
