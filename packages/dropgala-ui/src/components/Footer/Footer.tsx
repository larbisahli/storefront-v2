import { Fragment } from 'react'

import { StoreProps, selectConfig } from '@dropgala/store'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import WidgetLink from './widget/WidgetLink'
import Link from 'next/link'
import { mediaURL } from '@dropgala/utils/utils'
import Image from '../common/Image'
import WidgetSocials from './widget/WidgetSocials'
import cn from 'clsx'
import {
  BuilderAttributes,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import { resolvePath } from '@dropgala/utils/helpers'
import _JSXStyle from 'styled-jsx/style'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

interface Props extends StoreProps {}

const year = new Date().getFullYear()
const Footer: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const storeConfig = useAppSelector(selectConfig)
  const { __ } = useTranslation(storeConfig?.language, 'common')

  const data = resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const styles = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )

  const storeLogo = !!storeConfig?.logo?.length
    ? `${mediaURL}/${storeConfig?.logo[0].image}`
    : '/assets/images/default_logo.webp'

  const footerClassName = `footer-${props.componentId}`
  const footerBorderClassName = `footer-border-${props.componentId}`
  const { builderAttributes } = useIsInIframe(props, [
    BuilderAttributes.ADD_BEFORE,
    BuilderAttributes.EDIT
  ])
  return (
    <Fragment>
      <_JSXStyle id={data.contentId}>{`
          .${footerClassName} {
            color: ${styles?.textColor ?? '#000'};
            background: ${styles?.backgroundColor ?? '#fff'};
          }
          .${footerBorderClassName} {
            border-color: ${styles?.borderColor ?? '#e6e6e6'};
          }
          `}</_JSXStyle>
      <footer
        {...builderAttributes}
        className={cn(
          'mt-[50px] pt-14 border-1 border-t',
          footerClassName,
          footerBorderClassName
        )}
      >
        <div className="max-w-default mx-auto px-4 pb-4">
          <div className="flex justify-between">
            <div className="flex-3 mx-5 hidden desktop:block tablet:block laptop:block">
              <Link href="/">
                <div className="relative">
                  <Image
                    isCustomUrl
                    src={storeLogo}
                    objectFit="cover"
                    height={150}
                    width={150}
                    alt="logo"
                  />
                </div>
              </Link>
            </div>
            <div className="flex-1 flex justify-end">
              <div
                className={cn(
                  'grid gap-5 mobile:!grid-cols-2 w-fit mobile:w-full',
                  data?.links.length === 1 && 'grid-cols-1 tablet:grid-cols-1',
                  data?.links.length === 2 && 'grid-cols-2 tablet:grid-cols-2',
                  data?.links.length === 3 && 'grid-cols-3 tablet:grid-cols-3',
                  data?.links.length === 4 && 'grid-cols-4 tablet:grid-cols-3'
                )}
              >
                {data?.links?.map((link: any, idx: number) => (
                  <WidgetLink
                    key={`footer-widget--key-${idx}`}
                    data={link}
                    storeConfig={storeConfig}
                    className="pb-3.5 sm:pb-0 col-span-1 min-w-[200px] mobile:min-w-fit tablet:min-w-fit md:col-span-2"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="  max-w-default mx-auto px-4 flex justify-end items-center">
          <WidgetSocials
            socials={data?.socials}
            storeConfig={storeConfig}
            className="w-fit mb-2"
          />
        </div>
        <div
          className={cn(
            'flex text-center justify-center border-t border-gray-300 py-3',
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

export default Footer
