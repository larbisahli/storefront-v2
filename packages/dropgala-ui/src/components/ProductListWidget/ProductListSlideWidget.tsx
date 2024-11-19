import React from 'react'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { StoreProps, selectConfig } from '@dropgala/store'
import { ProductType } from '@dropgala/types/product.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { resolvePath } from '@dropgala/utils/helpers'
import {
  BuilderAttributes,
  ModuleGroup,
  SectionSize,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import Link from 'next/link'
import cn from 'clsx'
import dynamic from 'next/dynamic'
import { Pagination } from 'swiper/modules'
import _JSXStyle from 'styled-jsx/style'
import { handleTypographyStyle } from '@dropgala/utils/styles'
import { Autoplay } from 'swiper/modules'
import useGetComponentFromChildren from '@dropgala/utils/hooks/useGetComponentFromChildren'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

const SwiperComponent = dynamic(() => import('../common/Swiper'), {
  loading: () => <></>,
  ssr: false
})

interface Props extends StoreProps {}

const breakpoints = {
  350: {
    width: 350,
    slidesPerView: 2
  },
  400: {
    width: 400,
    slidesPerView: 2
  },
  640: {
    width: 640,
    slidesPerView: 3
  },
  768: {
    width: 768,
    slidesPerView: 4
  },
  1024: {
    width: 1024,
    slidesPerView: 5
  },
  1200: {
    width: 1200,
    slidesPerView: 6
  },
  1300: {
    width: 1300,
    slidesPerView: 7
  }
}

const ProductListSlideWidget: React.FC<Props> = ({
  useAppSelector,
  children,
  ...props
}) => {
  const { language } = useAppSelector(selectConfig)
  const { __ } = useTranslation(language, 'exception')

  const data = resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const styles = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )

  const headerStyle = styles.header
  const { loop, langDirection, delaySpeed, animationSpeed, draggable } =
    data?.sliderConfiguration ?? {}

  const products = resolvePath<ProductType[]>(data, 'collection', [])

  const renderContentNotFound = useGetComponentFromChildren(
    children,
    ModuleGroup.CONTENT_NOT_FOUND
  )
  const renderProductCard = useGetComponentFromChildren(
    children,
    ModuleGroup.PRODUCT_CARD
  )
  const renderButton = useGetComponentFromChildren(children, ModuleGroup.BUTTON)

  const headerClassName = `header-${props.componentId}`
  const { builderAttributes } = useIsInIframe(props, [
    BuilderAttributes.ADD_AFTER,
    BuilderAttributes.ADD_BEFORE,
    BuilderAttributes.DELETE,
    BuilderAttributes.DUPLICATE,
    BuilderAttributes.EDIT
  ])
  return (
    <section
      {...builderAttributes}
      className={cn(
        'px-1  ',
        styles?.sectionSize === SectionSize.AUTO && 'max-w-default mx-auto',
        styles?.sectionSize === SectionSize.FULL && 'max-w-full'
      )}
    >
      <_JSXStyle id={props.componentId}>{`
          .${headerClassName} {
            ${handleTypographyStyle(headerStyle)}
          }
      `}</_JSXStyle>
      {isEmpty(products) && (
        <div
          className="w-full flex flex-col items-center
       pt-10px md:pt-40px lg:pt-20px pb-40px"
        >
          {renderContentNotFound}
        </div>
      )}

      {!isEmpty(products) && (
        <>
          <div className="flex justify-between items-center">
            {data?.header && (
              <h3 className={headerClassName}>{data?.header}</h3>
            )}
            {data?.category?.urlKey &&
              data?.buttonLabel &&
              React.cloneElement(renderButton, {
                label: data?.buttonLabel,
                size: 'small',
                link: {
                  href: {
                    pathname: '/category/[slug]',
                    query: { slug: data?.category?.urlKey }
                  }
                }
              })}
          </div>
          <div className="w-full mt-5">
            <SwiperComponent
              dir={langDirection?.value?.toLocaleLowerCase()}
              pagination={{
                dynamicBullets: true
              }}
              breakpoints={breakpoints}
              items={products}
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
              {(item: ProductType) => (
                <React.Fragment key={item.id}>
                  {React.cloneElement(renderProductCard, { product: item })}
                </React.Fragment>
              )}
            </SwiperComponent>
          </div>
        </>
      )}
    </section>
  )
}

export default ProductListSlideWidget
