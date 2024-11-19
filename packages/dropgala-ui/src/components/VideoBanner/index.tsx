import React from 'react'
import { StoreProps } from '@dropgala/store'
import dynamic from 'next/dynamic'
import _JSXStyle from 'styled-jsx/style'
import {
  Alignment,
  BuilderAttributes,
  ModuleGroup,
  SectionSize,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import cn from 'clsx'
import { resolvePath } from '@dropgala/utils/helpers'
import { handleOverlayStyle } from '@dropgala/utils/styles'
import useGetComponentFromChildren from '@dropgala/utils/hooks/useGetComponentFromChildren'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

const YouTubeVideo = dynamic(() => import('./YoutubeVideo'), {
  loading: () => <></>,
  ssr: false
})

const VimeoVideo = dynamic(() => import('./VimeoVideo'), {
  loading: () => <></>,
  ssr: false
})

interface Props extends StoreProps {}

const VIMEO_FORMAT = /(?:https?\/\/)?vimeo.com[\w/]*\/(\d+)$/
const YOUTUBE_FORMAT = /(?:https?\/\/)?www.youtube.com\/watch\?v=([\w-]+)/

const VideoBanner: React.FC<Props> = ({
  useAppSelector,
  children,
  ...props
}) => {
  const data = resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const styles = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )

  const [, vimeoId] = VIMEO_FORMAT.exec(data.videoUrl) || []
  const [, youtubeId] = YOUTUBE_FORMAT.exec(data.videoUrl) || []

  const videoBannerClass = `video-banner-${props.componentId}`
  const opacityClassName = `video-banner-opacity-${props.componentId}`

  const renderBannerWidget = useGetComponentFromChildren(
    children,
    ModuleGroup.BANNER_WIDGET
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
        styles?.sectionSize === SectionSize.AUTO && 'max-w-default mx-auto',
        styles?.sectionSize === SectionSize.FULL && 'max-w-full'
      )}
    >
      <_JSXStyle id={data.contentId}>{`
          .${videoBannerClass} {
            position: relative;
          }
          .${opacityClassName} {
            ${handleOverlayStyle(styles?.overlay, styles?.border)}
          }
          `}</_JSXStyle>
      <figure
        className={cn(
          'relative bg-gray-100',
          !data?.displayContent && 'pointer-events-none'
        )}
      >
        <div className={cn('-z-10', opacityClassName)}></div>
        {vimeoId && (
          <VimeoVideo
            videoId={vimeoId}
            data={data}
            componentId={props.componentId}
          />
        )}
        {youtubeId && (
          <YouTubeVideo
            videoId={youtubeId}
            data={data}
            styles={styles}
            componentId={props.componentId}
          />
        )}
        <div
          className={cn(
            'absolute top-0 left-0 right-0 bottom-0',
            'z-10 flex m-[50px] justify-center items-center',
            data?.contentAlignment === Alignment.LEFT && '!justify-end',
            data?.contentAlignment === Alignment.CENTER && '!justify-center',
            data?.contentAlignment === Alignment.RIGHT && '!justify-start'
          )}
        >
          {data?.displayContent &&
            React.cloneElement(renderBannerWidget, { data, styles })}
        </div>
      </figure>
    </section>
  )
}

export default VideoBanner
