import React from 'react'
import { StoreProps } from '@dropgala/store'
import dynamic from 'next/dynamic'
import IconPlaceholder from '../../placeholders/icon'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'
import { BuilderAttributes } from '@dropgala/types'

const UserIcon = dynamic(() => import('@dropgala/assets/icons/user'), {
  loading: () => <IconPlaceholder />,
  ssr: false
})

interface Props extends StoreProps {}

const HeaderCtaItemUser: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const { builderAttributes } = useIsInIframe(props, [
    BuilderAttributes.ADD_LIBRARY
  ])
  return (
    <div
      {...builderAttributes}
      className="flex h-full justify-center items-center"
    >
      <button className="text-black">
        <UserIcon width={25} height={25} />
      </button>
    </div>
  )
}

export default HeaderCtaItemUser
