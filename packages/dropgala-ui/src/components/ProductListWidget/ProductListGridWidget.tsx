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
import _JSXStyle from 'styled-jsx/style'
import { handleTypographyStyle } from '@dropgala/utils/styles'
import useGetComponentFromChildren from '@dropgala/utils/hooks/useGetComponentFromChildren'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

interface Props extends StoreProps {}

const ProductListGridWidget: React.FC<Props> = ({
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

  const headerStyle = styles?.header

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
            <h3 className={headerClassName}>{data?.header}</h3>
            {data?.category?.urlKey &&
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
          <div
            className={cn(
              'grid grid-cols-1 my-10 mobile:grid-cols-2',
              data?.productsPerView === 6 &&
                'tablet:grid-cols-3 laptop:grid-cols-5 desktop:grid-cols-6',
              data?.productsPerView === 5 &&
                'tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5',
              data?.productsPerView === 4 &&
                'tablet:grid-cols-3 desktop:grid-cols-4',
              data?.productsPerView === 3 && 'desktop:grid-cols-3'
            )}
          >
            {products?.map((item: ProductType) => (
              <React.Fragment key={item.id}>
                {React.cloneElement(renderProductCard, { product: item })}
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default ProductListGridWidget
