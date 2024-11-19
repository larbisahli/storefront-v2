import React from 'react'
import cn from 'clsx'

const BlockPlaceholder = ({ className }: { className?: string }) => {
  return <div className={cn('animated-background bg-red-600', className)} />
}

export default BlockPlaceholder
