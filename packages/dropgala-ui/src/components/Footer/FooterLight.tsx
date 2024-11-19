import { Fragment } from 'react'

import { StoreProps, selectConfig } from '@dropgala/store'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import WidgetLink from './widget/WidgetLink'
import WidgetSocials from './widget/WidgetSocials'
import {
  BuilderAttributes,
  StoreLayoutComponentContentType
} from '@dropgala/types'
import { resolvePath } from '@dropgala/utils/helpers'
import _JSXStyle from 'styled-jsx/style'
import cn from 'clsx'
import Link from 'next/link'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

interface Props extends StoreProps {}

const year = new Date().getFullYear()
const FooterLight: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const storeConfig = useAppSelector(selectConfig)
  const { __ } = useTranslation(storeConfig?.language, 'common')

  const data = resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const styles = resolvePath<StoreLayoutComponentContentType>(
    props,
    'styles',
    {}
  )

  const footerClassName = `footer-${props.componentId}`
  const footerBorderClassName = `footer-border-${props.componentId}`
  const { builderAttributes } = useIsInIframe(props, [
    BuilderAttributes.ADD_AFTER,
    BuilderAttributes.EDIT
  ])
  return (
    <Fragment>
      <footer
        {...builderAttributes}
        className={cn(
          'pt-4 border-1 border-t',
          footerClassName,
          footerBorderClassName
        )}
      >
        <_JSXStyle id={data.contentId}>{`
          .${footerClassName} {
            color: ${styles?.textColor ?? '#000'};
            background: ${styles?.backgroundColor ?? '#fff'};
          }
          .${footerBorderClassName} {
            border-color: ${styles?.borderColor ?? '#e6e6e6'};
          }
          `}</_JSXStyle>
        <div className="  max-w-default mx-auto pb-4 px-4">
          <div className="flex items-center justify-between mobile:flex-col mobile:justify-center tablet:flex-col tablet:justify-center">
            <div className="flex-1 flex items-center justify-between">
              {data?.links?.map((link: any, idx: number) => (
                <WidgetLink
                  key={`footer-widget--key-${idx}`}
                  data={link}
                  disableGroupName
                  storeConfig={storeConfig}
                  listClassName={
                    '!flex-row gap-x-5 !space-y-0 flex-wrap mobile:justify-center tablet:justify-center'
                  }
                  listItemClassName={''}
                  className=""
                />
              ))}
            </div>
            <div className="flex justify-end items-center mobile:mt-4 tablet:mt-4">
              <WidgetSocials
                socials={data?.socials}
                storeConfig={storeConfig}
                className="w-fit"
              />
            </div>
          </div>
        </div>
        <div
          className={cn(
            'flex justify-between mobile:justify-center mobile:items-center   max-w-default mx-auto px-4 border-t py-3',
            footerBorderClassName
          )}
        >
          <p className="text-skin-base text-sm leading-7 lg:leading-[27px] lg:text-15px">
            &copy;&nbsp;{__('copyright')} {year}&nbsp;
            <a
              className="text-skin-base transition-colors duration-200 ease-in-out hover:text-skin-primary"
              href={'/'}
            >
              {storeConfig?.storeName}
            </a>
            &nbsp; {__('All Rights Reserved')}
          </p>
        </div>
      </footer>
    </Fragment>
  )
}

export default FooterLight
