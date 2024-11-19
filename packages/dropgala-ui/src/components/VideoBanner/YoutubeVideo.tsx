import React from 'react'
import YouTube from 'react-youtube'
import cn from 'clsx'
import _JSXStyle from 'styled-jsx/style'
import { handleBorderStyle } from '@dropgala/utils/styles'
import {
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'

interface Props {
  videoId: string
  data: StoreLayoutComponentContentType
  styles: StoreLayoutComponentStylesType
  componentId: string
}

const YoutubeVideo: React.FC<Props> = ({
  videoId,
  data,
  styles,
  componentId
}) => {
  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      loop: Number(data?.loop),
      autoplay: data?.autoplay,
      controls: Number(data?.controls),
      mute: Number(data?.mute)
    }
  }

  // 16:9 Aspect Ratio (divide 9 by 16 = 0.5625)
  const embedded_16_9_ClassName = `embedded-video-16-9-${componentId}`
  // 9:16 Aspect Ratio (divide 16 by 9 = 1,777)
  const embedded_9_16_ClassName = `embedded-video-9-16-${componentId}`

  return (
    <>
      <_JSXStyle id={`youtube-${data.contentId}`}>{`
          .${embedded_16_9_ClassName} {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
          }
          .${embedded_9_16_ClassName} {
            position: relative;
            padding-bottom: 177.77%;
            height: 0;
          }
          .${embedded_16_9_ClassName} iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            ${handleBorderStyle(styles?.border)}
          }

      `}</_JSXStyle>
      <YouTube
        videoId={videoId}
        className={cn('w-full h-full', embedded_16_9_ClassName)}
        opts={opts}
      />
    </>
  )
}

export default YoutubeVideo
