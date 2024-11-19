import React from 'react'

import { footer } from '../data'
import WidgetSocials from './WidgetSocials'
import WidgetLink from './WidgetLink'
import WidgetSubscription from './WidgetSubscription'
import { ConfigType } from '@dropgala/types/config.type'

interface WidgetsProps {
  widgets: {
    id: number
    widgetTitle: string
    lists: any
  }[]
  storeConfig: ConfigType
}

const Widgets: React.FC<WidgetsProps> = ({ storeConfig, widgets }) => {
  const { social } = footer
  return (
    <div className="mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 2xl:px-10">
      <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 pb-[50px]">
        <WidgetSocials
          social={social}
          storeConfig={storeConfig}
          className="col-span-full sm:col-span-1 md:col-span-3 border-b sm:border-b-0 border-skin-three mb-4 sm:mb-0"
        />
        <WidgetSubscription className="col-span-full sm:col-span-1 md:col-start-4 xl:col-start-auto md:col-span-4 xl:col-span-3 2xl:ps-7 3xl:ps-16 pt-8 sm:pt-0 border-t sm:border-t-0 border-skin-three " />
      </div>
    </div>
  )
}

export default Widgets
