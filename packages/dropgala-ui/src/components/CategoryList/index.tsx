import cn from 'clsx'
import React, { memo } from 'react'

import { StoreProps } from '@dropgala/store'
import dynamic from 'next/dynamic'
import { resolvePath } from '@dropgala/utils/helpers'
import {
  BuilderAttributes,
  ModuleGroup,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import { handleTypographyStyle } from '@dropgala/utils/styles'
import _JSXStyle from 'styled-jsx/style'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import useGetComponentFromChildren from '@dropgala/utils/hooks/useGetComponentFromChildren'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

const Image = dynamic(() => import('../common/Image'), {
  loading: () => <></>,
  ssr: false
})

const Link = dynamic(() => import('../common/Link'), {
  loading: () => <></>,
  ssr: false
})

const CategoryListSlide: React.FC<StoreProps> = ({
  useAppSelector,
  children,
  ...props
}) => {
  const {
    contentId,
    header,
    collection,
    category,
    buttonLabel,
    categoriesPerView
  } = resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const { header: headerStyle } = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )

  const headerClassName = `header-${props.componentId}`
  const gridCol3ClassName = `grid-3-${props.componentId}`
  const gridCol4ClassName = `grid-4-${props.componentId}`
  const gridCol5ClassName = `grid-5-${props.componentId}`
  const gridCol6ClassName = `grid-6-${props.componentId}`

  const renderButton = useGetComponentFromChildren(children, ModuleGroup.BUTTON)
  const renderContentNotFound = useGetComponentFromChildren(
    children,
    ModuleGroup.CONTENT_NOT_FOUND
  )
  const renderCategoryListItem = useGetComponentFromChildren(
    children,
    ModuleGroup.CATEGORY_LIST_ITEM
  )

  const renderCollectionList = () => {
    if (isEmpty(collection)) {
      return <div>{renderContentNotFound}</div>
    }
    return (
      <div
        className={cn(
          'grid mx-auto desktop:gap-5 gap-3 mt-8 w-full',
          Number(categoriesPerView) === 3 && gridCol3ClassName,
          Number(categoriesPerView) === 4 && gridCol4ClassName,
          Number(categoriesPerView) === 5 && gridCol5ClassName,
          Number(categoriesPerView) === 6 && gridCol6ClassName
        )}
      >
        {collection?.map((item: any, idx: number) => {
          return (
            <React.Fragment key={item.id ?? idx}>
              {React.cloneElement(renderCategoryListItem, {
                key: item.id ?? idx,
                itemsPerColumn: Number(categoriesPerView),
                ...item
              })}
            </React.Fragment>
          )
        })}
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
    <section
      {...builderAttributes}
      className={cn(
        'my-2  ',
        'max-w-default mx-auto',
        'flex justify-center items-center flex-col px-2'
      )}
    >
      <_JSXStyle id={contentId}>{`
          .${headerClassName} {
            ${handleTypographyStyle(headerStyle)}
          }
          .${gridCol3ClassName} {
            /* Desktop */
            @media (min-width: 1025px) {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
            /* Laptop */
            @media (min-width: 811px) and (max-width: 1024px) {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
            /* Tablet */
            @media (min-width: 481px) and (max-width: 810px) {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
            /* Mobile */
            @media (min-width: 320px) and (max-width: 480px) {
              grid-template-columns: repeat(1, minmax(0, 1fr));
            }
          }
          .${gridCol4ClassName} {
            @media (min-width: 1025px) {
              grid-template-columns: repeat(4, minmax(0, 1fr));
            }
            @media (min-width: 811px) and (max-width: 1024px) {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
            @media (min-width: 481px) and (max-width: 810px) {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
            @media (min-width: 320px) and (max-width: 480px) {
              grid-template-columns: repeat(1, minmax(0, 1fr));
            }
          }
          .${gridCol5ClassName} {
            @media (min-width: 1025px) {
              grid-template-columns: repeat(5, minmax(0, 1fr));
            }
            @media (min-width: 811px) and (max-width: 1024px) {
              grid-template-columns: repeat(4, minmax(0, 1fr));
            }
            @media (min-width: 481px) and (max-width: 810px) {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
            @media (min-width: 320px) and (max-width: 480px) {
              grid-template-columns: repeat(1, minmax(0, 1fr));
            }
          }
          .${gridCol6ClassName} {
            @media (min-width: 1025px) {
              grid-template-columns: repeat(6, minmax(0, 1fr));
            }
            @media (min-width: 811px) and (max-width: 1024px) {
              grid-template-columns: repeat(4, minmax(0, 1fr));
            }
            @media (min-width: 481px) and (max-width: 810px) {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
            @media (min-width: 320px) and (max-width: 480px) {
              grid-template-columns: repeat(1, minmax(0, 1fr));
            }
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
      <div className="w-full">{renderCollectionList()}</div>
    </section>
  )
}

export default memo(CategoryListSlide)
