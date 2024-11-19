import React from 'react'
import { StoreProps, selectConfig } from '@dropgala/store'
import Link from 'next/link'
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
import useGetComponentFromChildren from '@dropgala/utils/hooks/useGetComponentFromChildren'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

const NextImage = dynamic(() => import('../common/Image'), {
  loading: () => <></>,
  ssr: false
})

interface Props extends StoreProps {}

const ImageBannerHeadingCenter: React.FC<Props> = ({
  useAppSelector,
  children,
  ...props
}) => {
  console.log({ children, ...props })
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
      <div className={cn('desktop:p-8 p-4 !px-2')}>
        <h3 className={cn('mb-16', headerClassName, 'text-center')}>
          {header}
        </h3>
        <div
          className={cn(
            'flex justify-center items-center',
            'desktop:flex-row flex-col'
          )}
        >
          <div
            className={cn(
              'desktop:w-1/2 w-full max-w-[800px] desktop:pr-12 mb-6 desktop:mb-0 desktop:block flex flex-col justify-center'
            )}
          >
            <p
              className={cn(
                'mb-8',
                descriptionClassName,
                'text-center desktop:text-left'
              )}
            >
              {description}
            </p>
            <div className={cn('flex desktop:justify-start justify-center')}>
              {React.cloneElement(renderButton, {
                label: buttonLabel,
                link: { href: buttonLink ?? '/' }
              })}
            </div>
          </div>
          <div
            className={cn(
              'desktop:w-1/2 w-full flex desktop:justify-end justify-center'
            )}
          >
            <div
              className={cn('w-[600px] h-fit flex-end', imageBorderClassName)}
            >
              <NextImage
                src={image}
                customPlaceholder={placeholder}
                width={600}
                height={350}
                objectFit={objectFit?.value}
                className={imageBorderClassName}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageBannerHeadingCenter
