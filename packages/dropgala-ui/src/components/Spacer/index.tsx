import React from 'react'
import { StoreProps } from '@dropgala/store'
import cn from 'clsx'
import { resolvePath } from '@dropgala/utils/helpers'
import _JSXStyle from 'styled-jsx/style'
import {
  BuilderAttributes,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

interface Props extends StoreProps {}

const Spacer: React.FC<Props> = ({ ...props }) => {
  const { spaceHeight = 50 } = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )
  const spacerClassName = `spacer-${props.componentId}`
  const { builderAttributes } = useIsInIframe(props, [
    BuilderAttributes.ADD_AFTER,
    BuilderAttributes.ADD_BEFORE,
    BuilderAttributes.DELETE,
    BuilderAttributes.DUPLICATE,
    BuilderAttributes.EDIT
  ])
  return (
    <section {...builderAttributes} className="max-w-full  ">
      <_JSXStyle id={props.componentId}>{`
          .${spacerClassName} {
            height: ${spaceHeight}px;
          }
      `}</_JSXStyle>
      <div className={spacerClassName}></div>
    </section>
  )
}

export default Spacer
