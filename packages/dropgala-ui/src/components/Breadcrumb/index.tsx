import ChevronRight from '@dropgala/assets/icons/chevron-right'
import HomeOutline from '@dropgala/assets/icons/home'
import React from 'react'
import { ROUTES } from '@dropgala/utils/routes'
import Link from '../common/Link'
import { selectBreadcrumbs } from '@dropgala/store/Breadcrumbs'
import { StoreProps } from '@dropgala/store'
import { cloneDeep } from '@dropgala/utils/lodashFunctions'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'
import { BuilderAttributes } from '@dropgala/types'

interface Props extends StoreProps {}

const Breadcrumb: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const state = useAppSelector(selectBreadcrumbs)
  const breadcrumbs = cloneDeep(state.breadcrumbs)
  const { builderAttributes } = useIsInIframe(props, [
    BuilderAttributes.ADD_LIBRARY
  ])
  return (
    <section
      {...builderAttributes}
      className="max-w-default mx-auto mt-2 py-3 items-center text-xs text-gray-700 mb-4 hidden desktop:flex"
    >
      <ol
        className="flex justify-center items-center"
        itemScope
        itemType="http://schema.org/BreadcrumbList"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="http://schema.org/ListItem"
        >
          <Link
            itemScope
            itemType="http://schema.org/Thing"
            itemProp="item"
            itemId={ROUTES.HOME}
            href={ROUTES.HOME}
          >
            <div className="flex items-center hover:text-rose-500 cursor-pointer">
              <div className="mr-1.5 text-skin-base text-xs">
                <HomeOutline />
              </div>
              <span itemProp="name">Home</span>
            </div>
          </Link>
          <meta itemProp="position" content="0" />
        </li>
        {breadcrumbs
          ?.sort((a, b) => a.categoryLevel - b.categoryLevel)
          ?.map((breadcrumb, idx) => {
            return (
              <li
                key={breadcrumb.categoryLevel}
                itemProp="itemListElement"
                itemScope
                itemType="http://schema.org/ListItem"
                className="flex justify-center items-center"
              >
                <div className="text-skin-base text-opacity-40 mx-3">
                  <ChevronRight width={10} height={10} />
                </div>
                <Link
                  href={{
                    pathname: '/category/[slug]',
                    query: { slug: breadcrumb.categoryUrl }
                  }}
                  itemScope
                  itemType="http://schema.org/Thing"
                  itemProp="item"
                  itemId={`/category/${breadcrumb.categoryUrl}`}
                >
                  <div
                    itemProp="name"
                    className="flex items-center leading-none text-xs hover:text-rose-500"
                  >
                    {breadcrumb?.categoryName}
                  </div>
                </Link>
                <meta itemProp="position" content={(idx + 1).toString()} />
              </li>
            )
          })}
        {state?.name && (
          <li
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
          >
            <div
              className="flex justify-center items-center"
              itemScope
              itemType="http://schema.org/Thing"
              itemProp="item"
            >
              <div className="text-skin-base text-opacity-40 text-xs mx-2">
                <ChevronRight width={10} height={10} />
              </div>
              <div
                itemProp="name"
                className="inline-flex items-center leading-none text-black line-clamp-1"
              >
                {state.name}
              </div>
            </div>
            <meta
              itemProp="position"
              content={(breadcrumbs?.length + 1).toString()}
            />
          </li>
        )}
      </ol>
    </section>
  )
}

export default Breadcrumb
