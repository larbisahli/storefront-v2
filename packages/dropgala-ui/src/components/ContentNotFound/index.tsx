import { StoreProps, selectConfig } from '@dropgala/store'
import { StoreLayoutComponentContentType } from '@dropgala/types'
import { resolvePath } from '@dropgala/utils/helpers'
import useTranslation from '@dropgala/utils/hooks/useTranslation'

const ContentNotFound = ({ useAppSelector, ...props }: StoreProps) => {
  const { language } = useAppSelector(selectConfig)
  const { __ } = useTranslation(language, 'common')
  const { contentId, title, description } =
    resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  return (
    <section id={contentId} className="scroll-mt-320px mt-8 mb-0 text-center">
      <h2 className="text-24px font-semibold text-skin-primary">{__(title)}</h2>
      <span className="text-18px font-medium text-gray-900">
        {__(description)}
      </span>
    </section>
  )
}

export default ContentNotFound
