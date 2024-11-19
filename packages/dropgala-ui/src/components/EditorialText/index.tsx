import React from 'react'
import { StoreProps } from '@dropgala/store'
import cn from 'clsx'
import { resolvePath } from '@dropgala/utils/helpers'
import ReactHtmlParser from 'html-react-parser'
import _JSXStyle from 'styled-jsx/style'
import {
  BuilderAttributes,
  SectionSize,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

interface Props extends StoreProps {}

const EditorialText: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const { contentId, content = '' } =
    resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const styles = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )
  const editorialTextClassName = `editorial-text-${props.componentId}`
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
        'mb-8  ',
        styles?.sectionSize === SectionSize.AUTO && 'max-w-default mx-auto',
        styles?.sectionSize === SectionSize.FULL && 'max-w-full',
        'flex justify-center items-center flex-col px-2'
      )}
    >
      <_JSXStyle id={contentId}>{`
          .${editorialTextClassName} {
            font-family: var(${styles?.fontFamily?.value});
          }
          `}</_JSXStyle>
      <div className={editorialTextClassName}>
        {ReactHtmlParser(content ?? '')}
      </div>
    </section>
  )
}

export default EditorialText
