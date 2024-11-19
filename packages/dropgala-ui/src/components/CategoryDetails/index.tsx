import React from 'react'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import Image from '../common/Image'
import { StoreProps } from '@dropgala/store'
import { selectCategory } from '@dropgala/store/Category'
import { getThumbnail } from '@dropgala/utils/helpers'

const CategoryDetails: React.FC<StoreProps> = ({
  useAppSelector,
  ...props
}) => {
  const category = useAppSelector(selectCategory)
  const renderCategoryName = () => {
    return (
      <div
        className="text-lg border-t-2 border-b-2 mb-4
         border-black w-full py-1 font-medium desktop:text-3xl desktop:w-fit desktop:text-left text-center"
      >
        {category?.name}
      </div>
    )
  }

  const renderCategoryDescription = () => {
    return (
      <div className="text-gray-900 text-xs desktop:text-sm rtl:desktop:text-right ltr:desktop:text-left text-center max-w-[90%]">
        {category?.description}
      </div>
    )
  }

  const renderCategoryImage = () => {
    if (isEmpty(category?.thumbnail)) {
      return null
    }

    const { image, placeholder } = getThumbnail(category?.thumbnail)

    return (
      <div className="relative rounded-sm w-[100%] h-[350px]">
        <Image
          src={image}
          customPlaceholder={placeholder}
          objectFit="cover"
          layout="fill"
          className="rounded-sm"
        />
      </div>
    )
  }

  if (isEmpty(category)) {
    return null
  }

  return (
    <article className="bg-gray-100 rounded-sm">
      <div className="p-5 max-w-default mx-auto flex items-center justify-between desktop:flex-row flex-col">
        <div className="flex-1">
          {renderCategoryName()}
          {renderCategoryDescription()}
        </div>
        <div className="flex-1 pt-10 desktop:pt-0 flex justify-end w-full">
          {renderCategoryImage()}
        </div>
      </div>
    </article>
  )
}

export default CategoryDetails
