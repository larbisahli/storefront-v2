import cn from 'clsx'
import React from 'react'

type ScrollbarProps = {
  className?: string
  children: React.ReactNode
}

const Scrollbar: React.FC<ScrollbarProps> = ({ children, className }) => {
  return <div className={cn(className)}>{children}</div>
}

export default Scrollbar
