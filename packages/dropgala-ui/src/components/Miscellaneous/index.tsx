import React from 'react'
import GridIcon from '@dropgala/assets/icons/grid'
import ListIcon from '@dropgala/assets/icons/list'
import cn from 'clsx'
import { ProductCardLayout } from '@dropgala/types'

interface Props {
  layout: ProductCardLayout
  setLayout: React.Dispatch<React.SetStateAction<ProductCardLayout>>
}

const Miscellaneous: React.FC<Props> = ({ layout, setLayout, ...props }) => {
  return (
    <div className="max-w-default mx-auto items-center text-sm text-gray-600 mb-4 flex justify-end">
      <button
        onClick={() => setLayout(ProductCardLayout.Grid)}
        className={cn('bg-gray-200 p-2 mx-1', {
          'text-red-500': layout === ProductCardLayout.Grid
        })}
      >
        <GridIcon width={25} height={25} />
      </button>
      <button
        onClick={() => setLayout(ProductCardLayout.List)}
        className={cn('bg-gray-200 p-2 mx-1', {
          'text-red-500': layout === ProductCardLayout.List
        })}
      >
        <ListIcon width={25} height={25} />
      </button>
      <div className="text-sm ml-2">Price: Low to High</div>
    </div>
  )
}

export default Miscellaneous
