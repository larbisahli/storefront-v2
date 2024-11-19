import cn from 'clsx'
import React, { useEffect } from 'react'

interface Props {
  isOpen: boolean
  className?: string
  onClose: () => void
}

const Overlay = ({ isOpen, className, onClose }: Props) => {
  const handleKeyEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onClose()
    }
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'visible'
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className={cn('overlay', className)}
      role="button"
      tabIndex={0}
      onClick={onClose}
      onKeyDown={handleKeyEnter}
    />
  )
}
export default Overlay
