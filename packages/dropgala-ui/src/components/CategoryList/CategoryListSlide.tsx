import cn from 'clsx'
import React, { memo } from 'react'

import { StoreProps } from '@dropgala/store'
import dynamic from 'next/dynamic'
import { Pagination } from 'swiper/modules'
import { BuilderAttributes, ModuleGroup } from '@dropgala/types'
import _JSXStyle from 'styled-jsx/style'
import { handleTypographyStyle } from '@dropgala/utils/styles'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { Autoplay } from 'swiper/modules'
import useGetComponentFromChildren from '@dropgala/utils/hooks/useGetComponentFromChildren'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

const SwiperComponent = dynamic(() => import('../common/Swiper'), {
  loading: () => <></>,
  ssr: false
})

const breakpoints = {
  400: {
    width: 400,
    slidesPerView: 1
  },
  450: {
    width: 500,
    slidesPerView: 2
  },
  640: {
    width: 640,
    slidesPerView: 3
  },
  768: {
    width: 768,
    slidesPerView: 3
  },
  1024: {
    width: 1024,
    slidesPerView: 4
  },
  1100: {
    width: 1100,
    slidesPerView: 5
  },
  1200: {
    width: 1200,
    slidesPerView: 6
  }
}

const CategoryListSlide: React.FC<StoreProps> = ({
  useAppSelector,
  children,
  data,
  styles,
  ...props
}) => {
  const {
    contentId,
    header,
    collection,
    category,
    buttonLabel,
    sliderConfiguration
  } = data

  const { header: headerStyle } = styles

  const { loop, langDirection, delaySpeed, animationSpeed, draggable } =
    sliderConfiguration ?? {}

  const headerClassName = `header-${props.componentId}`

  const renderButton = useGetComponentFromChildren(children, ModuleGroup.BUTTON)
  const renderContentNotFound = useGetComponentFromChildren(
    children,
    ModuleGroup.CONTENT_NOT_FOUND
  )
  const renderCategoryListItem = useGetComponentFromChildren(
    children,
    ModuleGroup.CATEGORY_LIST_ITEM
  )

  const renderCollectionSlide = () => {
    if (isEmpty(collection)) {
      return <div>{renderContentNotFound}</div>
    }
    return (
      <div className="mt-8">
        <SwiperComponent
          dir={langDirection?.value?.toLocaleLowerCase()}
          pagination={{
            dynamicBullets: true
          }}
          breakpoints={breakpoints}
          items={collection}
          loop={loop}
          speed={animationSpeed.value ?? 500}
          autoplay={{
            delay: delaySpeed.value ?? 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          scrollbar={{ draggable }}
          modules={[Pagination, Autoplay]}
          className="h-full"
          centeredSlides
        >
          {(item: any, idx: number) => {
            return (
              <React.Fragment key={item.id ?? idx}>
                {React.cloneElement(renderCategoryListItem, {
                  key: item.id ?? idx,
                  isSlide: true,
                  ...item
                })}
              </React.Fragment>
            )
          }}
        </SwiperComponent>
      </div>
    )
  }

  const { builderAttributes } = useIsInIframe(props, [
    BuilderAttributes.ADD_AFTER,
    BuilderAttributes.ADD_BEFORE,
    BuilderAttributes.DELETE,
    BuilderAttributes.DUPLICATE,
    BuilderAttributes.EDIT
  ])

  return (
    <section {...builderAttributes} className="max-w-default mx-auto   px-2">
      <_JSXStyle id={contentId}>{`
          .${headerClassName} {
            ${handleTypographyStyle(headerStyle)}
          }
          `}</_JSXStyle>
      {header && (
        <div className="mb-4 flex justify-between items-center w-full">
          <h3 className={cn('flex-1 mobile:!text-lg', headerClassName)}>
            {header}
          </h3>
          {category?.urlKey &&
            buttonLabel &&
            React.cloneElement(renderButton, {
              label: buttonLabel,
              size: 'small',
              link: { href: `category/${category?.urlKey}` }
            })}
        </div>
      )}
      <div className="w-full">{renderCollectionSlide()}</div>
    </section>
  )
}

export default memo(CategoryListSlide)
