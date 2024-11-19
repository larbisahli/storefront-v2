import { isEmpty } from '../lodashFunctions'
import React, { useMemo } from 'react'

/**
 * Desc: return component
 * @param {JSX.Element[]} JSX.Element[] in which find the component
 * @param {string} string component name
 * */
const useGetComponentFromChildren = (
  ChildComponents: JSX.Element[],
  moduleGroup: string
) => {
  if (isEmpty(ChildComponents)) {
    return <React.Fragment />
  }
  const component = useMemo(
    () =>
      ChildComponents?.find((component) => {
        return (
          React.isValidElement(component) &&
          (component?.props as { moduleGroup: string })?.moduleGroup ===
            moduleGroup
        )
      }),
    [ChildComponents, moduleGroup]
  )
  if (!component) return <React.Fragment />
  return component
}

export default useGetComponentFromChildren
