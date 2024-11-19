import { StoreLayoutComponentContentType } from '@dropgala/types'
import React from 'react'
import Vimeo from 'react-vimeo'

interface Props {
  videoId: string
  data: StoreLayoutComponentContentType
  componentId: string
}

const VimeoVideo: React.FC<Props> = ({ videoId, data, componentId }) => {
  return <Vimeo videoId={videoId} autoplay />
}

export default VimeoVideo
