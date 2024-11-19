import React, { memo } from 'react'
import cn from 'clsx'
import { StoreProps } from '@dropgala/store'
import dynamic from 'next/dynamic'
import { getThumbnail } from '@dropgala/utils/helpers'
import { ImageType } from '@dropgala/types/common.type'
import { CategoryType } from '@dropgala/types/category.type'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'
import { BuilderAttributes } from '@dropgala/types'

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

const CategoryListItem3: React.FC<Props> = ({
  useAppSelector,
  subTitle,
  title,
  thumbnail,
  category,
  itemsPerColumn,
  displayContent,
  isSlide,
  ...props
}) => {
  const { image, placeholder } = getThumbnail(thumbnail)

  const { builderAttributes } = useIsInIframe(props, [
    BuilderAttributes.ADD_LIBRARY
  ])
  return (
    <div
      {...builderAttributes}
      className={cn('mb-6 group/category_card cursor-pointer')}
    >
      <Link
        link={props?.href}
        isCheckLink
        href={{
          pathname: '/category/[slug]',
          query: { slug: props?.href }
        }}
      >
        <figure className="flex flex-col justify-end items-center rounded-t-full">
          <div
            className={cn(
              'shadow-card rounded-full border transition-all group-hover/category_card:scale-105',
              itemsPerColumn === 3 && 'w-[300px] h-[300px]',
              itemsPerColumn === 4 && 'w-[200px] h-[200px]',
              itemsPerColumn === 5 && 'w-[150px] h-[150px]',
              itemsPerColumn === 6 && 'w-[150px] h-[150px]',
              isSlide && 'w-[150px] h-[150px] mx-3'
            )}
          >
            <Image
              src={image}
              customPlaceholder={placeholder}
              width={350}
              height={350}
              objectFit="cover"
              className="bg-transparent rounded-full"
            />
          </div>
          {displayContent && (
            <>
              <figcaption>
                <span className="uppercase tracking-wide line-clamp-1 font-semibold mt-2">
                  {title}
                </span>
              </figcaption>
              <figcaption>
                <span className="tracking-wide text-xs line-clamp-2 italic text-gray-600 w-[95%] text-center">
                  {subTitle}
                </span>
              </figcaption>
            </>
          )}
        </figure>
      </Link>
    </div>
  )
}

export default memo(CategoryListItem3)
