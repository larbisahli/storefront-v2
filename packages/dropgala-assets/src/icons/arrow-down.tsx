import * as React from 'react'

interface Props {
  width?: number
  height?: number
}

const ArrowDownIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m4 9 8 8 8-8"
    />
  </svg>
)

export default ArrowDownIcon
