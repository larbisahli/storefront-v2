import React from 'react'
import { StoreProps, selectConfig } from '@dropgala/store'
import dynamic from 'next/dynamic'
import cn from 'clsx'
import {
  BuilderAttributes,
  ModuleGroup,
  SectionSize,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import { getThumbnail, resolvePath } from '@dropgala/utils/helpers'
import _JSXStyle from 'styled-jsx/style'
import {
  handleBorderStyle,
  handleTypographyStyle
} from '@dropgala/utils/styles'
import Link from 'next/link'
import useGetComponentFromChildren from '@dropgala/utils/hooks/useGetComponentFromChildren'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

const NextImage = dynamic(() => import('../common/Image'), {
  loading: () => <></>,
  ssr: false
})

interface Props extends StoreProps {}

const Image = dynamic(() => import('../common/Image'), {
  loading: () => <></>,
  ssr: false
})

const ImageBannerStack: React.FC<Props> = ({
  useAppSelector,
  children,
  ...props
}) => {
  const { device } = useAppSelector(selectConfig)
  // const { width } = useWindowSize()

  const { header, description, thumbnail, buttonLabel, buttonLink } =
    resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const {
    header: headerStyle,
    description: descriptionStyle,
    sectionSize,
    objectFit,
    imageBorder
  } = resolvePath<StoreLayoutComponentStylesType>(props, 'styles', {})

  const { image, placeholder, width, height } = getThumbnail(thumbnail)

  const headerClassName = `header-${props.componentId}`
  const descriptionClassName = `description-${props.componentId}`
  const imageBorderWrapperClassName = `image-wrapper-${props.componentId}`
  const imageBorderClassName = `image-${props.componentId}`

  const renderButton = useGetComponentFromChildren(children, ModuleGroup.BUTTON)
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
      <_JSXStyle id={props.componentId}>{`
          .${headerClassName} {
            ${handleTypographyStyle(headerStyle)}
          }
          .${descriptionClassName} {
            ${handleTypographyStyle(descriptionStyle)}
          }
          .${imageBorderWrapperClassName} {
            ${handleBorderStyle(imageBorder)}
          }
          .${imageBorderClassName} {
            border-radius: ${imageBorder?.borderRadius}px;
          }
      `}</_JSXStyle>
      <div className={cn('desktop:p-8 p-4 !px-0')}>
        <div className={cn('flex justify-center items-center flex-col')}>
          <div
            className={cn(
              'w-full mb-6 max-w-[800px] flex flex-col items-center justify-center'
            )}
          >
            <h3 className={cn('mb-5 text-center px-1', headerClassName)}>
              {header}
            </h3>
            <p
              className={cn(
                'mb-8 max-w-default text-center px-2',
                descriptionClassName
              )}
            >
              {description}
            </p>
            <div className={cn('flex justify-center')}>
              {buttonLabel &&
                React.cloneElement(renderButton, {
                  label: buttonLabel,
                  link: { href: buttonLink ?? '/' }
                })}
            </div>
          </div>
          <div className={cn('w-full mt-8 flex justify-center')}>
            <div className={cn('max-w-[1000px] h-fit', imageBorderClassName)}>
              <NextImage
                src={image}
                customPlaceholder={placeholder}
                width={width}
                height={height}
                objectFit={objectFit?.value}
                className={cn(imageBorderClassName)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageBannerStack
