import * as React from 'react'
interface Props {
  width?: number
  height?: number
}
const ArrowUpIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m4 15 8-8 8 8"
    />
  </svg>
)

export default ArrowUpIcon
