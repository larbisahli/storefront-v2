import React from 'react'
import { StoreProps } from '@dropgala/store'
import dynamic from 'next/dynamic'
import IconPlaceholder from '../../placeholders/icon'
import { BuilderAttributes } from '@dropgala/types'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

const HeartEmpty = dynamic(
  () => import('@dropgala/assets/icons/heart').then((mod) => mod.HeartEmpty),
  {
    loading: () => <IconPlaceholder />,
    ssr: false
  }
)

interface Props extends StoreProps {}

const HeaderCtaItemLike: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const { builderAttributes } = useIsInIframe(props, [
    BuilderAttributes.ADD_LIBRARY
  ])
  return (
    <div
      {...builderAttributes}
      className="flex h-full justify-center items-center"
    >
      <button className="text-black">
        <HeartEmpty width={25} height={25} />
      </button>
    </div>
  )
}

export default HeaderCtaItemLike
