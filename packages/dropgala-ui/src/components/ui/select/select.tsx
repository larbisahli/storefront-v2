import React from 'react'
import ReactSelect, { Props } from 'react-select'

import { selectStyles } from './select.styles'

export const Select = React.forwardRef<any, Props>((props, ref) => (
  <ReactSelect styles={selectStyles} {...props} innerRef={ref} ref={ref} />
))

Select.displayName = 'Select'

export default Select
