import React, { memo } from 'react'
import cn from 'clsx'
import { StoreProps } from '@dropgala/store'
import dynamic from 'next/dynamic'
import { getThumbnail } from '@dropgala/utils/helpers'
import { ImageType } from '@dropgala/types/common.type'
import { CategoryType } from '@dropgala/types/category.type'
import { BuilderAttributes } from '@dropgala/types'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

const Image = dynamic(() => import('../common/Image'), {
  loading: () => <></>,
  ssr: false
})

const Link = dynamic(() => import('../common/Link'), {
  loading: () => <></>,
  ssr: false
})

interface Props extends StoreProps {
  href: string
  thumbnail: ImageType[]
  category: CategoryType
  title: string
  subTitle: string
  itemsPerColumn: number
  isSlide: boolean
  displayContent: boolean
}

const CategoryListItem2: React.FC<Props> = ({
  useAppSelector,
  subTitle,
  title,
  thumbnail,
  category,
  displayContent,
  isSlide,
  itemsPerColumn,
  ...props
}) => {
  const { image, placeholder } = getThumbnail(thumbnail)

  const { builderAttributes } = useIsInIframe(props, [
    BuilderAttributes.ADD_LIBRARY
  ])

  return (
    <div
      {...builderAttributes}
      className={cn(
        'mb-6 group/category_card cursor-pointer',
        'relative overflow-hidden flex justify-between items-center',
        itemsPerColumn === 3 &&
          'desktop:h-[500px] laptop:h-[400px] tablet:h-[450px] h-[450px]',
        itemsPerColumn === 4 &&
          'desktop:h-[350px] laptop:h-[350px] tablet:h-[350px] h-[450px]',
        itemsPerColumn === 5 &&
          'desktop:h-[350px] laptop:h-[350px] tablet:h-[350px] h-[450px]',
        itemsPerColumn === 6 &&
          'desktop:h-[300px] laptop:h-[350px] tablet:h-[350px] h-[450px]',
        isSlide && 'h-[300px] mx-3'
      )}
    >
      <Link
        link={category?.urlKey}
        isCheckLink
        href={{
          pathname: '/category/[slug]',
          query: { slug: category?.urlKey }
        }}
      >
        <figure className="flex w-full flex-col justify-end items-center rounded-t-sm">
          {displayContent && (
            <div className="absolute z-[1] top-0 right-0 left-0 bottom-0 gradient-category-item-2"></div>
          )}
          <div className="absolute top-0 right-0 left-0 bottom-0 z-0 shadow rounded-sm w-full border">
            <Image
              src={image}
              customPlaceholder={placeholder}
              layout="fill"
              objectFit="cover"
              className="bg-transparent rounded-sm transition-all group-hover/category_card:scale-105"
            />
          </div>
          {displayContent && (
            <div className="z-[2] flex flex-col items-center mt-3 absolute bottom-0 left-0 right-0 h-fit pb-2">
              <figcaption className="uppercase tracking-wide line-clamp-1 text-white text-md font-semibold">
                {title}
              </figcaption>
              <figcaption className="tracking-wide text-xs line-clamp-2 italic text-white w-[95%] text-center">
                {subTitle}
              </figcaption>
            </div>
          )}
        </figure>
      </Link>
    </div>
  )
}

export default memo(CategoryListItem2)
