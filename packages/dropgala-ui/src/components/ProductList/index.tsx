import React from 'react'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { StoreProps, selectConfig } from '@dropgala/store'
import { ProductType } from '@dropgala/types/product.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import {
  ModuleGroup,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import cn from 'clsx'
import { selectCollection } from '@dropgala/store/Collections'
import useGetComponentFromChildren from '@dropgala/utils/hooks/useGetComponentFromChildren'
import { resolvePath } from '@dropgala/utils/helpers'

interface Props extends StoreProps {}

const ProductList: React.FC<Props> = ({
  useAppSelector,
  children,
  ...props
}) => {
  const { language } = useAppSelector(selectConfig)
  const products = useAppSelector((state) =>
    selectCollection(state, 'categoryProducts')
  )
  const { __ } = useTranslation(language, 'exception')

  const data = resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const styles = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )

  const renderContentNotFound = useGetComponentFromChildren(
    children,
    ModuleGroup.CONTENT_NOT_FOUND
  )
  const renderProductCard = useGetComponentFromChildren(
    children,
    ModuleGroup.PRODUCT_CARD
  )
  const renderButton = useGetComponentFromChildren(children, ModuleGroup.BUTTON)

  return (
    <section
      id={props.componentId}
      className={cn('px-1   max-w-default mx-auto')}
    >
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
          <div className="grid grid-cols-1 my-10 mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-5 desktop:grid-cols-6">
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

export default ProductList
