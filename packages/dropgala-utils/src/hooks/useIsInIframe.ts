import { BuilderAttributes } from '@dropgala/types'
import { useEffect, useState } from 'react'

export function useIsInIframe(
  props?: any,
  btnAttributes?: BuilderAttributes[]
) {
  const [inIFrame, setInIframe] = useState(false)
  useEffect(() => {
    if (window.location !== window.parent.location) setInIframe(true)
    else setInIframe(false)
  }, [])
  let builderAttributes = {}
  if (inIFrame) {
    builderAttributes = {
      [BuilderAttributes.COMPONENT_ID]: props?.componentId,
      [BuilderAttributes.COMPONENT_NAME]: props?.moduleName,
      [BuilderAttributes.COMPONENT_GROUP]: props?.moduleGroup,
      [BuilderAttributes.ADD_AFTER]: btnAttributes?.includes(
        BuilderAttributes.ADD_AFTER
      ),
      [BuilderAttributes.ADD_BEFORE]: btnAttributes?.includes(
        BuilderAttributes.ADD_BEFORE
      ),
      [BuilderAttributes.EDIT]: btnAttributes?.includes(BuilderAttributes.EDIT),
      [BuilderAttributes.DUPLICATE]: btnAttributes?.includes(
        BuilderAttributes.DUPLICATE
      ),
      [BuilderAttributes.DELETE]: btnAttributes?.includes(
        BuilderAttributes.DELETE
      ),
      [BuilderAttributes.ADD_LIBRARY]: btnAttributes?.includes(
        BuilderAttributes.ADD_LIBRARY
      )
    }
  }
  return {
    isInIframe: inIFrame,
    builderAttributes
  }
}
