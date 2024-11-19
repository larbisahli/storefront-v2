import React from 'react'
import { StoreProps } from '@dropgala/store'
import cn from 'clsx'
import { resolvePath } from '@dropgala/utils/helpers'
import Link from 'next/link'
import {
  BuilderAttributes,
  ModuleGroup,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import { handleTypographyStyle } from '@dropgala/utils/styles'
import _JSXStyle from 'styled-jsx/style'
import useGetComponentFromChildren from '@dropgala/utils/hooks/useGetComponentFromChildren'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

interface Props extends StoreProps {}

const BannerWidgetBgCenter: React.FC<Props> = ({
  useAppSelector,
  children,
  ...props
}) => {
  const { header, description, buttonLink, buttonLabel } =
    resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const styles = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )

  const renderButton = useGetComponentFromChildren(children, ModuleGroup.BUTTON)

  const headerClassName = `header-${props.componentId}`
  const descriptionClassName = `description-${props.componentId}`
  const { builderAttributes } = useIsInIframe(props, [
    BuilderAttributes.ADD_LIBRARY
  ])
  return (
    <figcaption
      {...builderAttributes}
      className={cn(
        'scroll-mt-320px bg-white',
        'flex flex-col justify-center items-center p-5 rounded-md max-w-[600px] opacity-95 border'
      )}
    >
      <_JSXStyle id={props.componentId}>{`
          .${headerClassName} {
            ${handleTypographyStyle(styles.header)}
          }
          .${descriptionClassName} {
            ${handleTypographyStyle(styles.description)}
          }
      `}</_JSXStyle>
      <div className="flex flex-col justify-center items-center">
        <h2 className={cn('mb-5', headerClassName)}>{header}</h2>
        <p className={cn('text-center mb-8', descriptionClassName)}>
          {description}
        </p>
        {buttonLabel &&
          React.cloneElement(renderButton, {
            label: buttonLabel,
            link: { href: buttonLink ?? '/' }
          })}
      </div>
    </figcaption>
  )
}

export default BannerWidgetBgCenter
