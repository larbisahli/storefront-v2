import React from 'react'
import { StoreProps } from '@dropgala/store'
import cn from 'clsx'
import dynamic from 'next/dynamic'
import {
  BuilderAttributes,
  SectionSize,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import { getThumbnail, resolvePath } from '@dropgala/utils/helpers'
import _JSXStyle from 'styled-jsx/style'
import { handleBorderStyle, handleOverlayStyle } from '@dropgala/utils/styles'
import Link from 'next/link'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

const NextImage = dynamic(() => import('../common/Image'), {
  loading: () => <></>,
  ssr: false
})

interface Props extends StoreProps {}

const Image: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const data = resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const styles = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )

  const { contentId, thumbnail, link, target } = data
  const { image, placeholder, height, width } = getThumbnail(thumbnail)
  const opacityClassName = `image-banner-opacity-${props.componentId}`
  const imageBannerClassName = `image-banner-${props.componentId}`

  const { builderAttributes } = useIsInIframe(props, [
    BuilderAttributes.ADD_AFTER,
    BuilderAttributes.ADD_BEFORE,
    BuilderAttributes.DELETE,
    BuilderAttributes.DUPLICATE,
    BuilderAttributes.EDIT
  ])

  const renderImage = () => {
    return (
      <div className={imageBannerClassName}>
        <div className={opacityClassName}></div>
        <NextImage
          src={image}
          customPlaceholder={placeholder}
          width={width}
          height={height ?? 500}
          objectFit={styles.objectFit?.value}
          className={imageBannerClassName}
        />
      </div>
    )
  }

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
          .${opacityClassName} {
            margin-bottom: 6px;
            ${handleOverlayStyle(styles?.overlay, styles?.border)}
          }
          .${imageBannerClassName} {
            position: relative;
            ${handleBorderStyle(styles?.border)}
          }
          `}</_JSXStyle>
      {link ? (
        <Link target={target ?? '_self'} href={link}>
          {renderImage()}
        </Link>
      ) : (
        renderImage()
      )}
    </section>
  )
}

export default Image
