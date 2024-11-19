import React from 'react'
import { StoreProps } from '@dropgala/store'
import { resolvePath } from '@dropgala/utils/helpers'
import {
  BuilderAttributes,
  SectionSize,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import cn from 'clsx'
import DynamicContent from '../common/DynamicContent'
import _JSXStyle from 'styled-jsx/style'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

interface Props extends StoreProps {}

const Html: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const data = resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const { sectionSize, css } = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )
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
        ' ',
        sectionSize === SectionSize.AUTO && 'max-w-default mx-auto',
        sectionSize === SectionSize.FULL && 'max-w-full'
      )}
    >
      <_JSXStyle id={data.contentId}>{css}</_JSXStyle>
      <DynamicContent tagName="div" innerHtml={data?.html} />
    </section>
  )
}

export default Html
