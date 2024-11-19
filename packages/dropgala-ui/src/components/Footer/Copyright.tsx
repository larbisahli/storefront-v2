import React from 'react'

import { siteSettings } from '../../settings/site-settings'
import Image from '../common/Image'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { ConfigType } from '@dropgala/types/config.type'

interface CopyrightProps {
  payment?: {
    id: string | number
    path?: string
    name: string
    image: string
    width: number
    height: number
  }[]
  storeConfig: ConfigType
}

const Copyright: React.FC<CopyrightProps> = ({ payment, storeConfig }) => {
  return null
}

export default Copyright
