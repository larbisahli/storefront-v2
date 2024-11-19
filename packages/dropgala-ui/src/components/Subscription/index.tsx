import React from 'react'
import { StoreProps } from '@dropgala/store'
import { BuilderAttributes } from '@dropgala/types'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

interface Props extends StoreProps {}

const Subscription: React.FC<Props> = ({ useAppSelector, ...props }) => {
  console.log({ props })
  const { builderAttributes } = useIsInIframe(props, [
    BuilderAttributes.ADD_AFTER,
    BuilderAttributes.ADD_BEFORE,
    BuilderAttributes.DELETE,
    BuilderAttributes.DUPLICATE,
    BuilderAttributes.EDIT
  ])
  return (
    <section {...builderAttributes} className="mt-1 py-3 bg-red-300  ">
      Subscription
    </section>
  )
}

export default Subscription
