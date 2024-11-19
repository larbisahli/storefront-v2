import { ConfigType } from '@dropgala/types/config.type'
import Link from '../../common/Link'
import dynamic from 'next/dynamic'
import IconPlaceholder from '../../../placeholders/icon'

const FacebookIcon = dynamic(() => import('@dropgala/assets/icons/facebook'), {
  loading: () => <IconPlaceholder />,
  ssr: false
})

const YoutubeIcon = dynamic(() => import('@dropgala/assets/icons/youtube'), {
  loading: () => <IconPlaceholder />,
  ssr: false
})

const TwitterIcon = dynamic(() => import('@dropgala/assets/icons/twitter'), {
  loading: () => <IconPlaceholder />,
  ssr: false
})

const InstagramIcon = dynamic(
  () => import('@dropgala/assets/icons/instagram'),
  {
    loading: () => <IconPlaceholder />,
    ssr: false
  }
)

interface Props {
  className?: string
  socials?: {
    icon: {
      value: string
      label: string
    }
    url: string
    name: string
    image: string
    width: number
    height: number
  }[]
  storeConfig: ConfigType
}

const WidgetSocials: React.FC<Props> = ({ socials, className }) => {
  return (
    <div className={className}>
      {!!socials?.length && (
        <ul className="flex flex-wrap justify-center flex-col sm:justify-start space-s-4 md:space-s-5 mx-auto md:mx-0">
          <div className="flex flex-wrap gap-x-5 justify-center sm:justify-start space-s-4 md:space-s-5 mx-auto md:mx-0">
            {socials?.map((item, idx) => {
              return (
                <li
                  className="transition hover:opacity-80"
                  key={`social-list--key-${idx}`}
                >
                  <Link href={item?.url ?? '#'} target="_blank">
                    {item?.icon?.value === 'FacebookIcon' && <FacebookIcon />}
                    {item?.icon?.value === 'InstagramIcon' && <InstagramIcon />}
                    {item?.icon?.value === 'TwitterIcon' && <TwitterIcon />}
                    {item?.icon?.value === 'YouTubeIcon' && <YoutubeIcon />}
                  </Link>
                </li>
              )
            })}
          </div>
        </ul>
      )}
    </div>
  )
}

export default WidgetSocials
