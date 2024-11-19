import cn from 'clsx'
import React from 'react'

type BadgeProps = {
  className?: string
  backgroundColor?: string
  textColor?: string
  uppercase?: boolean
  border?: string
  padding?: string
  children: React.ReactNode
}

const Badge: React.FC<BadgeProps> = (props) => {
  const {
    className,
    backgroundColor,
    textColor,
    uppercase,
    border,
    padding,
    children
  } = props

  const classes = {
    root: 'inline-block rounded text-xs md:text-sm bg-opacity-20 ms-2.5 ml-2 shadow-badge'
  }

  return (
    <span
      className={cn(
        classes.root,
        backgroundColor,
        textColor,
        className,
        border,
        padding ?? 'px-2 py-1',
        { uppercase: uppercase ?? false }
      )}
    >
      {children}
    </span>
  )
}

export default Badge
