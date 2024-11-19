import * as React from 'react'
interface Props {
  width?: number
  height?: number
}
const ArrowRedo = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
    viewBox="0 0 1200 1200"
  >
    <path
      fill="currentColor"
      d="M754.553 35.03v294.208C487.317 329.246 0 332.178 0 1164.97c55.25-556.9 309.061-560.402 754.553-560.408v321.292L1200 480.407 754.553 35.03z"
    />
  </svg>
)

export default ArrowRedo