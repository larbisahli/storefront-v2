import React from 'react'
import { StoreProps } from '@dropgala/store'
import cn from 'clsx'
import { resolvePath } from '@dropgala/utils/helpers'
import {
  BuilderAttributes,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import _JSXStyle from 'styled-jsx/style'
import { handleTypographyStyle } from '@dropgala/utils/styles'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

interface Props extends StoreProps {}

const Text: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const { contentId, header, description } =
    resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const { header: headerStyle, description: descriptionStyle } =
    resolvePath<StoreLayoutComponentStylesType>(props, 'styles', {})

  const headerClassName = `header-${props.componentId}`
  const descriptionClassName = `description-${props.componentId}`
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
        'my-8  ',
        'max-w-default mx-auto',
        'flex justify-center items-center flex-col px-2'
      )}
    >
      <_JSXStyle id={contentId}>{`
          .${headerClassName} {
            ${handleTypographyStyle(headerStyle)}
          }
          .${descriptionClassName} {
            ${handleTypographyStyle(descriptionStyle)}
          }
          `}</_JSXStyle>
      <div className="max-w-[900px] max-auto">
        {header && (
          <div className="mb-4 text-3xl">
            <h2 className={headerClassName}>{header}</h2>
          </div>
        )}
        <div className="break-words text-center md:text-lg">
          <p className={descriptionClassName}>{description}</p>
        </div>
      </div>
    </section>
  )
}

export default Text
