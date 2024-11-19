import { TagType } from '@dropgala/types/tag.type'
import cn from 'clsx'
import React from 'react'

interface Props {
  data: TagType
  className?: string
}

const TagLabel: React.FC<Props> = ({ className, data }) => {
  const { name } = data

  if (!name) {
    return null
  }

  return (
    <div
      className={cn(
        'font-medium text-gray-900 text-13px md:text-sm rounded-sm block border border-gray-300 bg-gray-100 px-2 py-1 transition',
        className
      )}
      role="button"
    >
      {name}
    </div>
  )
}

export default TagLabel
