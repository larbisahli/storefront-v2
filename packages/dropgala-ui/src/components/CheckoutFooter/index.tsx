import { StoreProps, selectConfig } from '@dropgala/store'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { siteSettings } from '../../settings/site-settings'

interface Props extends StoreProps {}

const CheckoutFooter = ({ useAppSelector }: Props) => {
  const { language } = useAppSelector(selectConfig)
  const { __ } = useTranslation(language, 'common')
  const year = new Date().getFullYear()
  return (
    <footer className="mt-12 flex items-center flex-col justify-center">
      <div className="font-light text-sm text-gray-800">
        {__('This site is protected by reCAPTCHA and the Google')}
        <a
          className="underline px-1"
          href="https://policies.google.com/privacy"
          target="__blank"
        >
          {__('Privacy Policy')}
        </a>
        {__('and')}
        <a
          className="underline px-1"
          href="https://policies.google.com/terms"
          target="__blank"
        >
          {__('Terms of Service')}
        </a>
        {__('apply')}.
      </div>
      <div>
        <p className="font-light text-xs text-gray-800 mt-2">
          &copy;&nbsp;{__('copyright')} {year}&nbsp;
          <a
            className="text-skin-base transition-colors duration-200 ease-in-out hover:text-skin-primary"
            href={siteSettings.author.websiteUrl}
          >
            {siteSettings.author.name}
          </a>
          &nbsp; {__('All Rights Reserved')}
        </p>
      </div>
    </footer>
  )
}

export default CheckoutFooter
