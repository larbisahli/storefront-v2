import { ConfigType } from '@dropgala/types/config.type'
import Heading from '../../ui/Heading'
import Link from '../../common/Link'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import cn from 'clsx'
import { isEmpty } from '@dropgala/utils/lodashFunctions'

interface Props {
  className?: string
  listClassName?: string
  listItemClassName?: string
  disableGroupName?: boolean
  data: {
    groupName?: string
    pages: {
      name: string
      title: string
    }[]
  }
  storeConfig: ConfigType
}

const WidgetLink: React.FC<Props> = ({
  disableGroupName,
  listItemClassName,
  listClassName,
  className,
  data,
  storeConfig
}) => {
  const { groupName, pages } = data
  const { __ } = useTranslation(storeConfig?.language, 'common')
  return (
    <div className={className}>
      {!isEmpty(groupName) && !disableGroupName && (
        <Heading variant="mediumHeading" className="mb-4 pb-0.5 font-semibold">
          {__(`${groupName}`)}
        </Heading>
      )}
      <ul className={cn('text-sm flex flex-col space-y-3', listClassName)}>
        {pages.map((page, idx) => (
          <li
            key={`widget-list--key-${idx}`}
            className={cn('flex items-baseline', listItemClassName)}
          >
            <Link
              href={page.name ? `/pages/${page.name}` : '#!'}
              className="transition-colors duration-200 hover:text-skin-base"
            >
              {__(`${page.title}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WidgetLink
